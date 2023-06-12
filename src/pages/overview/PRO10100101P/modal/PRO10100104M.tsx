import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Box, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';

// Common Atoms
import { CmButton, CmIconButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';

import AppAndSGAPI from '@/apis/ServiceGroupApi';
// img, icon
import { ReactComponent as ModalAdd } from '@/stylesheets/images/cmModalAdd.svg';
import { ReactComponent as ModalDelIcon } from '@/stylesheets/images/cmModalDelIcon.svg';
import { ApplicationDto } from '@/types/dtos/applicationDtos';
import { SgListResponse } from '@/types/dtos/overviewDtos';

type ServiceGroup = {
  visible: boolean;
  clickedItem?: ApplicationDto;
  handleSave?: () => void;
  handleClose: () => void;
};

type FormData = {
  creator: string;
  description: string;
  group_id: string;
  group_name: string;
  manager: string;
  resource_id: string;
  physical_name: string;
  logical_name: string;
};

export default function ServiceGroup({ clickedItem, visible, handleSave, handleClose }: ServiceGroup) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [dataSg, setDataSg] = useState<SgListResponse[]>([]);
  const [dataNew, setDataNew] = useState<SgListResponse[]>([]);
  const onSubmit = (data: FormData) => {
    setDataNew((prew) => [
      ...prew,
      {
        physical_name: data.physical_name,
        logical_name: data.logical_name,
        group_id: clickedItem?.resource_id,
        group_name: clickedItem?.logical_name,
        creator: clickedItem?.creator,
      },
    ]);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AppAndSGAPI.getSglist(clickedItem?.resource_id);
        setDataSg(response?.dto.ServiceGroupDto);
        setDataNew(response?.dto.ServiceGroupDto);
      } catch (error) {
        console.error('Delete application failed:', error);
      }
    };
    // setDataNew((prevDataNew) => [...prevDataNew, ...dataSg]);
    fetchData();
  }, [clickedItem]);
  const handleSaveService = () => {
    handleClose();
    reset();
  };

  const handleDeleteRow = (itemId: any) => {
    setDataNew((prevDataNew) => prevDataNew.filter((item) => item.physical_name !== itemId));
  };
  const footerRender = () => (
    <Box className="alignL">
      <CmButton
        id="rightBtn1"
        variant="text"
        btnTitle="Cancel"
        startIcon={<></>}
        className=""
        color="info"
        onClick={handleClose}
      />
      <CmButton
        id="rightBtn2"
        variant="contained"
        btnTitle="Save"
        startIcon={<></>}
        className=""
        color="info"
        onClick={handleSaveService}
      />
    </Box>
  );

  return (
    <CmModal
      title="Service Group Registration"
      visible={visible}
      onSave={handleSubmit(onSubmit)}
      onClose={handleClose}
      className="medium"
      footerRenderAs={footerRender}
    >
      {/* contents */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="inputArea">
          <Controller
            name="physical_name"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Physical Name"
                size="small"
                error={!!errors.physical_name}
                helperText={errors.physical_name ? '' : ''}
              />
            )}
          />
          <Controller
            name="logical_name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Logical Name"
                size="small"
              />
            )}
          />
          <CmButton
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            startIcon={<ModalAdd />}
          />
        </label>
      </form>

      <Table className="addRow">
        <TableHead>
          <TableRow>
            <TableCell>Physical Name</TableCell>
            <TableCell>Logical Name</TableCell>
            <TableCell className="iconBtn"> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataNew?.map((item, index) => (
            <TableRow key={item.resource_id}>
              <TableCell>{item.physical_name}</TableCell>
              <TableCell>
                <TextField
                  hiddenLabel
                  fullWidth
                  size="small"
                  defaultValue={item.logical_name}
                  onChange={(event) => event.target.value}
                />
              </TableCell>
              <TableCell align="center">
                <CmIconButton
                  onClick={() => handleDeleteRow(item.physical_name)}
                  iconName={<ModalDelIcon />}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CmModal>
  );
}
