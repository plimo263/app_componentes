import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { ButtonBase } from '@mui/material';
import Icone from './icone'

const  BotaoIcone = (props)=>{
    
    return (
        <ButtonBase {...props}
            sx={{
                borderRadius: '100%',
                p: 1,
                ...props.sx,
            }}
        >
            <Icone icone={props.icone} />
        </ButtonBase>
    )
}

BotaoIcone.propTypes = {
    /** Deternima qual será o icone que será exibido */
    icone: PropTypes.string.isRequired,
    /** Todas as propriedades para o mui ButtonBase */
    props: PropTypes.any,
}

export default memo(BotaoIcone);