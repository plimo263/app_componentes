import React from 'react'
import PropTypes from 'prop-types'
import { Divider, Button, Container, Stack, Typography, } from '@mui/material';


export default function Confirmar({ titulo, subtitulo, fnConfirmar, fnCancelar, aguardar }) {
  return (
    <Container maxWidth='md' sx={{width: '100%', minHeight: '20vh'}}>
        <Stack spacing={2}>
            <Typography variant='subtitle1' fontWeight='bold' align='center'>
                {titulo}
            </Typography>
            <Typography variant='caption' sx={{opacity: .7}} align='center'>
                {subtitulo}
            </Typography>
            <Divider />
            <Stack direction='row' spacing={1}>
                <Button disabled={aguardar} variant='text' size='small' onClick={fnCancelar} sx={{flex: 1}}>
                    Não
                </Button>
                <Button disabled={aguardar} variant='contained' size='small' onClick={fnConfirmar} sx={{flex: 1}}>
                    SIM
                </Button>
            </Stack>
        </Stack>
    </Container>
  )
}
//
Confirmar.propTypes = {
    /** Determina um titulo para este sistema de confirmação.  */
    titulo: PropTypes.string.isRequired,
    /** Determina um subtitulo mais explicativo sobre o sistema de confirmação */
    subtitulo: PropTypes.string.isRequired,
    /** Uma função de callback para cancelar. Geralmente é uma ação que fecha o Dialog */
    fnCancelar: PropTypes.func.isRequired,
    /** Uma função de callback para confirmar a escolha do usuario.  */
    fnConfirmar: PropTypes.func.isRequired,
}