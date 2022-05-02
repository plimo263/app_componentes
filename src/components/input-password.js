import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField, IconButton } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LockIcon from '@mui/icons-material/Lock';


export default function InputPassword(props) {
    const [exibirSenha, setExibirSenha ] = useState(false);

    const { label, title, placeholder, field, error, sx, propsTextField  } = props;

  return(
    <TextField {...field} title={title}
        {...propsTextField}
        type={exibirSenha ? 'text': 'password'} sx={sx}
        label={label}
        InputProps={{
            startAdornment: <LockIcon sx={{color: theme=> theme.palette.primary.main }} />,
            endAdornment: (
                <IconButton onClick={()=> setExibirSenha(state=>!state)}>
                    {exibirSenha ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
            )
        }}
        placeholder={placeholder}
        error={Boolean(error)}
        helperText={Boolean(error) && error}
    />
    )
}

InputPassword.defaultProps = {
    title: '',
    placeholder: 'Digite a senha',
    propsTextField: {
        fullWidth: true,
        size: 'small',
        sx: {my: 1}
    }
}

InputPassword.propTypes = {
    /** Props que define o rotulo do componente inputPassword */
    label: PropTypes.string.isRequired,
    /** Algum tipo de dica para o campo */
    title: PropTypes.string,
    /** Alguma dica de texto para o campo */
    placeholder: PropTypes.string,
    /** A props field passada pelo Controller (de react-hook-form) na props render */
    field: PropTypes.object.isRequired,
    /** Uma string que representa o erro do campo */
    error: PropTypes.string,
    /** Props sx do mui para aplicar mais estilizações ao campo */
    sx: PropTypes.object,
    /** Propriedades próprias do TextField mui como fullWidth, size e até mesmo um sx interno (a props sx sobreescreve esta). */
    propsTextField: PropTypes.string.isRequired,
}