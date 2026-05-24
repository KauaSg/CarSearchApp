# Checklist da Sprint Mobile

## Implementação

- [x] App em React Native com Expo.
- [x] Navegação principal por abas.
- [x] Fluxo de busca em etapas: veículo → atributos → resultado.
- [x] Tela de comparação entre veículos.
- [x] Consumo de API REST com `fetch`.
- [x] Tratamento de loading.
- [x] Tratamento de erro.
- [x] Fallback local para apresentação.
- [x] Login e cadastro com Firebase Authentication.
- [x] Histórico por usuário com Cloud Firestore.
- [x] Histórico local com AsyncStorage como fallback técnico.
- [x] README com instruções de execução.

## Antes de entregar

- [ ] Criar projeto Firebase e preencher as variáveis `EXPO_PUBLIC_FIREBASE_*` no `.env`.
- [ ] Ativar Authentication por e-mail/senha.
- [ ] Criar Firestore e aplicar as regras de segurança do arquivo `docs/firebase-setup.md`.
- [ ] Atualizar `.env` com o IP correto do backend.
- [ ] Confirmar que o backend está rodando em `http://IP:8080`.
- [ ] Criar uma conta no app e fazer login.
- [ ] Testar busca da Ford Ranger Raptor.
- [ ] Testar comparação Ford Ranger Raptor x Toyota Hilux SRX.
- [ ] Gravar prints ou vídeo curto do app funcionando.
- [ ] Confirmar nomes e RMs no README.

## Observações

O fallback local é apenas para demonstração. Em produção ou na apresentação final, o ideal é demonstrar com Firebase configurado e API rodando.
