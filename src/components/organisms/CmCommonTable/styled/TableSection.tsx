import styled from 'styled-components';

export default styled.div`
  padding: 12;
  flex-grow: 10;
  overflow-y: auto;
  & table {
    table-layout: fixed;
  }
  & div {
    box-shadow: none;
  }
  & thead tr {
    position: sticky;
    top: 0;
    z-index: 1;
  }
  & thead tr th {
    font-size: 12;
    font-weight: 600;
    background-color: #f4f7fc;
    white-space: nowrap;
    padding: 12;
    & span {
      padding: 0;
    }
  }
  & tbody {
    padding: 0 16px;
    background-color: #fff;
    & tr:hover {
      background-color: #e6f4ff;
      & td {
        font-weight: 600;
        color: #000;
      }
    }
    & td {
      padding: 12;
      font-size: 12;
      white-space: nowrap;
      font-weight: 450;
      color: #888;
      & span {
        padding: 0;
      }
    }
  }
`;
