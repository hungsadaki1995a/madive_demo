import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import SearchIcon from '@mui/icons-material/SearchOutlined';
import { Autocomplete, Button, Chip, IconButton, Paper, Stack, styled, TextField, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { observer } from 'mobx-react';

import { notoSansDJKFont } from '@/stylesheets/common';
import { useStore } from '@/utils';

import { FilterTypes } from '../const';
import {
  FilterFormType,
  IPlainObject,
  SearchCachedCondition,
  SearchServerConfig,
  SearchServerConfigOption,
  SearchServerFieldValue,
} from '../types';
import SearchConditionsSavedModal from './SearchConditionsSavedModal';

interface ISearchServerSectionProps {
  config: SearchServerConfig;
  onChangeFilterServer: (filterData: FilterFormType) => void;
}

const useStyles = makeStyles(() => ({
  topSearchBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '4px 8px !important',
    marginBottom: '20px !important',
    '& *:not(svg)': {
      fontFamily: notoSansDJKFont.regular,
      fontSize: '13px',
    },
    '& svg': {
      marginRight: '.4em',
    },
    '& .MuiStack-root': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      '&.chipBox': {
        padding: 0,
        border: 0,
      },
      '& >:not(style)+:not(style)': {
        marginTop: 0,
        marginLeft: '10px',
      },
    },
    // Chip
    '& .MuiChip-root': {
      '& .MuiChip-label': {
        lineHeight: 1,
      },
      '& svg.MuiSvgIcon-root': {
        opacity: 0,
        transition: 'opacity 250ms',
      },
      '&:hover svg.MuiSvgIcon-root': {
        opacity: 1,
      },
    },
    // TextField
    '& .searchChip': {
      display: 'flex',
      margin: 'auto 10px',
    },
    '& .MuiOutlinedInput-root': {
      '& .MuiInputBase-input': {
        padding: 0,
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: 0,
      },
    },

    // RightBtn
    '& div[title="Rbtn"]': {
      marginLeft: 'auto',
      padding: '0 !important',
      '& .MuiButton-text': {
        padding: 0,
        color: '#1898F5',
      },
    },
  },
}));

const StyledEditableChipComponent = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.neutralLight[150],
  padding: '2px 9px',
  borderRadius: '12px',
  color: theme.palette.neutralLight[800],
  width: '300px',
}));

