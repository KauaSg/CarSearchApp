# CarSearch

Aplicacao com backend Spring Boot e app mobile/web Expo para pesquisar especificacoes de veiculos usando Gemini.

## Integrantes do Grupo

| Nome | RM |
| --- | --- |
| Pietro Vitor Pezzente | RM557283 |
| Eric Darakjian | RM557082 |
| Luciano Henrique Meriato Junior | RM554546 |
| Kaua Soares Guimaraes | RM559044 |
| Enzo Mikael Sanches | RM558887 |

## Estrutura

- `CarSearch/`: app Expo.
- `carSearch_backend/carSearch_backend/`: backend Spring Boot usado pela aplicacao.

## Backend

Entre na pasta do backend:

```powershell
cd carSearch_backend/carSearch_backend
```

Configure a chave do Gemini antes de rodar:

```powershell
$env:GEMINI_API_KEY="sua_chave_gemini"
```

Opcional, para busca de imagens:

```powershell
$env:PEXELS_API_KEY="sua_chave_pexels"
```

Rode:

```powershell
.\mvnw.cmd spring-boot:run
```

A API sobe em `http://localhost:8080`.

## App Expo

Entre na pasta do app:

```powershell
cd CarSearch
```

Instale as dependencias:

```powershell
npm install
```

Crie um `.env` a partir do exemplo:

```powershell
Copy-Item .env.example .env
```

Para teste no PC, deixe:

```env
EXPO_PUBLIC_API_URL=http://localhost:8080
EXPO_PUBLIC_ENABLE_LOCAL_FALLBACK=false
```

Rode:

```powershell
npx expo start -c
```

Para testar no celular, troque `localhost` pelo IP do PC na rede local.
