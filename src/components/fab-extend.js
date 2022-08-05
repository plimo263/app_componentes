import React from "react";
import PropTypes from "prop-types";
import { Stack, Fab, useMediaQuery, useTheme } from "@mui/material";
import Icone from "./icone";

const FabExtend = ({ onClick, title, text, color, icone }) => {
  const isMobile = useMediaQuery(useTheme()?.breakpoints?.down("md"));

  return (
    <Stack sx={{ my: 2 }} direction="row-reverse">
      <Fab
        color={color}
        title={title}
        size="medium"
        onClick={onClick}
        variant={isMobile ? "circular" : "extended"}
        sx={{
          position: { xs: "fixed", md: "static" },
          zIndex: 10,
          right: { xs: 16, md: 0 },
          bottom: { xs: 72, md: 0 },
        }}
      >
        <Icone icone={icone} />
        {!isMobile && text}
      </Fab>
    </Stack>
  );
};

FabExtend.defaultProps = {
  title: "Clique para incluir",
  text: "Adicionar",
  color: "primary",
  icone: "Add",
};

FabExtend.propTypes = {
  /** Um icone para representar o botao. Por default é um Add */
  icone: PropTypes.string,
  /** Uma funcao de callback  para acionar quando clicar no botao */
  onClick: PropTypes.func.isRequired,
  /** Um titulo para ser exibido quando o mouse pairar por cima do botão */
  title: PropTypes.string,
  /** Um texto para ser exibido, nestes casos em FAB extendido que é exibiido com computador */
  text: PropTypes.string,
  /** Uma cor de fundo para se usar no botao */
  color: PropTypes.string,
};

export default FabExtend;
