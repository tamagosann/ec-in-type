import React, { FC } from 'react';
import { Button } from '@material-ui/core';

export type PrimaryButtonProps = {
    label: string
    onClick?: () => void
    className?: string
}

const PrimaryButton: FC<PrimaryButtonProps> = (props) => {
    return (
        <Button className={props.className} variant="contained" color="primary" onClick={props.onClick}>
            {props.label}
        </Button>
    )
};

export default PrimaryButton;