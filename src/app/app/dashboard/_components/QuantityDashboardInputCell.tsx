'use client'

import { Input } from "@/components/ui/input";
import { Item } from "@prisma/client";
import { useEffect, useState } from "react";
import { updateItemQuantity } from "../actions";

const QuantityDashboardInputCell = ({ item }: { item: Item }) => {
  const [itemValue, setItemValue] = useState(item.quantity);

  useEffect(() => {
    setItemValue(item.quantity);
  }, [item.quantity]);

  const onBlur = async () => {
    await updateItemQuantity(item.id, itemValue);
  }

  return (
    <Input
      className="w-16"
      type="number"
      value={itemValue}
      onBlur={onBlur}
      onChange={(e) => setItemValue(e.target.value)}
    />
  );
};

export default QuantityDashboardInputCell;

