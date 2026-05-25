# Roteiro de apresentação da Sprint Mobile

## 1. Problema

A Ford precisa entender rapidamente como veículos concorrentes se posicionam em preço, pacote de equipamentos e especificações técnicas. Hoje esse processo pode depender de buscas manuais em sites, vídeos, reportagens e concessionárias.

## 2. Solução

O CarSearch Ford Mobile permite que o analista informe marca, modelo, versão e os atributos técnicos desejados. A aplicação envia a consulta para uma API e apresenta os dados em formato padronizado, facilitando comparação e tomada de decisão.

## 3. Demonstração sugerida

1. Abrir o app.
2. Criar conta ou entrar com usuário Firebase.
3. Clicar no atalho **Ford Ranger Raptor**.
4. Avançar para atributos.
5. Manter ou editar os atributos técnicos.
6. Consultar.
7. Mostrar a ficha técnica em cards.
8. Abrir o histórico e mostrar que a consulta ficou salva no Firestore para aquele usuário.
9. Abrir a aba Perfil e mostrar a conta autenticada.
10. Abrir a aba comparar.
11. Preencher demo e comparar Ranger Raptor x Hilux SRX.

## 4. Pontos técnicos para falar

- App desenvolvido em React Native com Expo.
- Navegação por abas e stacks com Expo Router.
- Consumo de API REST assíncrona.
- Integração com backend Spring Boot.
- Login/cadastro com Firebase Authentication.
- Histórico por usuário usando Cloud Firestore.
- Sessão persistida no dispositivo com AsyncStorage.
- Tratamento de loading, erro e fallback.
- Código modularizado em telas, serviços, dados e utilitários.

## 5. Valor para a Ford

- Reduz tempo de pesquisa manual.
- Padroniza a saída das especificações.
- Facilita comparação entre Ford e concorrentes.
- Ajuda analistas a tomarem decisões com dados mais organizados.
