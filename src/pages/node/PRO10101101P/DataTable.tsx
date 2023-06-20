import { MutableRefObject, useMemo, useRef, useState } from 'react';

import { Box } from '@mui/material';
import { observer } from 'mobx-react';
import Cookies from 'universal-cookie';

import CommonTable from '@/components/organisms/CmCommonTable';
import { ICommonTableColumn, IFilterConfig, ImperativeHandleDto } from '@/components/organisms/CmCommonTable/types';

import { NodeApi } from '@/apis';
import { ReactComponent as AddIcon } from '@/stylesheets/images/AddIcon.svg';
import { ReactComponent as DeleteIcon } from '@/stylesheets/images/DeleteIcon.svg';
import { IPlainObject } from '@/types/common';
import { NodeDto } from '@/types/dtos/nodeDtos';
import useApiQuery from '@/utils/hooks/useApiQuery';
import { notify } from '@/utils/notify';

import { NodeEndpoint, USER_INFO_COOKIE } from '@/constants';

import DeleteNodeModal from './modal/DeleteNodeModal';
import NodeModal from './modal/NodeModal';

const columnsConfig: ICommonTableColumn<IPlainObject>[] = [
  {
    field: 'node_name',
    label: 'Node Name',
    type: 'text',
    sortable: true,
  },
  {
    field: 'node_id',
    label: 'Node ID',
    type: 'text',
    sortable: true,
  },
  {
    field: 'node_ip',
    label: 'IP',
    type: 'text',
    sortable: true,
  },

  {
    field: 'node_file_port',
    label: 'File Port',
    type: 'text',
    sortable: true,
  },
  {
    field: 'node_http_port',
    label: 'Http Port',
    type: 'text',
    sortable: true,
  },
  {
    field: 'node_tcp_port',
    label: 'ProObject Port',
    type: 'text',
    sortable: true,
  },
  {
    field: 'node_is_ssl',
    label: 'SSL',
    type: 'text',
    sortable: true,
  },
  {
    field: 'node_admin',
    label: 'Admin',
    type: 'text',
    sortable: true,
  },
  {
    field: 'node_type',
    label: 'Node Type',
    type: 'text',
    sortable: true,
  },
];

