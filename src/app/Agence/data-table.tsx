import React, { useState} from "react";

import { FaFileExcel, FaFilePdf } from "react-icons/fa6";
import  '../../App.css';
import './btn.css'
import { ChevronDown, Plus, Settings } from "lucide-react";
import { ImPrinter } from "react-icons/im";
import { Form } from 'react-bootstrap';
import FormulaireComponentAgent from "@/components/customComponents/FormComponents/FormulaireComponentAgent";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
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
import FormulaireComponentAgence from "@/components/customComponents/FormComponents/FormulaireComponentAgence";
import axios from "axios";

interface Post {
  id: number;
  body: string;
}
export function DataTable({
  columns,
  data,
  onDeleteSuccess
}) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [filtering, setFiltering] = useState('');
  
  //Pour les columns filter restent affichées
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuOpen = () => {
    setMenuOpen(true);
  };
  const handleMenuClose = () => {
    setMenuOpen(false);
  };
  //

  const [formVisible, setFormVisible] = useState(false);
  const toggleForm = () => {
    const newValue = !formVisible;
    setFormVisible(newValue);
    
    };


 //Pagination logique
const rowsPerPage =4;

const [currentPage, setCurrentPage] = useState(1);
const [postsPerPage, setPostsPerPage] = useState(rowsPerPage);
const lastPostIndex = currentPage * postsPerPage;
const firstPostIndex = lastPostIndex - postsPerPage;

const totalRows = data.length

const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalRows / postsPerPage); i++) {
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
//



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
      globalFilter: filtering,
    },
    onGlobalFilterChange: setFiltering,
  });
  let headerContentArray = [];

  // Extract and store table header content
  table.getHeaderGroups().forEach(headerGroup => {
      headerGroup.headers.forEach(header => {
          if (!header.isPlaceholder) {
              const headerContent = header.column.columnDef.header(header.getContext());
              if (typeof headerContent === "string") {
                  headerContentArray.push(headerContent);
              } else if (headerContent && headerContent.props && headerContent.props.children) {
                  const children = headerContent.props.children;
                  if (typeof children === "string") {
                      headerContentArray.push(children);
                  } else if (Array.isArray(children)) {
                      headerContentArray.push(children[0]);
                  }
              }
          }
      });
  });
  headerContentArray.pop();
  // Now, headerContentArray contains the extracted content
  console.log(headerContentArray);
  
  const handleExportxlsx = async () => {
      try {
          const response = await axios.post('http://127.0.0.1:8000/api/exportxlsx/AgenceLocation', {columns: headerContentArray }, { responseType: 'blob' });
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'agence.xlsx');
          document.body.appendChild(link);
          link.click();
      } catch (error) {
          console.error('Erreur lors de l\'exportation :', error);
      }
  };

  const handleExportpdf = async () => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/exportpdf/AgenceLocation', { columns: headerContentArray }, { responseType: 'blob' });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'agence.pdf');
        document.body.appendChild(link);
        link.click();
    } catch (error) {
        console.error('Erreur lors de l\'exportation :', error);
    }
};

const handlePrint = () => {
  axios.post('http://127.0.0.1:8000/api/print/AgenceLocation', { columns: headerContentArray })
    .then((response) => {
      // Ouvrez une nouvelle fenêtre avec le contenu de l'impression
      window.open(response.data.url, '_blank');
    })
    .catch((error) => {
      console.error('Erreur lors de l\'impression :', error);
    });
};
 

return (
<>
<div id="modifierDiv"></div>
<div>

  <div>
       
   <div className="flex items-center mt-4 mb-4">
    <div className="mr-auto">
   
      
         <Button variant="destructive" onClick={toggleForm} className="ml-auto" >
             Ajouter
               <Plus className="ml-2 h-4 w-4" />
         </Button>
         {formVisible && <FormulaireComponentAgence formVisible={true} titre={'Ajouter'} dataLibaghi={null} methode={"create"}/>}
    
    </div>
    <div >
            <Input
          placeholder="Rechercher..."
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          className="w-40"
        />
      </div>
      <div >
    <Button className="btn mx-2"  onClick={handleExportxlsx}>
    <FaFileExcel  color="green"/>
    
      </Button>
      
      
    </div>
  
    <div >
      <Button className="btn mx-2"  onClick={handlePrint}>
      <ImPrinter color="black" />
      </Button>
    </div>
   
  
    <div >
      <Button className="btn mx-2"  onClick={handleExportpdf}>
      <FaFilePdf color="red" />

      </Button>
    </div>
    <div >
      <Button className="btn mx-5 w-2">
      <DropdownMenu onOpenChange={setMenuOpen} open={menuOpen}>
      <DropdownMenuTrigger onClick={handleMenuOpen} asChild>
        <Button className="btn ">
        <Settings color="black" />
         
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" onClick={handleMenuOpen}>
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
    

      </Button>
    </div>
</div>
      
    </div>
    
            
      
      
     
      <div className="rounded-md border">
        <Table>
          <TableHeader >
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
 <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
 {row.getVisibleCells().map((cell, index) => (
   <TableCell
     key={cell.id}
     ignoreBorder={index < 2} 
   >
     {flexRender(cell.column.columnDef.cell, cell.getContext())}
   </TableCell>
 ))}
</TableRow>

))}

        </TableBody>
        </Table>
       
        <Pagination className="flex justify-end">
  <PaginationContent>
    <PaginationItem  style={{cursor:'pointer'}}>
      <PaginationPrevious onClick={handlePrevPage} />
    </PaginationItem>
 
    {pageNumbers.map((pageNumber, idx) => ( 
      <PaginationItem
        key={idx}
        className={currentPage === pageNumber ? "bg-neutral-100 rounded-md" : ""} 
      >
        <PaginationLink onClick={() => setCurrentPage(pageNumber)}  style={{cursor:'pointer'}}>

          {pageNumber}
        </PaginationLink>
      </PaginationItem>
    ))}
    <PaginationItem style={{cursor:'pointer'}}>
      <PaginationNext onClick={handleNextPage}  />
    </PaginationItem>
  </PaginationContent>
</Pagination>
<div className="flex-1 text-sm text-muted-foreground float-start mt-4">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} ligne(s) sélectionnées.
      </div>
              </div>
    </div></>
    
  );
}