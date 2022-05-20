import React from 'react';
import Tabela from '../components/tabela';
import DATA from '../data/MOCK_DATA3.json';

const cabe = DATA.cabe;
const corpo = DATA.corpo;


export default {
  title: 'Example/Tabela',
  component: Tabela,
  parameters: {
    componentSubtitle: 'Uma linda tabela customizada para exibir vários registros com formatações numéricas e estilistas.'
}
};

const Template = (args) => <Tabela {...args} />;

export const Padrao = Template.bind({
  cabe: cabe,
  corpo: corpo,
});

Padrao.args = {
  cabe: cabe,
  corpo: corpo,
};

export const ComEstilo = Template.bind({});

ComEstilo.story = {
    parameters: {
      docs: {
          storyDescription: 'Tabela com props styleCabe e styleCorpo sendo repassada.'
      }
  }
}

ComEstilo.args = {
  cabe: cabe,
  corpo: corpo,
  styleCabe: { fontSize: '80%', whiteSpace: 'nowrap'},
  styleCorpo: { fontSize: '80%', whiteSpace: 'nowrap'}
}

export const ComMonetario = Template.bind({});

ComMonetario.story = {
    parameters: {
      docs: {
          storyDescription: 'Tabela com campos monetários convertidos.'
      }
  }
}

ComMonetario.args = {
  cabe: cabe,
  corpo: corpo,
  monetario: [3,4,5,6,7,8,9,10,11,12,13],
}

export const AlteraRodape = Template.bind({});

AlteraRodape.story = {
    parameters: {
      docs: {
          storyDescription: 'Tabela com rodape nos indices 1, 2 e 3 customizados.'
      }
  }
}

AlteraRodape.args = {
  cabe: cabe,
  corpo: corpo,
  calcularRodape: true,
  alteraRodape: {1: 'CUSTOMIZADO', 2: 'EU CUSTOMIZEI', 3: 'TOTALMENTE CUSTOMIZADO'},
  monetario: [3,4,5,6,7,8,9,10,11,12,13],
}