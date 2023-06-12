import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Box, Paper, TextField } from '@mui/material';
import { observer } from 'mobx-react';

import { CmButton } from '@/components/atoms/CmButton';
import CommonTable from '@/components/organisms/CmCommonTable';
import { ICommonTableColumn, IPlainObject } from '@/components/organisms/CmCommonTable/types';

import { DoInfoApi } from '@/apis';
import { DoInfoInput, FieldInfoDto } from '@/types/dtos/doInfoDto';
import { notify } from '@/utils/notify';

const DoInfoDataTable = observer(() => {
  const { register, handleSubmit } = useForm<DoInfoInput>();

  const [data, setData] = useState<FieldInfoDto[]>([]);

  const columnsConfig = useMemo<ICommonTableColumn<IPlainObject>[]>(() => {
    return [
      {
        field: 'seq',
        label: 'Seq',
        type: 'text',
        sortable: true,
      },
      {
        field: 'do_name',
        label: 'Do Name',
        type: 'text',
        sortable: true,
      },
      {
        field: 'depth',
        label: 'Depth',
        type: 'text',
        sortable: true,
      },
      {
        field: 'field_type',
        label: 'Field Type',
        type: 'text',
        sortable: true,
      },
      {
        field: 'logical_name',
        label: 'Logical Name',
        type: 'text',
        sortable: true,
      },
      {
        field: 'physical_name',
        label: 'Physical Name',
        type: 'text',
        sortable: true,
      },
      {
        field: 'length',
        label: 'Length',
        type: 'text',
        sortable: true,
      },
      {
        field: 'array',
        label: 'Array',
        type: 'text',
        sortable: true,
      },
      {
        field: 'comments',
        label: 'Comments',
        type: 'text',
        sortable: true,
      },
      {
        field: 'allow_null',
        label: 'Allow Null',
        type: 'text',
        sortable: true,
      },
      {
        field: 'default_value',
        label: 'Default Value',
        type: 'text',
        sortable: true,
      },
      {
        field: 'masking',
        label: 'Masking',
        type: 'text',
        sortable: true,
      },
      {
        field: 'decimal_size',
        label: 'Decimal Size',
        type: 'text',
        sortable: true,
      },
      {
        field: 'include_info',
        label: 'Include Info',
        type: 'text',
        sortable: true,
      },
    ];
  }, []);

  const onSubmit = async (formData: DoInfoInput) => {
    const res = await DoInfoApi.getDoInfo(formData);

    if (res?.dto?.result === 'Success') {
      setData(res?.dto?.FieldInfo);
    } else {
      notify.error(res?.dto?.result);
      setData([]);
    }
  };

  return (
    <Box>
      <Paper style={{ padding: '20px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label
            className="labelFormArea"
            style={{ padding: '20px' }}
          >
            <span style={{ padding: '20px' }}>Application</span>
            <TextField
              className="labelTextField"
              size="small"
              {...register('app_name')}
            />
          </label>
          <label
            className="labelFormArea"
            style={{ padding: '20px' }}
          >
            <span style={{ padding: '20px' }}>Service Group</span>
            <TextField
              className="labelTextField"
              size="small"
              {...register('sg_name')}
            />
          </label>
          <label
            className="labelFormArea"
            style={{ padding: '20px' }}
          >
            <span style={{ padding: '20px' }}>Physical Name</span>
            <TextField
              className="labelTextField"
              size="small"
              {...register('physical_name')}
            />
          </label>
          <CmButton
            btnTitle="Search"
            variant="contained"
            type="submit"
          />
        </form>
        <CommonTable<FieldInfoDto>
          tableName="node-management-table"
          fieldAsRowId="node_id"
          columnsConfig={columnsConfig}
          sortDefault={{
            field: 'seq',
            direction: 'asc',
          }}
          rows={data}
        />
      </Paper>
    </Box>
  );
});

export default DoInfoDataTable;
