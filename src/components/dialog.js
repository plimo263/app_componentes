import React, { memo } from 'react'
import { Slide, Dialog, DialogContent, DialogActions, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

// Componente Dialog para outros tipos de conteudo
const DialogExibicao = ({fecharDialogo, corpo, larguraMaxima, fullTela, comoSlide})=>{

    return (
        <Dialog open={Boolean(corpo)} 
            fullWidth={larguraMaxima}
            maxWidth='lg'
            fullScreen={fullTela}
            TransitionComponent={comoSlide && Transition}
        >
            
            <DialogContent>
                {corpo}
            </DialogContent>
            <DialogActions>
                <Button startIcon={<CloseIcon />} onClick={fecharDialogo}>Fechar</Button>
            </DialogActions>

        </Dialog>
    )
}

export default memo( DialogExibicao );