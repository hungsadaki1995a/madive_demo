import styled from 'styled-components';

export default styled.div`
  min-width: 0 !important;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: end;

  &.opened {
    border: 1px solid #d3d5da;
    border-radius: 4px;

    & .MuiFormControl-root {
      display: block;
      border-left: 1px solid #d3d5da;
      height: 28px;
      margin: 0;

      & .MuiOutlinedInput-root {
        height: 28px;
      }

      & .MuiSelect-select {
        padding: 4px 26px 4px 8px;
      }
    }

    & fieldset {
      border: 0;
    }
  }

  &.closed {
    & .MuiFormControl-root {
      display: none;
    }
  }
`;
