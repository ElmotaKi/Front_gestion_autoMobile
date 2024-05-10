import React, { useEffect, useState } from "react";
import { BsFileExcel } from "react-icons/bs";
import { FaFilePdf } from "react-icons/fa";
import './btn.css'
import  '../../App.css';
import { ChevronDown, Plus } from "lucide-react";
import { ImPrinter } from "react-icons/im";
import { Form } from 'react-bootstrap';
import FormulaireComponent from "../formulaire/FormulaireComponent";
import AgentApi from "@/services/Admin/AgentApi";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"

import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import CustomDrawer from "../../components/customComponents/CustomDrawer";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
interface Post {
  id: number;
  body: string;
}
export function DataTable({
  columns,
  data,
}) {
console.log('data dylhom',data)
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})
  const [filtering, setFiltering] = useState("");
  

  const [formVisible, setFormVisible] = useState(false);
    const toggleForm = () => {
      const newValue = !formVisible;
      setFormVisible(newValue);
      
      };
      //debut
  const rowsPerPage =3;
  const [Data, setData] = useState<Post[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);


  const getData = async () => {
    try {
      const response = await AgentApi.all();
      const Data = response.data;
      console.log(38, Data);
      setData(Data);
    } catch (error) {
      console.error('Error fetching Data:', error);
    }
  }
  useEffect(() => {
    getData();
  }, [])
   //fin
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const [menuVisible1, setMenuVisible1] = useState(false);
  const [menuVisible2, setMenuVisible2] = useState(false);
  const [menuVisible3, setMenuVisible3] = useState(false);

  const toggleMenu = (id) => {
    if (id === 1) {
      setMenuVisible1(!menuVisible1);
      setMenuVisible2(false)
      setMenuVisible3(false)
    }
    if (id === 2) {
      setMenuVisible2(!menuVisible2);
      setMenuVisible1(false)
      setMenuVisible3(false)
    }
    if (id === 3) {
      setMenuVisible3(!menuVisible3);
      setMenuVisible1(false)
      setMenuVisible2(false)
    }
  };
  
  return (
    <div>
      <div id="modifierDiv"></div>
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} ligne(s) sélectionnées.
      </div>
      
        <div className="flex items-center mt-4 mb-4">
          {/* Bouton Ajouter à gauche */}
          <div className="mr-auto">
            {/* <Button variant="destructive">
              <CustomDrawer textLtrigger={"AJOUTER"} dataLibaghi={null} methode={"create"}/>
              <Plus className="ml-2 h-4 w-4" />
            </Button> */}
            <Button variant="destructive" onClick={toggleForm} className="ml-auto" >
                 Ajouter
                   <Plus className="ml-2 h-4 w-4" />
             </Button>
             {formVisible && <FormulaireComponent formVisible={true} titre={'Ajouter'} dataLibaghi={null} methode={"create"}/>}
          </div>
          <div >
            <Button className="btn mx-2" onClick={() => toggleMenu(1)}>
              <BsFileExcel color="green"/>
            </Button>
          </div>
          {menuVisible1 && (
            <div className="menu1">
              <Form.Check aria-label="option 1" label=" NomAgent"/>
              <Form.Check aria-label="option 1" label=" PrenomAgent"/>
              <Form.Check aria-label="option 1" label=" SexeAgent"/>
              <Form.Check aria-label="option 1" label=" EmailAgent"/>
              <Form.Check aria-label="option 1" label=" TelAgent"/>
              <Form.Check aria-label="option 1" label=" AdresseAgent"/>
              <Form.Check aria-label="option 1" label=" VilleAgent"/>
              <Form.Check aria-label="option 1" label=" codePostalAgent"/>
              <Form.Check aria-label="option 1" label=" Agence"/>
            </div>
          )}
          <div >
            <Button className="btn mx-2" onClick={() => toggleMenu(2)} >
              <ImPrinter color="black" />
            </Button>
          </div>
          {menuVisible2 && (
            <div className="menu2">
              <Form.Check aria-label="option 1" label=" NomAgent"/>
              <Form.Check aria-label="option 1" label=" PrenomAgent"/>
              <Form.Check aria-label="option 1" label=" SexeAgent"/>
              <Form.Check aria-label="option 1" label=" EmailAgent"/>
              <Form.Check aria-label="option 1" label=" TelAgent"/>
              <Form.Check aria-label="option 1" label=" AdresseAgent"/>
              <Form.Check aria-label="option 1" label=" VilleAgent"/>
              <Form.Check aria-label="option 1" label=" codePostalAgent"/>
              <Form.Check aria-label="option 1" label=" Agence"/>
            </div>
          )}
          <div >
            <Button className="btn mx-2" onClick={() => toggleMenu(3)}>
              <FaFilePdf color="red" />
            </Button>
          </div>
          {menuVisible3 && (
            <div className="menu3">
              <Form.Check aria-label="option 1" label=" NomAgent"/>
              <Form.Check aria-label="option 1" label=" PrenomAgent"/>
              <Form.Check aria-label="option 1" label=" SexeAgent"/>
              <Form.Check aria-label="option 1" label=" EmailAgent"/>
              <Form.Check aria-label="option 1" label=" TelAgent"/>
              <Form.Check aria-label="option 1" label=" AdresseAgent"/>
              <Form.Check aria-label="option 1" label=" VilleAgent"/>
              <Form.Check aria-label="option 1" label=" codePostalAgent"/>
              <Form.Check aria-label="option 1" label=" Agence"/>
            </div>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Colonnes
                <ChevronDown className="ml-2 h- w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
          {/* Input de recherche */}
      <div className="mb-4">
        <Input
          placeholder="Rechercher ..."
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          {/* <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
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
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody> */}
          <TableBody>
          {table.getRowModel().rows?.slice(startIndex, endIndex).map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
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
            ))}
            {table.getRowModel().rows?.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 py-4">
          {/* <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Page précédente
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Page suivante
          </Button> */}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
             <PaginationPrevious
               className={
                  startIndex === 0 ? "pointer-events-none opacity-50" : undefined
               }
                onClick={() => {
                  setStartIndex(startIndex - rowsPerPage);
                  setEndIndex(endIndex - rowsPerPage);
                }} 
                />
              
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                className={
                  endIndex === 100 ? "pointer-events-none opacity-50" : undefined
                }
                onClick={() => {
                  setStartIndex(startIndex + rowsPerPage); //10
                  setEndIndex(endIndex + rowsPerPage); //10 + 10 = 20
                }} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        </div>
    </div>
    </div>

   
  );
}
