import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Box, styled, Stack, Drawer, SwipeableDrawer } from '@mui/material';
//
const Puller = styled(Box)(({ theme }) => ({
    width: 40,
    height: 8,
    backgroundColor:  theme.palette.primary.main,
    borderRadius: 4,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 20px)',
  }));
  

const Deslizavel = ({ corpo, fecharDrawer })=>(
    <SwipeableDrawer
      anchor='bottom'
      open={Boolean(corpo)}
      onClose={fecharDrawer}
    >
        <Stack direction='row' sx={{height: 24, w: '100%'}}>
            <Puller />
        </Stack>
      {corpo}
    </SwipeableDrawer>
)
// Componente para exibir o Drawer de exibicao. Para mobile
const DrawerExibicao = ({ fecharDrawer, corpo, isDeslizavel })=>{

    return isDeslizavel ? (
        <Deslizavel corpo={corpo} fecharDrawer={fecharDrawer} /> 
        ) : (
        <Drawer anchor='bottom' open={Boolean(corpo)} onClose={fecharDrawer}>
            {corpo}
        </Drawer>
        )
}
//
DrawerExibicao.defaultProps = {
    corpo: null,
    isDeslizavel: true,
}

DrawerExibicao.propTypes = {
    /** Uma função de callback para fechar o drawer. Ela deve fazer com que o corpo seja null, false ou undefined */
    fecharDrawer: PropTypes.func.isRequired,
    /** Um Componente react para representar o corpo ou null (para manter ele fechado), neste caso não deve ser exibido o Drawer */
    corpo: PropTypes.node, 
    /** Permite criar uma gaveta deslizavel (padrao) */
    isDeslizavel: PropTypes.bool,
}

export default memo( DrawerExibicao );