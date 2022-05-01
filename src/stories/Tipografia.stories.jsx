import React from 'react';
import { H6, H5, H4, H3, H2, H1, Body1, Body2,
Caption, Subtitle1, Subtitle2
 } from '../components/tipografia';

export default {
  title: 'Example/Tipografia',
  parameters: {
    componentSubtitle: 'Esta é uma lista de componentes textuais para o Material UI. É mais uma simplificação da tipografia do MUI'
}
};


export const ComH6 = ()=> <H6>Titulo Tamanho H6</H6>;

ComH6.story = {
    parameters: {
      docs: {
          storyDescription: 'Um componente MUI Typography na variant h6 com conteudo centralizado'
      }
  }
}

export const ComH5 = ()=> <H5>Titulo Tamanho H5</H5>;

ComH5.story = {
    parameters: {
      docs: {
          storyDescription: 'Um componente MUI Typography na variant h5 com conteudo centralizado'
      }
  }
}
export const ComH4 = ()=> <H4>Titulo Tamanho H4</H4>;

ComH4.story = {
    parameters: {
      docs: {
          storyDescription: 'Um componente MUI Typography na variant h4 com conteudo centralizado'
      }
  }
}
export const ComH3 = ()=> <H3>Titulo Tamanho H3</H3>;

ComH3.story = {
    parameters: {
      docs: {
          storyDescription: 'Um componente MUI Typography na variant h3 com conteudo centralizado'
      }
  }
}
export const ComH2 = ()=> <H2>Titulo Tamanho H2</H2>;

ComH2.story = {
    parameters: {
      docs: {
          storyDescription: 'Um componente MUI Typography na variant h2 com conteudo centralizado'
      }
  }
}

export const ComH1 = ()=> <H1>Titulo Tamanho H1</H1>;

ComH1.story = {
    parameters: {
      docs: {
          storyDescription: 'Um componente MUI Typography na variant H1 com conteudo centralizado'
      }
  }
}

export const ComSubtitle1 = ()=> <Subtitle1>Titulo Tamanho Subtitle1</Subtitle1>;

ComSubtitle1.story = {
    parameters: {
      docs: {
          storyDescription: 'Um componente MUI Typography na variant Subtitle1 com conteudo centralizado'
      }
  }
}

export const ComSubtitle2 = ()=> <Subtitle2>Titulo Tamanho Subtitle2</Subtitle2>;

ComSubtitle2.story = {
    parameters: {
      docs: {
          storyDescription: 'Um componente MUI Typography na variant Subtitle2 com conteudo centralizado'
      }
  }
}

export const ComBody1 = ()=> <Body1>Titulo Tamanho Body1</Body1>;

ComBody1.story = {
    parameters: {
      docs: {
          storyDescription: 'Um componente MUI Typography na variant Body1 com conteudo centralizado'
      }
  }
}

export const ComBody2 = ()=> <Body2>Titulo Tamanho Body2</Body2>;

ComBody2.story = {
    parameters: {
      docs: {
          storyDescription: 'Um componente MUI Typography na variant Body2 com conteudo centralizado'
      }
  }
}

export const ComCaption = ()=> <Caption>Titulo Tamanho Caption</Caption>;

ComCaption.story = {
    parameters: {
      docs: {
          storyDescription: 'Um componente MUI Typography na variant Caption com conteudo centralizado'
      }
  }
}