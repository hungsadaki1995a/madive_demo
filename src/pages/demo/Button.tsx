/******************************************************
 * Program ID : src/pages/demo/Button.tsx
 * Program Name : 공통 버튼 참고 페이지
 * Create On : 2023.05.09
 * 개 요 : 공통 버튼 참고 페이지
 * ====================================================
 * 변경 이력     수정자      내용
 * ====================================================
 * 2023.05.09   김정아 차장   최초 작성
 ******************************************************/
import FilterAltIcon from '@mui/icons-material/FilterAltOutlined';
// img, icon
import StarsIcon from '@mui/icons-material/StarsOutlined';
import UploadIcon from '@mui/icons-material/UploadOutlined';
import { Paper, Stack } from '@mui/material';

// Common Atoms
import { CmButton, CmIconButton } from '@/components/atoms/CmButton';
import { CmPageTitle } from '@/components/templates/CmPageTitle';
// Templates
import CmSearch from '@/components/templates/CmSearch';

import { ReactComponent as DeleteIcon } from '@/stylesheets/images/cmCardDelIcon.svg';
import { ReactComponent as EditIcon } from '@/stylesheets/images/cmCardEditIcon.svg';
import { ReactComponent as LogoutIcon } from '@/stylesheets/images/logout.svg';

import { ButtonStyled } from './CmCpst.Styled';

function Button() {
  return (
    <ButtonStyled>
      {/* Search */}
      <CmSearch />

      {/* SubTitle */}
      <CmPageTitle />

      {/* ButtonComponent */}
      <Paper>
        <p>Primary - Filled / Disable </p>
        <Stack
          direction="row"
          spacing={2}
        >
          <label>CmButton - Icon + Title</label>
          <CmButton
            variant="contained"
            startIcon={<StarsIcon />}
            btnTitle="Contained"
          />
          <CmButton
            variant="contained"
            startIcon={<StarsIcon />}
            btnTitle="Contained"
            disabled
          />
        </Stack>
        <Stack
          direction="row"
          spacing={2}
        >
          <label>CmButton - Title</label>
          <CmButton
            variant="contained"
            btnTitle="Contained"
          />
          <CmButton
            variant="contained"
            btnTitle="Contained"
            disabled
          />
        </Stack>
        <Stack
          direction="row"
          spacing={2}
        >
          <label>CmButton - Icon</label>
          <CmButton
            variant="contained"
            startIcon={<StarsIcon />}
          />
          <CmButton
            variant="contained"
            startIcon={<StarsIcon />}
            disabled
          />
        </Stack>
      </Paper>

      <Paper>
        <p>Text - Ghost / Disable (No Background)</p>
        <Stack
          direction="row"
          spacing={2}
        >
          <label>CmButton - Icon + Title</label>
          <CmButton
            variant="text"
            startIcon={<UploadIcon />}
            btnTitle="Text"
          />
          <CmButton
            variant="text"
            startIcon={<UploadIcon />}
            btnTitle="Text"
            disabled
          />
        </Stack>
        <Stack
          direction="row"
          spacing={2}
        >
          <label>CmButton - Title</label>
          <CmButton
            variant="text"
            btnTitle="Text"
          />
          <CmButton
            variant="text"
            btnTitle="Text"
            disabled
          />
        </Stack>
        <Stack
          direction="row"
          spacing={2}
        >
          <label>CmButton - Icon</label>
          <CmButton
            variant="text"
            startIcon={<UploadIcon />}
          />
          <CmButton
            variant="text"
            startIcon={<UploadIcon />}
            disabled
          />
        </Stack>
        <Stack
          direction="row"
          spacing={2}
        >
          <label>CmIconButton - Icon</label>
          <CmIconButton iconName={<EditIcon />} />
          <CmIconButton
            iconName={<DeleteIcon />}
            disabled
          />
        </Stack>
      </Paper>

      <Paper>
        <p>Text .tBtnBg - Ghost / Disable (Background)</p>
        <Stack
          direction="row"
          spacing={2}
        >
          <label>CmButton - Icon + Title</label>
          <CmButton
            variant="text"
            className="tBtnBg"
            startIcon={<FilterAltIcon />}
            btnTitle="String"
          />
          <CmButton
            variant="text"
            className="tBtnBg"
            startIcon={<FilterAltIcon />}
            btnTitle="String"
            disabled
          />
        </Stack>
        <Stack
          direction="row"
          spacing={2}
        >
          <label>CmButton - Title</label>
          <CmButton
            variant="text"
            className="tBtnBg"
            btnTitle="String"
          />
          <CmButton
            variant="text"
            className="tBtnBg"
            btnTitle="String"
            disabled
          />
        </Stack>
        <Stack
          direction="row"
          spacing={2}
        >
          <label>CmButton - Icon</label>
          <CmButton
            variant="text"
            className="tBtnBg"
            startIcon={<FilterAltIcon />}
          />
          <CmButton
            variant="text"
            className="tBtnBg"
            startIcon={<FilterAltIcon />}
            disabled
          />
        </Stack>
      </Paper>

      <Paper>
        <p>Outline - Login button / Disable</p>
        <Stack
          direction="row"
          spacing={2}
        >
          <label>CmButton - Icon + Title</label>
          <CmButton
            variant="outlined"
            startIcon={<LogoutIcon />}
            btnTitle="Outline"
          />
          <CmButton
            variant="outlined"
            startIcon={<LogoutIcon />}
            btnTitle="Outline"
            disabled
          />
        </Stack>
        <Stack
          direction="row"
          spacing={2}
        >
          <label>CmButton - Title</label>
          <CmButton
            variant="outlined"
            btnTitle="Outline"
          />
          <CmButton
            variant="outlined"
            btnTitle="Outline"
            disabled
          />
        </Stack>
        <Stack
          direction="row"
          spacing={2}
        >
          <label>CmButton - Icon</label>
          <CmButton
            variant="outlined"
            startIcon={<LogoutIcon />}
          />
          <CmButton
            variant="outlined"
            startIcon={<LogoutIcon />}
            disabled
          />
        </Stack>
      </Paper>
    </ButtonStyled>
  );
}
export default Button;
