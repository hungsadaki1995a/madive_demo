import styled from 'styled-components';

export default styled.div`
  display: flex;
  > *:not(:first-child) {
    margin-left: 10px;
    margin-right: 10px;
  }
`;
