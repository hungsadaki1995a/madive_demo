import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Box, Checkbox, FormControlLabel, InputAdornment, TextField } from '@mui/material';

import { CmButton } from '@/components/atoms/CmButton';
import { CmDataSelect } from '@/components/atoms/CmDataInput';
// Common Atoms
import CmModal from '@/components/atoms/CmModal';
import { CmRadioGroup } from '@/components/atoms/CmRadioGroup';
import { CmTextField } from '@/components/atoms/CmTextField';

import { MetaApi } from '@/apis';
import DbioApi from '@/apis/DbioApi';
import MetaModel from '@/types/models/metaModel';
import { formatDropdownData } from '@/utils';
import { notify } from '@/utils/notify';

import {
  BOOLEAN_OPTION_FIELD,
  FIELD_TYPE,
  META_TYPE,
  TIME_PLACEHOLDER,
  TYPE_ACTIVE_DECIMAL,
  TYPE_ACTIVE_PLACEHOLDER_DEFAULT_VALUES,
  TYPE_DISABLE_DEFAULT_VALUES,
  USE_OPTION_FIELD,
} from '@/constants/meta';

import { MaskingRangeWrapper } from '../styled/MaskingRangeWrapper.styled';
import { ModalContentWrapper } from '../styled/ModalContentWrapper.styled';
import { TextFieldWrapper } from '../styled/TextFieldWrapper.styled';

type CreateMetaModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
  data?: MetaModel;
  reFetchData?: () => void;
  onSuccess?: (data?: MetaModel) => void;
  creator: string;
};

const defaultValues: MetaModel = {
  physical_name: '',
  logical_name: '',
  resource_group: '',
  comments: '',
  field_type: '',
  length: '',
  decimal_size: '',
  meta_type: 'non-persistent',
  is_key: 'n',
  db_type: '',
  table_name: '',
  column_name: '',
  masking: 'unuse',
  masking_range: '',
  encrypt: 'unuse',
  default_value: '',
  is_use: 'n',
};

