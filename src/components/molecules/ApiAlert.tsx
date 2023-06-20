import { useRef } from 'react';

import { Alert, Box, styled } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { observer } from 'mobx-react';

import { CmButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';

import { ReactComponent as ErrorIcon } from '@/stylesheets/images/SnackErrorIcon.svg';
import { ReactComponent as SuccessIcon } from '@/stylesheets/images/SnackSuccessIcon.svg';
import { useStore } from '@/utils';

import { apiResultTypes } from './const';

const CustomAlert = styled(Alert)({
  '@keyframes alertEffect': {
    '0%': {
      transform: 'translate(240px, -60px)',
    },
    '10%': {
      transform: 'translate(240px, 0px)',
    },
    '90%': {
      transform: 'translate(240px, 0px)',
    },
    '100%': {
      transform: 'translate(240px, -60px)',
    },
  },
  position: 'absolute',
  alignItems: 'center',
  top: 0,
  borderRadius: 0,
  width: 'calc(100vw - 272px)',
  height: 41,
  animation: 'alertEffect 2000ms',
  transform: 'translateY(-60px)',
  zIndex: 2000,
  '& .MuiAlert-message': {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  '& svg[data-testid="ErrorOutlineIcon"]': {
    color: '#d32f2f',
  },
  '& svg[data-testid="SuccessOutlinedIcon"]': {
    color: '#2e7d32',
  },
});

const useStyles = makeStyles(() => ({
  paused: {
    animationPlayState: 'paused',
  },
}));

const ApiAlert = () => {
  const alertRef = useRef<HTMLDivElement>(null);
  const classes = useStyles();
  const { AlertStore } = useStore();

  const handleMouseEvent = () => {
    alertRef.current?.classList.toggle(classes.paused);
  };

  const handleAnimationEnd = () => {
    AlertStore.resetApiAlert();
  };

  const handleClose = () => {
    AlertStore.resetApiAlert();
  };

  const titleRender = () => {
    switch (AlertStore.options.severity) {
      case apiResultTypes.SUCCESS:
        return (
          <>
            <SuccessIcon className="success" /> Success
          </>
        );
      case apiResultTypes.ERROR:
        return (
          <>
            <ErrorIcon className="error" /> Error
          </>
        );
      default:
        return null;
    }
  };

  const footerRender = () => (
    <Box className="alignL">
      <CmButton
        id="rightBtn2"
        variant="contained"
        btnTitle="OK"
        startIcon={<></>}
        className=""
        onClick={handleClose}
      />
    </Box>
  );

  return (
    <>
      {/* {AlertStore.open ? (
        <CustomAlert
          severity={AlertStore.options.severity}
          ref={alertRef}
          onMouseEnter={handleMouseEvent}
          onMouseLeave={handleMouseEvent}
          onAnimationEnd={handleAnimationEnd}
        >
          {AlertStore.options.message}
        </CustomAlert>
      ) : (
        <></>
      )} */}
      <CmModal
        title={titleRender()}
        visible={AlertStore.open}
        onClose={handleClose}
        className="medium"
        footerRenderAs={footerRender}
      >
        <p className="pointTxt">{AlertStore.options.message}</p>
      </CmModal>
    </>
  );
};

export default observer(ApiAlert);
