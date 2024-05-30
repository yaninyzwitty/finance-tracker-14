import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import ImportTable from "./import-table";
import {
  convertAmountFromMilliUnits,
  convertAmountToMilliUnits,
} from "@/lib/utils";
const dateFormat = "yyyy-MM-dd HH:mm:ss";
import {format, parse} from "date-fns";
const outputFormat = "yyyy-MM-dd";

const requiredOptions = ["amount", "date", "payee"];
interface SelectedColState {
  [key: string]: string | null;
}
type Props = {
  data: string[][];
  onCancel: () => void;
  onSubmit: (data: any) => void;
};

function ImportCard({data, onCancel, onSubmit}: Props) {
  const [selectedCols, setSelectedCols] = useState<SelectedColState>({});
  const headers = data[0];
  const body = data.slice(1);

  const onTableHeadSelectChange = (colIndex: number, value: string | null) => {
    setSelectedCols((prev) => {
      const newSelectedCols = {...prev};
      for (const key in newSelectedCols) {
        if (newSelectedCols[key] === value) {
          newSelectedCols[key] = null;
        }
      }

      if (value === "skip") {
        value = null;
      }
      newSelectedCols[`column_${colIndex}`] = value;
      return newSelectedCols;
    });
  };

  const progress = Object.values(selectedCols).filter(Boolean).length;
  const handleContinue = () => {
    const getColindex = (col: string) => {
      return col.split("_")[1];
    };
    const mappedData = {
      headers: headers.map((_hdr, index) => {
        const colIndex = getColindex(`column_${index}`);
        return selectedCols[`column_${colIndex}`] || null;
      }),
      body: body
        .map((row) => {
          const transformedRow = row.map((cell, index) => {
            const colIndex = getColindex(`column_${index}`);
            return selectedCols[`column_${colIndex}`] ? cell : null;
          });

          return transformedRow.every((item) => item === null)
            ? []
            : transformedRow;
        })
        .filter((row) => row.length > 0),
    };

    const arrayOfData = mappedData.body.map((row) => {
      return row.reduce((acc: any, cell, idx) => {
        const header = mappedData.headers[idx];
        if (header !== null) {
          acc[header] = cell;
        }
        return acc;
      }, {});
    });

    const formattedData = arrayOfData.map((item) => ({
      ...item,
      amount: convertAmountToMilliUnits(parseFloat(item.amount)),
      date: format(parse(item.date, dateFormat, new Date()), outputFormat),
    }));

    onSubmit(formattedData);
  };
  return (
    <div>
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none shadow-sm">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:gap-x-4 flex lg:justify-between">
            <CardTitle className="text-xl line-clamp-1">
              Import Transaction{" "}
            </CardTitle>
            <div className="flex items-center flex-col lg:flex-row  gap-y-2">
              <Button
                onClick={onCancel}
                size={"sm"}
                className="w-full lg:w-auto"
              >
                Cancel{" "}
              </Button>
              <Button
                size={"sm"}
                disabled={progress < requiredOptions.length}
                className="w-full lg:w-auto lg:ml-2"
                onClick={handleContinue}
              >
                Continue ({progress} / {requiredOptions.length})
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ImportTable
              headers={headers}
              body={body}
              selectedCols={selectedCols}
              onTableHeadSelectChange={onTableHeadSelectChange}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ImportCard;
