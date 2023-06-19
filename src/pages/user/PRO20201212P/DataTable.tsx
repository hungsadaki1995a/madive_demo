import { Box, styled } from '@mui/material';
import { observer } from 'mobx-react';

import CommonTable from '@/components/organisms/CmCommonTable';
import { ICommonTableColumn, IPlainObject } from '@/components/organisms/CmCommonTable/types';

type propsType<TData extends IPlainObject> = {
  rows?: TData[];
  columnsConfig: ICommonTableColumn<TData>[];
  fieldAsRowId: string;
  paginationConfig?: any;
  onSelectedRows?: (selectedRows: any) => void;
  tableLabel?: string;
  tableName?: string;
};

const LabelStyled = styled('label')(() => ({
  fontSize: '15px',
  fontWeight: '400',
  lineHeight: '24px',
}));

function GroupRoleAssignDataTable<TData extends IPlainObject>(props: propsType<TData>) {
  const { rows, columnsConfig, fieldAsRowId, paginationConfig, onSelectedRows, tableLabel, tableName = '' } = props;

  return (
    <Box>
      <LabelStyled>{tableLabel}</LabelStyled>
      <CommonTable
        fieldAsRowId={fieldAsRowId}
        columnsConfig={columnsConfig}
        rows={rows}
        hasSelectionRows
        onSelectedRows={onSelectedRows}
        sortDefault={{
          field: fieldAsRowId,
          direction: 'asc',
        }}
        paginationConfig={paginationConfig}
      />
    </Box>
  );
}
export default observer(GroupRoleAssignDataTable);
