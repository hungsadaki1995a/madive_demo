import React, { useImperativeHandle, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Breakpoint, Dialog, DialogContent, Grid, IconButton } from '@mui/material';

import { IDialogBaseRef } from '@/types/common';

import { DialogTitleStyled } from '../atoms/Atoms.Styled';

type FormDialogProps = {
  title: string;
  children: React.ReactNode;
  width?: Breakpoint;
};

function CmFormDialog({ title, children, width }: FormDialogProps, ref: React.Ref<IDialogBaseRef>) {
  const [open, setOpen] = useState(false);
  const [showAt, setShowAt] = useState<number>(new Date().getTime());

  const handleOpen = () => {
    setShowAt(new Date().getTime());
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      maxWidth={width || 'sm'}
      fullWidth
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
      <DialogContent key={`form-dialog-${showAt}`}>{children}</DialogContent>
    </Dialog>
  );
}

export default React.forwardRef(CmFormDialog);
