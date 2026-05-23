const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:8080";
const BASE_URL = API_URL.replace(/\/$/, "");

export async function buscarCarro(dados) {
  try {
    const response = await fetch(`${BASE_URL}/carros`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      throw new Error("Erro na requisição");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar carro:", error);
    throw error;
  }
}

export async function uploadImagem(file) {
  const formData = new FormData();

  formData.append('file', file.file); 

  const response = await fetch(`${BASE_URL}/carros/upload`, {
    method: 'POST',
    body: formData
  });

  return response.json();
}

export async function buscarImagem(dados) {
  try {
    const response = await fetch(`${BASE_URL}/carros/pesquisarImagem`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      throw new Error("Erro na requisição");
    }

    return await response.text();
  } catch (error) {
    console.error("Erro ao buscar carro:", error);
    throw error;
  }
}

export async function compararVeiculos(dados) {
  try {
    const response = await fetch(`${BASE_URL}/carros/comparar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      throw new Error("Erro na requisição");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar carro:", error);
    throw error;
  }
}
