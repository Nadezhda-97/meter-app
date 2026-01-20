import React from "react";
import { observer } from "mobx-react-lite";

import { useRootStore } from "../hooks/useRootStore";
import type { MeterInstance } from "../models/Meter";

import { TrashIcon } from "./TrashIcon";
import { DeleteButton } from "../styles/DeleteButtonStyles";
import { Tr, Td, TypeCell, TypeIcon, AddressCell } from "../styles/MeterRowStyles";

type MeterType = "ColdWaterAreaMeter" | "HotWaterAreaMeter";

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
      <Td>
        <TypeCell>
          <TypeIcon $type={meter._type as MeterType} />
          <span>{meter._type === "ColdWaterAreaMeter" ? "ХВС" : "ГВС"}</span>
        </TypeCell>
      </Td>
      <Td>{installationDate}</Td>
      <Td>{meter.is_automatic ? "Да" : "Нет"}</Td>
      <Td>{meter.initial_values.join(", ")}</Td>
      <Td>
        <AddressCell>
          {address}
        </AddressCell>
      </Td>
      <Td>{meter.description || "—"}</Td>
      <Td>
        <DeleteButton onClick={() => onDelete(meter.id)}>
          <TrashIcon />
        </DeleteButton>
      </Td>
    </Tr>
  );
});
