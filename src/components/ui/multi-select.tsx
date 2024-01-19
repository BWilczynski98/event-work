/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { X } from "lucide-react"
import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Command, CommandGroup, CommandItem } from "@/components/ui/command"
import { Command as CommandPrimitive } from "cmdk"
import i18next from "i18next"

type Framework = Record<"value" | "label", string>

const PL = [
  { value: "polish", label: "Polski" },
  { value: "english", label: "Angielski" },
  { value: "german", label: "Niemiecki" },
  { value: "bulgarian", label: "Bułgarski" },
  { value: "croatian", label: "Chorwacki" },
  { value: "czech", label: "Czeski" },
  { value: "danish", label: "Duński" },
  { value: "dutch", label: "Holenderski" },
  { value: "estonian", label: "Estoński" },
  { value: "finnish", label: "Fiński" },
  { value: "french", label: "Francuski" },
  { value: "greek", label: "Grecki" },
  { value: "hungarian", label: "Węgierski" },
  { value: "irish", label: "Irlandzki" },
  { value: "italian", label: "Włoski" },
  { value: "latvian", label: "Łotewski" },
  { value: "lithuanian", label: "Litewski" },
  { value: "maltese", label: "Maltański" },
  { value: "portuguese", label: "Portugalski" },
  { value: "romanian", label: "Rumuński" },
  { value: "slovak", label: "Słowacki" },
  { value: "slovenian", label: "Słoweński" },
  { value: "spanish", label: "Hiszpański" },
  { value: "swedish", label: "Szwedzki" },
]

const EN = [
  { value: "english", label: "English" },
  { value: "german", label: "German" },
  { value: "polish", label: "Polish" },
  { value: "bulgarian", label: "Bulgarian" },
  { value: "croatian", label: "Croatian" },
  { value: "czech", label: "Czech" },
  { value: "danish", label: "Danish" },
  { value: "dutch", label: "Dutch" },
  { value: "estonian", label: "Estonian" },
  { value: "finnish", label: "Finnish" },
  { value: "french", label: "French" },
  { value: "greek", label: "Greek" },
  { value: "hungarian", label: "Hungarian" },
  { value: "irish", label: "Irish" },
  { value: "italian", label: "Italian" },
  { value: "latvian", label: "Latvian" },
  { value: "lithuanian", label: "Lithuanian" },
  { value: "maltese", label: "Maltese" },

  { value: "portuguese", label: "Portuguese" },
  { value: "romanian", label: "Romanian" },
  { value: "slovak", label: "Slovak" },
  { value: "slovenian", label: "Slovenian" },
  { value: "spanish", label: "Spanish" },
  { value: "swedish", label: "Swedish" },
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function FancyMultiSelect({ onChange }: { onChange: any }) {
  const FRAMEWORKS: Framework[] = i18next.language === "pl" ? PL : EN
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<Framework[]>([])
  const [inputValue, setInputValue] = React.useState("")

  const handleUnselect = React.useCallback((framework: Framework) => {
    setSelected((prev) => prev.filter((s) => s.value !== framework.value))
  }, [])

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current
    if (input) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (input.value === "") {
          setSelected((prev) => {
            const newSelected = [...prev]
            newSelected.pop()
            return newSelected
          })
        }
      }
      // This is not a default behaviour of the <input /> field
      if (e.key === "Escape") {
        input.blur()
      }
    }
  }, [])

  const selectables = FRAMEWORKS.filter((framework) => !selected.includes(framework))

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex gap-1 flex-wrap">
          {selected.map((framework) => {
            return (
              <Badge
                key={framework.value}
                variant="secondary"
              >
                {framework.label}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(framework)
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={() => handleUnselect(framework)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            )
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            // placeholder="Wybierz języki jakie znasz"
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 ? (
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-40 overflow-auto">
              {selectables.map((framework) => {
                return (
                  <CommandItem
                    key={framework.value}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    onSelect={() => {
                      setInputValue("")
                      setSelected((prev) => [...prev, framework])

                      onChange((prev: any) => [...prev, framework.value])
                    }}
                    className={"cursor-pointer"}
                  >
                    {framework.label}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  )
}
