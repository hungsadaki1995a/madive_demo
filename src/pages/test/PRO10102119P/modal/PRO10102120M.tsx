import { useEffect, useState } from 'react';

import { TextareaAutosize } from '@material-ui/core';
import { Box, Grid, TextField } from '@mui/material';

import { CmButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';

import { TestCaseApi } from '@/apis';

import { FormElementType } from '@/constants/form';

import { testHistoryDetailDefault, testHistoryDetailModalFields } from '../const';
import { ITestHistoryDetail } from '../styles';

type ViewDetailModalProps = {
  dataRow: ITestHistoryDetail;
  visible: boolean;
  handleSave: () => void;
};

export default function ViewDetailModal({ dataRow, visible, handleSave }: ViewDetailModalProps) {
  const [dataTestCaseRscInfo, setDataTestCaseRscInfo] = useState<ITestHistoryDetail>(testHistoryDetailDefault);

  const getApiTestCaseRscInfo = async () => {
    const dataResponse = await TestCaseApi.getTestCaseResourceInfo({
      resource_id: dataRow.resource_id,
      node_id: dataRow.node_id,
    });
    const obj = Object.assign({}, dataResponse.dto, dataRow);
    setDataTestCaseRscInfo(obj);
  };
  useEffect(() => {
    if (visible) {
      getApiTestCaseRscInfo();
    }
  }, [visible]);
  const footerRender = () => (
    <Box className="alignL">
      <CmButton
        id="rightBtn2"
        variant="contained"
        btnTitle="OK"
        startIcon={<></>}
        className=""
        onClick={handleSave}
      />
    </Box>
  );

  return (
    <CmModal
      title="Detail Test History"
      visible={visible}
      onClose={handleSave}
      className="large"
      footerRenderAs={footerRender}
    >
      {/* contents */}
      <Grid
        container
        columnSpacing={4}
      >
        {testHistoryDetailModalFields.map(({ fieldName, label, type }) => {
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
                      value={dataTestCaseRscInfo[fieldName as keyof ITestHistoryDetail]}
                      size="small"
                      disabled
                    />
                  </label>
                </Grid>
              )}
              {type === FormElementType.TEXTAREA && (
                <Grid
                  item
                  key={fieldName}
                  xs={12}
                >
                  <label className="labelFormArea">
                    <span>{label}</span>
                  </label>
                  <TextareaAutosize
                    className="labelTextField"
                    value={dataTestCaseRscInfo[fieldName as keyof ITestHistoryDetail]}
                    disabled
                    minRows={5}
                    style={{
                      width: '100%',
                    }}
                  />
                </Grid>
              )}
            </>
          );
        })}
      </Grid>
    </CmModal>
  );
}
