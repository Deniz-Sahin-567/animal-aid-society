import { ColumnDef } from "@tanstack/react-table";
import { Area } from "../area-interface";

export const areaColumns: ColumnDef<Area>[] = [
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
        header: () => <div className="text-center font-semibold">Name</div>,
        cell: ({ row }) => {
            const value = String(row.getValue("name") ?? "");
            return <div className="text-center font-bold">{value}</div>;
        }
    },
    {
        id: "parent",
        header: () => <div className="text-center font-semibold">Parent Area</div>,
        accessorFn: row => row.parent?.name ?? null,
        cell: ({ getValue }) => {
            const value = getValue() as string | null; // no argument needed
            return (
                <div className="text-center">
                    {value !== null ? `${value}` : "-"}
                </div>
            );
        }
    }
];
