import { Box, Grid, TextField } from '@mui/material';

import { CmButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';

import { FormElementType } from '@/constants/form';

import { testCaseDetailModalFields } from '../const';
import { ITestCaseDetail } from '../types';

type TestCaseDetailModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  testCaseDetail: ITestCaseDetail;
};

export default function TestCaseDetailModal({ isOpen, handleClose, testCaseDetail }: TestCaseDetailModalProps) {
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
    <CmModal
      title="Detail Test Case"
      visible={isOpen}
      onClose={handleClose}
      className="large"
      footerRenderAs={footerRender}
    >
      {/* contents */}
      <Grid
        container
        columnSpacing={4}
      >
        {testCaseDetailModalFields.map(({ fieldName, label, type }) => {
          return (
            <>
              {type === FormElementType.INPUT && (
                <Grid
                  item
                  key={fieldName}
                  xs={6}
                >
                  <label className="labelFormArea">
                    <span>{label}</span>
                    <TextField
                      className="labelTextField"
                      value={testCaseDetail[fieldName as keyof ITestCaseDetail]}
                      size="small"
                      disabled
                    />
                  </label>
                </Grid>
              )}
              {type === FormElementType.TEXTAREA && (
                <Grid
                  className="detailEditor"
                  item
                  key={fieldName}
                  xs={4}
                >
                  {label}
                  <TextField
                    value={testCaseDetail[fieldName as keyof ITestCaseDetail]}
                    multiline
                    disabled
                  />
                  {/* <TextareaAutosize
                      className="labelTextField"
                      value={testCaseDetail[fieldName as keyof ITestCaseDetail]}
                      disabled
                      minRows={5}
                      style={{
                        width: '100%',
                      }}
                    /> */}
                </Grid>
              )}
            </>
          );
        })}
      </Grid>
    </CmModal>
  );
}
