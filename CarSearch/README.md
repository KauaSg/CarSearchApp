# CarSearch Ford Mobile

Aplicativo mobile desenvolvido para a sprint de **Mobile Development and IoT** da FIAP Challenge Ford 2026.

O app funciona como a interface mobile da solução de **Inteligência Competitiva Automotiva**. O usuário informa **marca, modelo, versão** e uma lista livre de **atributos técnicos**. A aplicação consome uma API Spring Boot para retornar uma ficha técnica padronizada e comparável.

Esta versão também inclui **Firebase Authentication + Cloud Firestore**: cada usuário acessa com e-mail/senha e possui histórico próprio de pesquisas salvo na nuvem.

## Objetivo de negócio

Hoje a busca de especificações técnicas de veículos concorrentes pode ser manual, demorada e sujeita a imprecisão. O CarSearch Ford Mobile reduz esse esforço ao organizar a consulta em uma experiência simples para analistas internos, gerando resultados em cards claros.

## Funcionalidades entregues

- Login e cadastro com Firebase Authentication.
- Recuperação de senha por e-mail.
- Histórico de pesquisas por usuário no Cloud Firestore.
- Busca de veículo por marca, modelo e versão.
- Seleção livre de atributos técnicos desejados.
- Resultado em ficha técnica padronizada.
- Comparação entre dois veículos.
- Tela de perfil com dados da conta autenticada.
- Tela sobre o projeto e aderência ao desafio.
- Tratamento de loading, erros e API offline.
- Compatibilidade com dois padrões de backend:
  - Backend do app atual: `POST /carros` e `POST /carros/comparar`.
  - Backend da sprint SOA: `POST /veiculos/consultar`, `GET /veiculos` e `POST /veiculos`.

## Tecnologias

- React Native
- Expo
- Expo Router
- Firebase Authentication
- Cloud Firestore
- AsyncStorage como fallback local de histórico quando Firebase não estiver configurado
- JavaScript
- Consumo de API REST

## Estrutura principal

```text
CarSearch/
├── app/
│   ├── _layout.jsx
│   ├── index.jsx
│   └── (tabs)/
│       ├── _layout.jsx
│       ├── busca/
│       ├── comparar/
│       ├── historico.jsx
│       ├── sobre.jsx
│       └── perfil.jsx
├── .env.example
├── src/
│   ├── components/
│   │   └── CarInfosComponent.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── data/
│   │   └── defaultSpecifications.js
│   ├── screens/
│   │   ├── AuthScreen.jsx
│   │   ├── HomeScreen.jsx
│   │   ├── SpecScreen.jsx
│   │   ├── ResultScreen.jsx
│   │   ├── CarComparatorScreen.jsx
│   │   ├── CarComparatorResultScreen.jsx
│   │   ├── HistoryScreen.jsx
│   │   ├── ProfileScreen.jsx
│   │   └── AboutScreen.jsx
│   ├── service/
│   │   ├── CarService.js
│   │   ├── FirebaseConfig.js
│   │   └── StorageService.js
│   ├── styles/
│   │   └── theme.js
│   └── utils/
│       └── normalizers.js
└── docs/
    ├── checklist-mobile.md
    ├── contrato-api.md
    ├── firebase-setup.md
    └── roteiro-apresentacao.md
```

## Como configurar o Firebase

1. Acesse o Firebase Console e crie um projeto.
2. Adicione um app do tipo **Web**.
3. Copie as credenciais do objeto `firebaseConfig`.
4. No menu **Authentication**, ative o provedor **E-mail/senha**.
5. No menu **Firestore Database**, crie o banco em modo produção ou teste.
6. Copie `.env.example` para `.env` e preencha as variáveis `EXPO_PUBLIC_FIREBASE_*`.

Exemplo do `.env`:

```env
EXPO_PUBLIC_API_URL=http://localhost:8080
EXPO_PUBLIC_ENABLE_LOCAL_FALLBACK=false

EXPO_PUBLIC_FIREBASE_API_KEY=sua_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=seu-projeto
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=000000000000
EXPO_PUBLIC_FIREBASE_APP_ID=1:000000000000:web:xxxxxxxxxxxxxxxx
```

## Regras sugeridas do Firestore

Use estas regras para permitir que cada usuário leia e escreva apenas o próprio histórico:

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

## Como rodar o app

Instale as dependências:

```bash
npm install
```

Copie o arquivo de ambiente:

```bash
cp .env.example .env
```

No Windows PowerShell, se preferir:

```powershell
copy .env.example .env
```

Configure a URL do backend no `.env`:

```env
EXPO_PUBLIC_API_URL=http://localhost:8080
EXPO_PUBLIC_ENABLE_LOCAL_FALLBACK=false
```

Execute:

```bash
npx expo start -c
```

### Atenção ao testar no celular

Se estiver usando Expo Go em um celular físico, `localhost` aponta para o próprio celular, não para o computador. Nesse caso, troque a URL pelo IP da máquina onde o backend está rodando:

```env
EXPO_PUBLIC_API_URL=http://192.168.0.10:8080
```

No emulador Android, normalmente é possível usar:

```env
EXPO_PUBLIC_API_URL=http://10.0.2.2:8080
```

## Como rodar o backend do projeto atual

Entre na pasta do backend Spring Boot do repositório original:

```bash
cd ../carSearch_backend
./mvnw spring-boot:run
```

No Windows PowerShell:

```powershell
.\mvnw.cmd spring-boot:run
```

O app tentará consumir primeiro:

```http
POST /carros
POST /carros/comparar
```

Caso o backend da sprint SOA esteja rodando, o app também está preparado para:

```http
POST /veiculos/consultar
GET /veiculos
POST /veiculos
```

## Fluxo de teste funcional

1. Rode o backend Spring Boot na porta 8080.
2. Rode o app com `npx expo start -c`.
3. Crie uma conta no app com e-mail e senha.
4. Pesquise **Ford Ranger Raptor**.
5. Mantenha os atributos padrão:
   - motor
   - potência
   - torque
   - transmissão
   - tração
   - aceleração 0-100 km/h
   - modos de condução
   - faróis
   - rodas e pneus
   - preço
6. Veja a ficha técnica padronizada.
7. Abra a aba **Histórico** e confirme que a pesquisa foi salva no Firestore.
8. Abra a aba **Perfil** e teste o logout.

## Critérios atendidos da sprint mobile

- Aplicação mobile funcional em React Native com Expo.
- Interface clara e navegação por abas.
- Login e cadastro com Firebase.
- Persistência por usuário no Firestore.
- Consumo assíncrono de API REST.
- Valor direto ao desafio Ford.
- Organização de código por telas, navegação, serviços, contexto, dados e utilitários.
- Tratamento de erros e loading.

## Integrantes

Atualize esta seção com os nomes e RMs finais do grupo antes da entrega.

```text
Pietro Vitor Pezzente - RM557283
Eric Darakjian - RM557082
Luciano Henrique Meriato Júnior - RM554546
Kauã Soares Guimarães - RM559044
Enzo Mikael Sanches - RM558887
```
