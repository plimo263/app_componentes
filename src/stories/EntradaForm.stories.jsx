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
        <li>{`name: Nome que vai identificar o campo no formulario`}</li>
        <li>{`label: Rótulo para o campo`}</li>
        <li>{`grid: Sistema de grid para distribuir campos de formulario ({xs: 12, md: 6 })`}</li>
        <li>{`extraProps: Propriedades extras que serão expandidas no campo (podem ser props do Mui ou do ReactSelect)`}</li>
        <li>{`itens: Um array para o select determinar os itens que farão parte do select`}</li>
        <li>{`autoFormat: Propriedade do select para autoFormataçao do campo itens e defaultValue`}</li>
        <li>{`maxLength: Um numero que determina o limite maximo de caracteres digitados`}</li>
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
