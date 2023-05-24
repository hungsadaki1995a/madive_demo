import { FormControl, IconButton, Input, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import React, { useCallback, useRef } from 'react';
import { FilterOnChangeType, IFilterSimple } from '../types';

interface ISimpleFilterInputProps {
  filterInfo: IFilterSimple;
  onChange: FilterOnChangeType;
  onTriggerQuery?: () => void;
}
const SimpleFilterInput = ({
  filterInfo: { name, icon, label, className },
  onChange,
  onTriggerQuery,
}: ISimpleFilterInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const execUpdate = useCallback(() => {
    if (typeof onChange === 'function') {
      onChange({ name, value: inputRef.current?.value });
    }
    if (typeof onTriggerQuery === 'function') {
      setTimeout(() => {
        onTriggerQuery();
      }, 0);
    }
  }, [onChange, onTriggerQuery]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        execUpdate();
      }
    },
    [execUpdate]
  );
  return (
    <FormControl
      variant="outlined"
      size="small"
      className={className ?? ''}
    >
      {!!label && <InputLabel htmlFor="standard-adornment-password">{label}</InputLabel>}
      <OutlinedInput
        inputRef={inputRef}
        type="text"
        onKeyDown={handleKeyDown}
        onBlur={execUpdate}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={execUpdate}
            >
              {icon}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default React.memo(SimpleFilterInput);
