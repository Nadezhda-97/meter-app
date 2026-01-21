import styled from "styled-components";

export const TableWrapper = styled.div`
  width: 100%;
  max-width: 1200px;

  max-height: calc(100vh - 160px);
  overflow-y: auto;

  background: #ffffff;
  border: 1px solid #ccc;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
`;

export const Th = styled.th`
  position: sticky;
  top: 0;
  z-index: 2;

  background: #f5f7fa;
  color: #6b7280;

  text-align: left;

  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
`;