'use client'

import { ShopItem } from "@/common/types";
import { Input } from "@/components/ui/input";
import { Column, Row, Table } from "@tanstack/react-table";
import { useEffect, useState } from "react";

const QuantityInputCell = ({ row, column, table }: { row: Row<ShopItem>, column: Column<ShopItem, unknown>, table: Table<ShopItem> }) => {
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

