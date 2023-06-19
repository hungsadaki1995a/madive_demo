import React, { useCallback, useState } from 'react';

import { IconButton, Tooltip } from '@mui/material';

import { CmButton } from '@/components/atoms/CmButton';

import { ReactComponent as AddIcon } from '@/stylesheets/images/AddIcon.svg';
import { ReactComponent as SearchIcon } from '@/stylesheets/images/SearchIcon.svg';
import { ReactComponent as UploadIcon } from '@/stylesheets/images/UploadIcon.svg';

import { FilterTypes, SubmitActionTypes } from '../const';
import FilterConfig from '../styled/FilterConfig';
import { IAddAction, IFilterConfig, IFilterElementType, IUploadAction } from '../types';
import DropdownFilterInput from './DropdownFilterInput';
import SimpleFilterInput from './SimpleFilterInput';

const FilterControls = ({
  excelBtnConfig,
  addBtnConfig,
  filterConfig,
  onTriggerQuery,
}: {
  excelBtnConfig?: IUploadAction;
  addBtnConfig?: IAddAction;
  filterConfig?: IFilterConfig;
  onTriggerQuery: (filterValues: { [key: string]: any }) => void;
}) => {
  const [filterValues, setFilterValues] = useState<{
    [key: string]: any;
  }>({});
  const [open, setOpen] = React.useState(false);

  const handleFilter = () => {
    setOpen(!open);
  };

  const handleChange = useCallback(({ name, value }: { name: string; value: any }) => {
    setFilterValues((prev) => {
      prev[name] = value;
      return { ...prev };
    });
  }, []);

  const handleTriggerQuery = useCallback(() => {
    onTriggerQuery(filterValues);
  }, [onTriggerQuery, filterValues]);

  const renderFilterComponentBaseType = (filterItemConfig: IFilterElementType) => {
    switch (filterItemConfig.type) {
      case FilterTypes.DROPDOWN:
        return (
          <DropdownFilterInput
            key={filterItemConfig.name}
            filterInfo={filterItemConfig}
            onChange={handleChange}
          />
        );
      case FilterTypes.SIMPLE:
        return (
          <SimpleFilterInput
            key={filterItemConfig.name}
            filterInfo={filterItemConfig}
            onChange={handleChange}
            onTriggerQuery={filterConfig?.submitBy === SubmitActionTypes.ENTER ? handleTriggerQuery : undefined}
          />
        );
      case FilterTypes.ACTION_SELECTION:
        return (
          <DropdownFilterInput
            key={filterItemConfig.name}
            filterInfo={filterItemConfig}
            onChange={handleChange}
            onTriggerQuery={handleTriggerQuery}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {excelBtnConfig && (
        <CmButton
          variant="text"
          startIcon={<UploadIcon />}
          btnTitle={excelBtnConfig.label}
          onClick={excelBtnConfig.onClick}
        />
      )}
      {addBtnConfig && (
        <CmButton
          variant="contained"
          startIcon={<AddIcon />}
          btnTitle={addBtnConfig.label}
          onClick={addBtnConfig.onClick}
        />
      )}
      {filterConfig && (
        <>
          <FilterConfig className={open ? 'opened' : 'closed'}>
            <Tooltip title={open ? 'Close Filter' : 'Open Filter'}>
              <IconButton
                className="filter-button"
                color="inherit"
                onClick={handleFilter}
              >
                <SearchIcon />
              </IconButton>
            </Tooltip>
            {filterConfig?.filters?.map((filterItem) => {
              return renderFilterComponentBaseType(filterItem);
            })}
            {filterConfig?.submitBy === SubmitActionTypes.BUTTON && (
              // <Button
              //   size="small"
              //   variant="contained"
              //   onClick={handleTriggerQuery}
              // >
              //   {filterConfig?.submitLabel}
              // </Button>
              <CmButton
                variant="contained"
                btnTitle={filterConfig?.submitLabel}
                onClick={handleTriggerQuery}
              />
            )}
          </FilterConfig>
        </>
      )}
    </>
  );
};

export default React.memo(FilterControls);
