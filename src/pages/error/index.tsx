import { Link, styled } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Error = () => (
  <Wrap>
    <CustomIcon />
    <Message>Page Not Found</Message>
    <Description>
      The page you are looking for does not exist.
      <br />
      Here are some helpful links instead:
    </Description>
    <Links>
      <Link href="/development/user/management">User Management</Link>
      <Link href="/development/meta/management">Meta Management</Link>
      <Link href="/development/node/management">Node Management</Link>
      <Link href="/development/prominer/dependency">Dependency</Link>
    </Links>
  </Wrap>
);

export default Error;

const Wrap = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  height: 650,
});

const CustomIcon = styled(ErrorOutlineIcon)({
  width: 200,
  height: 200,
  color: '#5E82E0',
});

const Message = styled('div')({
  margin: 25,
  fontSize: 24,
  fontWeight: 700,
});

const Description = styled('div')({
  textAlign: 'center',
});

const Links = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginTop: 15,
});
