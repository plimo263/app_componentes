import {
  Box,
  ButtonBase,
  Fab,
  Menu,
  MenuItem,
  Modal,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Picker, { SkinTones, Theme } from "emoji-picker-react";
import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Editor, createEditor, Transforms, Text } from "slate";
import {
  withReact,
  Slate,
  Editable,
  useSlate,
  useSelected,
  useFocused,
} from "slate-react";
import _ from 'lodash';
import { HistoryEditor, withHistory } from "slate-history";
import isUrl from "is-url";
import imageExtensions from "image-extensions";
import isHotkey from "is-hotkey";
import { blue, green, grey, purple, red, yellow } from "@mui/material/colors";
import Icone from "./icone";
import ZoomImage from "./zoom-image";
import { useToggle } from "react-use";

// Estilização do Paper que é a base do componente de edicao
const stylePaperEditor = {
  minHeight: "156px",
  width: "100%",
};
// Teclas de atalho para execução de recursos com combinação.
const HOTKEY_VALIDATOR = {
  ctrlB: (evt) => isHotkey("mod+b")(evt),
  ctrlI: (evt) => isHotkey("mod+i")(evt),
};
// Tamanho de fontes aceitas
const FONT_SIZE = {
  big: "big",
  normal: "normal",
  minimum: "minimum",
};
// Valor inicial
const initialValue = [{ type: "paragraph", children: [{ text: "" }] }];
// Comandos de customização para acionar formatações ao texto.
const CustomEditor = {
  isMarkActive(editor, typeMark) {
    let matchFunctionValidator;
    switch (typeMark) {
      case "italic": // Italico
        matchFunctionValidator = (n) => n.italic === true;
        break;
      case FONT_SIZE.big: // Texto tamanho grande
        matchFunctionValidator = (n) => n.fontSize === FONT_SIZE.big;
        break;
      case FONT_SIZE.minimum: // texto tamanho pequeno
        matchFunctionValidator = (n) => n.fontSize === FONT_SIZE.minimum;
        break;
      case FONT_SIZE.normal: // texto tamaho normal
        matchFunctionValidator = (n) => n.fontSize === FONT_SIZE.normal;
        break;
      default: // Bold
        matchFunctionValidator = (n) => n.bold === true;
        break;
    }
    // Verifica se deu match (se ja existe a propriedade para o componente)
    const [match] = Editor.nodes(editor, {
      match: matchFunctionValidator,
      universal: true,
    });
    return !!match;
  },
  toggleMarkActive(editor, typeMark) {
    // Ativa/desativa uma props  active
    const isActive = CustomEditor.isMarkActive(editor, typeMark);
    let objectMarkType;
    switch (typeMark) {
      case "italic":
        objectMarkType = { italic: isActive ? null : true };
        break;
      case FONT_SIZE.minimum:
        objectMarkType = { fontSize: isActive ? null : FONT_SIZE.minimum };
        break;
      case FONT_SIZE.normal:
        objectMarkType = { fontSize: isActive ? null : FONT_SIZE.normal };
        break;
      case FONT_SIZE.big:
        objectMarkType = { fontSize: isActive ? null : FONT_SIZE.big };
        break;
      default: // Bold
        objectMarkType = {
          bold: isActive ? null : true,
        };
        break;
    }
    //
    Transforms.setNodes(editor, objectMarkType, {
      match: (n) => Text.isText(n),
      split: true,
    });
  },
  isCodeActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "code",
    });
    return !!match;
  },
  toggleMarkCode(editor) {
    const isActive = CustomEditor.isCodeActive(editor);
    Transforms.setNodes(
      editor,
      {
        type: isActive ? "paragraph" : "code",
      }
    );
  },
  isHeadingActive(editor, typeHeading) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === typeHeading,
    });
    return !!match;
  },
  isQuote(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "quote",
    });

    return !!match;
  },
  toggleQuote(editor) {
    const isActive = CustomEditor.isQuote(editor);
    Transforms.setNodes(editor, {
      type: isActive ? "paragraph" : "quote",
    });
  },
  setHeading(editor, typeHeading) {
    const isActive = CustomEditor.isHeadingActive(editor, typeHeading);
    Transforms.setNodes(
      editor,
      {
        type: isActive ? "paragraph" : typeHeading,
      }
    );
  },
  isTextAlignActive(editor, typeAlign) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.textAlign === typeAlign,
    });

    return !!match;
  },
  toggleTextAlign(editor, typeAlign) {
    const isActive = CustomEditor.isTextAlignActive(editor, typeAlign);
    Transforms.setNodes(
      editor,
      {
        textAlign: isActive ? "inherit" : typeAlign,
      }      
    );
  },
  isColorActive(editor, color) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.color === color,
    });

    return !!match;
  },
  setColor(editor, color) {
    const isActive = CustomEditor.isColorActive(editor, color);
    Transforms.setNodes(
      editor,
      {
        color: isActive ? null : color,
      },
      {
        match: (n) => Text.isText(n),
        split: true,
      }
    );
  },
  isBackgroundColorActive(editor, color) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.backgroundColor === color,
    });

    return !!match;
  },
  setBackgroundColor(editor, color) {
    const isActive = CustomEditor.isBackgroundColorActive(editor, color);
    Transforms.setNodes(
      editor,
      {
        backgroundColor: isActive ? null : color,
      },
      {
        match: (n) => Text.isText(n),
        split: true,
      }
    );
  },
};
// Funcao que implementa no editor recursos para lidar com imagens
const withImages = (editor) => {
  const { insertData, isVoid } = editor;

  editor.isVoid = (element) => {
    return element.type === "image" ? true : isVoid(element);
  };

  editor.insertData = (data) => {
    const text = data.getData("text/plain");
    const { files } = data;

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split("/");

        if (mime === "image") {
          reader.addEventListener("load", () => {
            const url = reader.result;
            insertImage(editor, url);
          });

          reader.readAsDataURL(file);
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };
  return editor;
};
// Metodo que insere uma imagem no editor do slate
const insertImage = (editor, url) => {
  const text = { text: "" };
  const image = { type: "image", url, children: [text] };
  Transforms.insertNodes(editor, image);
  // Para criar uma quebra de linha apos inserção da foto
  Transforms.insertNodes(editor, {type: "paragraph", children: [text]});
};
// Verifica se a URL é de uma imagem
const isImageUrl = (url) => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split(".").pop();
  return imageExtensions.includes(ext);
};
//
// O componente de textRich de fato
function EditorTextRich({ sx, elevation, disabled, placeholder, error, onChange, defaultValue, isReadOnly }) {
  const [editor] = useState(() =>
    withImages(withHistory(withReact(createEditor())))
  );
  //
  const onKeyDown = useCallback(
    (event) => {
      if (HOTKEY_VALIDATOR.ctrlB(event)) {
        event.preventDefault();
        CustomEditor.toggleMarkActive(editor, "bold");
      } else if (HOTKEY_VALIDATOR.ctrlI(event)) {
        event.preventDefault();
        CustomEditor.toggleMarkActive(editor, "italic");
      }
    },
    [editor]
  );
  // Renderiza componentes de acordo com o type enviado
  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6":
        return <HeadingElement {...props} />;
      case "quote":
        return <QuoteElement {...props} />;
      case "image":
        return <ImageElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);
  // Leaf são as partes que são quebradas para aplicar estilo unico como bold ou italico
  const renderLeaf = useCallback((props) => {
    return <LeafElement {...props} />;
  }, []);
  // Se for somente leitura
  const valueSlate = defaultValue ? defaultValue : initialValue;
  //
  const onChangeTextRich = useCallback((value) => {
    const isAtChange = editor.operations.some(
      (op) => "set_selection" !== op.type
    );
    if (isAtChange) {
      
      if(onChange){
        
        onChange(value);
      }
      
    }
  }, [editor, onChange]);
  return (
    <>
    <Paper elevation={elevation} sx={{...stylePaperEditor, ...sx }}>
      <Slate
        onChange={onChangeTextRich}
        editor={editor}
        value={valueSlate}
      >
        {!isReadOnly && <ToolbarEditor />}
        <Stack sx={{ p: 2 }}>
          <Editable
            placeholder={placeholder}
            readOnly={isReadOnly}
            disabled={disabled}
            spellCheck={false}
            renderLeaf={renderLeaf}
            renderElement={renderElement}
            onKeyDown={onKeyDown}
          />
          
        </Stack>
      </Slate>
    </Paper>
    {error && <Typography sx={{my: 1}} component='p' align='right' variant='caption' color='error'>{error}</Typography> }
    </>
  );
}
// Barra de ferramentas do editor. Todos os recursos aqui.
const ToolbarEditor = () => {
  const editor = useSlate();
  const isDark = useTheme()?.palette.mode === 'dark';

  // Opções da barra de ferramentas
  const optionsButton = [
    {
      title: "Desfazer ctrl + z",
      isActive: false,
      icon: "Undo",
      onClick: () => {
        HistoryEditor.undo(editor);
      },
    },
    {
      title: "Refazer ctrl + y",
      isActive: false,
      icon: "Redo",
      onClick: () => {
        HistoryEditor.redo(editor);
      },
    },
    {
      title: "Citação de texto",
      isActive: CustomEditor.isQuote(editor),
      icon: "FormatQuote",
      onClick: () => {
        CustomEditor.toggleQuote(editor);
      },
    },
    {
      title: "Destaque em negrito",
      isActive: CustomEditor.isMarkActive(editor),
      icon: "FormatBold",
      onClick: () => {
        CustomEditor.toggleMarkActive(editor, "bold");
      },
    },
    {
      title: "Texto em itálico",
      isActive: CustomEditor.isMarkActive(editor, "italic"),
      icon: "FormatItalic",
      onClick: () => {
        CustomEditor.toggleMarkActive(editor, "italic");
      },
    },
    {
      title: "Informe que isto é um trecho de código",
      isActive: CustomEditor.isCodeActive(editor),
      icon: "Code",
      onClick: () => {
        CustomEditor.toggleMarkCode(editor);
      },
    },
    {
      title: "Alinhar texto á esquerda",
      isActive: CustomEditor.isTextAlignActive(editor, "left"),
      icon: "FormatAlignLeft",
      onClick: () => {
        CustomEditor.toggleTextAlign(editor, "left");
      },
    },
    {
      title: "Alinhar texto ao centro",
      isActive: CustomEditor.isTextAlignActive(editor, "center"),
      icon: "FormatAlignCenter",
      onClick: () => {
        CustomEditor.toggleTextAlign(editor, "center");
      },
    },
    {
      title: "Alinhar texto á direita",
      isActive: CustomEditor.isTextAlignActive(editor, "right"),
      icon: "FormatAlignRight",
      onClick: () => {
        CustomEditor.toggleTextAlign(editor, "right");
      },
    },
  ];
  //
  const styleToolbar = {
    mt: 1, width: "100%", background: theme=> isDark ? theme.palette.background.paper : grey[300] 
  };
  const styleButtonBar = (isActive) =>( {
    p: 0.5,
    border: `0.5px solid ${grey[isDark ? 800 : 100]}`,
    background: isActive ? ( isDark ? purple[500]  : grey[500] ) : null,
  });

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      sx={styleToolbar}
    >
      {optionsButton.map((ele, idx) => (
        <ButtonBase
          title={ele.title}
          sx={styleButtonBar(ele.isActive)}
          key={idx}
          onClick={ele.onClick}
        >
          <Icone icone={ele.icon} />
        </ButtonBase>
      ))}
      <MenuEmojiTypes />
      <MenuOptionColors />
      <MenuOptionColors isBackground />
      <MenuTitleFontTypes />
      <MenuTitleFontTypes isFontSize />
    </Stack>
  );
};
// Menu com as opcoes de emojis
const MenuEmojiTypes = () => {
  const isDark = useTheme()?.palette.mode === 'dark';
  const editor = useSlate();
  const [anchorEl, setAnchorEl] = useState();
  const isOpen = Boolean(anchorEl);
  const onViewMenu = useCallback(
    (event) => setAnchorEl(event.currentTarget),
    [setAnchorEl]
  );
  const onCloseMenu = useCallback(() => setAnchorEl(null), [setAnchorEl]);
  //
  const onSetEmoji = useCallback(
    (emoji) => {
      Editor.insertText(editor, emoji.emoji);

      onCloseMenu();
    },
    [editor, onCloseMenu]
  );

  return (
    <>
      <ButtonBase
        title="Definir tamanho da fonte para Titulo"
        sx={{
          p: 0.5,
          border: `0.5px solid ${grey[ isDark ? 800 : 100]}`,
        }}
        onClick={onViewMenu}
      >
        <Icone icone="InsertEmoticon" />
      </ButtonBase>
      <Menu open={isOpen} anchorEl={anchorEl} onClose={onCloseMenu}>
        <Picker
          theme={isDark && Theme.DARK}
          pickerStyle={{ width: "100%" }}
          disableSearchBar
          onEmojiClick={onSetEmoji}
          disableAutoFocus={true}
          skinTone={SkinTones}
          groupNames={{ smileys_people: "PEOPLE" }}
          native
        />
      </Menu>
    </>
  );
};
// Menu de tipos de fontes aceitas também com controle sobre fontes de tamanho variavel
const MenuTitleFontTypes = ({ isFontSize }) => {
  const isDark = useTheme()?.palette.mode === 'dark';
  const editor = useSlate();
  const [anchorEl, setAnchorEl] = useState();
  const isOpen = Boolean(anchorEl);
  // Para exibir o menu
  const onViewMenu = useCallback(
    (event) => setAnchorEl(event.currentTarget),
    [setAnchorEl]
  );
  // Fechar o menu
  const onCloseMenu = useCallback(() => setAnchorEl(null), [setAnchorEl]);
  // Definir o tipo de cabecalho
  const onSetHeadingType = useCallback(
    (headingType) => {
      // Se for uma definição de tamanhos de fonte é usando o MarkActive
      if (isFontSize) {
        CustomEditor.toggleMarkActive(editor, headingType);
      } else {
        // Caso contrario é um h*
        CustomEditor.setHeading(editor, headingType);
      }
      // Fecha o menu
      onCloseMenu();
    },
    [editor, onCloseMenu, isFontSize]
  );
  // Verifica se o h* esta selecionado
  const isHeadingActive = useCallback(
    (headingType) => {
      return CustomEditor.isHeadingActive(editor, headingType);
    },
    [editor]
  );
  // Menu de opções
  let optionHeadingTypes;
  let isTitleActive;

  if (isFontSize) {
    // Caso é tamanhos de fontes
    optionHeadingTypes = [
      {
        isActive: false,
        text: "Pequeno",
        onClick: () => onSetHeadingType(FONT_SIZE.minimum),
      },
      {
        isActive: false,
        text: "Normal",
        onClick: () => onSetHeadingType(FONT_SIZE.normal),
      },
      {
        isActive: false,
        text: "Grande",
        onClick: () => onSetHeadingType(FONT_SIZE.big),
      },
    ];
  } else {
    optionHeadingTypes = [
      {
        isActive: isHeadingActive("h1"),
        text: "H1",
        onClick: () => onSetHeadingType("h1"),
      },
      {
        isActive: isHeadingActive("h2"),
        text: "H2",
        onClick: () => onSetHeadingType("h2"),
      },
      {
        isActive: isHeadingActive("h3"),
        text: "H3",
        onClick: () => onSetHeadingType("h3"),
      },
      {
        isActive: isHeadingActive("h4"),
        text: "H4",
        onClick: () => onSetHeadingType("h4"),
      },
      {
        isActive: isHeadingActive("h5"),
        text: "H5",
        onClick: () => onSetHeadingType("h5"),
      },
      {
        isActive: isHeadingActive("h6"),
        text: "H6",
        onClick: () => onSetHeadingType("h6"),
      },
    ];
    isTitleActive = _.some(optionHeadingTypes, ele=> ele.isActive);
  }
  //
  const titleButtonBase = isFontSize
    ? "Escolher o tamanho do texto entre pequeno/médio e/ou grande."
    : "Definir tamanho da fonte para Titulo";
  //
  const styleButtonBase = {
    p: 0.5,
    border: `0.5px solid ${grey[isDark ? 800 : 100]}`,
    background: isTitleActive ? ( isDark ? purple[500]  : grey[500] ) : null,
  };
  //
  const iconButtonBase = isFontSize ? "FormatSize" : "Title";
  const styleButtonBar = (isActive) =>( {
    background: isActive ? ( isDark ? purple[500]  : grey[500] ) : null,
  });

  return (
    <>
      <ButtonBase
        title={titleButtonBase}
        sx={styleButtonBase}
        onClick={onViewMenu}
      >
        <Icone icone={iconButtonBase} />
      </ButtonBase>
      <Menu open={isOpen} anchorEl={anchorEl} onClose={onCloseMenu}>
        {optionHeadingTypes.map((ele, idx) => (
          <MenuItem
            onClick={ele.onClick}
            divider={idx < optionHeadingTypes.length - 1}
            key={idx}
            sx={styleButtonBar(ele.isActive)}
          >
            <Typography variant="body2">{ele.text}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
// Menu de opcoes para cores
const MenuOptionColors = ({ isBackground }) => {
  const isDark = useTheme()?.palette.mode === 'dark';
  const editor = useSlate();
  const [anchorEl, setAnchorEl] = useState();
  const isOpen = Boolean(anchorEl);
  const onViewMenu = useCallback(
    (event) => setAnchorEl(event.currentTarget),
    [setAnchorEl]
  );
  const onCloseMenu = useCallback(() => setAnchorEl(null), [setAnchorEl]);
  //
  const onSetColor = useCallback(
    (color) => {
      if (isBackground) {
        CustomEditor.setBackgroundColor(editor, color);
      } else {
        CustomEditor.setColor(editor, color);
      }
      onCloseMenu();
    },
    [isBackground, editor, onCloseMenu]
  );
  //
  const isColorActive = useCallback(
    (color) => {
      if (isBackground) {
        return CustomEditor.isBackgroundColorActive(editor, color);
      } else {
        return CustomEditor.isColorActive(editor, color);
      }
    },
    [editor, isBackground]
  );
  //
  const optionColors = [
    {
      isActive: isColorActive(blue[500]),
      color: blue[500],
      text: "Azul",
      onClick: () => onSetColor(blue[500]),
    },
    {
      isActive: isColorActive(green[500]),
      color: green[500],
      text: "Verde",
      onClick: () => onSetColor(green[500]),
    },
    {
      isActive: isColorActive(yellow[500]),
      color: yellow[500],
      text: "Amarelo",
      onClick: () => onSetColor(yellow[500]),
    },
    {
      isActive: isColorActive(red[500]),
      color: red[500],
      text: "Vermelho",
      onClick: () => onSetColor(red[500]),
    },
    {
      isActive: isColorActive("black"),
      color: "black",
      text: "Preto",
      onClick: () => onSetColor("black"),
    },
    {
      isActive: isColorActive("white"),
      color: "white",
      text: "Branco",
      onClick: () => onSetColor("white"),
    },
  ];
  //
  const titleButtonBaseColor = isBackground
    ? "Aplicar cor de fundo"
    : "Aplicar cor no texto";
  //
  const styleButtonBaseColor = {
    p: 0.5,
    border: `0.5px solid ${grey[isDark ? 800 : 100]}`,
  };
  //
  const iconButtonBaseColor = isBackground
    ? "FormatColorFill"
    : "FormatColorText";
  //
  const styleCircleIndicatorColor = {
    width: 16,
    height: 16,
    borderRadius: "100%",
  };
  //
  const styleButtonBar = (isActive) =>( {
    background: isActive ? ( isDark ? purple[500]  : grey[500] ) : null,
  });

  return (
    <>
      <ButtonBase
        title={titleButtonBaseColor}
        sx={styleButtonBaseColor}
        onClick={onViewMenu}
      >
        <Icone icone={iconButtonBaseColor} />
      </ButtonBase>
      <Menu open={isOpen} anchorEl={anchorEl} onClose={onCloseMenu}>
        {optionColors.map((ele, idx) => (
          <MenuItem
            onClick={ele.onClick}
            divider={idx < optionColors.length - 1}
            key={idx}
            sx={styleButtonBar(ele.isActive)}
          >
            <Stack sx={{ mx: 1 }} direction="row" spacing={1}>
              <Box
                sx={{ ...styleCircleIndicatorColor, background: ele.color }}
              />
              <Typography variant="body2">{ele.text}</Typography>
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
// Exibe blocos para preenchimento de codigo
const CodeElement = (props) => {
  const isDark = useTheme()?.palette.mode === 'dark';
  const backgroundPaper = useTheme()?.palette.background.paper;

  return (
  <pre
    {...props.attributes}
    style={{ background: isDark ? backgroundPaper : grey[300], padding: 4, borderRadius: 4 }}
  >
    <code>
      {">>>"} {props.children}
    </code>
  </pre>
)};
// Exibe os cabecalhos
const HeadingElement = (props) => {
  
  return (
  <Typography
    variant={props.element.type}
    {...props.attributes}
    align={props.element.textAlign}
  >
    {props.children}
  </Typography>
)
  };
// Citação de elemento
const QuoteElement = (props) => {
  const isDark = useTheme()?.palette.mode === 'dark';
  const backgroundPaper = useTheme()?.palette.background.paper;
  const styleBorderQuote = `4px solid ${grey[ isDark ? 800 : 400]}`; 

  const style = {
    backgroundColor: isDark ? backgroundPaper :  grey[300],
    color: grey[600],
    textAlign: props.element.textAlign,
    padding: "8px",
  };
  switch (props.element.textAlign) {
    case "right":
      style.borderRight = styleBorderQuote;
      break;
    default:
      style.borderLeft = styleBorderQuote;
      break;
  }
  return (
    <p {...props.attributes} style={style}>
      {props.children}
    </p>
  );
};
//Elemento default
const DefaultElement = (props) => (
  <Typography
    variant="body1"
    {...props.attributes}
    style={{
      textAlign: props.element.textAlign,
    }}
  >
    {props.children}
  </Typography>
);
// Componente para exibição de imagem
const ImageElement = ({ attributes, children, element }) => {
  const [zoomImage, toggleZoomImage] = useToggle();
  // Verificar se tem a props de alinhamento e alinhar de acordo
  const styleDiv = {
    display: "flex",
    cursor: 'pointer'
  };
  if (element.textAlign) {
    switch (element.textAlign) {
      case "center":
        styleDiv.justifyContent = "center";
        break;
      case "right":
        styleDiv.justifyContent = "flex-end";
        break;
      default:
        styleDiv.justifyContent = "flex-start";
        break;
    }
  }
  const selected = useSelected();
  const focused = useFocused();
  return (
    <>
      <Modal onBackdropClick={toggleZoomImage} sx={{ p: 1 }} open={zoomImage} onClose={toggleZoomImage}>
        <>
        <Fab title='Fechar Imagem maximizada' color="primary" onClick={toggleZoomImage} size="small" sx={{position: 'fixed', right: 16, top: 16}}>
          <Icone icone='Close' />
        </Fab>
        <ZoomImage src={element.url} alt="Imagem do formulario" />
        </>
      </Modal>
      <div {...attributes} title='Dê um duplo clique para maximizar'>
        {children}
        <div onDoubleClick={toggleZoomImage} contentEditable={false} style={styleDiv}>
          <img
            src={element.url}
            alt="Imagem do formulario"
            style={{
              display: "block",
              maxWidth: "100%",
              boxShadow: `${
                selected && focused ? "0 0 0 3px #B4D5FF" : "none"
              }`,
            }}
          />
        </div>
      </div>
    </>
  );
};
//
const LeafElement = (props) => {
  const formatFontSize = useCallback((format) => {
    switch (format) {
      case FONT_SIZE.big:
        return "1.75rem";
      case FONT_SIZE.minimum:
        return "0.75rem";
      default: // normal
        return null;
    }
  }, []);

  return (
    <span
      {...props.attributes}
      style={{
        background: props.leaf.backgroundColor,
        color: props.leaf.color,
        fontStyle: props.leaf.italic ? "italic" : "normal",
        fontWeight: props.leaf.bold ? "bold" : "normal",
        fontSize: formatFontSize(props.leaf.fontSize),
      }}
    >
      {props.children}
    </span>
  );
};
EditorTextRich.defaultProps = {
  sx: {},
  elevation: 3,
}
//
EditorTextRich.propTypes = {
  /** Defina a elevação do local onde o textRich esta sendo exibido */
  elevation: PropTypes.number,
  /** Define estilos a serem aplicados sobre o  textRich */
  sx: PropTypes.object,
  /** Uma função de callback que vai recebendo o conteudo do text-rich a medida que é editado */
  onChange: PropTypes.func,
  /** Um booleano que define se o RichText é somente para leitura */
  isReadOnly: PropTypes.bool,
  /** Um array do RichText que define o valor default. [{type: 'paragraph', children: [{text: ''}]}] */
  defaultValue: PropTypes.array,
  /** Um booleano que determina se o campo esta ativo ou não */
  disabled: PropTypes.bool,
  /** Um texto para preenchimento como dica */
  placeholder: PropTypes.string,
};
export default EditorTextRich;
