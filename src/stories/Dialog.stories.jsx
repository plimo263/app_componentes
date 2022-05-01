import React, { useState } from 'react';
import Dialog from '../components/dialog';


export default {
  title: 'Example/Dialog',
  component: Dialog,
  parameters: {
    componentSubtitle: 'Abre um popup sobre o conteudo exibindo o seu corpo. Elegante e muito utilizado em versões Desktop'
}
};

const Template = (args) => {
    const [ver, setVer ] = useState(false);

    return (
    <>
        <button onClick={()=> setVer(true)}>VER DIALOG</button>
        <Dialog 
            corpo={ver && <p>Ola, sou um conteudo para o Dialog</p>}
            {...args} 
            fecharDialogo={()=> setVer(false)}
        />
    </>
    );
};

export const Padrao = Template.bind({});

export const TelaFull = Template.bind({});

TelaFull.args = {
    fullTela: true
}

TelaFull.story = {
    parameters: {
      docs: {
          storyDescription: 'Dialog que exibe a tela em tamanho máximo (sobrepondo a tela principal)'
      }
  }
}

export const ComoSlide = Template.bind({});

ComoSlide.args = {
    comoSlide: true
}

ComoSlide.story = {
    parameters: {
      docs: {
          storyDescription: 'Dialog que abre de baixo pra cima.'
      }
  }
}


export const LarguraMaxima = Template.bind({});

LarguraMaxima.args = {
    larguraMaxima: true
}

LarguraMaxima.story = {
    parameters: {
      docs: {
          storyDescription: 'Dialog que abre com largura máxima permitida (lg).'
      }
  }
}