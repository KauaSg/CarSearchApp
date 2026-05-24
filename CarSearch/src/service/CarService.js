import { buildFallbackResult, normalizeCarResult, normalizeComparison } from "../utils/normalizers";

const DEFAULT_TIMEOUT = 12000;
const ENV_URL = process.env.EXPO_PUBLIC_API_URL;
const FALLBACK_ENABLED = process.env.EXPO_PUBLIC_ENABLE_LOCAL_FALLBACK !== "false";

export const BASE_URL = (ENV_URL || "http://localhost:8080").replace(/\/$/, "");

function makePrompt({ marca, modelo, versao, especificacoes }) {
  const specs = Array.isArray(especificacoes) && especificacoes.length
    ? especificacoes.join(", ")
    : "motor, potência, torque, transmissão, tração, preço";

  return `Retorne APENAS JSON puro no formato [{"nome":"campo","valor":"valor"}] para o veículo ${marca} ${modelo} ${versao}. Especificações solicitadas: ${specs}. Se não souber uma informação, use "Não disponível".`;
}

async function request(path, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      }
    });

    const text = await response.text();
    const content = text ? tryParse(text) : null;

    if (!response.ok) {
      const message = content?.erro || content?.message || `Erro ${response.status}`;
      throw new Error(message);
    }

    return content;
  } finally {
    clearTimeout(timeout);
  }
}

function tryParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

async function tryRequests(requests) {
  const errors = [];

  for (const entry of requests) {
    try {
      return await request(entry.path, entry.options);
    } catch (error) {
      errors.push(`${entry.path}: ${error.message}`);
    }
  }

  throw new Error(errors.join(" | "));
}

export async function buscarCarro(dados) {
  const payloadCarros = {
    marca: dados.marca,
    modelo: dados.modelo,
    versao: dados.versao,
    especificacoes: dados.especificacoes || []
  };

  const payloadSOA = {
    marca: dados.marca,
    modelo: dados.modelo,
    versao: dados.versao,
    prompt: makePrompt(dados)
  };

  try {
    const raw = await tryRequests([
      {
        path: "/carros",
        options: {
          method: "POST",
          body: JSON.stringify(payloadCarros)
        }
      },
      {
        path: "/veiculos/consultar",
        options: {
          method: "POST",
          body: JSON.stringify(payloadSOA)
        }
      }
    ]);

    return normalizeCarResult(raw, payloadCarros);
  } catch (error) {
    if (!FALLBACK_ENABLED) throw error;
    const fallback = buildFallbackResult(payloadCarros);
    return {
      ...fallback,
      offline: true,
      offlineMessage: "API indisponível. Resultado exibido com fallback local para permitir demonstração."
    };
  }
}

export async function compararVeiculos(dados) {
  try {
    const raw = await tryRequests([
      {
        path: "/carros/comparar",
        options: {
          method: "POST",
          body: JSON.stringify(dados)
        }
      },
      {
        path: "/veiculos/comparar",
        options: {
          method: "POST",
          body: JSON.stringify(dados)
        }
      }
    ]);

    const normalized = normalizeComparison(raw);
    return normalized.length ? normalized : ["Comparação retornada sem itens detalhados."];
  } catch (error) {
    if (!FALLBACK_ENABLED) throw error;
    return [
      "API indisponível. Comparação exibida em modo demonstrativo.",
      `${dados.marca} ${dados.modelo} ${dados.versao}: ficha técnica deve ser consultada na API para valores oficiais.`,
      `${dados.marca2} ${dados.modelo2} ${dados.versao2}: ficha técnica deve ser consultada na API para valores oficiais.`,
      "Recomendação: validar motor, potência, torque, transmissão, tração, preço e equipamentos para análise competitiva."
    ];
  }
}

export async function listarVeiculos() {
  try {
    return await request("/veiculos", { method: "GET" });
  } catch (error) {
    if (!FALLBACK_ENABLED) throw error;
    return [];
  }
}

export async function cadastrarVeiculo(veiculo) {
  return request("/veiculos", {
    method: "POST",
    body: JSON.stringify(veiculo)
  });
}

export async function uploadImagem(file) {
  const formData = new FormData();
  formData.append("file", file.file || file);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

  try {
    const response = await fetch(`${BASE_URL}/carros/upload`, {
      method: "POST",
      body: formData,
      signal: controller.signal
    });

    if (!response.ok) throw new Error(`Erro ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

export async function buscarImagem(dados) {
  return request("/carros/pesquisarImagem", {
    method: "POST",
    body: JSON.stringify(dados)
  });
}