const NodeManagementDataTable = observer(() => {
  const [isDeleteNodeModalVisible, setIsDeleteNodeModalVisible] = useState(false);
  const [isFormModalVisible, setIsFormModalVisible] = useState(false);
  const [selectedNode, setSelectedNode] = useState<NodeDto[]>([]);
  const [data, setData] = useState<NodeDto | null>(null);
  const cookies = new Cookies();
  const userInfo = cookies.get(USER_INFO_COOKIE);
  //----------------------------
  // HANDLE OPEN - CLOSE MODAL

  // Create Node Modal Open
  const handleCreateNodeModalOpen = () => {
    setData(null);
    setIsFormModalVisible(true);
  };

  // Edit Node Modal Open
  const handleEditNodeModalOpen = (event: React.MouseEvent<unknown>, row: NodeDto) => {
    setData(row);
    setIsFormModalVisible(true);
  };

  // Node Modal Close
  const handleCloseModal = () => {
    setIsFormModalVisible(false);
  };

  // Delete Node Modal Open
  const handleDeleteNodeModalOpen = () => {
    setIsDeleteNodeModalVisible(true);
  };

  // Delete Node Modal Close
  const handleDeleteNodeModalClose = () => {
    setIsDeleteNodeModalVisible(false);
  };

  // -----------------------------------
  // HANDLE EXCUTE FUNCTION

  // Save Create/Edit Excute
  const handleSave = async (formData: NodeDto) => {
    if (data) {
      const res = await NodeApi.editNode(formData);

      if (res?.dto?.value === 'SUCCESS') {
        notify.success('EDIT NODE SUCCESS');
      } else {
        notify.error(res?.dto?.value);
      }
    } else {
      formData.node_admin = 'admin';
      const res = await NodeApi.addNode(formData);

      if (res?.dto?.value === 'SUCCESS') {
        notify.success('CREATE NODE SUCCESS');
      } else {
        notify.error(res?.dto?.value);
      }
    }
    tableRef.current?.resetPageAndRefresh();
  };

  // Delete Node Excute
  const handleDeleteNode = async () => {
    // eslint-disable-next-line no-debugger
    debugger;
    const res = await NodeApi.deleteNode(selectedNode[0]);

    if (res?.dto?.value === 'SUCCESS') {
      notify.success('DELETE NODE SUCCESS');
      setSelectedNode([]);
    } else {
      notify.error(res?.dto?.value);
    }
    handleDeleteNodeModalClose();
    tableRef.current?.resetPageAndRefresh();
  };

  const handleRowClick = (event: React.MouseEvent, rowData: NodeDto) => {
    handleEditNodeModalOpen(event, rowData);
  };
  // -----------------------------------

  const filterConfig = useMemo(() => {
    return {
      primaryActions: [
        {
          type: 'button',
          handleClick: (selectedRow: NodeDto[]) => {
            setSelectedNode(selectedRow);
            handleDeleteNodeModalOpen();
          },
          checkDisabled: (selectedRows: NodeDto[]) => {
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
      advanceActions: [
        {
          type: 'dropdown',
          options: [
            {
              label: 'ALL',
              value: 'ALL',
            },
            {
              label: 'TEST',
              value: 'TEST',
            },
            {
              label: 'RUNTIME',
              value: 'RUNTIME',
            },
            {
              label: 'MASTER',
              value: 'MASTER',
            },
          ],
          name: 'node_type',
        },
        {
          label: 'Create',
          type: 'button',
          handleClick: (selectedRows: NodeDto[]) => {
            // return;
            handleCreateNodeModalOpen();
          },
          config: {
            variant: 'contained',
            color: 'primary',
            size: 'small',
            startIcon: <AddIcon />,
            label: 'Create',
          },
        },
        {
          type: 'filter',
          name: 'node-filter',
          defaultValue: 'node_name',
          options: [
            {
              label: 'Node Name',
              value: 'node_name',
            },
            {
              label: 'Node ID',
              value: 'node_id',
            },
            {
              label: 'IP',
              value: 'node_ip',
            },
            {
              label: 'File Port',
              value: 'node_file_port',
            },
            {
              label: 'Http Port',
              value: 'node_http_port',
            },
            {
              label: 'Deploy port',
              value: 'node_tcp_port',
            },
            {
              label: 'SSL',
              value: 'node_is_ssl',
            },
            {
              value: 'node_admin',
              label: 'Admin',
            },
            {
              value: 'node_type',
              label: 'Node Type',
            },
          ],
        },
      ],
    };
  }, []);

  const {
    request,
    isLoading,
    data: nodeList,
  } = useApiQuery<NodeDto[]>({
    endpoint: NodeEndpoint.getList,
    map: (response) => {
      return response?.dto?.NodeDto || [];
    },
  });

  const requestGetNodeList = () => {
    const payload = { user_id: userInfo.id || '' };
    return request(payload);
  };

  const tableRef = useRef<ImperativeHandleDto<NodeDto>>();

  return (
    <Box>
      <CommonTable<NodeDto>
        hasSelectionRows
        allowMultipleSelect={false}
        fieldAsRowId="node_id"
        columnsConfig={columnsConfig}
        filterConfig={filterConfig as unknown as IFilterConfig}
        sortDefault={{
          field: 'node_name',
          direction: 'asc',
        }}
        ref={tableRef as MutableRefObject<ImperativeHandleDto<NodeDto>>}
        onRowClick={handleRowClick}
        onTriggerRequest={requestGetNodeList}
        rows={nodeList || []}
        isLoading={isLoading}
      />

      {isFormModalVisible && (
        <NodeModal
          visible={isFormModalVisible}
          handleClose={handleCloseModal}
          handleSave={handleSave}
          data={data}
        />
      )}

      {/* Delete Node - Modal */}
      {isDeleteNodeModalVisible && (
        <DeleteNodeModal
          visible={isDeleteNodeModalVisible}
          handleSave={handleDeleteNode}
          handleClose={handleDeleteNodeModalClose}
        />
      )}
    </Box>
  );
});

export default NodeManagementDataTable;
