/******************************************************
 * Program ID : src/pages/user/PRO20201212P.tsx
 * Program Name : Group-Role Assign
 * Create On : 2023.05.31
 * 개 요 : PRO20201212P.tsx
 * ====================================================
 * 변경 이력     수정자      내용
 * ====================================================
 * 2023.05.31   김정아 차장   최초 작성
 ******************************************************/
import { Box, Grid, Paper, Typography } from '@mui/material';

// Common Atoms
import { CmButton } from '@/components/atoms/CmButton';
// Templates
import { CmPageTselectColum } from '@/components/templates/CmPageTitle';

// Icon
// import { ReactComponent as arrLeftIcon } from '@/stylesheets/images/arrLeftIcon.svg';
// import { ReactComponent as arrRightIcon } from '@/stylesheets/images/arrRightIcon.svg';
import { UserStyled } from './User.Styled';

type propsType = {
  title: string;
};

function GroupRoleAssign(props: propsType) {
  const { title } = props;
  const customList = () => (
    <Box sx={{ width: 600, height: 230, overflow: 'auto' }}>
      <Typography>Table Title Area</Typography>
      Table List Area
    </Box>
  );
  return (
    <UserStyled>
      {/* {title} */}
      <CmPageTselectColum />

      <Paper className="transferBox">
        <Grid
          container
          className="transferGrid"
        >
          <Grid item>{customList()}</Grid>
          <Grid className="btnCenter">
            <Grid
              container
              direction="column"
              alignItems="center"
            >
              <CmButton
                variant="contained"
                // startIcon={<arrLeftIcon />}
                btnTitle="Add Role"
              />
              <CmButton
                variant="contained"
                // startIcon={<arrRightIcon />}
                btnTitle="Delete Role"
              />
            </Grid>
          </Grid>
          <Grid item>{customList()}</Grid>
        </Grid>

        <Box className="flexEnd">
          <CmButton
            variant="contained"
            btnTitle="Save"
          />
        </Box>
      </Paper>
    </UserStyled>
  );
}
export default GroupRoleAssign;
