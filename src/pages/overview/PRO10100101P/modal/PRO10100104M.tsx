import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Box, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';

// Common Atoms
import { CmButton, CmIconButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';

// img, icon
import AppAndSGAPI from '@/apis/ServiceGroupApi';
import { ReactComponent as ModalAdd } from '@/stylesheets/images/cmModalAdd.svg';
import { ReactComponent as ModalDelIcon } from '@/stylesheets/images/cmModalDelIcon.svg';
import { ApplicationDto } from '@/types/dtos/applicationDtos';
import { SgListResponse } from '@/types/dtos/overviewDtos';
import { notify } from '@/utils/notify';

type ServiceGroup = {
  visible: boolean;
  clickedItem?: ApplicationDto;
  handleSave: () => void;
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
  const [dataEdit, setDataEdit] = useState<SgListResponse[]>([]);
  const [dataDelete, setDataDelete] = useState<SgListResponse[]>([]);
  const [dataAdd, setDataAdd] = useState<SgListResponse[]>([]);

  const onSubmit = (data: FormData) => {
    const isPhysicalNameExists = dataNew.some((item) => item.physical_name === data.physical_name);

    if (!isPhysicalNameExists) {
      setDataAdd((prevDataAdd) => [
        ...prevDataAdd,
        {
          physical_name: data.physical_name,
          logical_name: data.logical_name,
          group_id: clickedItem?.resource_id,
          group_name: clickedItem?.physical_name,
          creator: clickedItem?.creator,
        },
      ]);
      setDataNew((prevDataNew) => [
        ...prevDataNew,
        {
          physical_name: data.physical_name,
          logical_name: data.logical_name,
          group_id: clickedItem?.resource_id,
          group_name: clickedItem?.physical_name,
          creator: clickedItem?.creator,
        },
      ]);
      reset();
    } else {
      notify.error('Physical Name is Duplicated ! ');
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AppAndSGAPI.getServiceList(clickedItem?.resource_id);
        setDataSg(response?.dto.ServiceGroupDto);
        setDataNew(response?.dto.ServiceGroupDto);
      } catch (error) {
        console.error('Delete application failed:', error);
      }
    };
    fetchData();
  }, [clickedItem]);

  const handleSaveService = async () => {
    try {
      // Check Duplicate
      const filteredDataAdd = dataAdd.filter((item) => {
        return !dataDelete.some(
          (deleteItem) =>
            deleteItem.physical_name === item.physical_name && deleteItem.logical_name === item.logical_name
        );
      });
      const filteredDataDelete = dataDelete.filter((item) => {
        return !dataAdd.some(
          (addItem) => addItem.physical_name === item.physical_name && addItem.logical_name === item.logical_name
        );
      });
      // API implementation conditions
      if (dataDelete.length > 0) {
        await AppAndSGAPI.deleteSgData(filteredDataDelete);
      }
      if (dataAdd.length > 0) {
        await AppAndSGAPI.addSgData(filteredDataAdd);
      }
      if (dataEdit.length > 0) {
        await AppAndSGAPI.editSgData(dataEdit);
      }
      // Reset the value
      setDataAdd([]);
      setDataEdit([]);
      setDataDelete([]);
      handleClose();
      handleSave();
    } catch (error) {
      console.error('Save service group failed:', error);
    }
  };
  const handleCloseModal = () => {
    // Reset the value
    setDataAdd([]);
    setDataEdit([]);
    setDataDelete([]);
    setDataNew(dataSg);
    handleClose();
  };

  const handleDeleteRow = (itemId: any) => {
    console.log(itemId);
    setDataDelete((prevDataDelete) => [...prevDataDelete, itemId]);
    setDataNew((prevDataNew) => prevDataNew.filter((item) => item !== itemId));
  };
  const footerRender = () => (
    <Box className="alignL">
      <CmButton
        id="rightBtn1"
        variant="text"
        btnTitle="Cancel"
        startIcon={<></>}
        className=""
        onClick={handleCloseModal}
      />
      <CmButton
        id="rightBtn2"
        variant="contained"
        btnTitle="Save"
        startIcon={<></>}
        className=""
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
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Logical Name"
                size="small"
                error={!!errors.logical_name}
                helperText={errors.logical_name ? '' : ''}
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
                  onChange={(event) => {
                    const newValue = event.target.value;
                    setDataNew((prevDataNew) => {
                      const newData = prevDataNew.map((itemData) => {
                        if (itemData.resource_id === item.resource_id) {
                          return {
                            ...itemData,
                            logical_name: newValue,
                          };
                        }
                        return itemData;
                      });
                      return newData;
                    });
                    setDataEdit((prevDataEdit) => [
                      ...prevDataEdit,
                      {
                        ...item,
                        logical_name: newValue,
                      },
                    ]);
                  }}
                />
              </TableCell>
              <TableCell align="center">
                <CmIconButton
                  onClick={() => handleDeleteRow(item)}
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
