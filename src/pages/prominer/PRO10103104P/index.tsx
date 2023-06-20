import { useEffect, useState } from 'react';

import { Box, Paper, Stack } from '@mui/material';
import { v4 as uuid } from 'uuid';

import { CmIconButton } from '@/components/atoms/CmButton';
import CmTreeTable from '@/components/organisms/CmTreeTable';
import { ESearchType, TreeData } from '@/components/organisms/CmTreeTable/types';

import ProminerApi from '@/apis/ProminerApi';
import { ReactComponent as PagePrevIcon } from '@/stylesheets/images/PagePrevIcon.svg';
import { ProminerMethodDetailDto, ProminerMethodDto } from '@/types/dtos/prominerDtos';
import { notify } from '@/utils/notify';

import { View } from '../PRO10103103P';
import { ProminerStyled } from '../Prominer.Styled';

const ViewMethodDetail = ({
  handleChangeView,
  data,
}: {
  handleChangeView: (view: View) => void;
  data: ProminerMethodDto;
}) => {
  const { method_name, return_type, service_group_name, declaring_class, loc } = data;
  const [searchType, setSearchType] = useState<ESearchType>(ESearchType.FORWARD);
  const [depthData, setDepthData] = useState<ProminerMethodDetailDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onTopButtonClicked = (value: ESearchType) => {
    setSearchType(value);
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await ProminerApi.getMethodDetail({
        declaringClass: declaring_class,
        methodName: method_name,
        searchType: searchType,
      });

      setDepthData(data.dto.DevMnrDto);
    } catch (error) {
      notify.error(error?.data?.exception?.name || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const formatData = (data: ProminerMethodDetailDto[]): TreeData[][] => {
    const rootData: TreeData[][] = [];

    const newData = data.sort((a, b) => Number(a.callDepth) - Number(b.callDepth));

    newData.map((item: ProminerMethodDetailDto) => {
      if (item.callDepth === '1') {
        rootData.push([
          {
            id: uuid(),
            value: {
              callee_class: item.callee_class,
              callee_method: item.callee_method,
              callee_type: item.callee_type,
              caller_class: item.caller_class,
              caller_method: item.caller_method,
              caller_type: item.caller_type,
            },
            depth: Number(item.callDepth),
            parentId: '',
            hasChildren: false,
            isShow: true,
            isExpand: false,
          },
        ]);
      }

      rootData.map((root) => {
        root.map((child) => {
          if (child.value.callee_class === item.caller_class) {
            child.hasChildren = true;

            root.push({
              id: uuid(),
              value: {
                callee_class: item.callee_class,
                callee_method: item.callee_method,
                callee_type: item.callee_type,
                caller_class: item.caller_class,
                caller_method: item.caller_method,
                caller_type: item.caller_type,
              },
              depth: Number(item.callDepth),
              parentId: child.id,
              hasChildren: false,
              isShow: false,
              isExpand: false,
            });
          }
        });
      });
    });

    return rootData;
  };

  useEffect(() => {
    fetchData();
  }, [data, searchType]);

  return (
    <ProminerStyled>
      <Paper className="detailBox">
        <Box
          className="pageTitle"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <CmIconButton
            iconName={<PagePrevIcon />}
            onClick={() => {
              handleChangeView(View.LIST);
            }}
          />
          {method_name}
        </Box>
        <Stack className="pageCon">
          <Box className="formInfo">
            <Paper className="infoBox">
              <figure>
                <span>Method Name</span>
                <figcaption>{method_name}</figcaption>
              </figure>
              <figure>
                <span>Return Type</span>
                <figcaption>{return_type}</figcaption>
              </figure>
              <figure>
                <span>Service Group Name</span>
                <figcaption>{service_group_name}</figcaption>
              </figure>
              <figure>
                <span>Class Name</span>
                <figcaption>{declaring_class}</figcaption>
              </figure>
            </Paper>
            <Paper className="infoBox">
              <figure>
                <span>LOC</span>
                <figcaption>{loc}</figcaption>
              </figure>
            </Paper>
          </Box>
          <CmTreeTable
            isShowTopButton
            onTopButtonClicked={onTopButtonClicked}
            isLoading={isLoading}
            rootColumns={[
              {
                label: 'Method Name',
                field: 'method_name',
                width: '40%',
              },
              {
                label: 'Class Name',
                field: 'declaring_class',
              },
              {
                label: 'Class Type',
                field: 'resource_type',
                width: '20%',
              },
            ]}
            rootRow={data}
            dataColumns={[
              {
                label: '',
                field: searchType === ESearchType.FORWARD ? 'callee_method' : 'caller_method',
              },
              {
                label: '',
                field: searchType === ESearchType.FORWARD ? 'callee_class' : 'caller_class',
              },
              {
                label: '',
                field: searchType === ESearchType.FORWARD ? 'callee_type' : 'caller_method',
              },
            ]}
            data={depthData}
            formatDataFn={formatData}
          />
        </Stack>
      </Paper>
    </ProminerStyled>
  );
};

export default ViewMethodDetail;
