import React from "react";
import PropTypes from "prop-types";
import Icone from "./icone";
import { Stack, Fab } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useToggle } from "react-use";
// Rotacionar icone
const rotate90 = {
  initial: {
    transform: "rotate(0deg)",
  },
  animate: {
    transform: "rotate(135deg)",
  },
};
const animateScale = {
  initial: {
    scale: 0.01,
  },
  animate: {
    scale: 1,
  },
  exit: {
    scale: 0.01,
  },
};

const FabMotion = motion(Fab);
const StackMotion = motion(Stack);

function FabMulti({ color, icon, fabs }) {
  const [toggle, setToggle] = useToggle(null);

  return (
    <StackMotion
      alignItems="center"
      spacing={1}
      sx={{ position: "fixed", bottom: 72, right: 16 }}
    >
      <AnimatePresence>
        {toggle && (
          <>
            {fabs.map((ele, idx) => (
              <FabMotion
                {...animateScale}
                onClick={ele.onClick}
                color={ele.color || color}
                key={idx}
                size="small"
              >
                <Icone icone={ele.icon} />
              </FabMotion>
            ))}
          </>
        )}
      </AnimatePresence>
      <FabMotion
        sx={toggle ? { boxShadow: "none" } : {}}
        key="fab"
        disableRipple
        initial={rotate90.initial}
        animate={toggle ? rotate90.animate : {}}
        color={color}
        size="medium"
        onClick={setToggle}
      >
        <Icone icone={icon} />
      </FabMotion>
    </StackMotion>
  );
}

FabMulti.defaultProps = {
  icon: "Add",
  color: "success",
};

FabMulti.propTypes = {
  /** Representa o icone do botão de expansão principal */
  icon: PropTypes.string,
  /** Representa a cor default do botão principal */
  color: PropTypes.oneOf([
    "default",
    "error",
    "inherit",
    "primary",
    "secondary",
    "success",
    "warning",
    "info",
  ]),
  /** Um array que representa props dos fabs que serão montados quando o botão FAB principal for clicado */
  fabs: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      title: PropTypes.string,
      onClick: PropTypes.func.isRequired,
      sx: PropTypes.object,
      color: PropTypes.oneOf([
        "default",
        "error",
        "inherit",
        "primary",
        "secondary",
        "success",
        "warning",
        "info",
      ]),
    })
  ).isRequired,
};

export default FabMulti;
