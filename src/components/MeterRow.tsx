import React from "react";
import styled from "styled-components";
import type { MeterInstance } from "../models/Meter";

const Td = styled.td`
  padding: 8px;
  border-bottom: 1px solid #eee;
`;

interface MeterRowProps {
  meter: MeterInstance;
  index: number;
}

export const MeterRow: React.FC<MeterRowProps> = ({ meter, index }) => {
  return (
    <tr>
      <Td>{index + 1}</Td>
      <Td>{meter._type === "ColdWaterAreaMeter" ? "ХВС" : "ГВС"}</Td>
      <Td>{new Date(meter.installation_date).toLocaleDateString()}</Td>
      <Td>{meter.is_automatic ? "Да" : "Нет"}</Td>
      <Td>{meter.initial_values.join(", ")}</Td>
      <Td>{meter.description || "—"}</Td>
    </tr>
  );
};
