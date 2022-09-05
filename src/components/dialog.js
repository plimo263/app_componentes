import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Slide, Dialog, DialogContent, DialogActions, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

// Componente Dialog para outros tipos de conteudo
const DialogExibicao = ({fecharDialogo, corpo, larguraMaxima, fullTela, comoSlide, sxContent})=>{

    return (
        <Dialog open={Boolean(corpo)} 
            fullWidth={larguraMaxima}
            maxWidth='lg'
            fullScreen={fullTela}
            TransitionComponent={comoSlide && Transition}
        >
            
            <DialogContent
                sx={sxContent}
            >
                {corpo}
            </DialogContent>
            <DialogActions>
                <Button startIcon={<CloseIcon />} onClick={fecharDialogo}>Fechar</Button>
            </DialogActions>

        </Dialog>
    )
}
DialogExibicao.defaultProps = {
    sxContent: {}
}
//
DialogExibicao.propTypes = {
    /** Uma função de callback para fechar o dialog. Ela deve fazer com que o corpo seja null, false ou undefined */
    fecharDialogo: PropTypes.func,
    /** Determina se o Dialog deve abrir como slide (de baixo para cima). É mais um efeito. */
    comoSlide: PropTypes.bool,
    /** Um componente React para representar o corpo, ou null quando Dialog não deve ser exibido */
    corpo: PropTypes.node,
    /** Informa que o Dialog vai abrir com largura máxima (lg == 1200px) */
    larguraMaxima: PropTypes.bool,
    /** Informa que o Dialog vai ocupar toda a tabela da pagina. Isto funciona como sobreposição sobre o conteúdo principal */
    fullTela: PropTypes.bool,
}

export default memo( DialogExibicao );