const SearchServerSection = observer(({ config, onChangeFilterServer }: ISearchServerSectionProps) => {
  const location = useLocation();
  const { SearchServerCachedStore } = useStore();
  const [selectedSearchOptions, setSelectedSearchOptions] = useState<SearchServerFieldValue[]>([]);
  const [selectingField, setSelectingField] = useState<SearchServerConfigOption | null>(null);
  const [isShowSaveConditionModal, setIsShowSaveConditionModal] = useState<boolean>(false);
  const conditionSuggestionGroups: SearchCachedCondition[] = SearchServerCachedStore.getSearchGroupsCachedFromPath(
    location.pathname
  );
  const inputFieldValueRef = useRef<HTMLInputElement>(null);

  const onChangeOption = (event: any, option: any) => {
    const currentOption = config.fieldOptions.find((option) => option.label === event?.target?.textContent);
    setSelectingField(currentOption || null);
    setTimeout(() => {
      inputFieldValueRef.current?.focus();
    }, 0);
  };

  const onBlurFieldValue = (e: any) => {
    const fieldValue = e.target.value;
    if (fieldValue) {
      setSelectedSearchOptions([
        ...selectedSearchOptions,
        {
          fieldName: selectingField?.fieldName || '',
          label: selectingField?.label || '',
          value: fieldValue,
        },
      ]);
    }
    setSelectingField(null);
  };

  const onEnterFieldValue = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if ((e.target as any)?.value) {
        onBlurFieldValue(e);
      }
    }
  };

  const EditableChip = () => {
    return (
      <StyledEditableChipComponent direction="row">
        <label>{selectingField?.label}: </label>
        <Autocomplete
          sx={{
            flex: 1,
          }}
          freeSolo
          options={selectingField?.type === FilterTypes.DROPDOWN ? selectingField.options || [] : []}
          openOnFocus
          renderInput={(params) => (
            <TextField
              {...params}
              onBlur={onBlurFieldValue}
              onKeyDown={onEnterFieldValue}
              inputRef={inputFieldValueRef}
            />
          )}
        />
      </StyledEditableChipComponent>
    );
  };

  const filterOptions = (options: SearchServerConfigOption[]) => {
    const selectedFieldNames = selectedSearchOptions.map((selectedOption) => selectedOption.fieldName);
    return options.filter((option) => !selectedFieldNames.includes(option.fieldName));
  };

  const onDeleteSearchOption = (fieldName: string) => {
    setSelectedSearchOptions((current) => current.filter((option) => option.fieldName !== fieldName));
  };

  const onClickDeleteAll = () => {
    setSelectedSearchOptions([]);
  };

  const onClickSaveSearchConditions = () => {
    setIsShowSaveConditionModal(true);
  };

  const handleSaveSearchCondition = (conditionName?: string) => {
    if (conditionName) {
      if (!conditionName) {
        return;
      }
      const currentPath = location.pathname;
      SearchServerCachedStore.addSearchConditionToCache(
        {
          name: conditionName,
          conditions: selectedSearchOptions,
        },
        currentPath
      );
    }
    setIsShowSaveConditionModal(false);
  };

  const classes = useStyles();

  const onDeleteConditionCache = (conditionGroupName: string) => {
    SearchServerCachedStore.removeSearchConditionFromCache(conditionGroupName, location.pathname);
  };

  const onClickConditionSuggestion = (condition: any) => {
    setSelectedSearchOptions(condition?.conditions);
  };

  const onClickSearchServer = () => {
    const searchConditions = selectedSearchOptions.reduce((acc: IPlainObject, current) => {
      acc[current.fieldName] = current.value;
      return acc;
    }, {});

    onChangeFilterServer(searchConditions);
  };

  return (
    <Paper sx={{ marginBottom: '20px' }}>
      <Paper className={classes.topSearchBar}>
        <IconButton onClick={onClickSearchServer}>
          <SearchIcon />
        </IconButton>
        {selectedSearchOptions.map((option) => (
          <Chip
            label={`${option.label}: ${option.value}`}
            key={option.fieldName}
            onDelete={() => onDeleteSearchOption(option.fieldName)}
          />
        ))}
        {selectingField ? (
          <EditableChip />
        ) : (
          <Autocomplete
            hidden={selectingField ? true : false}
            style={{ flex: 1 }}
            multiple
            freeSolo
            filterOptions={filterOptions}
            value={selectedSearchOptions}
            options={config.fieldOptions || []}
            onChange={onChangeOption}
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.label)}
            renderOption={(props, option) => (
              <Typography
                {...props}
                variant="base"
              >
                {option.label}
              </Typography>
            )}
            clearIcon={<></>}
            renderTags={(value, getTagProps) => <></>}
            renderInput={(params) => {
              return (
                <>
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Please enter what you are searching for."
                    className="searchChip"
                  />
                </>
              );
            }}
          />
        )}

        <Stack
          spacing={1}
          title="Rbtn"
        >
          <Button
            variant="text"
            onClick={onClickSaveSearchConditions}
          >
            Save search conditions
          </Button>
          <Button
            variant="text"
            onClick={onClickDeleteAll}
          >
            Delete all
          </Button>
        </Stack>
        {isShowSaveConditionModal && (
          <SearchConditionsSavedModal
            handleClose={() => setIsShowSaveConditionModal(false)}
            handleSave={handleSaveSearchCondition}
            visible={isShowSaveConditionModal}
          />
        )}
      </Paper>
      {conditionSuggestionGroups?.length > 0 && (
        <Stack
          direction="row"
          padding={4}
        >
          {conditionSuggestionGroups.map((condition) => {
            return (
              <Chip
                label={condition.name}
                key={condition.name}
                onDelete={() => onDeleteConditionCache(condition.name)}
                clickable
                onClick={() => onClickConditionSuggestion(condition)}
              />
            );
          })}
        </Stack>
      )}
    </Paper>
  );
});

export default SearchServerSection;
