import styled from 'styled-components';

export default styled.div`
  display: flex;
  padding: 10px 10px 5px;
  & :disabled {
    cursor: not-allowed;
  }
`;
