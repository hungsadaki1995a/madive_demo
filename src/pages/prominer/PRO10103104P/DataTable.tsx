import { useMemo } from 'react';

import { Paper } from '@mui/material';

import CommonTable from '@/components/organisms/CmCommonTable';
import { ICommonTableColumn } from '@/components/organisms/CmCommonTable/types';

import { ProminerMethodDto } from '@/types/dtos/prominerDtos';

function ViewResourceDetailDataTable({ data }: { data: ProminerMethodDto }) {
  const test = [data];
  const columnsConfig = useMemo<ICommonTableColumn<ProminerMethodDto>[]>(() => {
    return [
      {
        field: 'method_name',
        label: 'Method Name',
        type: 'text',
        sortable: true,
      },
      {
        field: 'class_name',
        label: 'Class Name',
        type: 'text',
        sortable: true,
      },
      {
        field: 'method_type',
        label: 'Class Type',
        type: 'text',
        sortable: true,
      },
    ];
  }, []);

  return (
    <Paper style={{ padding: '20px' }}>
      <CommonTable
        tableName="prominer-method-table"
        fieldAsRowId="email"
        columnsConfig={columnsConfig}
        rows={test}
        sortDefault={{
          field: 'logical_name',
          direction: 'asc',
        }}
      />
    </Paper>
  );
}
export default ViewResourceDetailDataTable;
