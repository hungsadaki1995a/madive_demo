import { useEffect, useMemo, useState } from 'react';

import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, OutlinedInput, Paper, SelectChangeEvent } from '@mui/material';
import { observer } from 'mobx-react';

import { CmDropdown } from '@/components/atoms/CmDropDown';

import SystemContextApi from '@/apis/SystemContextApi';
import { NodeResponseDto, NodeTypeDtos } from '@/types/dtos/nodeDtos';
import {
  ApplicationDtos,
  ApplicationResponseDto,
  ContextDtos,
  ContextResponseDto,
} from '@/types/dtos/systemContextDtos';

import SystemContextManagementDataTable from '@/pages/system-context/PRO10104101P/DataTable';
import { ManagementStyled } from '@/pages/system-context/PRO10104101P/Management.Styled';
import { ISystemContextList } from '@/pages/system-context/PRO10104101P/type';

type propsType = {
  title?: string;
};

const initContext: ContextDtos = {
  conditionDto: [],
  count: 0,
  node_id: '',
  pageInfoDto: { pageLength: 0, pageNum: 0, sort: false, sortField: ' ', sortingType: '' },
  pagingResultDto: {
    count: 0,
    currentPage: 0,
    totalNum: 0,
    totalPage: 0,
  },
  physical_name: null,
  resource_id: '',
  systemContextName: [],
};

const initFetchSytemContextList: ISystemContextList = {
  node_id: '',
  resource_id: '',
  systemContextName: '',
};

const SystemContextManagement = observer((props: propsType) => {
  const { title } = props;
  const [node, setNode] = useState<NodeTypeDtos[]>([]);
  const [application, setApplication] = useState<ApplicationDtos[]>([]);
  const [context, setContext] = useState<ContextDtos>(initContext);

  const [selectedNode, setSelectedNode] = useState<string | ''>('');
  const [selectedApplication, setSelectedApplication] = useState<string | ''>('');
  const [selectedContext, setSelectedContext] = useState<string | ''>('');
  const [appName, setAppName] = useState<string | ''>('');

  const [fetchDataSystemContext, setFetchDataSystemContext] = useState<ISystemContextList>(initFetchSytemContextList);

  useEffect(() => {
    handleQuery();
  }, []);

  const handleQuery = async () => {
    const respone: NodeResponseDto = await SystemContextApi.getNodeForSystemContext();
    const { NodeDto } = respone?.dto || [];

    setNode(NodeDto);
    if (NodeDto.length) {
      setSelectedNode(NodeDto[0]?.node_id);

      fetchApplicationData(NodeDto[0]?.node_id);
    }
  };

  const NodeNameList = useMemo(() => {
    return (
      node?.map((x) => ({
        label: x.node_name,
        value: x.node_id,
      })) || []
    );
  }, [node]);

  const ApplicationNameList = useMemo(() => {
    return (
      application?.map((x) => ({
        label: x.physical_name,
        value: x.resource_id,
      })) || []
    );
  }, [application]);

  const ContextNameList = useMemo(() => {
    return (
      context?.systemContextName?.map((x) => ({
        label: x,
        value: x,
      })) || []
    );
  }, [context]);

  const handleSelectedNode = (event: SelectChangeEvent<unknown>) => {
    const selectedNodeId = event.target.value as string | '';
    setSelectedNode(selectedNodeId);
    setSelectedApplication('');
    setContext(initContext);

    selectedNodeId && fetchApplicationData(selectedNodeId);
  };

  const fetchApplicationData = async (selectedNodeId: string) => {
    const respone: ApplicationResponseDto = await SystemContextApi.getApplication({
      resource_type: 'APPLICATION',
      node_id: selectedNodeId,
    });
    const { DeployStatDto } = respone?.dto || [];
    setApplication(DeployStatDto);

    DeployStatDto &&
      fetchContextData(DeployStatDto?.[0]?.resource_id, selectedNodeId, DeployStatDto?.[0]?.logical_name);
  };

  const handleSelectedApplication = (event: SelectChangeEvent<unknown>) => {
    const selectedApplicationId = event.target.value as string | '';
    setSelectedApplication(selectedApplicationId);
    setContext(initContext);

    selectedApplicationId && fetchContextData(selectedApplicationId, selectedNode);
  };

  const fetchContextData = async (selectedApplicationId: string, selectedNodeId: string, appName?: string) => {
    const resourceId = selectedApplicationId;
    if (resourceId) {
      const dataContext: ContextResponseDto = await SystemContextApi.getDataContext({
        node_id: selectedNodeId,
        resource_id: resourceId,
      });
      setContext(dataContext?.dto);
      setAppName(appName as string);

      dataContext?.dto &&
        fetchSystemContextList(selectedNodeId, resourceId, dataContext?.dto?.systemContextName?.[0], appName);
    }
  };

  const handleSelectedContext = (event: SelectChangeEvent<unknown>) => {
    const selectedContextName = event.target.value as string | '';
    setSelectedContext(selectedContextName);

    selectedContextName && fetchSystemContextList(selectedNode, selectedApplication, selectedContextName, appName);
  };

  const fetchSystemContextList = (
    selectedNodeId: string,
    resourceId: string,
    systemContext: string,
    appNameData?: string
  ) => {
    const data: ISystemContextList = {
      node_id: selectedNodeId,
      resource_id: resourceId,
      systemContextName: systemContext,
      appName: appNameData,
    };

    setFetchDataSystemContext(data);
  };

  return (
    <>
      <Box>{title}</Box>
      <ManagementStyled>
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

          <Box className="labelFormArea secondFormArea">
            <CmDropdown
              margin={'0px 0px'}
              key={ContextNameList?.[0]?.value}
              displayEmpty
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              type={'outside'}
              label={'Context'}
              width="100%"
              input={<OutlinedInput />}
              IconComponent={ArrowDownIcon}
              defaultValue={ContextNameList?.[0]?.value || 'node'}
              onChange={handleSelectedContext}
              data={ContextNameList}
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
        <SystemContextManagementDataTable
          isDisabled={Boolean(!application?.length || !node?.length || !context?.systemContextName?.length)}
          dataProp={fetchDataSystemContext}
        />
      </ManagementStyled>
    </>
  );
});

export default SystemContextManagement;
