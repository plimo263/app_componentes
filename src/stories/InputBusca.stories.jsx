import React from 'react';
import InputBusca from '../components/input-busca';


export default {
  title: 'Example/InputBusca',
  component: InputBusca,
  parameters: {
    componentSubtitle: 'Este componente exibe uma barra de busca que tem atraso controlado na busca e ajustes visuais'
}
};

const Template = (args) => <InputBusca {...args} />;

export const Padrao = Template.bind({});

Padrao.args = {
  setFiltro: e=> console.log(e),
  label: 'Busca',
  placeholder: 'Digite a busca...',
  
    
}

Padrao.story = {
  parameters: {
    docs: {
        storyDescription: 'Recebe os parametros obrigatorios para seu funcionamento.'
    }
}
}