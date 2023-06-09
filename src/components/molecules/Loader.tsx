import { CircularProgress } from '@mui/material';

import { Wrapper } from './Loader.styled';

const Loader = () => {
  return (
    <Wrapper>
      <CircularProgress />
    </Wrapper>
  );
};

export default Loader;
