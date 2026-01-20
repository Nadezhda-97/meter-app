import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import { useRootStore } from "../hooks/useRootStore";
import type { MeterInstance } from "../models/Meter";

import { MeterRow } from "./MeterRow";
import { TableWrapper, Table, Thead, Th } from "../styles/MeterTableStyles";

export const MeterTable = observer(() => {
  const { meterStore } = useRootStore();

  useEffect(() => {
    meterStore.fetchMeters();
  }, [meterStore]);

  if (meterStore.loading) return <div>Загрузка...</div>;

  return (
    <TableWrapper>
      <Table>
        <Thead>
          <tr>
            <Th>№</Th>
            <Th>Тип</Th>
            <Th>Дата установки</Th>
            <Th>Автоматический</Th>
            <Th>Значение</Th>
            <Th>Адрес</Th>
            <Th>Примечание</Th>
            <Th></Th>
          </tr>
        </Thead>
        <tbody>
          {meterStore.meters.map((meter: MeterInstance, index: number) => (
            <MeterRow
              key={meter.id}
              meter={meter}
              index={index}
              onDelete={(id) => meterStore.deleteMeter(id)}
            />
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  );
});
