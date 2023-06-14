/******************************************************
 * Program ID : src/pages/overview/AppSG.tsx
 * Program Name : App & SG
 * Create On : 2023.05.23
 * 개 요 : AppSG.tsx
 * ====================================================
 * 변경 이력     수정자      내용
 * ====================================================
 * 2023.05.23   김정아 차장   최초 작성
 ******************************************************/
import { useEffect, useRef, useState } from 'react';

import { Alert, Box, Button, IconButton, Snackbar } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { observer } from 'mobx-react';

import { CmCard, CmCardAdd } from '@/components/atoms/CmCard';
import Loader from '@/components/molecules/Loader';
import { CmPageTselectBtw } from '@/components/templates/CmPageTitle';
import CmSearch from '@/components/templates/CmSearch';

import * as CmStyle from '@/stylesheets/common';
import { ReactComponent as CloseIcon } from '@/stylesheets/images/SnackCloseIcon.svg';
import { ReactComponent as SuccessIcon } from '@/stylesheets/images/SnackSuccessIcon.svg';
import { IDialogBaseRef } from '@/types/common';
import { ApplicationDto } from '@/types/dtos/applicationDtos';
import { useStore } from '@/utils';

import { OverviewStyled } from '../Overview.Styled';
import DeleteModal from './modal/DeleteModal';
import CreateApplicationModal from './modal/PRO10100102M';
import EditApplicationModal from './modal/PRO10100103M';
import ServiceGroup from './modal/PRO10100104M';
import EditServiceGroupModal from './modal/PRO10100105M';

const useStyles = makeStyles(() => ({
  lbSnack: {
    '& .MuiPaper-root.MuiAlert-root': {
      width: '400px',
      height: '52px',
      alignItems: 'center',
      padding: '0 16px',
      margin: 0,
      // Icon
      '& .MuiAlert-icon': {
        width: '22px',
        justifyContent: 'center',
        marginRight: '8px',
      },

      // Message
      '& .MuiAlert-message': {
        width: 'calc(100% - 28px)',
        display: 'flex',
        alignItems: 'center',
        fontSize: '13px',
        fontFamily: CmStyle.notoSansDJKFont.regular,
        color: CmStyle.color.colorT04,

        '& .alignR.MuiBox-root': {
          display: 'flex',
          alignItems: 'center',
          '& button': {
            fontSize: '13px',
            fontFamily: CmStyle.notoSansDJKFont.regular,
            color: CmStyle.color.colorT01,
            textDecoration: 'underline',
            '&:hover': {
              background: 'none',
            },
          },
        },
      },

      // Success
      '&.MuiAlert-filledSuccess': {
        background: CmStyle.color.colorSuccessBg,
      },
      // Info
      '&.MuiAlert-filledInfo': {
        background: CmStyle.color.colorInfoBg,
      },
      // Warning
      '&.MuiAlert-filledWarning': {
        background: CmStyle.color.colorWarningBg,
      },
      // Error
      '& .MuiAlert-filledError': {
        background: CmStyle.color.colorErrorBg,

        '& .MuiAlert-message': {
          color: CmStyle.color.colorBg02,
        },
      },

      // Right Text
      '& .alignR.MuiBox-root button': {
        color: CmStyle.color.colorBg02,
      },
    },
  },
}));

const AppSG = observer(() => {
  const { ApplicationStore, AlertStore } = useStore();
  const classes = useStyles();
  const [isEditServiceGroupModalVisible, setIsEditServiceGroupModalVisible] = useState(false);
  const [isServiceGroup, setIsServiceGroup] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ApplicationDto>();
  const [isDelVisible, setIsDelVisible] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [data, setData] = useState<ApplicationDto[]>([]);
  const formDialogEdit = useRef<IDialogBaseRef>(null);
  const formDiaLogAdd = useRef<IDialogBaseRef>(null);
  const formDialogAddService = useRef<IDialogBaseRef>(null);
  const boardId = useRef();
  const [clickedItem, setClickedItem] = useState<ApplicationDto>();

  const handleReloadList = async () => {
    await ApplicationStore.loadApplicationList();
    setData(ApplicationStore.application);
  };

  const handleServiceGroupRegistrationModalOpen = () => {
    setIsServiceGroup(true);
  };

  const handleServiceGroupRegistrationModalClose = () => {
    setIsServiceGroup(false);
  };

  const handleInit = () => {
    boardId.current = undefined;
    setIsDelVisible(false);
    setIsServiceGroup(false);
  };

  const handleCreateApplicationModalOpen = () => {
    formDiaLogAdd?.current?.show();
  };

  const handleEditServiceGroupModalClose = () => {
    setIsEditServiceGroupModalVisible(false);
  };

  const handleModify = (e: string, item: ApplicationDto) => {
    setSelectedItem(item);
    if (e === 'I' || e === 'E') {
      formDialogEdit?.current?.show();
    } else {
      setIsDelVisible((prev) => !prev);
    }
  };

  const handleSave = async () => {
    ApplicationStore.loadApplicationList();
    formDialogAddService.current?.hide();
    handleInit();
  };

  const handleClose = () => {
    formDialogAddService.current?.hide();
    handleInit();
  };

  const handleSnackBarClose = () => {
    setSuccessOpen(!successOpen);
  };

  useEffect(() => {
    if (ApplicationStore.application.length) {
      setData(ApplicationStore.application);
    }
  }, [ApplicationStore.application]);

  return (
    <OverviewStyled>
      <CmSearch />
      <CmPageTselectBtw total={data.length} />
      <Box className="cardArea">
        {ApplicationStore.isLoading ? (
          <Loader />
        ) : (
          <>
            {data.map((card, index) => (
              <CmCard
                data={card}
                key={index}
                onClick={(e) => {
                  handleModify(e, card);
                }}
                onItemClick={() => {
                  setClickedItem(card);
                  handleServiceGroupRegistrationModalOpen();
                }}
              />
            ))}
            <CmCardAdd onClick={handleCreateApplicationModalOpen} />
          </>
        )}
      </Box>
      <EditApplicationModal
        data={selectedItem}
        formDialogLargeRef={formDialogEdit}
        resetList={handleReloadList}
      />
      <CreateApplicationModal
        resetList={handleReloadList}
        formDiaLogAdd={formDiaLogAdd}
      />
      <DeleteModal
        data={selectedItem}
        visible={isDelVisible}
        handleSave={handleSave}
        handleClose={handleClose}
      />
      <ServiceGroup
        clickedItem={clickedItem}
        visible={isServiceGroup}
        handleSave={handleSave}
        handleClose={handleServiceGroupRegistrationModalClose}
      />
      <EditServiceGroupModal
        visible={isEditServiceGroupModalVisible}
        handleSave={handleSave}
        handleClose={handleEditServiceGroupModalClose}
      />
      <Snackbar
        className={classes.lbSnack}
        open={successOpen}
        autoHideDuration={993000}
        onClose={handleSnackBarClose}
      >
        <Alert
          icon={<SuccessIcon />}
          variant="filled"
          severity="success"
        >
          The save was success
          <Box className="alignR">
            <Button variant="text">txt-txt</Button>
            <IconButton onClick={handleSnackBarClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Alert>
      </Snackbar>
    </OverviewStyled>
  );
});

export default AppSG;
