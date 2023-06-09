import { ChangeEvent, useState } from 'react';

import { MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack } from '@mui/material';

import { getObjectValuesByKey } from '@/utils/ArrayUtils';

import { DropdownOptionType, FilterFormType } from '../types';

type SearchInputBaseDropdownControlProps = {
  options: DropdownOptionType[];
  defaultValue: string;
  onSearchChange?: (value: any) => void;
  filterState: FilterFormType;
};

const SearchInputBaseDropdownControl = ({
  options = [],
  defaultValue = '',
  onSearchChange,
  filterState,
}: SearchInputBaseDropdownControlProps) => {
  const [fieldNameSelected, setFieldNameSelected] = useState<string>(defaultValue);
  const [searchValue, setSearchValue] = useState<string>('');

  const handleSelectFieldName = (e: SelectChangeEvent) => {
    const fieldName = e.target.value;
    setFieldNameSelected(fieldName);
    const fieldNameGroups = getObjectValuesByKey(options, 'value');
    for (const key of fieldNameGroups) {
      delete filterState[key];
    }
    onSearchChange?.({ ...filterState, [fieldName]: searchValue });
  };

  const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    const fieldNameGroups = getObjectValuesByKey(options, 'value');
    for (const key of fieldNameGroups) {
      delete filterState[key];
    }
    onSearchChange?.({ ...filterState, [fieldNameSelected]: value });
  };

  return (
    <Stack direction="row">
      <Select
        onChange={handleSelectFieldName}
        value={fieldNameSelected}
        size="small"
        sx={{ width: '180px' }}
      >
        {options.map((item, index) => {
          return (
            <MenuItem
              key={index}
              value={item.value}
            >
              {item.label}
            </MenuItem>
          );
        })}
      </Select>
      <OutlinedInput
        sx={{ width: '300px' }}
        type="text"
        size="small"
        onChange={handleSearchTextChange}
        value={searchValue}
      />
    </Stack>
  );
};

export default SearchInputBaseDropdownControl;
