import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {cn} from "@/lib/utils";
type Props = {
  columnIndex: number;
  selectedCols: Record<string, string | null>;
  onChange: (columnIndex: number, value: string | null) => void;
};

const options = ["amount", "payee", "date"];

function TableHeadSelect({columnIndex, onChange, selectedCols}: Props) {
  const currentSelect = selectedCols[`column_${columnIndex}`];
  return (
    <Select
      value={currentSelect || ""}
      onValueChange={(value) => onChange(columnIndex, value)}
    >
      <SelectTrigger
        className={cn(
          "focus:ring-offset-0 focus:ring-transparent outline-none border-none bg-transparent capitalize",
          currentSelect && "text-blue-500"
        )}
      >
        <SelectValue placeholder="skip"></SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="skip">Skip</SelectItem>
        {options.map((option, idx) => {
          const disabled =
            Object.values(selectedCols).includes(option) &&
            selectedCols[`column_${columnIndex}`] !== option;
          return (
            <SelectItem
              key={idx}
              disabled={disabled}
              className="capitalize"
              value={option}
            >
              {option}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

export default TableHeadSelect;
