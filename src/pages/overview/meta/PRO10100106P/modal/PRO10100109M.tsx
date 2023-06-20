import { useEffect, useState } from 'react';

import { Box, TextField } from '@mui/material';

import { CmButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';
import { CmUpload } from '@/components/atoms/CmUpload';

import { MetaApi } from '@/apis';
import { MetaDtos } from '@/types/dtos/MetaDtos';
import { notify } from '@/utils/notify';

import { CmTextAreaWrapper } from '../styled/CmTextAreaWrapper.styled';

type ImportExcelModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
  handleRefetch?: () => void;
};

export default function ImportExcelModal({ visible, handleSave, handleClose, handleRefetch }: ImportExcelModalProps) {
  // selected excel file
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // selected excel file success response
  const [metaResponse, setMetaResponse] = useState<MetaDtos[]>([]);

  //display content
  const [displayText, setDisplayText] = useState<string>('');

  //loading status
  const [isFetching, setIsFetching] = useState<boolean>(false);

  //handle close model
  const onCloseModal = async () => {
    handleClose();
    await handleRefetch?.();
  };
  // Import Excel File Change
  const handleImportExcelChange = (files: File) => {
    setMetaResponse([]);
    setDisplayText('');
    setSelectedFile(files);
  };

  // Import Excel File Execute
  const handleImportExcelFile = async () => {
    setIsFetching(true);
    if (selectedFile) {
      let base64String;
      const reader = new FileReader();
      reader.readAsArrayBuffer(selectedFile);
      reader.onload = await async function (e) {
        const bytes = new Uint8Array(reader?.result as any);
        let binary = '';
        for (let i = 0; i < bytes.length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        base64String = btoa(binary);
        const data = await MetaApi.MetaExcelUpload({
          filename: selectedFile?.name,
          creator: 'admin',
          contents: base64String,
        });
        if (data?.dto) {
          setMetaResponse(data?.dto?.MetaDto);
          notify.success('Upload Excel File Success!');
        } else {
          notify.error(data?.data?.exception?.name || 'Something went wrong');
        }
      };

      reader.onerror = (e: any) => {
        switch (e.target.error.code) {
          case e?.target?.error?.NOT_FOUND_ERR:
            notify.error('File Not Found !');
            break;
          case e?.target?.error?.NOT_READABLE_ERR:
            notify.error('File is not readable !');
            break;
          default:
            notify.error(e?.target?.error?.message || '');
        }
      };

      reader.onabort = (e) => {
        notify.warning('File load cancelled !');
      };
    }
    setIsFetching(false);
  };

  // Get Excel Sample
  const handleGetExcelSample = async () => {
    setIsFetching(true);
    const res = await MetaApi.MetaSampleFileGet();
    if (res?.length) {
      notify.success('Get Sample File Success!');
    } else {
      notify.error(res?.data?.exception?.name || 'Something went wrong');
    }
    setIsFetching(false);
  };

  //update display text after import excel success
  useEffect(() => {
    let temp = '';
    metaResponse.map((item) => {
      temp = temp + `${temp ? '\n' : ''}` + `${item?.logical_name}: ${item?.seq}`;
    });
    setDisplayText(temp);
  }, [metaResponse]);

  //Clear modal data
  useEffect(() => {
    if (!visible) {
      setSelectedFile(null);
      setMetaResponse([]);
      setDisplayText('');
    }
  }, [visible]);

  const footerRender = () => (
    <Box className="alignL">
      <CmButton
        id="rightBtn1"
        variant="text"
        btnTitle="Cancel"
        startIcon={<></>}
        className=""
        onClick={onCloseModal}
        disabled={isFetching}
      />
      <CmButton
        id="rightBtn2"
        variant="contained"
        btnTitle="OK"
        startIcon={<></>}
        className=""
        onClick={handleSave}
        disabled={isFetching}
      />
    </Box>
  );

  return (
    <CmModal
      title="Import Excel"
      visible={visible}
      onSave={handleSave}
      onClose={onCloseModal}
      className="medium"
      footerRenderAs={footerRender}
    >
      {/* contents */}
      <Box className="formBtw">
        <CmUpload onChange={handleImportExcelChange} />
        <span>
          <CmButton
            variant="contained"
            btnTitle="Add"
            onClick={handleImportExcelFile}
            disabled={!selectedFile}
          />
          <CmButton
            variant="contained"
            btnTitle="Excel Sample"
            onClick={handleGetExcelSample}
          />
        </span>
      </Box>
      <CmTextAreaWrapper>
        <TextField
          className="fullWidth"
          fullWidth
          multiline
          sx={{ display: 'flex', flex: 1, fontSize: '13px', color: 'black' }}
          minRows={4}
          value={displayText}
          disabled
        />
      </CmTextAreaWrapper>
    </CmModal>
  );
}
