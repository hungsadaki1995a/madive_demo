import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Box, TextField } from '@mui/material';

import { CmButton } from '@/components/atoms/CmButton';
import { CmDataSelect } from '@/components/atoms/CmDataInput';
// Common Atoms
import CmModal from '@/components/atoms/CmModal';
import { CmRadioGroup, RadioItemProps } from '@/components/atoms/CmRadioGroup';

import { NodeDto } from '@/types/dtos/nodeDtos';
import NodeModel from '@/types/models/nodeModel';

const optionSSL: RadioItemProps<string | number | boolean>[] = [
  {
    value: 'TRUE',
    label: 'yes',
  },
  {
    value: 'FALSE',
    label: 'no',
  },
];

const nodeTypeList = [
  {
    label: 'ALL',
    value: 'ALL',
  },
  {
    label: 'TEST',
    value: 'TEST',
  },
  {
    label: 'RUNTIME',
    value: 'RUNTIME',
  },
  {
    label: 'MASTER',
    value: 'MASTER',
  },
];

const defaultValues: NodeModel = {
  node_type: 'TEST',
  node_name: '',
  node_ip: '',
  node_file_port: '',
  node_tcp_port: '',
  node_http_port: '',
  node_is_ssl: 'FALSE',
  description: '',
};

const resolver = classValidatorResolver(NodeModel);

type NodeModalProps = {
  visible: boolean;
  handleSave: (data: NodeDto) => Promise<void>;
  handleClose: () => void;
  data: NodeDto | null;
};

export default function NodeModal({ visible, handleSave, handleClose, data }: NodeModalProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<NodeModel>({ resolver, defaultValues });

  const handleSubmitForm = async (formData: NodeModel) => {
    await handleSave(formData as NodeDto);

    handleClose();
  };

  const onClose = () => {
    handleClose();
  };

  const footerRender = () => (
    <Box className="alignL">
      <CmButton
        id="rightBtn1"
        variant="text"
        btnTitle="Cancel"
        startIcon={<></>}
        className=""
        onClick={onClose}
      />
      <CmButton
        id="rightBtn2"
        variant="contained"
        btnTitle="OK"
        startIcon={<></>}
        className=""
        onClick={handleSubmit(handleSubmitForm)}
      />
    </Box>
  );

  useEffect(() => {
    if (data) {
      reset({ ...data });
    }
  }, [data]);

  return (
    <CmModal
      title={data ? 'Update Node' : 'Create Node'}
      visible={visible}
      onClose={handleClose}
      className="medium"
      footerRenderAs={footerRender}
      onSave={handleSubmit(handleSubmitForm)}
    >
      {/* contents */}

      <label className="labelFormArea">
        <span>Node Name</span>
        <TextField
          className="labelTextField"
          size="small"
          {...register('node_name')}
        />
      </label>
      <label className="labelFormArea">
        <span>IP</span>
        <TextField
          className="labelTextField"
          size="small"
          {...register('node_ip')}
        />
      </label>
      <label className="labelFormArea">
        <span>File Port</span>
        <TextField
          className="labelTextField"
          size="small"
          {...register('node_file_port')}
          error={!!errors.node_file_port}
          helperText={errors.node_file_port?.message}
        />
      </label>
      <label className="labelFormArea">
        <span>Http Port</span>
        <TextField
          className="labelTextField"
          size="small"
          {...register('node_http_port')}
          error={!!errors.node_http_port}
          helperText={errors.node_http_port?.message}
        />
      </label>
      <label className="labelFormArea">
        <span>ProObject Port</span>
        <TextField
          className="labelTextField"
          size="small"
          {...register('node_tcp_port')}
          error={!!errors.node_tcp_port}
          helperText={errors.node_tcp_port?.message}
        />
      </label>
      <label className="labelFormArea">
        <span>SSL</span>
        <Controller
          name="node_is_ssl"
          control={control}
          // defaultValue={'FALSE'}
          render={({ field: { onChange, value } }) => (
            <CmRadioGroup
              data={optionSSL}
              value={value}
              onRadioChange={onChange}
            />
          )}
        />
      </label>
      <label className="labelFormArea">
        <span>Node type</span>
        <Controller
          name="node_type"
          control={control}
          defaultValue="TEST"
          render={({ field: { onChange, value } }) => (
            <CmDataSelect
              className=""
              optionsData={nodeTypeList}
              onChange={onChange}
              value={value}
            />
          )}
        />
      </label>
      <label className="labelFormArea">
        <span>Description</span>
        <TextField
          className="labelTextField"
          size="medium"
          {...register('description')}
        />
      </label>
    </CmModal>
  );
}
