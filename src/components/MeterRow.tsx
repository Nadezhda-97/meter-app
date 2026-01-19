import React from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import type { MeterInstance } from "../models/Meter";
import { useRootStore } from "../hooks/useRootStore";

const Tr = styled.tr`
  &:hover {
    background: #f9f9f9;
  }
`;

const Td = styled.td`
  padding: 8px;
  border-bottom: 1px solid #eee;
  position: relative;
`;

const DeleteButton = styled.button`
  display: none;
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 2px 6px;
  cursor: pointer;

  tr:hover & {
    display: inline-block;
  }
`;

interface MeterRowProps {
  meter: MeterInstance;
  index: number;
  onDelete: (id: string) => void;
}

export const MeterRow: React.FC<MeterRowProps> = observer(({ meter, index, onDelete }) => {
  const { areaStore } = useRootStore();

  const area = areaStore.areas.get(meter.areaId);

  const address = area
  ? `ул. ${area.street}, д. ${area.house}, кв. ${area.apartment ?? "—"}`
  : "Загрузка...";

  const installationDate = new Date(meter.installation_date).toLocaleDateString("ru-RU");
  return (
    <Tr>
      <Td>{index + 1}</Td>
      <Td>{meter._type === "ColdWaterAreaMeter" ? "ХВС" : "ГВС"}</Td>
      <Td>{installationDate}</Td>
      <Td>{meter.is_automatic ? "Да" : "Нет"}</Td>
      <Td>{meter.initial_values.join(", ")}</Td>
      <Td>{address}</Td>
      <Td>{meter.description || "—"}</Td>

      <Td>
        <DeleteButton onClick={() => onDelete(meter.id)}>X</DeleteButton>
      </Td>
      
    </Tr>
  );
});
