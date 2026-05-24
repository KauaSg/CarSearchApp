# Configuração do Firebase

## 1. Criar projeto

Crie um projeto no Firebase Console e adicione um app do tipo Web.

## 2. Ativar autenticação

Em Authentication > Sign-in method, ative o provedor **E-mail/senha**.

## 3. Criar Firestore

Em Firestore Database, crie o banco de dados.

## 4. Configurar `.env`

Copie `.env.example` para `.env` e preencha:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
EXPO_PUBLIC_FIREBASE_PROJECT_ID=...
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=...
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
EXPO_PUBLIC_FIREBASE_APP_ID=...
```

## 5. Regras de segurança

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/history/{historyId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 6. Estrutura dos dados

O histórico é salvo em:

```text
users/{uid}/history/{historyId}
```

Exemplo de documento:

```json
{
  "marca": "Ford",
  "modelo": "Ranger",
  "versao": "Raptor",
  "createdAt": "2026-05-19T12:00:00.000Z",
  "userEmail": "usuario@email.com",
  "especificacoes": [
    { "nome": "motor", "valor": "V6 3.0L Nano bi turbo" }
  ]
}
```
