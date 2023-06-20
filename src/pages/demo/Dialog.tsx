import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { IsNotEmpty } from 'class-validator';

import { CmButton } from '@/components/atoms/CmButton';
import { CmTextField } from '@/components/atoms/CmTextField';
import CmConfirmationDialog from '@/components/molecules/CmConfirmationDialog';
import CmFormDialog from '@/components/molecules/CmFormDialog';

import { IDialogBaseRef } from '@/types/common';

class ExampleDTO {
  @IsNotEmpty({ message: 'This field cannot blank' })
  input_inside: string;

  @IsNotEmpty({ message: 'This field cannot blank' })
  input_outside: string;
}

const resolver = classValidatorResolver(ExampleDTO);

const Form = ({ onClose }: { onClose: () => void }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    values: {
      input_inside: '',
      input_outside: '',
    },
    resolver,
  });

  const onSubmit = handleSubmit((data) => {
    onClose();
  });

  return (
    <>
      <Controller
        name={'input_inside'}
        control={control}
        render={({ field: { onChange, value } }) => (
          <CmTextField
            label="Input with label inside"
            type="inside"
            onChange={onChange}
            value={value}
            error={!!errors?.input_inside}
            helperText={errors?.input_inside?.message?.toString()}
          />
        )}
      />
      <Controller
        name={'input_outside'}
        control={control}
        render={({ field: { onChange, value } }) => (
          <CmTextField
            label="Input with label outside"
            type="outside"
            onChange={onChange}
            value={value}
            error={!!errors?.input_outside}
            helperText={errors?.input_outside?.message}
          />
        )}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <CmButton
          variant="text"
          btnTitle="Reset"
          onClick={() => {
            reset({
              input_inside: '',
              input_outside: '',
            });
          }}
        />
        <div>
          <CmButton
            variant="text"
            btnTitle="Cancel"
            onClick={onClose}
          />
          <CmButton
            variant="contained"
            btnTitle="Save"
            onClick={onSubmit}
          />
        </div>
      </div>
    </>
  );
};

function Dialog() {
  const confirmationDialogRef = useRef<IDialogBaseRef>(null);
  const formDialogRef = useRef<IDialogBaseRef>(null);
  const formDialogLargeRef = useRef<IDialogBaseRef>(null);

  return (
    <>
      <CmConfirmationDialog
        title="Delete application"
        ref={confirmationDialogRef}
        cancelLabel="No"
        confirmedLabel="Delete"
      >
        <p>Are you sure to delete this application?</p>
      </CmConfirmationDialog>

      <CmFormDialog
        title="Controlled form"
        ref={formDialogRef}
      >
        <Form
          onClose={() => {
            formDialogRef.current?.hide();
          }}
        />
      </CmFormDialog>

      <CmFormDialog
        title="Controlled form"
        ref={formDialogLargeRef}
        width="lg"
      >
        <Form
          onClose={() => {
            formDialogLargeRef.current?.hide();
          }}
        />
      </CmFormDialog>

      <CmButton
        variant="contained"
        onClick={() => {
          confirmationDialogRef.current?.show(() => {
            console.log('This cb will run when click on the confirmation button');
          });
        }}
        btnTitle="Confirmation Dialog"
      />
      <CmButton
        variant="contained"
        onClick={() => {
          formDialogRef.current?.show();
        }}
        btnTitle="Form Dialog"
      />
      <CmButton
        variant="contained"
        onClick={() => {
          formDialogLargeRef.current?.show();
        }}
        btnTitle="Form Dialog large"
      />
    </>
  );
}

export default Dialog;
