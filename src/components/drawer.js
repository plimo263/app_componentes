import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Drawer } from '@mui/material';

// Componente para exibir o Drawer de exibicao. Para mobile
const DrawerExibicao = ({ fecharDrawer, corpo })=>{

    return (
        <Drawer anchor='bottom' open={Boolean(corpo)} onClose={fecharDrawer}>
            {corpo}
        </Drawer>        
    )
}
//
DrawerExibicao.defaultProps = {
    corpo: null,
}

DrawerExibicao.propTypes = {
    /** Uma função de callback para fechar o drawer. Ela deve fazer com que o corpo seja null, false ou undefined */
    fecharDrawer: PropTypes.func.isRequired,
    /** Um Componente react para representar o corpo ou null (para manter ele fechado), neste caso não deve ser exibido o Drawer */
    corpo: PropTypes.node 
}

export default memo( DrawerExibicao );