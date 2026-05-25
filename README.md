# CarSearch

Aplicacao com backend Spring Boot e app mobile/web Expo para pesquisar especificacoes de veiculos usando Gemini.

Versao atual: **v2 com Expo Router, Firebase Authentication + Cloud Firestore**.

## Integrantes do Grupo

| Nome | RM |
| --- | --- |
| Pietro Vitor Pezzente | RM557283 |
| Eric Darakjian | RM557082 |
| Luciano Henrique Meriato Junior | RM554546 |
| Kaua Soares Guimaraes | RM559044 |
| Enzo Mikael Sanches | RM558887 |

## Estrutura

- `CarSearch/`: app Expo v2 com Expo Router, login, cadastro, recuperacao de senha e historico no Firestore.
- `carSearch_backend/carSearch_backend/`: backend Spring Boot usado pela aplicacao.
- `CarSearch/docs/`: checklist, contrato de API, roteiro de apresentacao e configuracao Firebase.

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

EXPO_PUBLIC_FIREBASE_API_KEY=cole_sua_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=seu-projeto
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=000000000000
EXPO_PUBLIC_FIREBASE_APP_ID=1:000000000000:web:xxxxxxxxxxxxxxxx
```

Antes do teste final, ative no Firebase:

- Authentication com Email/Password.
- Firestore Database.
- Regras de seguranca descritas em `CarSearch/docs/firebase-setup.md`.

Rode:

```powershell
npx expo start -c
```

Para testar no celular, troque `localhost` pelo IP do PC na rede local.
