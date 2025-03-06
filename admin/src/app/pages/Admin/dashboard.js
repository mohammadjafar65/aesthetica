import React, { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import axios from "axios";
import Layout from "../Custom-Components/layout";
import {
  SidebarProvider,
  SidebarTrigger,
} from "../../../components/ui/sidebar";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Input } from "../../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Plus, Trash2, ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import AddWallpaper from "./addWallpaper";
import { Checkbox } from "../../../components/ui/checkbox";

const Dashboard = () => {
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWallpapers, setSelectedWallpapers] = useState(new Set()); // Track selected wallpapers
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});

  // Define columns for the DataTable
  const columns = [
    {
      accessorKey: "select",
      header: ({ table }) => (
        <Checkbox
          className="h-6 w-6 border-white data-[state=checked]:bg-white data-[state=checked]:text-black"
          checked={
            selectedWallpapers.size === wallpapers.length &&
            wallpapers.length > 0
          }
          onCheckedChange={(checked) => {
            if (checked) {
              setSelectedWallpapers(new Set(wallpapers.map((w) => w.id)));
            } else {
              setSelectedWallpapers(new Set());
            }
          }}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          className="h-6 w-6 border-white data-[state=checked]:bg-white data-[state=checked]:text-black"
          checked={selectedWallpapers.has(row.original.id)}
          onCheckedChange={(checked) => {
            const newSelected = new Set(selectedWallpapers);
            if (checked) {
              newSelected.add(row.original.id);
            } else {
              newSelected.delete(row.original.id);
            }
            setSelectedWallpapers(newSelected);
          }}
        />
      ),
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => (
        <img
          src={`${process.env.REACT_APP_API_URL}${row.original.url}`}
          alt="Wallpaper"
          className="w-[100px] h-[100px] object-cover rounded"
        />
      ),
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    // {
    //   accessorKey: "tags",
    //   header: "Tags",
    //   cell: ({ row }) =>
    //     row.original.tags ? row.original.tags.join(", ") : "No Tags",
    // },
    {
      accessorKey: "downloadCount",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="hover:bg-transparent hover:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Downloads
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.original.downloadCount || 0}</div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Button
          onClick={() => handleDelete(row.original.id)}
          className="bg-red-500 text-white"
        >
          <Trash2 /> Delete
        </Button>
      ),
    },
  ];

  // Fetch wallpapers from the API
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/wallpapers`)
      .then((response) => {
        setWallpapers(response.data.wallpapers);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching wallpapers:", error);
        setLoading(false);
      });
  }, []);

  // Handle wallpaper deletion
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this wallpaper?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_API_URL}/api/wallpapers/${id}`
        );
        setWallpapers(wallpapers.filter((wallpaper) => wallpaper.id !== id));
        alert("Wallpaper deleted successfully!");
      } catch (error) {
        console.error("Failed to delete wallpaper:", error);
        alert("Failed to delete wallpaper.");
      }
    }
  };

  // Handle bulk delete for selected wallpapers
  const handleDeleteSelected = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete selected wallpapers?"
    );
    if (confirmDelete) {
      try {
        const deletePromises = Array.from(selectedWallpapers).map((id) =>
          axios.delete(`${process.env.REACT_APP_API_URL}/api/wallpapers/${id}`)
        );
        await Promise.all(deletePromises);
        setWallpapers(
          wallpapers.filter(
            (wallpaper) => !selectedWallpapers.has(wallpaper.id)
          )
        );
        setSelectedWallpapers(new Set());
        alert("Selected wallpapers deleted successfully!");
      } catch (error) {
        console.error("Failed to delete selected wallpapers:", error);
        alert("Failed to delete selected wallpapers.");
      }
    }
  };

  const table = useReactTable({
    data: wallpapers,
    columns,
    state: { sorting, columnFilters, columnVisibility },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (loading) {
    return (
      <p className="w-full h-[100vh] flex items-center justify-center">
        Loading wallpapers...
      </p>
    );
  }

  return (
    <Layout>
      <div className="p-8 w-full">
        <div className="mb-4 flex items-center justify-between w-full">
          <div className="flex items-center gap-5">
            <SidebarTrigger className="" />
          </div>
          <div className="flex gap-5">
            <AddWallpaper />
          </div>
        </div>
        <div className="w-full">
          <div className="flex items-center justify-between py-4 w-full">
            <h1 className="text-[25px]">Dashboard</h1>
            <div className="flex items-center gap-5">
              <Input
                placeholder="Filter by title..."
                value={table.getColumn("title")?.getFilterValue() ?? ""}
                onChange={(e) =>
                  table.getColumn("title")?.setFilterValue(e.target.value)
                }
                className="max-w-sm bg-[#18181B] border-[216 34% 17%] focus-visible:ring-offset-0"
              />
              <Button
                onClick={handleDeleteSelected}
                className="bg-red-500 text-white"
                disabled={selectedWallpapers.size === 0}
              >
                <Trash2 /> Delete Selected
              </Button>
            </div>
          </div>
          <div className="rounded-md border w-full">
            <Table className="w-full">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="hover:bg-[#18181B]">
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="hover:bg-[#18181B]"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
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
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
