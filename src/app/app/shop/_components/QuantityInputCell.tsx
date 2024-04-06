'use client'

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

const QuantityInputCell = ({ row, column, table }: { row: any, column: any, table: any }) => {
  const initialValue = Number(row.getValue(column.id));
  const [itemValue, setItemValue] = useState(initialValue);

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, itemValue);
  };

  useEffect(() => {
    setItemValue(initialValue);
  }, [initialValue]);

  return (
    <Input
      className="w-16"
      type="number"
      value={itemValue}
      onBlur={onBlur}
      onChange={(e) => setItemValue(Number(e.target.value))}
    />
  );
};

export default QuantityInputCell;

