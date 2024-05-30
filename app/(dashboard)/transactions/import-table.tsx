import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import TableHeadSelect from "./table-head-select";

type Props = {
  headers: string[];
  body: string[][];
  selectedCols: Record<string, string | null>;
  onTableHeadSelectChange: (colIndex: number, value: string | null) => void;
};

function ImportTable({
  headers,
  body,
  selectedCols,
  onTableHeadSelectChange,
}: Props) {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            {headers.map((_, index) => (
              <TableHead key={index} className="">
                <TableHeadSelect
                  columnIndex={index}
                  selectedCols={selectedCols}
                  onChange={onTableHeadSelectChange}
                />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {body.map((row, index) => (
            <TableRow key={index}>
              {row.map((cell, index) => (
                <TableCell key={index} className="px-2 py-1">
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ImportTable;
