import React from "react";
import EditorTextRich from "../components/editor-text-rich";

export default {
  title: "Example/EditorTextRich",
  component: EditorTextRich,
  parameters: {
    componentSubtitle:
      "Este componente permite utilizar um editor de texto com formatações. O valor digitado pode ser carregado por meio do hook useEditorTextRich",
  },
};

const Template = (args) => <EditorTextRich {...args} />;

export const Padrao = Template.bind({});

Padrao.args = {};
