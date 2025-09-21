'use client'

import React from 'react'
import { Button as MUIButton, SxProps } from '@mui/material'
import { Theme } from '@emotion/react'

interface ButtonUIProps {
  text?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  sx?: SxProps<Theme>
}

const ButtonUI: React.FC<ButtonUIProps> = ({ text, onClick, sx }) => {
  return (
    <MUIButton
      variant="contained"
      fullWidth
      onClick={onClick}
      sx={{
        backgroundColor: '#22c55e', // Tailwind green-400
        '&:hover': {
          backgroundColor: '#16a34a', // Tailwind green-500
        },
        ...sx,
      }}
    >
      {text}
    </MUIButton>

  )
}

export default ButtonUI
