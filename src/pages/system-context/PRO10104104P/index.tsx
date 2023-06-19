/******************************************************
 * Program ID : src/pages/system-context/Datasource.tsx
 * Program Name : Datasource
 * Create On : 2023.05.29
 * 개 요 : Datasource.tsx
 * ====================================================
 * 변경 이력     수정자      내용
 * ====================================================
 * 2023.05.29   김정아 차장   최초 작성
 ******************************************************/
import { useEffect, useMemo, useState } from 'react';

import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, OutlinedInput, Paper, SelectChangeEvent } from '@mui/material';

import { CmDropdown } from '@/components/atoms/CmDropDown';

import SystemContextApi from '@/apis/SystemContextApi';
import { NodeResponseDto, NodeTypeDtos } from '@/types/dtos/nodeDtos';
import { ApplicationDtos, ApplicationResponseDto } from '@/types/dtos/systemContextDtos';

import SystemContextDatasourceDataTable from '@/pages/system-context/PRO10104104P/DataTable';
import { IPropertyList } from '@/pages/system-context/PRO10104104P/type';
import { SysContextStyled } from '@/pages/system-context/SysContext.Styled';

const initFetchPropertyList: IPropertyList = {
  node_id: '',
  resource_id: '',
  resource_type: '',
};

function Datasource() {
  const [node, setNode] = useState<NodeTypeDtos[]>([]);
  const [application, setApplication] = useState<ApplicationDtos[]>([]);

  const [selectedNode, setSelectedNode] = useState<string | ''>('');
  const [selectedApplication, setSelectedApplication] = useState<string | ''>('');
  const [fetchDataPropertyList, setFetchDataPropertyList] = useState<IPropertyList>(initFetchPropertyList);
  const [selectedNodeLabel, setSelectedNodeLabel] = useState<string | ''>('');

  useEffect(() => {
    handleQuery();
  }, []);

  const handleQuery = async () => {
    const respone: NodeResponseDto = await SystemContextApi.getNodeForSystemContext();
    const { NodeDto } = respone?.dto || [];

    setNode(NodeDto);

    if (NodeDto.length) {
      setSelectedNode(NodeDto[0]?.node_id);
      setSelectedNodeLabel(NodeDto[0]?.node_name);

      fetchApplicationData(NodeDto[0]?.node_id, NodeDto[0]?.node_name);
    }
  };

  const NodeNameList = useMemo(() => {
    return (
      node?.map((x) => ({
        label: x.node_name,
        value: JSON.stringify({ id: x.node_id, label: x.node_name }),
      })) || []
    );
  }, [node]);

  const ApplicationNameList = useMemo(() => {
    return (
      application?.map((x) => ({
        label: x.physical_name,
        value: JSON.stringify({ id: x.resource_id, physical_name: x.physical_name, logical_name: x.logical_name }),
      })) || []
    );
  }, [application]);

  const handleSelectedNode = (event: SelectChangeEvent<unknown>) => {
    const selectedNodeId = JSON.parse(event.target.value as string) || '';
    setSelectedNode(selectedNodeId.id);
    setSelectedNodeLabel(selectedNodeId.label);
    setSelectedApplication('');

    selectedNodeId.id && fetchApplicationData(selectedNodeId.id, selectedNodeId.label);
  };

  const handleSelectedApplication = (event: SelectChangeEvent<unknown>) => {
    const selectedApplicationId = JSON.parse(event.target.value as string) || '';
    setSelectedApplication(selectedApplicationId);

    selectedApplicationId &&
      fetchPropertyList(
        selectedApplicationId.id,
        'APPLICATION',
        selectedNode,
        selectedApplicationId.logical_name,
        selectedApplicationId.physical_name,
        selectedNodeLabel
      );
  };

  const fetchApplicationData = async (selectedNodeId: string, selectedNodeLabel?: string) => {
    const respone: ApplicationResponseDto = await SystemContextApi.getApplication({
      resource_type: 'APPLICATION',
      node_id: selectedNodeId,
    });
    const { DeployStatDto } = respone?.dto || [];
    setApplication(DeployStatDto);

    fetchPropertyList(
      DeployStatDto?.[0]?.resource_id,
      DeployStatDto?.[0]?.resource_type as string,
      DeployStatDto?.[0]?.node_id,
      DeployStatDto?.[0]?.logical_name,
      DeployStatDto?.[0]?.physical_name,
      selectedNodeLabel
    );
  };

  const fetchPropertyList = (
    resource_id_selected: string,
    resource_type_selected: string,
    node_id_selected: string,
    logical_name_selected?: string,
    physical_name_selected?: string,
    node_label_selected?: string
  ) => {
    const data: IPropertyList = {
      node_id: node_id_selected,
      resource_id: resource_id_selected,
      resource_type: resource_type_selected,
      logical_name: logical_name_selected,
      physical_name: physical_name_selected,
      node_name: node_label_selected,
    };

    setFetchDataPropertyList(data);
  };

  return (
    <SysContextStyled>
      <Paper className="selectBox">
        <Box className="labelFormArea">
          <CmDropdown
            margin={'0px 0px'}
            key={NodeNameList?.[0]?.value}
            displayEmpty
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            type={'outside'}
            label={'Node'}
            input={<OutlinedInput />}
            IconComponent={ArrowDownIcon}
            defaultValue={NodeNameList?.[0]?.value || 'node'}
            onChange={handleSelectedNode}
            width="100%"
            data={NodeNameList}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 28 * 8 + 8,
                  width: 250,
                },
              },
            }}
            inputProps={{ 'aria-label': 'Without label' }}
          />
        </Box>
        <Box className="labelFormArea secondFormArea">
          <CmDropdown
            margin={'0px 0px'}
            key={ApplicationNameList?.[0]?.value}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            type={'outside'}
            label={'Application'}
            width="100%"
            input={<OutlinedInput />}
            IconComponent={ArrowDownIcon}
            defaultValue={ApplicationNameList?.[0]?.value || 'App'}
            onChange={handleSelectedApplication}
            data={ApplicationNameList}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 28 * 8 + 8,
                  width: 250,
                },
              },
            }}
            inputProps={{ 'aria-label': 'Without label' }}
          />
        </Box>
      </Paper>

      {/* <Paper className="inputDataBox"> */}
      <SystemContextDatasourceDataTable
        isDisabled={Boolean(!application?.length || !node?.length)}
        dataProp={fetchDataPropertyList}
      />
      {/* </Paper> */}
    </SysContextStyled>
  );
}
export default Datasource;
