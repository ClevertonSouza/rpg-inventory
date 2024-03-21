"use client"

import * as React from "react"
import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import axios from "@/lib/api/axios";
import { PlayerToken } from "@/common/types";

const ComboToken = ({ value, setValue }: { value: string, setValue: (value: string) => void }) => {
  const [open, setOpen] = useState(false)
  const [tokens, setTokens] = useState<PlayerToken[]>([]);

  useEffect(() => {
    const fetchTokens = async () => {
      const response = await axios.get("/api/playerTokens/list");
      setTokens(response.data);
    }

    fetchTokens();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? tokens.find((token) => token.token === value)?.token
            : "Select token..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search token..." />
          <CommandEmpty>No token found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
            {tokens.map((token) => (
              <CommandItem
                key={token.id}
                value={token.token}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === token.token ? "opacity-100" : "opacity-0"
                  )}
                />
                {token.token}
              </CommandItem>
            ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default ComboToken;