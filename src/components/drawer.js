import React, { memo } from 'react'
import { Drawer } from '@mui/material';

// Componente para exibir o Drawer de exibicao. Para mobile
const DrawerExibicao = ({ fecharDrawer, corpo })=>{

    return (
        <Drawer anchor='bottom' open={Boolean(corpo)} onClose={fecharDrawer}>
            {corpo}
        </Drawer>        
    )
}

export default memo( DrawerExibicao );