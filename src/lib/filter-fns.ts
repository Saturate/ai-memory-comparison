import type { FilterFn } from "@tanstack/react-table";

/** Matches if any selected value appears in the cell's array */
// biome-ignore lint/suspicious/noExplicitAny: tanstack generics require any for cross-type column usage
export const arrayFilterFn: FilterFn<any> = (row, columnId, filterValue) => {
  const cellValue = row.getValue<string[]>(columnId);
  if (!Array.isArray(cellValue)) return false;
  return (filterValue as string[]).some((v) => cellValue.includes(v));
};

/** Matches if the cell's scalar value is in the selected set */
// biome-ignore lint/suspicious/noExplicitAny: tanstack generics require any for cross-type column usage
export const scalarFilterFn: FilterFn<any> = (row, columnId, filterValue) => {
  const cellValue = row.getValue<string>(columnId);
  return (filterValue as string[]).includes(cellValue);
};
