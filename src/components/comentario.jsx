import React, { useRef, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { IconButton, Stack, TextField, Collapse } from "@mui/material";
import Picker, { SkinTones } from "emoji-picker-react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";
import { useClickAway } from "react-use";

// Componente que cria um painel para insercao/edicao de comentario
const Comentario = ({ enviarComEnter, onEnviarComentario, placeholder }) => {
  const refEmoji = useRef(null);

  const [verPainelEmoji, setVerPainelEmoji] = useState(false);
  const [comentario, setComentario] = useState("");
  // Cria uma funcao para registrar o emoji no corpo do comentario
  const fnRegistraEmoji = (e, emoji) => {
    //setVerPainelEmoji(false);
    setComentario((state) => state + e.emoji);
  };
  // Cria uma funcao que vai registrar o comentario do feed do usuario
  const fnEnviarComentario = () => {
    // const obj = { comentario };
    if (comentario && comentario.length > 0) {
      onEnviarComentario(comentario);
    }
    // Limpar o comentario e fechar painel de emojis (caso aberto)
    setVerPainelEmoji(false);
    setComentario("");
  };
  // Quando o painel do emoji esta aberto mas não mais no foco fecha-o
  useClickAway(refEmoji, () => {
    setVerPainelEmoji(false);
  });
  //
  const fnOnChange = useCallback(
    (e) => {
      if (e.target.value?.split("").pop() !== "\n") {
        setComentario(e.target.value);
      }
    },
    [setComentario]
  );
  const fnKeyUp = useCallback(
    (e) => {
      if (e.key?.toLowerCase() === "enter" && enviarComEnter) {
        if (comentario?.length > 0 && comentario !== "\n") {
          onEnviarComentario(comentario);
          // Limpar o comentario e fechar painel de emojis (caso aberto)
          setVerPainelEmoji(false);
          setComentario("");
        }
      }
    },
    [
      comentario,
      setComentario,
      setVerPainelEmoji,
      onEnviarComentario,
      enviarComEnter,
    ]
  );

  return (
    <Stack>
      <Collapse ref={refEmoji} in={verPainelEmoji} timeout="auto" unmountOnExit>
        <Stack direction="row" justifyContent="center">
          <Picker
            pickerStyle={{ width: "100%" }}
            disableSearchBar
            onEmojiClick={fnRegistraEmoji}
            disableAutoFocus={true}
            skinTone={SkinTones}
            groupNames={{ smileys_people: "PEOPLE" }}
            native
          />
        </Stack>
      </Collapse>
      <Stack direction="row">
        <IconButton onClick={() => setVerPainelEmoji(!verPainelEmoji)}>
          <EmojiEmotionsIcon color={verPainelEmoji ? "primary" : "default"} />
        </IconButton>
        <TextField
          variant="standard"
          fullWidth
          type="textarea"
          placeholder={placeholder}
          multiline
          value={comentario}
          onChange={fnOnChange}
          onKeyUp={fnKeyUp}
        />
        <IconButton
          disabled={comentario?.length < 1}
          onClick={fnEnviarComentario}
        >
          <SendIcon color={comentario?.length < 1 ? "default" : "primary"} />
        </IconButton>
      </Stack>
    </Stack>
  );
};

Comentario.propTypes = {
  /** Uma props que determina se o comentario deve ser enviado somente com o pressionamento da tecla enter. */
  enviarComEnter: PropTypes.bool,
  /** Uma função de callback responsavel por receber o comentario */
  onEnviarComentario: PropTypes.func.isRequired,
  /** Texto explicativo do que o campo espera */
};

Comentario.defaultProps = {
  enviarComEnter: false,
  onEnviarComentario: () => {},
  placeholder: "Digite seu comentário",
};

export default Comentario;
