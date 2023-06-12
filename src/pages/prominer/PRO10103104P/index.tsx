import { Box, Paper, Stack, Typography } from '@mui/material';

import { CmButton, CmIconButton } from '@/components/atoms/CmButton';

import { ReactComponent as PagePrevIcon } from '@/stylesheets/images/PagePrevIcon.svg';
import { ProminerMethodDto } from '@/types/dtos/prominerDtos';

import { View } from '../PRO10103103P';
import { ProminerStyled } from '../Prominer.Styled';
import DataTable from './DataTable';

const ViewMethodDetail = ({
  handleChangeView,
  data,
}: {
  handleChangeView: (view: View) => void;
  data: ProminerMethodDto;
}) => {
  const { method_name, return_type, service_group_name, declaring_class, loc } = data;

  return (
    <ProminerStyled>
      <Paper className="detailBox">
        <Box
          className="pageTitle"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <CmIconButton
            iconName={<PagePrevIcon />}
            onClick={() => {
              handleChangeView(View.LIST);
            }}
          />
          {method_name}
        </Box>
        <Stack className="pageCon">
          <Box className="formInfo">
            <Paper className="infoBox">
              <figure>
                <span>Method Name</span>
                <figcaption>{method_name}</figcaption>
              </figure>
              <figure>
                <span>Return Type</span>
                <figcaption>{return_type}</figcaption>
              </figure>
              <figure>
                <span>Service Group Name</span>
                <figcaption>{service_group_name}</figcaption>
              </figure>
              <figure>
                <span>Class Name</span>
                <figcaption>{declaring_class}</figcaption>
              </figure>
            </Paper>
            {/* FormBox */}
            <Paper className="infoBox">
              <figure>
                <span>LOC</span>
                <figcaption>{loc}</figcaption>
              </figure>
            </Paper>
          </Box>
          <Box className="tableArea">
            <Typography>Relation</Typography>
            <Stack className="topBtn">
              <CmButton
                variant="text"
                className="tBtnBg"
                btnTitle="All"
              />
              <CmButton
                variant="text"
                className="tBtnBg"
                btnTitle="Backward"
              />
              <CmButton
                variant="outlined"
                btnTitle="Forward"
              />
            </Stack>
            <DataTable data={data} />
          </Box>
        </Stack>
      </Paper>
    </ProminerStyled>
  );
};
export default ViewMethodDetail;
