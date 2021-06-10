import React, { FC } from 'react';
import Textfield from '@material-ui/core/TextField';

export type TextInputProps = {
    fullWidth: boolean
    label: string
    multiline: boolean
    required: boolean
    rows: number
    value: string
    type: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const TextInput: FC<TextInputProps> = (props) => {
    return (
        <Textfield 
            fullWidth={props.fullWidth}
            label={props.label}
            margin='dense'
            multiline={props.multiline}
            required={props.required}
            rows={props.rows}
            value={props.value}
            type={props.type}
            onChange={props.onChange}
        />
    )
}

export default TextInput