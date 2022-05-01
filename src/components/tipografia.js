import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@mui/material'

export const H6 = memo( (props)=>(
    <Typography variant='h6' align='center' {...props}>
        {props.children}
    </Typography>
) )
H6.propTypes = {
    /** Uma string que representa o conteudo da tipografia */
    children: PropTypes.string.isRequired,
}
export const H5 = memo( (props)=>(
    <Typography variant='h5' align='center' {...props}>
        {props.children}
    </Typography>
) )
export const H4 = memo( (props)=>(
    <Typography variant='h4' align='center' {...props}>
        {props.children}
    </Typography>
) )
export const H3 = memo( (props)=>(
    <Typography variant='h3' align='center' {...props}>
        {props.children}
    </Typography>
)) 
export const H2 = memo( (props)=>(
    <Typography variant='h2' align='center' {...props}>
        {props.children}
    </Typography>
) )
export const H1 = memo( (props)=>(
    <Typography variant='h1' align='center' {...props}>
        {props.children}
    </Typography>
))

export const Subtitle1 = memo( (props)=>(
    <Typography variant='subtitle1' align='center' {...props}>
        {props.children}
    </Typography>
) )

export const Subtitle2 = memo( (props)=>(
    <Typography variant='subtitle2' align='center' {...props}>
        {props.children}
    </Typography>
) )

export const Caption = memo( (props)=>(
    <Typography variant='caption' align='center' {...props}>
        {props.children}
    </Typography>
) )

export const Body1 = memo( (props)=>(
    <Typography variant='body1' {...props}>
        {props.children}
    </Typography>
) )

export const Body2 = memo( (props)=>(
    <Typography variant='body2' {...props}>
        {props.children}
    </Typography>
))