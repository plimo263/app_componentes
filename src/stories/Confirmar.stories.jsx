import React from 'react';
import Confirmar from '../components/confirmar';


export default {
  title: 'Example/Confirmar',
  component: Confirmar,
  parameters: {
    componentSubtitle: 'Este componente exibe um sistema de opções sim ou não para confirmar ou cancelar alguma ação.'
}
};

const Template = (args) => <Confirmar {...args} />;

export const Padrao = Template.bind({});

Padrao.args = {
    titulo: 'Excluir usuário',
    subtitulo: 'Deseja realmente exclui-lo ? Esta ação é irreversivel',
    fnConfirmar: ()=>{},
    fnCancelar: ()=>{},
}

Padrao.story = {
  parameters: {
    docs: {
        storyDescription: 'Recebe os parametros obrigatorios para seu funcionamento.'
    }
}
}