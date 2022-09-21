import React from "react";
import Comentario from "../components/comentario";

export default {
  title: "Example/Comentario",
  component: Comentario,
  parameters: {
    componentSubtitle:
      "Este componente exibe um painel para inserção de comentários com possibilidade de inserção de emojis",
  },
};

const Template = (args) => <Comentario {...args} />;

export const Padrao = Template.bind({});

Padrao.args = {
  onEnviarComentario: (coment) => {
    alert(coment);
  },
};
