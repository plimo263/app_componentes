import React from 'react';
import PropTypes from 'prop-types'
import { Paper, Box } from '@mui/material';

const SX = {
    display: 'flex',
    alignItems: 'center',
    height: '48px',
}
const SXBOX = {
    backgroundColor: 'white',
    alignSelf: 'stretch',
    display: 'flex',
    alignItems: 'center',
    px: {xs: 0, sm: 3},   
    
}

export default function HeaderDefault({ children, logo, backgroundColor }) {
  return (
      <Paper sx={SX}>
        <Paper elevation={4} sx={{
            flex: 1,
            alignSelf: 'stretch',
            borderRadius: '0 0px 30px 0',
            backgroundColor: backgroundColor,
        }} 
        />
        <Box sx={SXBOX}>
            <img style={{marginRight: '4px'}} src={logo} height={30} alt="LOGO OTICAS DINIZ" />
            { children }
        </Box>
    </Paper>
  )
}

HeaderDefault.defaultProps = {
    backgroundColor: theme=> theme.palette.primary.main,

}

HeaderDefault.propTypes = {
    /** Esta props aceita qualquer conteudo */
    children: PropTypes.any.isRequired,
    /** Esta props representa o path para a logo que deve ser enviada para montar o header */
    logo: PropTypes.string.isRequired,
    /** Esta props representa a cor de fundo da barra. Por padrão usa a cor primaria do site */
    backgroundColor: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

}