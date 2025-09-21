'use client'

import React from 'react'
import { SxProps, TextField, TextFieldProps } from '@mui/material'
import { Theme } from '@emotion/react'

interface InputUIProps extends Omit<TextFieldProps, 'variant'> {
    placeholder?: string
    value?: string
    variant?: 'standard' | 'filled' | 'outlined'
    sx?: SxProps<Theme>
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const InputUI: React.FC<InputUIProps> = ({
    placeholder,
    value,
    onChange,
    onKeyDown, // деструктурировали
    variant = 'outlined',
    sx,
}) => {
    return (
        <TextField
            variant={variant}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            fullWidth
            color="primary"
            inputProps={{
                onKeyDown,
            }}
            sx={{
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '#22c55e',
                        borderRadius: '10px',
                    },
                    '&:hover fieldset': {
                        borderColor: '#16a34a',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#16a34a',
                    },
                },
                ...sx,
            }}
        />
    )
}

export default InputUI
