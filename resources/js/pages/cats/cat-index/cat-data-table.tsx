import { useState } from "react"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

import { DataTablePagination } from "@/components/custom-imports/table-pagination"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
    },
  })

  return (
    <div className="space-y-2 mt-2">

      {/* ---------- TOP BAR WITH FILTER BUTTON ---------- */}
      <div className="flex justify-end mr-3 space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              <Filter size={16} /> Filters
            </Button>


          </SheetTrigger>

          <SheetContent side="right" className="w-80 sm:w-96">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>

            <div className="space-y-4 mr-2 ml-2">

              {/* ---------- FILTERS ---------- */}
              <p className="text-sm text-muted-foreground">


                <div className="space-y-4">

                  {/* Name Filter */}
                  <div className="space-y-1">
                    <Label htmlFor="filter-name">Name</Label>
                    <Input
                      id="filter-name"
                      placeholder="Search by name"
                      value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                      onChange={(e) =>
                        table.getColumn("name")?.setFilterValue(e.target.value)
                      }
                    />
                  </div>

                  {/* Gender Filter */}
                  <div className="space-y-1">
                    <Label htmlFor="filter-gender">Gender</Label>
                    <Select
                      value={(table.getColumn("gender")?.getFilterValue() as string) ?? "all"}
                      onValueChange={(value) =>
                        table.getColumn("gender")?.setFilterValue(value === "all" ? undefined : value)
                      }
                    >
                      <SelectTrigger id="filter-gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Neutered Filter */}
                  <div className="space-y-1">
                    <Label htmlFor="filter-neutered">Neutered</Label>
                    <Select
                      value={(table.getColumn("neutered")?.getFilterValue() as string) ?? "all"}
                      onValueChange={(value) =>
                        table.getColumn("neutered")?.setFilterValue(value === "all" ? undefined : value)
                      }
                    >
                      <SelectTrigger id="filter-neutered">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                        <SelectItem value="unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Birth Date Range */}
                  <div className="space-y-1">
                    <Label>Birth Date From</Label>
                    <Input
                      type="date"
                      value={
                        (table.getColumn("birthdate")?.getFilterValue() as { from?: string; to?: string })?.from ?? ""
                      }
                      onChange={(e) => {
                        const old = table.getColumn("birthdate")?.getFilterValue() as any;
                        table.getColumn("birthdate")?.setFilterValue({ ...old, from: e.target.value });
                      }}
                    />

                    <Label>Birth Date To</Label>
                    <Input
                      type="date"
                      value={
                        (table.getColumn("birthdate")?.getFilterValue() as { from?: string; to?: string })?.to ?? ""
                      }
                      onChange={(e) => {
                        const old = table.getColumn("birthdate")?.getFilterValue() as any;
                        table.getColumn("birthdate")?.setFilterValue({ ...old, to: e.target.value });
                      }}
                    />
                  </div>


                  {/* Arrival Date Range */}
                  <div className="space-y-1">
                    <Label>Arrival Date From</Label>
                    <Input
                      type="date"
                      value={
                        (table.getColumn("arrival_date")?.getFilterValue() as { from?: string; to?: string })?.from ?? ""
                      }
                      onChange={(e) => {
                        const old = table.getColumn("arrival_date")?.getFilterValue() as any;
                        table.getColumn("arrival_date")?.setFilterValue({ ...old, from: e.target.value });
                      }}
                    />

                    <Label>Arrival Date To</Label>
                    <Input
                      type="date"
                      value={
                        (table.getColumn("arrival_date")?.getFilterValue() as { from?: string; to?: string })?.to ?? ""
                      }
                      onChange={(e) => {
                        const old = table.getColumn("arrival_date")?.getFilterValue() as any;
                        table.getColumn("arrival_date")?.setFilterValue({ ...old, to: e.target.value });
                      }}
                    />
                  </div>
                  {/* Clear All Filters Button */}
                  <div className="pt-4">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => table.resetColumnFilters()}
                    >
                      Clear All Filters
                    </Button>
                  </div>
                </div>

              </p>

            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* ---------- TABLE ---------- */}
      <div className="overflow-hidden rounded-md border mr-2 ml-2">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ---------- PAGINATION ---------- */}
      <DataTablePagination
        table={table}
        pageIndex={pagination.pageIndex}
        pageSize={pagination.pageSize}
        pageCount={table.getPageCount()}
      />
    </div>
  )
}
