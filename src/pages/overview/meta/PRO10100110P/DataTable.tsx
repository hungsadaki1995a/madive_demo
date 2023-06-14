import { useMemo, useRef, useState } from 'react';

import { Box, Paper } from '@mui/material';
import { observer } from 'mobx-react';

import CommonTable from '@/components/organisms/CmCommonTable';
import { ICommonTableColumn, IFilterConfig, IPlainObject } from '@/components/organisms/CmCommonTable/types';

import { MetaHistoryApi } from '@/apis';
import { ReactComponent as DeleteIcon } from '@/stylesheets/images/DeleteIcon.svg';
import { MetaHistoryDto } from '@/types/dtos/metaHistoryDtos';
import { notify } from '@/utils/notify';

import DeleteMetaHistoryModal from './modal/DeleteMetaHistoryModal';

const columnsConfig: ICommonTableColumn<IPlainObject>[] = [
  {
    field: 'history_type',
    label: 'History Type',
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
    field: 'logical_name',
    label: 'Logical Name',
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
    field: 'length',
    label: 'Length',
    type: 'text',
    sortable: true,
  },
  {
    field: 'update_time',
    label: 'Update Time',
    type: 'text',
    sortable: true,
  },
  {
    field: 'modifier',
    label: 'Modifier',
    type: 'text',
    sortable: true,
  },
];

function MetaHistoryDataTable() {
  const [isDeleteMetaHistoryModalVisible, setIsDeleteMetaHistoryModalVisible] = useState<boolean>(false);
  const [selectList, setSelectList] = useState<MetaHistoryDto[]>([]);

  const handleDeleteMetaHistory = () => {
    selectList?.forEach(async (row) => {
      const res: any = await MetaHistoryApi.deleteList(row);
      if (res?.dto?.value === 'SUCCESS') {
        notify.success('Delete success');
        tableRef.current?.resetPageAndRefresh();
      } else {
        notify.error('Delete error!');
      }
    });
    setIsDeleteMetaHistoryModalVisible(false);
    setSelectList([]);
  };

  const handleDeleteMetaHistoryModalClose = () => {
    setIsDeleteMetaHistoryModalVisible(false);
  };

  const filterConfig = useMemo(() => {
    return {
      primaryActions: [
        {
          type: 'button',
          handleClick: (selectedRows: MetaHistoryDto[]) => {
            setSelectList(selectedRows);
            setIsDeleteMetaHistoryModalVisible(true);
            return;
          },
          checkDisabled: (selectedRows: MetaHistoryDto[]) => {
            return selectedRows?.length < 1;
          },
          config: {
            variant: 'contained',
            color: 'secondary',
            size: 'small',
            startIcon: <DeleteIcon />,
            label: 'Delete',
          },
        },
      ],
      advanceActions: [
        {
          type: 'filter',
          name: 'meta-history-filter',
          defaultValue: 'physical_name',
          options: [
            {
              label: 'Physical name',
              value: 'physical_name',
            },
            {
              label: 'History Type',
              value: 'history_type',
            },
            {
              label: 'Modifier',
              value: 'modifier',
            },
          ],
        },
      ],
    };
  }, []);
  const tableRef = useRef<any>();

  return (
    <Box>
      <Paper style={{ padding: '20px', marginTop: '30px' }}>
        <CommonTable<MetaHistoryDto>
          hasSelectionRows
          allowMultipleSelect={false}
          query={MetaHistoryApi.getList}
          tableName="meta-history-table"
          fieldAsRowId="history_id"
          columnsConfig={columnsConfig}
          filterConfig={filterConfig as unknown as IFilterConfig}
          sortDefault={{
            field: 'logical_name',
            direction: 'desc',
          }}
          ref={tableRef}
        />
        <DeleteMetaHistoryModal
          visible={isDeleteMetaHistoryModalVisible}
          handleSave={handleDeleteMetaHistory}
          handleClose={handleDeleteMetaHistoryModalClose}
        />
      </Paper>
    </Box>
  );
}
export default observer(MetaHistoryDataTable);
