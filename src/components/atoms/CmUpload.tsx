import { Button } from '@mui/material';

type propsType = {
  onChange?: (file: any) => void;
};

function CmUpload(props: propsType) {
  const { onChange } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;

    typeof onChange === 'function' && onChange(files?.[0]);
  };

  return (
    <Button
      variant="contained"
      component="label"
      className="fileUpBtn"
    >
      <input
        id="upload-image"
        type="file"
        onChange={handleChange}
      />
    </Button>
  );
}
export { CmUpload };
