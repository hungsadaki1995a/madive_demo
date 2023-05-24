import { Alert, styled } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { observer } from 'mobx-react';
import { useRef } from 'react';
import { useStore } from '@/utils';

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

  return (
    <>
      {AlertStore.open ? (
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
      )}
    </>
  );
};

export default observer(ApiAlert);
