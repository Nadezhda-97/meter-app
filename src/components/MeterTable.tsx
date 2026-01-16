// таблица со списком счётчиков

import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useRootStore } from "../hooks/useRootStore";
import { MeterRow } from "./MeterRow";
import type { MeterInstance } from "../models/Meter";
import styled from "styled-components";

const TableWrapper = styled.div`
  max-height: 400px; // пример скролла
  overflow-y: auto;
  border: 1px solid #ccc;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  position: sticky;
  top: 0;
  background: #f5f5f5;
  padding: 8px;
  border-bottom: 1px solid #ccc;
`;

export const MeterTable = observer(() => {
  const { meterStore } = useRootStore();

  useEffect(() => {
    meterStore.fetchMeters();
  }, [meterStore]);

  if (meterStore.loading) return <div>Загрузка...</div>;

  return (
    <TableWrapper>
      <Table>
        <thead>
          <tr>
            <Th>#</Th>
            <Th>Тип</Th>
            <Th>Дата установки</Th>
            <Th>Автоматический</Th>
            <Th>Значение</Th>
            <Th>Примечание</Th>
          </tr>
        </thead>
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
