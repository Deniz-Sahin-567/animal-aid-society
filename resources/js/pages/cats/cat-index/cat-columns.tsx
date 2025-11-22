import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { clearLine } from "readline";

export type Cat = {
    
}

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "name",
        header: () => <div className="text-center">Name</div>,
        cell: ({ row }: { row: any }) => {
            const value = row.getValue("name");
            return <div className="text-center font-bold">{value}</div>;
        }
    },
    {
        accessorKey: "gender",
        header: () => <div className="text-center">Gender</div>,
        cell: ({ row }: { row: any }) => {
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
        accessorKey: "birthdate",
        header: ({ column }: { column: any }) => {
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
        cell: ({ row }: { row: any }) => {
            const value = row.getValue("birthdate");
            return <div className="text-center">{value ? value : "Unknown"}</div>;
        }
    },
    {
        accessorKey: "arrival_date",
        header: ({ column }: { column: any }) => {
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
        cell: ({ row }: { row: any }) => {
            const value = row.getValue("arrival_date");
            return <div className="text-center">{value ? value : "Unknown"}</div>;
        }
    },
    {
        accessorKey: "neutered",
        header: () => <div className="text-center">Neutered</div>,
        cell: ({ row }: { row: any }) => {
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