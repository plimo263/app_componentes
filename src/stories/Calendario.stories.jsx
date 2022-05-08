import React from 'react';
import Calendario from '../components/calendario';
import { Caption } from '../components/tipografia';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';


export default {
  title: 'Example/Calendario',
  component: Calendario,
  parameters: {
    componentSubtitle: 'Este componente exibe um lindo calendário para manipulação e inclusão de informações (eventos)'
}
};

const Template = (args) => <Calendario {...args} />;

export const Padrao = Template.bind({});

Padrao.args = {
  dataInicial: '2022-05-01',    
}

Padrao.story = {
  parameters: {
    docs: {
        storyDescription: 'Calendario em funcionalidade padrão.'
    }
  }
}

export const ComRender = Template.bind({});

ComRender.args = {
  dataInicial: '2022-05-01',
  render: (dia)=>{
    if(dia === '2022-05-10') return (
      <>
        <CrisisAlertIcon />
        <Caption title='Meta Conquistada com sucesso absoluto' color='success.main'>Meta Conquistada com sucesso absoluto</Caption>
      </>
      
    )
  }    
}

ComRender.story = {
  parameters: {
    docs: {
        storyDescription: 'Calendario com um dia marcado com a informação.'
    }
  }
}

export const ComEstilo = Template.bind({});

ComEstilo.args = {
  dataInicial: '2022-05-01',
  renderEstiloDia: (dia)=>{
    if(dia === '2022-05-10') return {
      backgroundColor: theme=> theme.palette.primary.main,
      color: theme=> theme.palette.primary.constrastText,
    }
  }    
}

ComEstilo.story = {
  parameters: {
    docs: {
        storyDescription: 'Calendario com um dia estilizado para dar destaque sobre o calendário.'
    }
  }
}

export const OnClick = Template.bind({});

OnClick.args = {
  dataInicial: '2022-05-01',
  onClick: (dia)=>{
    alert(`Você clicou no dia ${JSON.stringify(dia)}`);
  }
}

OnClick.story = {
  parameters: {
    docs: {
        storyDescription: 'Calendario com função de onClick ativa, qualquer dia clicado no calendario corresponderá a uma chamada a função.'
    }
  }
}