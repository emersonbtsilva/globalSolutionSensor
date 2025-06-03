# 🌱 Global Solution Sensor

Este projeto foi desenvolvido como parte da disciplina Global Solution na FIAP, com o objetivo de monitorar variáveis ambientais críticas que influenciam o risco de deslizamentos de terra. Utilizando sensores de chuva, umidade do solo e inclinação do terreno, o sistema coleta dados em tempo real e fornece avaliações de risco, além de sugerir ações de mitigação para áreas vulneráveis.

## 📱 Funcionalidades

- **Coleta de Dados Ambientais**: Registro de informações como nível de chuva, umidade do solo, inclinação do terreno e tipo de solo.
- **Avaliação de Risco**: Análise dos dados coletados para determinar o nível de risco de deslizamento (baixo, moderado ou alto).
- **Histórico de Dados**: Armazenamento local dos registros para acompanhamento e análise temporal.
- **Ações de Mitigação**: Sugestões de medidas preventivas com base na avaliação de risco.
- **Interface Intuitiva**: Aplicativo móvel desenvolvido com React Native para facilitar a interação do usuário.

## 🛠️ Tecnologias Utilizadas

- **Frontend**: [React Native](https://reactnative.dev/) com TypeScript
- **Armazenamento Local**: [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- **Navegação**: [React Navigation](https://reactnavigation.org/)
- **Estilização**: [StyleSheet](https://reactnative.dev/docs/stylesheet)

## 📂 Estrutura do Projeto

├── assets/ # Recursos visuais (imagens, ícones)
├── src/ # Código-fonte principal
│ ├── screens/ # Telas do aplicativo
│ │ ├── InsertDataScreen.tsx
│ │ ├── RiskScreen.tsx
│ │ └── ...
│ ├── navigation/ # Configurações de navegação
│ │ └── StackNavigator.tsx
│ └── ...
├── App.tsx # Componente raiz do aplicativo
├── package.json # Dependências e scripts do projeto
└── tsconfig.json # Configurações do TypeScript


## 🚀 Como Executar o Projeto

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/emersonbtsilva/globalSolutionSensor.git
   cd globalSolutionSensor
2.** Instale as dependências: **

npm install

3. **Execute o aplicativo: **

npx expo start


