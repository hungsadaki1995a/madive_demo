import { useEffect, useState } from 'react';

import { MenuItem, Select } from '@mui/material';

import { ServiceGroupApi } from '@/apis';
import { ServiceGroupDto } from '@/types/dtos/serviceGroupDtos';
import { notify } from '@/utils/notify';

import { ActionType, FilterFormType } from '../types';

type ServiceGroupListProps = {
  name: string;
  resourceId: string;
  onChangeFilterServer?: (value: FilterFormType) => void;
  dispatch: (type: ActionType) => void;
};

const FilterServiceGroupListControl = ({
  name,
  resourceId,
  dispatch,
  onChangeFilterServer,
}: ServiceGroupListProps): JSX.Element => {
  const [selectedServiceGroup, setSelectedServiceGroup] = useState<string>('');
  const [serviceGroups, setServiceGroups] = useState<ServiceGroupDto[]>([]);

  const getSgList = async () => {
    try {
      const data = await ServiceGroupApi.getSgList(resourceId);

      const serviceGroups = data?.dto?.ServiceGroupDto || [];

      setServiceGroups(serviceGroups);

      onChangeFilterServer?.({ [name]: '', app_resource_id: resourceId });
    } catch (error) {
      notify.error(error?.data?.exception?.name || 'Something went wrong');
    }
  };

  const handleChangeSg = (e: any) => {
    const serviceGroupId = e.target.value;
    setSelectedServiceGroup(serviceGroupId);
    onChangeFilterServer?.({ [name]: serviceGroupId === 'all' ? '' : serviceGroupId, app_resource_id: resourceId });
  };

  useEffect(() => {
    if (resourceId) {
      getSgList();
    }
  }, [resourceId]);

  return (
    <Select
      onChange={handleChangeSg}
      value={selectedServiceGroup || 'all'}
      size="small"
      sx={{ width: '180px' }}
    >
      <MenuItem value={'all'}>All</MenuItem>
      {serviceGroups.map(({ physical_name, resource_id }) => {
        return (
          <MenuItem
            key={resource_id}
            value={resource_id}
          >
            {physical_name}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default FilterServiceGroupListControl;
