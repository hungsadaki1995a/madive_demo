import Radio from '@mui/material/Radio';

import {
  CmRadioGroupButtonsStyled,
  CmRadioGroupLabelStyled,
  CmRadioGroupStyled,
  CmRadioItemStyled,
} from './styled/CmRadioGroupStyled';

interface IRadioGroup {
  title?: string;
}

function CmRadioGroup({ title }: IRadioGroup) {
  return (
    <CmRadioGroupStyled
      onChange={(e) => {
        console.log('radio button selected value', (e.target as HTMLInputElement).value);
      }}
    >
      {title && (
        <CmRadioGroupLabelStyled
          id={`radio-buttons-group-label-${title}`}
          width="35%"
        >
          {title}
        </CmRadioGroupLabelStyled>
      )}
      <CmRadioGroupButtonsStyled
        row
        aria-labelledby={`radio-buttons-group-label-${title}`}
        name={`radio-buttons-group-${title}`}
        width="65%"
      >
        <CmRadioItemStyled
          value="male"
          control={<Radio size="small" />}
          label="Male"
        />
        <CmRadioItemStyled
          value="female"
          control={<Radio size="small" />}
          label="Female"
        />
        <CmRadioItemStyled
          value="other"
          control={<Radio size="small" />}
          label="Other"
        />
        <CmRadioItemStyled
          value="disabled"
          disabled
          control={<Radio size="small" />}
          label="other"
        />
      </CmRadioGroupButtonsStyled>
    </CmRadioGroupStyled>
  );
}

export { CmRadioGroup };
