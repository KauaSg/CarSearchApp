# Contrato de API usado pelo Mobile

O app foi preparado para trabalhar com dois padrões de backend porque o grupo possui o backend do app atual e o backend da sprint de SOA.

## 1. Backend atual do CarSearchApp

### Consultar veículo

```http
POST /carros
```

Body:

```json
{
  "marca": "Ford",
  "modelo": "Ranger",
  "versao": "Raptor",
  "especificacoes": ["motor", "potência", "torque"]
}
```

Resposta esperada:

```json
{
  "marca": "Ford",
  "modelo": "Ranger",
  "versao": "Raptor",
  "especificacoes": [
    { "nome": "motor", "valor": "V6 3.0L Nano bi-turbo" },
    { "nome": "potência", "valor": "397 cv" }
  ]
}
```

### Comparar veículos

```http
POST /carros/comparar
```

Body:

```json
{
  "marca": "Ford",
  "modelo": "Ranger",
  "versao": "Raptor",
  "marca2": "Toyota",
  "modelo2": "Hilux",
  "versao2": "SRX"
}
```

Resposta esperada:

```json
[
  "A Ranger Raptor tem foco mais esportivo/off-road.",
  "A Hilux SRX tem proposta de robustez e uso misto."
]
```

## 2. Backend SOA

### Consultar com IA

```http
POST /veiculos/consultar
```

Body:

```json
{
  "marca": "Ford",
  "modelo": "Ranger",
  "versao": "Raptor",
  "prompt": "Retorne APENAS JSON puro no formato [{\"nome\":\"campo\",\"valor\":\"valor\"}]..."
}
```

### Listar veículos

```http
GET /veiculos
```

### Cadastrar veículo

```http
POST /veiculos
```

Body:

```json
{
  "marca": "Ford",
  "modelo": "Mustang",
  "versao": "GT"
}
```

## Configuração no app

A URL base fica no arquivo `.env`:

```env
EXPO_PUBLIC_API_URL=http://localhost:8080
```
