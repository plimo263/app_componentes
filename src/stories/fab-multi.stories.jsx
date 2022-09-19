import { green } from "@mui/material/colors";
import React from "react";
import FabMulti from "../components/fab-multi.jsx";

export default {
  title: "Example/FabMulti",
  component: FabMulti,
  parameters: {
    componentSubtitle:
      "Exibe um FAB que, quando clicado expande os demais botões FAB criando um FAB com multiplas opções.",
  },
};

const Template = (args) => <FabMulti {...args} />;

export const Padrao = Template.bind({});

Padrao.args = {
  fabs: [
    {
      icon: "Add",
      title: "Adicionar itens",
      onClick: () => {
        console.log("ADD ITEM");
      },
      sx: { backgroundColor: green[500], color: "white" },
    },
    {
      icon: "Delete",
      title: "Excluir itens",
      onClick: () => {
        console.log("DEL ITEM");
      },
      sx: { backgroundColor: green[800], color: "white" },
    },
  ],
};

Padrao.story = {
  parameters: {
    docs: {
      storyDescription:
        "Por padrão cria um FAB multiplo que deve receber ao menos um array com objetos para montar os FABs",
    },
  },
};
