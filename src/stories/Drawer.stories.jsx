import React, { useState } from 'react';
import Drawer from '../components/drawer';


export default {
  title: 'Example/Drawer',
  component: Drawer,
  parameters: {
    componentSubtitle: 'Abre uma gaveta navegadora na parte inferior da tela. Muito usado em versões mobile'
}
};

const Template = (args) => {
    const [ver, setVer ] = useState(false);

    return (
    <>
        <button onClick={()=> setVer(true)}>VER DRAWER</button>
        <Drawer 
            corpo={ver && <p>Ola, sou um conteudo para o Drawer</p>}
            {...args} 
            fecharDrawer={()=> setVer(false)}
        />
    </>
    );
};

export const Padrao = Template.bind({});
