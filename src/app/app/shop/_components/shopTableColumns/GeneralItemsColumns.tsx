'use client'

import { ShopItem } from "@/common/types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import QuantityInputCell from "../QuantityInputCell";
import ShopItemsDialog from "../ShopItemsDialog";

const columns: ColumnDef<ShopItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nome
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "spaces",
    header: "Espaço",
    cell: ({ row }) => <div className="lowercase">{row.getValue("spaces")}</div>,
  },
  {
    accessorKey: "quantity",
    header: "Quantidade",
    cell: ({ row, column, table }) => {
      return <QuantityInputCell row={row} column={column} table={table} />
    },
  },
  {
    accessorKey: "price",
    header: "Preço",
    cell: ({ row }) => {
      const price = Number(row.getValue("price"));
      return <div className="text-left font-medium w-24">T$ {price.toFixed(2).replace('.', ',')}</div>
    },
  },
  {
    id: "actions",
    header: "Ações",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="space-x-2">
          <ShopItemsDialog item={row.original} />
        </div>
      )
    },
  },
]

export default columns;

