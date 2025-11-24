import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Cat } from "../cat-interface";

export const columns: ColumnDef<Cat>[] = [
    {
        accessorKey: "id",
        header: () => <div className="text-center font-semibold">ID</div>,
        cell: ({ row }) => {
            const value = String(row.getValue("id") ?? "");
            return <div className="text-center">{value}</div>;
        }
    },
    {
        accessorKey: "name",
        header: () => <div className="text-center">Name</div>,
        cell: ({ row }) => {
            const value = String(row.getValue("name") ?? "");
            return <div className="text-center font-bold">{value}</div>;
        }
    },
    {
        accessorKey: "gender",
        header: () => <div className="text-center">Gender</div>,
        filterFn: (row, columnId, filterValue) => {
            if (!filterValue) return true; // show all if filter is empty
            return row.getValue(columnId) === filterValue; // exact match
        },
        cell: ({ row }) => {
            const value = row.getValue("gender");
            let display;

            switch (value) {
                case "male":
                    display = "♂️";
                    break;
                case "female":
                    display = "♀️";
                    break;
                default:
                    display = "❓";
            }

            return <div className="text-center">{display}</div>;
        },
    },
    {
        accessorKey: "birth_date",
        header: ({ column }) => {
            return (
                <div className="flex justify-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Birth Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        filterFn: (row, columnId, filterValue) => {
            if (!filterValue) return true; // no filter applied

            const rowDateValue = row.getValue(columnId);
            if (!rowDateValue) return false;

            // Ensure the value passed to Date is a string|number|Date to satisfy TypeScript overloads.
            let rowDate: Date | null = null;
            if (typeof rowDateValue === "string" || typeof rowDateValue === "number" || rowDateValue instanceof Date) {
                rowDate = new Date(rowDateValue as string | number | Date);
            } else {
                // unsupported type, treat as no match
                return false;
            }

            const fromDate = filterValue.from ? new Date(filterValue.from) : null;
            const toDate = filterValue.to ? new Date(filterValue.to) : null;

            if (fromDate && rowDate < fromDate) return false;
            if (toDate && rowDate > toDate) return false;

            return true;
        },
        cell: ({ row }) => {
            const value = String(row.getValue("birth_date"));
            return <div className="text-center">{value != "null" ? value : "Unknown"}</div>;
        }
    },
    {
        accessorKey: "arrival_date",
        header: ({ column }) => {
            return (
                <div className="flex justify-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Arrival Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        filterFn: (row, columnId, filterValue) => {
            if (!filterValue) return true; // no filter applied

            const rowDateValue = row.getValue(columnId);
            if (!rowDateValue) return false;

            // Ensure the value passed to Date is a string|number|Date to satisfy TypeScript overloads.
            let rowDate: Date | null = null;
            if (typeof rowDateValue === "string" || typeof rowDateValue === "number" || rowDateValue instanceof Date) {
                rowDate = new Date(rowDateValue as string | number | Date);
            } else {
                // unsupported type, treat as no match
                return false;
            }

            const fromDate = filterValue.from ? new Date(filterValue.from) : null;
            const toDate = filterValue.to ? new Date(filterValue.to) : null;

            if (fromDate && rowDate < fromDate) return false;
            if (toDate && rowDate > toDate) return false;

            return true;
        },
        cell: ({ row }) => {
            const value = String(row.getValue("arrival_date"));
            return <div className="text-center">{value != "null" ? value : "Unknown"}</div>;
        }
    },
    {
        accessorKey: "neutered",
        header: () => <div className="text-center">Neutered</div>,
        cell: ({ row }) => {
            const value = row.getValue("neutered");
            let display;

            switch (value) {
                case "yes":
                    display = "✅";
                    break;
                case "no":
                    display = "❌";
                    break;
                default:
                    display = "❓";
            }

            return <div className="text-center">{display}</div>;
        },
    },
    {
        accessorKey: "description",
        header: () => <div className="text-center">Description</div>,
    },
]