export default function CreateMetaModal({
  visible,
  handleSave,
  handleClose,
  onSuccess,
  creator = '',
  reFetchData,
}: CreateMetaModalProps) {
  const resolver = classValidatorResolver(MetaModel);

  //is keep form open
  const [isKeepOpen, setIsKeepOpen] = useState(false);

  //list data source
  const [dbTypeList, setDbTypeList] = useState([]);

  //list table data
  const [tableList, setTableList] = useState([]);

  //list column data
  const [columnList, setColumnList] = useState([]);

  //loading status
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const {
    register,
    setValue,
    watch,
    clearErrors,
    handleSubmit,
    resetField,
    control,
    formState: { errors },
    reset,
  } = useForm<MetaModel>({ resolver, defaultValues, mode: 'onChange' });

  // watch meta_type field value change
  const metaType = watch('meta_type', 'non-persistent');

  // watch field_type field value change
  const fieldType = watch('field_type', '');

  // watch db_type field value change
  const db_type = watch('db_type', '');

  // watch table_name field value change
  const table_name = watch('table_name', '');

  // watch masking field value change
  const masking = watch('masking', 'unuse');

  //handle change click keep open
  const handleChangeKeepOpen = () => {
    setIsKeepOpen((prev) => !prev);
  };

  //handle change close modal (clear error, reset form data, close modal)
  const handleClickCloseModal = () => {
    clearErrors();
    reset(defaultValues);
    handleClose();
  };

  // handle submit form
  const submitForm = async (formData: MetaModel) => {
    setIsFetching(true);
    const res = await MetaApi.MetaCreate({ ...formData, ...{ creator } });
    if (res?.dto) {
      notify.success('Create New Meta Successful');
    } else {
      notify.error(res?.exception?.name || 'Something went wrong');
    }
    onSuccess?.({ ...formData, ...{ creator } });
    await reFetchData?.();
    setIsFetching(false);
    if (!isKeepOpen) {
      reset(defaultValues);
      handleClickCloseModal();
    }
  };

  // handle get list data source
  const getDataSourceData = async () => {
    const res = await DbioApi.getDbios();
    if (res?.dto) {
      setDbTypeList(res?.dto?.ModelDbioDto || []);
    } else {
      notify.error(res?.data?.exception?.name || 'Something went wrong');
    }
  };

  // handle get list table data
  const getTableListData = async (db_type: string) => {
    const res = await MetaApi.TableListGet(db_type);
    if (res?.dto) {
      setTableList(res?.dto?.MetaDto || []);
    } else {
      notify.error(res?.data?.exception?.name || 'Something went wrong');
    }
  };

  // handle get list column data
  const getColumnListData = async (db_type: string, table_name: string) => {
    const res = await MetaApi.ColumnListGet(db_type, table_name);
    if (res?.dto) {
      setColumnList(res?.dto?.MetaDto || []);
    } else {
      notify.error(res?.data?.exception?.name || 'Something went wrong');
    }
  };

  // clear data source, table, column when metaType equal non-persistent
  useEffect(() => {
    if (metaType === 'persistent') {
      getDataSourceData();
    }
    if (metaType === 'non-persistent') {
      resetField('db_type');
      resetField('table_name');
      resetField('column_name');
    }
  }, [metaType]);

  //get list table when db_type have value
  useEffect(() => {
    if (db_type) {
      getTableListData(db_type);
    }
    setValue('table_name', '');
  }, [db_type]);

  //get list column when db_type and table_name have value
  useEffect(() => {
    if (db_type && table_name) {
      getColumnListData(db_type, table_name);
    }
    resetField('column_name');
  }, [db_type, table_name]);

  const footerRender = () => (
    <Box
      className="alignL"
      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flex: 1, padding: '0px 24px' }}
    >
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={isKeepOpen}
              size="small"
              onChange={handleChangeKeepOpen}
            />
          }
          label="Keep Open"
        />
      </div>
      <div>
        <CmButton
          id="rightBtn1"
          variant="text"
          btnTitle="Cancel"
          startIcon={<></>}
          className=""
          onClick={handleClickCloseModal}
          disabled={isFetching}
        />
        <CmButton
          id="rightBtn2"
          variant="contained"
          btnTitle="OK"
          startIcon={<></>}
          className=""
          onClick={handleSubmit(submitForm)}
          disabled={isFetching}
        />
      </div>
    </Box>
  );

  return (
    <CmModal
      title="Create Meta Field"
      visible={visible}
      onSave={handleSave}
      onClose={handleClickCloseModal}
      className="medium"
      footerRenderAs={footerRender}
    >
      <ModalContentWrapper>
        {/* contents */}
        <label className="labelFormArea">
          <span>Physical Name</span>
          <TextField
            {...register('physical_name')}
            className="labelTextField"
            size="small"
            helperText={errors.physical_name?.message}
            error={!!errors.physical_name}
          />
        </label>
        <label className="labelFormArea">
          <span>Logical Name</span>
          <TextField
            {...register('logical_name')}
            className="labelTextField"
            size="small"
            helperText={errors.logical_name?.message}
            error={!!errors.logical_name}
          />
        </label>
        <label className="labelFormArea">
          <span>Resource Group</span>
          <TextField
            {...register('resource_group')}
            className="labelTextField"
            size="small"
            helperText={errors.resource_group?.message}
            error={!!errors.resource_group}
          />
        </label>
        <label className="labelFormArea">
          <span>Comments</span>
          <TextField
            {...register('comments')}
            className="labelTextField"
            size="small"
            helperText={errors.comments?.message}
            error={!!errors.comments}
          />
        </label>
        <label className="labelFormArea">
          <span>Field Type</span>
          <Controller
            name={'field_type'}
            control={control}
            render={({ field: { onChange, value } }) => (
              <CmDataSelect
                errorMessage={errors.field_type?.message}
                onChange={onChange}
                value={value}
                optionsData={formatDropdownData(FIELD_TYPE, 'value', 'value')}
              />
            )}
          />
        </label>
        <label className="labelFormArea">
          <span>Length</span>
          <Box className="formRow">
            <TextField
              {...register('length')}
              className="labelTextField"
              size="small"
              helperText={errors.length?.message}
              error={!!errors.length}
              disabled={fieldType === 'Date'}
            />
            <TextFieldWrapper>
              <TextField
                {...register('decimal_size')}
                className="labelTextField"
                size="small"
                helperText={errors.decimal_size?.message}
                disabled={!TYPE_ACTIVE_DECIMAL.includes(fieldType)}
                error={!!errors.decimal_size}
                InputProps={{
                  startAdornment: <InputAdornment position="start">Decimal</InputAdornment>,
                }}
              />
            </TextFieldWrapper>
          </Box>
        </label>

        <label className="labelFormArea">
          <span>Type</span>
          <Controller
            name={'meta_type'}
            control={control}
            render={({ field: { onChange, value } }) => (
              <CmRadioGroup
                data={formatDropdownData(META_TYPE, 'value', 'value')}
                value={value}
                onRadioChange={onChange}
                error={!!errors.meta_type}
                helperText={errors.meta_type?.message?.toString()}
                labelWidth={30}
              />
            )}
          />
        </label>
        <label className="labelFormArea">
          <span>Primary Key</span>
          <Controller
            name={'is_key'}
            control={control}
            render={({ field: { onChange, value } }) => (
              <CmRadioGroup
                data={formatDropdownData(BOOLEAN_OPTION_FIELD, 'value', 'label')}
                value={value}
                onRadioChange={onChange}
                error={!!errors.is_key}
                helperText={errors.is_key?.message?.toString()}
                labelWidth={30}
              />
            )}
          />
        </label>
        <label className="labelFormArea">
          <span>DataSource</span>
          <Controller
            name={'db_type'}
            control={control}
            render={({ field: { onChange, value } }) => (
              <CmDataSelect
                value={value}
                onChange={onChange}
                errorMessage={errors.db_type?.message}
                disabled={metaType === 'non-persistent'}
                optionsData={formatDropdownData(dbTypeList, 'alias', 'alias')}
              />
            )}
          />
        </label>
        <label className="labelFormArea">
          <span>Table</span>
          <Controller
            name={'table_name'}
            control={control}
            render={({ field: { onChange, value } }) => (
              <CmDataSelect
                value={value}
                onChange={onChange}
                errorMessage={errors.table_name?.message}
                disabled={metaType === 'non-persistent'}
                optionsData={formatDropdownData(tableList, 'table_name', 'table_name')}
              />
            )}
          />
        </label>
        <label className="labelFormArea">
          <span>Column</span>
          <Controller
            name={'column_name'}
            control={control}
            render={({ field: { onChange, value } }) => (
              <CmDataSelect
                value={value}
                onChange={onChange}
                errorMessage={errors.column_name?.message}
                disabled={metaType === 'non-persistent'}
                optionsData={formatDropdownData(columnList, 'column_name', 'column_name')}
              />
            )}
          />
        </label>
        <label className="labelFormArea">
          <span>Masking</span>
          <Controller
            name={'masking'}
            control={control}
            render={({ field: { onChange, value } }) => (
              <CmRadioGroup
                data={USE_OPTION_FIELD}
                value={value}
                onRadioChange={onChange}
                error={!!errors.masking}
                helperText={errors.masking?.message?.toString()}
                labelWidth={30}
                disabledAll={fieldType !== 'String'}
              />
            )}
          />
        </label>
        <label className="labelFormArea">
          <MaskingRangeWrapper>
            <Controller
              name={'masking_range'}
              control={control}
              render={({ field: { onChange, value } }) => (
                <CmTextField
                  label="Range"
                  type="outside"
                  onChange={onChange}
                  value={value}
                  error={!!errors.masking_range}
                  helperText={errors.masking_range?.message}
                  disabled={masking !== 'use'}
                />
              )}
            />
          </MaskingRangeWrapper>
        </label>

        <label className="labelFormArea">
          <span>Encrypt</span>
          <Controller
            name={'encrypt'}
            control={control}
            render={({ field: { onChange, value } }) => (
              <CmRadioGroup
                data={USE_OPTION_FIELD}
                value={value}
                onRadioChange={onChange}
                error={!!errors.encrypt}
                helperText={errors.encrypt?.message?.toString()}
                labelWidth={30}
                disabledAll={fieldType !== 'String'}
              />
            )}
          />
        </label>
        <label className="labelFormArea">
          <span>Default Value</span>
          <TextField
            {...register('default_value')}
            className="labelTextField"
            size="small"
            placeholder={TYPE_ACTIVE_PLACEHOLDER_DEFAULT_VALUES.includes(fieldType) ? TIME_PLACEHOLDER : ''}
            helperText={errors.default_value?.message}
            error={!!errors.default_value}
            disabled={!!TYPE_DISABLE_DEFAULT_VALUES.includes(fieldType)}
          />
        </label>
        <label className="labelFormArea">
          <span>Use</span>
          <Controller
            name={'is_use'}
            control={control}
            render={({ field: { onChange, value } }) => (
              <CmRadioGroup
                data={formatDropdownData(BOOLEAN_OPTION_FIELD, 'value', 'label')}
                value={value}
                onRadioChange={onChange}
                error={!!errors.is_use}
                helperText={errors.is_use?.message?.toString()}
                labelWidth={30}
              />
            )}
          />
        </label>
      </ModalContentWrapper>
    </CmModal>
  );
}
