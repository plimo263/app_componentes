import * as MuiIcons from '@mui/icons-material';
import React from 'react';

export default function Icone(props){
    const Icon = MuiIcons[props.icone];
    if(!Icon) return <p>None</p>;

    return React.createElement(Icon, {...props});
}