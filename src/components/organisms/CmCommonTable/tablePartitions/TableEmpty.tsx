import { Stack, TableCell, TableRow } from '@mui/material';

const TableEmpty = () => {
  return (
    <TableRow>
      <TableCell colSpan={12}>
        <Stack
          direction="column"
          margin={3}
          justifyContent="center"
          alignItems="center"
        >
          <div>No resources were created.</div>
          <div>Try creating a new resource.</div>
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default TableEmpty;
