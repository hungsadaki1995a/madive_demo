import { useMemo, useRef, useState } from 'react';

import { Box } from '@mui/material';
import { observer } from 'mobx-react';

import CommonTable from '@/components/organisms/CmCommonTable';
import { FilterTypes } from '@/components/organisms/CmCommonTable/const';
import {
  ICommonTableColumn,
  IFilterConfig,
  SearchServerConfig,
  TableViewState,
} from '@/components/organisms/CmCommonTable/types';

import { MetaHistoryApi } from '@/apis';
import { ReactComponent as DeleteIcon } from '@/stylesheets/images/DeleteIcon.svg';
import { IPlainObject } from '@/types/common';
import { MetaHistoryDto } from '@/types/dtos/metaHistoryDtos';
import useApiQuery from '@/utils/hooks/useApiQuery';
import { notify } from '@/utils/notify';

import { MetaHistoryEndPoint } from '@/constants/apiEndpoint';

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

const searchServerConfig: SearchServerConfig = {
  fieldOptions: [
    {
      label: 'Physical Name',
      fieldName: 'physical_name',
      type: FilterTypes.TEXT,
    },
    {
      label: 'History Type',
      fieldName: 'history_type',
      type: FilterTypes.DROPDOWN,
      options: [
        { label: 'CREATE', value: 'CREATE' },
        { label: 'UPDATE', value: 'UPDATE' },
        { label: 'DELETE', value: 'DELETE' },
      ],
    },
    {
      label: 'Modifier',
      fieldName: 'modifier',
      type: FilterTypes.TEXT,
    },
  ],
};

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
            size: 'small',
            startIcon: <DeleteIcon />,
            label: 'Delete',
          },
        },
      ],
    };
  }, []);
  const tableRef = useRef<any>();

  const {
    request,
    isLoading,
    data: metaHistoryList,
  } = useApiQuery<MetaHistoryDto[]>({
    endpoint: MetaHistoryEndPoint.metaHistory,
    map: (response) => {
      return response?.dto?.MetaDto || [];
    },
  });

  const requestGetMetaHistoryList = (tableState: TableViewState) => {
    const conditionDto = Object.entries(tableState.filter.server).map(([key, value]) => ({ key, value }));
    const payload = {
      pageInfoDto: {
        pageNum: 1,
        pageLength: -1,
      },
      sort: true,
      sortField: tableState?.sortBy?.field || 'physical_name',
      sortingType: tableState?.sortBy?.direction?.toUpperCase() || 'DESC',
      conditionDto: conditionDto,
    };
    request(payload);
  };

  return (
    <Box>
      <CommonTable<MetaHistoryDto>
        hasSelectionRows
        allowMultipleSelect={false}
        fieldAsRowId="history_id"
        searchServerConfig={searchServerConfig}
        columnsConfig={columnsConfig}
        filterConfig={filterConfig as unknown as IFilterConfig}
        sortDefault={{
          field: 'physical_name',
          direction: 'desc',
        }}
        ref={tableRef}
        onTriggerRequest={requestGetMetaHistoryList}
        rows={metaHistoryList || []}
        isLoading={isLoading}
      />
      <DeleteMetaHistoryModal
        visible={isDeleteMetaHistoryModalVisible}
        handleSave={handleDeleteMetaHistory}
        handleClose={handleDeleteMetaHistoryModalClose}
      />
    </Box>
  );
}
export default observer(MetaHistoryDataTable);
