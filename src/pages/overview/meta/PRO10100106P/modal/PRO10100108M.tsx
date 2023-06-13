import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Box, InputAdornment, TextField } from '@mui/material';

import { CmButton } from '@/components/atoms/CmButton';
import { CmDataSelect } from '@/components/atoms/CmDataInput';
// Common Atoms
import CmModal from '@/components/atoms/CmModal';
import { CmRadioGroup } from '@/components/atoms/CmRadioGroup';
import { CmTextField } from '@/components/atoms/CmTextField';

// Common Atoms
import { MetaApi } from '@/apis';
import DbioApi from '@/apis/DbioApi';
import { MetaDtos } from '@/types/dtos/MetaDtos';
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

type EditMetaModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
  data: MetaDtos | null;
  reFetchData?: () => void;
  onSuccess?: (data?: MetaModel) => void;
  modifier: string;
};

export default function EditMetaModal({
  visible,
  handleSave,
  handleClose,
  onSuccess,
  data,
  modifier = '',
  reFetchData,
}: EditMetaModalProps) {
  const resolver = classValidatorResolver(MetaModel);

  //list data source
  const [dbTypeList, setDbTypeList] = useState([]);

  //list table data
  const [tableList, setTableList] = useState([]);

  //list column data
  const [columnList, setColumnList] = useState([]);

  //format data into metaModel data form
  const formatData = useMemo(() => {
    return {
      ...(data?.column_name ? { column_name: data.column_name } : { column_name: '' }),
      ...(data?.comments ? { comments: data.comments } : { comments: '' }),
      ...(data?.db_type ? { db_type: data.db_type } : { db_type: '' }),
      ...(data?.decimal_size ? { decimal_size: data.decimal_size } : { decimal_size: '' }),
      ...(data?.default_value ? { default_value: data.default_value } : { default_value: '' }),
      ...(data?.encrypt ? { encrypt: data.encrypt } : { encrypt: '' }),
      ...(data?.field_type ? { field_type: data.field_type } : { field_type: '' }),
      ...(data?.is_key ? { is_key: data.is_key } : { is_key: '' }),
      ...(data?.is_use ? { is_use: data.is_use } : { is_use: '' }),
      ...(data?.length ? { length: data.length } : { length: '' }),
      ...(data?.logical_name ? { logical_name: data.logical_name } : { logical_name: '' }),
      ...(data?.masking ? { masking: data.masking } : { masking: '' }),
      ...(data?.masking_range ? { masking_range: data.masking_range } : { masking_range: '' }),
      ...(data?.meta_type ? { meta_type: data.meta_type } : { meta_type: '' }),
      ...(data?.physical_name ? { physical_name: data.physical_name } : { physical_name: '' }),
      ...(data?.table_name ? { table_name: data.table_name } : { table_name: '' }),
      ...(data?.resource_group ? { resource_group: data.resource_group } : { resource_group: '' }),
    };
  }, [data]);

  const {
    register,
    setValue,
    watch,
    clearErrors,
    resetField,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<MetaModel>({ resolver, values: formatData || undefined, mode: 'onChange' });

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

  //loading status
  const [isFetching, setIsFetching] = useState<boolean>(false);

  //handle change close modal (clear error, close modal)
  const handleClickCloseModal = () => {
    clearErrors();
    handleClose();
  };

  // handle submit form
  const submitForm = async (formData: MetaModel) => {
    setIsFetching(true);
    const res = await MetaApi.editMeta({
      ...formData,
      ...{ modifier },
      ...(data?.resource_id ? { resource_id: data.resource_id } : { resource_id: '' }),
    });
    if (res?.dto) {
      notify.success('Update Meta Success!');
    } else {
      notify.error(res?.data?.exception?.name || 'Something went wrong');
    }
    onSuccess?.({ ...formData, ...{ modifier } });
    await reFetchData?.();
    setIsFetching(false);
    handleClickCloseModal();
  };

  // handle get list data source
  const getDataSourceData = async () => {
    const res = await DbioApi.getDbios();

    if (res?.data) {
      setDbTypeList(res?.data || []);
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

  //get data source; clear data source, table, column when metaType equal non-persistent and without data
  useEffect(() => {
    if (metaType === 'persistent') {
      getDataSourceData();
    }
    if (metaType === 'non-persistent' && !data) {
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
    <Box className="alignL">
      <CmButton
        id="rightBtn1"
        variant="text"
        btnTitle="Cancel"
        startIcon={<></>}
        className=""
        color="info"
        onClick={handleClickCloseModal}
        disabled={isFetching}
      />
      <CmButton
        id="rightBtn2"
        variant="contained"
        btnTitle="OK"
        startIcon={<></>}
        className=""
        color="info"
        onClick={handleSubmit(submitForm)}
        disabled={isFetching}
      />
    </Box>
  );

  return (
    <CmModal
      title="Edit Meta Field"
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
