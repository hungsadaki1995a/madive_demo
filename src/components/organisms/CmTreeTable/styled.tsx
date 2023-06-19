import { styled, TableCell, TableRow } from '@mui/material';

const TreeWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
}));

const ButtonWrapper = styled('div')(() => ({
  display: 'flex',
  margin: '16px 0',
}));

const TableRowStyled = styled(TableRow)(({ hasCursor }: { hasCursor?: boolean }) => ({
  cursor: hasCursor ? 'pointer' : 'default',
}));

const TableCellStyled = styled(TableCell)(({ depth = 0, width }: { depth?: number; width?: string }) => ({
  paddingLeft: depth * 16 + 'px',
  paddingRight: 0,
  width: width ? width : 'auto',
}));

const TableCellContentStyled = styled('div')(() => ({
  fontSize: 12,
  display: 'flex',
  alignItems: 'center',
}));

const ExpandsionIconWrapper = styled('div')(() => ({
  minHeight: 24,
  minWidth: 24,
}));

export { ButtonWrapper, ExpandsionIconWrapper, TableCellContentStyled, TableCellStyled, TableRowStyled, TreeWrapper };
