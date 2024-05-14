
import React, { useState ,useEffect} from "react";
import ReactDOM from 'react-dom';
import { BsFiletypeXls } from "react-icons/bs";
import { FaFileExcel, FaFilePdf } from "react-icons/fa6";
import  '../../App.css';
import './btn.css'
import { ChevronDown, Plus } from "lucide-react";
import { ImPrinter } from "react-icons/im";
import { Form } from 'react-bootstrap';
import FormulaireComponentContrat from "@/components/customComponents/FormComponents/FormulaireComponentContrat";

import AgentApi from "@/services/Admin/AgentApi";
import ContratApi from "@/services/Admin/ContratApi";
import axios from "axios";

import {
  flexRender,
  getCoreRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import CustomDrawer from "../../components/customComponents/CustomDrawer";
import { Sheet, FileText ,Printer} from "lucide-react";
interface Post {
  id: number;
  body: string;
}

export function DataTable({
  columns,
  data,
  onDeleteSuccess
}) {
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})
  const [selectedColumn, setSelectedColumn] = useState("nom")

  const [filtering, setFiltering] = useState('');
    
    const [formVisible, setFormVisible] = useState(false);
    const toggleForm = () => {
      const newValue = !formVisible;
      setFormVisible(newValue);
      
      };
       //debut
  const rowsPerPage =3;
  const [Data, setData] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(rowsPerPage);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);
  const totalPosts = data.length
  const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
      
    }
  
  
    
    
    const handleNextPage = () => {
      if (currentPage < pageNumbers.length) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
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
    onGlobalFilterChange: setFiltering,
  })

  // const handleFilterChange = (columnName) => {
  //   setSelectedColumn(columnName);
  // };
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
    <>
    <div id="modifierDiv"></div>
    <div>
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
             {formVisible && <FormulaireComponentContrat formVisible={true} titre={'Ajouter'} dataLibaghi={null} methode={"create"}/>}
        
        </div>
        <div >
        <Button className="btn mx-2" onClick={() => toggleMenu(1)}>
        <FaFileExcel  color="green"/>
        
          </Button>
          
          
        </div>
        {menuVisible1 && (
          <div className="menu1">
                <Form.Check aria-label="option 1" label=" nomContrat"/>
                <Form.Check aria-label="option 1" label=" typeContrat"/>
                <Form.Check aria-label="option 1" label=" descriptionContrat"/>
                  </div>
        )}
        <div >
          <Button className="btn mx-2" onClick={() => toggleMenu(2)} >
          <ImPrinter color="black" />
          </Button>
        </div>
       
        {menuVisible2 && (
          <div className="menu2">
                  <Form.Check aria-label="option 1" label=" nomContrat"/>
                <Form.Check aria-label="option 1" label=" typeContrat"/>
                <Form.Check aria-label="option 1" label=" descriptionContrat"/>
                 </div>
        )}
        <div >
          <Button className="btn mx-2" onClick={() => toggleMenu(3)}>
          <FaFilePdf color="red" />
  
          </Button>
        </div>
        
        {menuVisible3 && (
          <div className="menu3">
                  <Form.Check aria-label="option 1" label=" nomContrat"/>
                <Form.Check aria-label="option 1" label=" typeContrat"/>
                <Form.Check aria-label="option 1" label=" descriptionContrat"/>
                 </div>
        )}
        {/* Dropdown Colonnes à droite */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Colonnes
              <ChevronDown className="ml-2 h-4 w-4" />
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
        {/* Input de recherche */}
        
      </div>
      
              <div className="mb-4">
          <Input
            placeholder="Rechercher ..."
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
            className="w-full"
          />
        </div>
        
        
        {/* <div className="">
          <Input
            placeholder="Filter ..."
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
            className="max-w-sm"
          />
        </div> */}
        {/* <div className="">
          <Button variant="destructive" className="ml-auto">
            <CustomDrawer textLtrigger={"AJOUTER"} dataLibaghi={null} methode={"create"}/>
            <Plus className="ml-2 h-4 w-4" />
          </Button>
        </div> */}
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colonnes
              <ChevronDown className="ml-2 h-4 w-4" />
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
        </DropdownMenu> */}
       
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
            <TableBody>
          {table.getRowModel().rows?.slice(firstPostIndex, lastPostIndex).map((row) => (
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
          {/* <div className="flex items-center justify-end space-x-2 py-4">
            <Button
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
            </Button>
          </div> */}
          <Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious onClick={handlePrevPage} />
    </PaginationItem>
 
    {pageNumbers.map((pageNumber, idx) => ( // Changed pageNumbers to pageNumber
      <PaginationItem
        key={idx}
        className={currentPage === pageNumber ? "bg-neutral-100 rounded-md" : ""} // Removed comma from className
      >
        <PaginationLink onClick={() => setCurrentPage(pageNumber)}>
          {/* {pageNumber} Display the page number */}
          {pageNumber}
        </PaginationLink>
      </PaginationItem>
    ))}
    <PaginationItem>
      <PaginationNext onClick={handleNextPage} />
    </PaginationItem>
  </PaginationContent>
</Pagination>
        </div>
      </div></>
  );
}
