import styled from "styled-components";
import type { MeterType } from "../types/MeterType";

export const Tr = styled.tr`
  height: 56px;

  &:hover {
    background: #f9fafb;
  }
`;

export const Td = styled.td`
  padding: 16px;
  font-size: 14px;
  color: #111827;

  border-bottom: 1px solid #eef2f7;
  vertical-align: middle;
  position: relative;
`;

export const TypeCell = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const TypeIcon = styled.span<{ $type: MeterType }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  font-size: 16px;

  &::before {
    content: ${({ $type }) =>
      $type === "ColdWaterAreaMeter" ? "'💧'" : "'🔥'"};
  }

  color: ${({ $type }) =>
    $type === "ColdWaterAreaMeter" ? "#3b82f6" : "#ef4444"};
`;

export const AddressCell = styled.div`
  max-width: 360px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;