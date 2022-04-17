### Sistema de tabela usando react-table

Esta é uma tabela usada como base para representação de dados. Integrada com a biblioteca MUI, a utilização de outras libs torna a tabela eficiente para os mais variados casos.

#### Recursos

- [x] Formatação cabecalho * (estilos aplicados a um Paper com uso da props sx)
- [x] Atributo para data
- [x] Atributo para monetario
- [x] Atributo para dataHora
- [x] Selecao de registro
- [x] Utilizacao do campo envolver
- [x] Filtro global
- [x] Exibir rodape
- [x] Total no rodape de campos monetario e soma
- [x] Campo data customizado com props dataCustom (um formato aceito pelo date-fns)
- [x] Exibicao de 100 registros na tela (no máximo)
- [x] Quantidade de registros em exibicao no painel
- [x] Recebimento do painel como render (com capacidade de receber o trSelecionado e se auto-configurar para select)
- [x] Mostra mais registros a medida que vai scrollando
- [x] Oculta colunas não utilizadas

#### Bibliotecas utilizadas

- @mui/material
- react-use
- react-table
- date-fns
- react-infinite-scroll-hook