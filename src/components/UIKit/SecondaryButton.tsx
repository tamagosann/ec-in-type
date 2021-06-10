import React, { FC } from 'react';
import { Button } from '@material-ui/core';

export type SecondaryButtonProps = {
    label: string
    onClick: () => void
    className?: string
}

const SecondaryButton: FC<SecondaryButtonProps> = (props) => {
    return (
        <Button className={props.className} variant="contained" color="secondary" onClick={props.onClick}>
            {props.label}
        </Button>
    )
};

export default SecondaryButton;