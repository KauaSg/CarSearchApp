import { RANGER_RAPTOR_FALLBACK } from "../data/defaultSpecifications";

export function cleanText(value) {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

export function normalizeSpecItem(item, index = 0) {
  if (!item) {
    return { nome: `item ${index + 1}`, valor: "Não disponível" };
  }

  if (typeof item === "string") {
    const [nome, ...rest] = item.split(":");
    if (rest.length > 0) {
      return {
        nome: cleanText(nome) || `item ${index + 1}`,
        valor: cleanText(rest.join(":")) || "Não disponível"
      };
    }
    return { nome: `item ${index + 1}`, valor: cleanText(item) || "Não disponível" };
  }

  const nome = item.nome || item.name || item.campo || item.atributo || item.spec || `item ${index + 1}`;
  const valor = item.valor || item.value || item.descricao || item.description || item.resultado || "Não disponível";

  return {
    nome: cleanText(nome) || `item ${index + 1}`,
    valor: cleanText(valor) || "Não disponível"
  };
}

export function parseJsonMaybe(value) {
  if (typeof value !== "string") return value;

  const trimmed = value.replace(/```json|```/gi, "").trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    return value;
  }
}

export function normalizeCarResult(rawResult, originalRequest = {}) {
  const parsed = parseJsonMaybe(rawResult);

  if (Array.isArray(parsed)) {
    return {
      marca: originalRequest.marca,
      modelo: originalRequest.modelo,
      versao: originalRequest.versao,
      fonte: "api",
      especificacoes: parsed.map(normalizeSpecItem)
    };
  }

  if (typeof parsed === "string") {
    const lines = parsed
      .split(/\n|;/)
      .map((line) => line.trim())
      .filter(Boolean);

    return {
      marca: originalRequest.marca,
      modelo: originalRequest.modelo,
      versao: originalRequest.versao,
      fonte: "api-texto",
      especificacoes: lines.length ? lines.map(normalizeSpecItem) : [{ nome: "resposta", valor: parsed }]
    };
  }

  const especificacoes = parsed?.especificacoes || parsed?.specs || parsed?.resultado || parsed?.data || [];

  return {
    marca: parsed?.marca || originalRequest.marca,
    modelo: parsed?.modelo || originalRequest.modelo,
    versao: parsed?.versao || originalRequest.versao,
    fonte: parsed?.fonte || "api",
    especificacoes: Array.isArray(especificacoes)
      ? especificacoes.map(normalizeSpecItem)
      : normalizeCarResult(especificacoes, originalRequest).especificacoes
  };
}

export function buildFallbackResult(request = {}) {
  const marca = cleanText(request.marca).toLowerCase();
  const modelo = cleanText(request.modelo).toLowerCase();
  const versao = cleanText(request.versao).toLowerCase();
  const requestedSpecs = Array.isArray(request.especificacoes) ? request.especificacoes : [];

  const isRangerRaptor = marca.includes("ford") && modelo.includes("ranger") && versao.includes("raptor");
  const base = isRangerRaptor
    ? RANGER_RAPTOR_FALLBACK
    : {
        marca: request.marca,
        modelo: request.modelo,
        versao: request.versao,
        fonte: "fallback-local",
        especificacoes: requestedSpecs.length
          ? requestedSpecs.map((nome) => ({ nome, valor: "Não disponível" }))
          : [
              { nome: "motor", valor: "Não disponível" },
              { nome: "potência", valor: "Não disponível" },
              { nome: "torque", valor: "Não disponível" },
              { nome: "transmissão", valor: "Não disponível" },
              { nome: "preço", valor: "Não disponível" }
            ]
      };

  if (!requestedSpecs.length || !isRangerRaptor) return base;

  const specsByName = new Map(
    base.especificacoes.map((spec) => [spec.nome.toLowerCase(), spec.valor])
  );

  return {
    ...base,
    especificacoes: requestedSpecs.map((nome) => ({
      nome,
      valor: specsByName.get(String(nome).toLowerCase()) || "Não disponível"
    }))
  };
}

export function normalizeComparison(rawResult) {
  const parsed = parseJsonMaybe(rawResult);

  if (Array.isArray(parsed)) {
    return parsed.map((item, index) => {
      if (typeof item === "string") return item;
      return `${item.titulo || item.nome || `Comparativo ${index + 1}`}: ${item.valor || item.descricao || JSON.stringify(item)}`;
    });
  }

  if (typeof parsed === "string") {
    return parsed
      .split(/\n|;/)
      .map((line) => line.trim())
      .filter(Boolean);
  }

  if (parsed && typeof parsed === "object") {
    return Object.entries(parsed).map(([key, value]) => `${key}: ${typeof value === "object" ? JSON.stringify(value) : value}`);
  }

  return [];
}
