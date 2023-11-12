import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { europeanCountries } from "@/helpers"
import phoneCountryCode from "@/json/countries_en.json"

export const AreaCode = ({ onChange, value }: { onChange: () => void; value: string | undefined }) => {
  const selectedCountries = phoneCountryCode
    .filter((country) => europeanCountries.includes(country.name))
    .sort((a, b) => {
      const indexA = europeanCountries.indexOf(a.name)
      const indexB = europeanCountries.indexOf(b.name)

      if (a.name === "Poland") {
        return -1 // Polska ma zawsze pierwszeństwo
      } else if (b.name === "Poland") {
        return 1 // Polska ma zawsze pierwszeństwo
      } else if (a.name === "Germany") {
        return -1 // Niemcy mają drugie miejsce
      } else if (b.name === "Germany") {
        return 1 // Niemcy mają drugie miejsce
      }

      return indexA - indexB
    })

  return (
    <Select
      onValueChange={onChange}
      defaultValue={value}
    >
      <SelectTrigger className="min-w-[110px] max-w-[120px]">
        <SelectValue placeholder="+00" />
      </SelectTrigger>
      <SelectContent className="overflow-y-auto max-h-[10rem]">
        <SelectGroup>
          {/* <SelectLabel>Numer kier.</SelectLabel> */}
          {selectedCountries.map((code) => (
            <SelectItem
              key={code.dialCode}
              value={code.dialCode}
            >
              <div className="flex space-x-2 items-center">
                <img
                  src={code.flag}
                  className="w-4 h-4"
                />
                <span>{code.dialCode}</span>
              </div>
            </SelectItem>
          ))}
          {/* <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem> */}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
