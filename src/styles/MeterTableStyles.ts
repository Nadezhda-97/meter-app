import styled from "styled-components";

export const TableWrapper = styled.div`
  width: 100%;
  max-width: 1200px;

  max-height: calc(100vh - 160px);
  overflow-y: auto;

  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
`;

export const Thead = styled.thead``;

export const Th = styled.th`
  position: sticky;
  top: 0;
  z-index: 2;

  background: #f5f7fa;
  color: #6b7280;

  font-size: 13px;
  font-weight: 500;
  text-align: left;

  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
`;