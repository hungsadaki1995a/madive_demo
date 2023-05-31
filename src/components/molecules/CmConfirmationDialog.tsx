import React, { useImperativeHandle, useRef, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, Grid, IconButton } from '@mui/material';

import { IDialogBaseRef } from '@/types/common';

import { DialogTitleStyled } from '../atoms/Atoms.Styled';
import { CmButton } from '../atoms/CmButton';

type ConfirmationDialogProps = {
  title: string;
  confirmedLabel: string;
  cancelLabel: string;
  children: React.ReactNode;
};
type CallbackType = () => void;

const CmConfirmationDialog = (
  { title, confirmedLabel, cancelLabel, children }: ConfirmationDialogProps,
  ref: React.Ref<IDialogBaseRef>
) => {
  const [open, setOpen] = useState(false);
  const callbackRef = useRef<CallbackType>();

  const handleOpen = (callbackFn?: () => void) => {
    setOpen(true);
    callbackRef.current = callbackFn;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    callbackRef.current?.();
    handleClose();
  };

  useImperativeHandle(ref, () => {
    return {
      show: handleOpen,
      hide: handleClose,
    };
  });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitleStyled>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {title}
          <IconButton
            aria-label="close"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </Grid>
      </DialogTitleStyled>
      <DialogContent>
        {children}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CmButton
            variant="text"
            onClick={handleClose}
            btnTitle={cancelLabel}
          />
          <CmButton
            variant="contained"
            onClick={handleConfirm}
            btnTitle={confirmedLabel}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default React.forwardRef(CmConfirmationDialog);
