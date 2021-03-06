import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
    Dialog as DialogMUI,
    DialogContent,
    IconButton,
    DialogTitle, Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ModalProps } from '@mui/material/Modal';

const BootstrapDialog = styled(DialogMUI)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    children?: React.ReactNode;
    onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const {children, onClose} = props;

    return (
        <DialogTitle sx={{m: 0, p: 2}}>
            {children}
            {onClose ? (
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 12,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            ) : null}
            <Divider sx={{py: 1}}/>
        </DialogTitle>
    );
};

interface Props {
    open: boolean;
    onClose: () => void;
    title: string;
}

export const Dialog: React.FC<Props> = ({open, onClose, title, children}) => {
    return (
        <BootstrapDialog onClose={(e: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
            if (reason !== 'backdropClick') {
                onClose();
            }
        }} open={open} fullWidth maxWidth="lg">
            <BootstrapDialogTitle onClose={onClose}>
                {title}
            </BootstrapDialogTitle>
            <DialogContent>{children}</DialogContent>
        </BootstrapDialog>
    );
};
