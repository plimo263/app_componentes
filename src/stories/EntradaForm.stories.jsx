import React from 'react';
import EntradaForm from '../components/entrada-form';
import * as yup from 'yup';

const ITENS = [
   {
    name: 'responsavel',
    type: 'select',
    label: 'Responsável',
    itens: ['MARCOS', 'FELIPE', 'SILVA'],
    isMulti: true,
    autoFormat: true,
    defaultValue: 'MARCOS',
    extraProps: {
      fullWidth: true
    },
    grid: {
      xs: 12, 
    },
   },
   {
     type: 'textarea',
     label: 'Descrição',
     name: 'descricao',
     defaultValue: '',
     placeholder: 'Digite uma descrição válida',
     extraProps: {
       multiline: true, minRows: 2,
       fullWidth: true,
     },
     //maxLength: 10,
     grid: {
       xs: 12, 
     }
   }
]

const ITENS2 = [
  {
   name: 'titulo',
   icon: 'PostAdd',
   type: 'text',
   label: 'Titulo',
   defaultValue: '',
   extraProps: {
     fullWidth: true
   },
   grid: {
     xs: 12, 
   },
  },
  {
    type: 'textarea',
    icon: 'Computer',
    label: 'Descrição',
    name: 'descricao',
    defaultValue: '',
    placeholder: 'Digite uma descrição válida',
    extraProps: {
      multiline: true, minRows: 2,
      fullWidth: true,
    },
    //maxLength: 10,
    grid: {
      xs: 12, 
    }
  }
]

const ITENS3 = [
  {
   name: 'titulo',
   icon: 'PostAdd',
   type: 'text',
   label: 'Titulo',
   defaultValue: '',
   extraProps: {
     fullWidth: true
   },
   grid: {
     xs: 12, 
   },
  },
  {
    type: 'textarea',
    icon: 'Computer',
    label: 'Descrição',
    name: 'descricao',
    defaultValue: '',
    placeholder: 'Digite uma descrição válida',
    extraProps: {
      multiline: true, minRows: 2,
      fullWidth: true,
    },
    //maxLength: 10,
    grid: {
      xs: 12, 
    }
  },
  {
    type: 'switch',
    icon: 'Phone',
    label: 'Receber ligação ?',
    name: 'ligacao',
    defaultChecked: true,   
  }
]
//
const ITENS4 = [
  {
   name: 'titulo',
   icon: 'PostAdd',
   type: 'text',
   label: 'Titulo',
   defaultValue: '',
   extraProps: {
     fullWidth: true
   },
   grid: {
     xs: 12, 
   },
  },
  {
    type: 'textarea',
    icon: 'Computer',
    label: 'Descrição',
    name: 'descricao',
    defaultValue: '',
    placeholder: 'Digite uma descrição válida',
    extraProps: {
      multiline: true, minRows: 2,
      fullWidth: true,
    },
    //maxLength: 10,
    grid: {
      xs: 12, 
    }
  },
  {
    name: 'lojas',
    type: 'radio',
    orientation: 'horizontal',
    itens: [[ 1, 'Diniz Minas Shopping'], [2, 'Diniz Contagem']],    
    label: 'Qual a loja preferida',
    defaultValue : "2"
  }
]
//
const ITENS5 = [
  {
   name: 'titulo',
   icon: 'PostAdd',
   type: 'text',
   label: 'Titulo',
   defaultValue: '',
   extraProps: {
     fullWidth: true
   },
   grid: {
     xs: 12, 
   },
  },
  {
    type: 'textarea',
    icon: 'Computer',
    label: 'Descrição',
    name: 'descricao',
    defaultValue: '',
    placeholder: 'Digite uma descrição válida',
    extraProps: {
      multiline: true, minRows: 2,
      fullWidth: true,
    },
    //maxLength: 10,
    grid: {
      xs: 12, 
    }
  },
  {
    name: 'arquivo',
    type: 'file',
    label: 'Foto',
  }
]

const ITENS6 = [
  {
   name: 'titulo',
   icon: 'PostAdd',
   type: 'text',
   label: 'Titulo',
   defaultValue: '',
   extraProps: {
     fullWidth: true
   },
   grid: {
     xs: 12, 
   },
  },
  {
    type: 'textarea',
    counter: true,
    label: 'Descrição',
    name: 'descricao',
    defaultValue: '',
    placeholder: 'Digite uma descrição válida',
    extraProps: {
      multiline: true, minRows: 2,
      fullWidth: true,
    },
    //maxLength: 10,
    grid: {
      xs: 12, 
    }
  },
    {
      type: 'checkbox',
      label: 'Manter conectado',
      name: 'conectado',
      defaultChecked: true,   
      grid: {
        xs: 2,
      }
    },
    {
      type: 'date',
      label: 'Data entrada',
      name: 'data',
      grid: {
        xs: 10,
      },
      extraProps: {
        fullWidth: false
      }
    }
]

