import React from "react";
//import { GraficoBarra, GraficoPizzaComLegenda } from "../components/graficos";
import Icone from "../components/icone";

export default {
  title: "Example/Graficos",
  component: null,
  parameters: {
    componentSubtitle: (
      <div>
        <p>{`
      Simplifica a criação de graficos usando o Recharts.`}</p>
        <p>{`Nota: Infelizmente eu não consigo exibir graficos aqui. Parece ser algum problema como storybook. Para não deixar esta Pagina vaga irei informar os graficos disponiveis as props que eles aceitam.`}</p>
        <p>{`Graficos disponiveis:`}</p>
        <ul>
          <li>{` GraficoBarra `}</li>
          <li>{` GraficoPizzaComLegenda `}</li>
        </ul>
        <p>{`Props para os graficos:`}</p>
        <ul>
          <li>{`titulo: Uma string que representa o titulo do gráfico `}</li>
          <li>{`id: Identificador unico para o grafico `}</li>
          <li>{`valorTopo [GraficoBarra]: Define em graficos de barra se o valor precisa ser exibido no topo ou não  `}</li>
          <li>{`fnVerRotulo [GraficoBarra]: Uma função de callback que pode ser usada para formatar os rotulos do rodape de grafico de barra.`}</li>
          <li>{`dados: Um array de objetos. Estes objetos devem ter 3 propriedades {dataValue, dataName e dataLabel}. EX: [{dataName: 'Marcos', dataValue: 10, dataLabel: 'Marcos Felipe da Silva'}]`}</li>
          <li>{`colors: Um array para determinar as cores do grafico. Caso colors seja de 1 ele gera uma unica cor para todos. Caso nenhum colors tenha sido enviada ele assume a cor secundaria do MUI.`}</li>
        </ul>
      </div>
    ),
  },
};

const Template = (args) => <div {...args} />;

export const Padrao = Template.bind({});

Padrao.story = {
  parameters: {
    docs: {
      storyDescription:
        "Recebe os parametros obrigatorios para seu funcionamento.",
    },
  },
};
