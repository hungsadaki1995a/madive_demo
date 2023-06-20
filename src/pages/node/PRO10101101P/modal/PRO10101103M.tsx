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
  node_type: '',
  node_name: '',
  node_ip: '',
  node_file_port: '',
  node_tcp_port: '',
  // node_path: '',
  // node_admin: '',
  node_http_port: '',
  node_is_ssl: '',
  description: '',
};

const resolver = classValidatorResolver(NodeModel);

type NodeModalProps = {
  visible: boolean;
  handleSave: (data: NodeDto) => Promise<void>;
  handleClose: () => void;
  data: NodeDto | null;
};

export default function EditNodeModal({ visible, handleSave, handleClose, data }: NodeModalProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<NodeModel>({ resolver, defaultValues });

  const handleSubmitForm = async (formData: NodeModel) => {
    // formData.node_admin = 'admin';
    // const res: any = await NodeApi.addNode(formData);

    reset();
    handleClose();
  };
  const onClose = () => {
    reset(defaultValues);
    handleClose();
  };

  useEffect(() => {
    reset({ ...data });
    return () => reset({ ...defaultValues });
  }, [handleSave]);

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

  return (
    <CmModal
      title={data ? 'Update Node' : 'CreateNode'}
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
          error={!!errors.node_name}
          helperText={errors.node_name?.message}
        />
      </label>
      <label className="labelFormArea">
        <span>IP</span>
        <TextField
          className="labelTextField"
          size="small"
          {...register('node_ip')}
          error={!!errors.node_ip}
          helperText={errors.node_ip?.message}
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
          render={({ field: { onChange, value } }) => (
            <CmRadioGroup
              data={optionSSL}
              value={value}
              onRadioChange={onChange}
              // error={!!errors.node_is_ssl}
              // helperText={errors.node_is_ssl?.message?.toString()}
            />
          )}
        />
      </label>
      <label className="labelFormArea">
        <span>Node type</span>
        <Controller
          name="node_type"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CmDataSelect
              className=""
              optionsData={nodeTypeList}
              onChange={onChange}
              value={value}
              // value={nodeType}
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