export default {
  title: 'Example/EntradaForm',
  component: EntradaForm,
  parameters: {
    componentSubtitle: <div><p>{`
      Um sistema para formularios automatizado que recebe schemas e 
      automaticamente monta os campos.`}</p>
      <p>{`Propriedades dos itens:`}</p>
      <ul>
        <li>{`icon: Uma string que represente o icone `}</li>
        <li>{`type: Os tipos dos itens aceitos `}</li>
        <li>{`defaultValue: O valor default do item  `}</li>
        <li>{`defaultChecked: Um valor booleano para passar valor default do item.  `}</li>
        <li>{`name: Nome que vai identificar o campo no formulario`}</li>
        <li>{`label: Rótulo para o campo`}</li>
        <li>{`grid: Sistema de grid para distribuir campos de formulario ({xs: 12, md: 6 })`}</li>
        <li>{`extraProps: Propriedades extras que serão expandidas no campo (podem ser props do Mui ou do ReactSelect)`}</li>
        <li>{`itens: Um array para o select determinar os itens que farão parte do select`}</li>
        <li>{`autoFormat: Propriedade do select para autoFormataçao do campo itens e defaultValue`}</li>
        <li>{`maxLength: Um numero que determina o limite maximo de caracteres digitados`}</li>
        <li>{`counter: Um boleano que ativa o contador de caracteres no campo`}</li>
      </ul>
    </div>
}
};

const Template = (args) => <EntradaForm {...args} />;

export const Padrao = Template.bind({});

Padrao.args = {
  schema: ITENS,
  onSubmit: (val)=>{
    window.alert(JSON.stringify(val));
  }
};

export const ComSchemaValidator = Template.bind({});

ComSchemaValidator.args = {
  schema: ITENS,
  schemaValidator: yup.object().shape({
    responsavel: yup.array().min(1).required(),
    descricao: yup.string().min(3).required(),
  }),
  schemaMessageError: {
    responsavel: 'Não deve ser deixado em branco',
    descricao: 'Deve existir no mínimo 3 caracteres',
  },
  onSubmit: (val)=>{
    window.alert(JSON.stringify(val));
  }
}


ComSchemaValidator.story = {
    parameters: {
      docs: {
          storyDescription: 'Recebe um schemaValidator para exibir mensagens de erro caso não seja atendido o formulario.'
      }
  }
}



export const ComIcones = Template.bind({});

ComIcones.args = {
  schema: ITENS2,
 
  onSubmit: (val)=>{
    window.alert(JSON.stringify(val));
  }
}


ComIcones.story = {
    parameters: {
      docs: {
          storyDescription: 'Strings com os Icones são passados para serem criados (ver lista de icones aceito no componente Icone).'
      }
  }
}

export const Aguardar = Template.bind({});

Aguardar.args = {
  schema: ITENS2,
  wait: true, 
  buttonProps: {
    iconColor: 'white',
  },
  onSubmit: (val)=>{
    window.alert(JSON.stringify(val));
  }
}


Aguardar.story = {
    parameters: {
      docs: {
          storyDescription: 'Com o valor que desativa todos os campos (geralmente repassado quando um formulario e submetido).'
      }
  }
}


export const Switch = Template.bind({});

Switch.args = {
  schema: ITENS3,  
  onSubmit: (val)=>{
    window.alert(JSON.stringify(val));
  }
}


Switch.story = {
    parameters: {
      docs: {
          storyDescription: 'Formulário com botão switch.'
      }
  }
}

export const Radio = Template.bind({});

Radio.args = {
  schema: ITENS4,  
  onSubmit: (val)=>{
    window.alert(JSON.stringify(val));
  }
}


Radio.story = {
    parameters: {
      docs: {
          storyDescription: 'Formulário com sistema de radio'
      }
  }
}

export const Arquivo = Template.bind({});

Arquivo.args = {
  schema: ITENS5,  
  onSubmit: (val)=>{
    console.log(val);
  }
}


Arquivo.story = {
    parameters: {
      docs: {
          storyDescription: 'Formulário com sistema de upload de arquivos'
      }
  }
}

export const CheckBox = Template.bind({});

CheckBox.args = {
  schema: ITENS6,  
  onSubmit: (val)=>{
    window.alert(JSON.stringify(val));
  }
}


CheckBox.story = {
    parameters: {
      docs: {
          storyDescription: 'Formulário com checkbox ativo.'
      }
  }
}