import React, { useState} from "react";

import { FaFileExcel, FaFilePdf } from "react-icons/fa6";
import  '../../App.css';
import './btn.css'
import { ChevronDown, Plus, Settings, Settings2, Settings2Icon } from "lucide-react";
import { ImPrinter } from "react-icons/im";
import { Form } from 'react-bootstrap';

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
  TableCaption,
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
import FormulaireComponentcommercial from "@/components/customComponents/FormComponents/FormulaireComponentCommercial";
import FormulaireComponentSociete from "@/components/customComponents/FormComponents/FormulaireComponentSociete";
import { createPortal } from "react-dom";
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
  const [postsPerPage, setPostsPerPage] = useState(4);
  const [userInput, setUserInput] = useState(''); 
  const handleUserInputChange = (e) => {
    setUserInput(e.target.value);
    const inputNumber = parseInt(e.target.value);
    if (!isNaN(inputNumber) && inputNumber > 0) {
      setPostsPerPage(inputNumber);
      setCurrentPage(1); // Reset to first page when changing rows per page
    }
  };
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
    setTableWidth(newValue ? "50%":"100%")
  };
  const [tableWidth, setTableWidth] = useState("100%");

 //Pagination logique
const rowsPerPage =4;

const [currentPage, setCurrentPage] = useState(1);
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
          const response = await axios.post('http://127.0.0.1:8000/api/exportxlsx/Societe', {columns: headerContentArray }, { responseType: 'blob' });
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'societe.xlsx');
          document.body.appendChild(link);
          link.click();
      } catch (error) {
          console.error('Erreur lors de l\'exportation :', error);
      }
  };

  const handleExportpdf = async () => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/exportpdf/Societe', { columns: headerContentArray }, { responseType: 'blob' });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'societe.pdf');
        document.body.appendChild(link);
        link.click();
    } catch (error) {
        console.error('Erreur lors de l\'exportation :', error);
    }
};

const handlePrint = () => {
  axios.post('http://127.0.0.1:8000/api/print/Societe', { columns: headerContentArray })
    .then((response) => {
      // Ouvrez une nouvelle fenêtre avec le contenu de l'impression
      window.open(response.data.url, '_blank');
    })
    .catch((error) => {
      console.error('Erreur lors de l\'impression :', error);
    });
};
  

   
  return (
    <div style={{display:"flex",width:"100%"}}>
    <div style={{"flex":1,width:tableWidth}}>
    <div>
    <div className="flex items-center mt-4 mb-4">
    <div className="mr-auto" >
    <Button variant="destructive" onClick={toggleForm} className="ml-auto" style={{transform:"translateY(-22px)"}}>
             Ajouter
               <Plus className="ml-2 h-4 w-4" />
         </Button>
    </div>
    <div style={{transform:"translateY(-22px)"}}>
            <Input
          placeholder="Rechercher..."
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          className="w-96"
        />
      </div>
      <div style={{transform:"translateY(-22px)"}}>
    <Button className="btn mx-2" >
    <FaFileExcel  color="green" onClick={handleExportxlsx}/>
      </Button>      
    </div>
    <div style={{transform:"translateY(-22px)"}}>
      <Button className="btn mx-2" onClick={handlePrint} >
      <ImPrinter color="black" />
      </Button>
    </div>
    <div style={{transform:"translateY(-22px)"}}>
      <Button className="btn mx-2" onClick={handleExportpdf}>
      <FaFilePdf color="red" />

      </Button>
    </div>
      
    <div style={{transform:"translateY(-22px)"}}>
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
    {row.getVisibleCells().map((cell,index) => (
      <TableCell key={cell.id} ignoreBorder={index <= 2}>
        {flexRender(
          cell.column.columnDef.cell,
          cell.getContext()
        )}
      </TableCell>
    ))}
    
  </TableRow>
  
))}

        </TableBody>
        <TableCaption>
          
        </TableCaption>
        
        </Table>
       <div className="flex ">
       <div className=" text-sm text-muted-foreground float-start mb-2">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} ligne(s) sélectionnées.
      </div>  
           <Pagination className="flex justify-end">
  <PaginationContent>
    <PaginationItem  style={{cursor:'pointer'}}>
      <PaginationPrevious onClick={handlePrevPage} />
    </PaginationItem>
 
    {pageNumbers.map((pageNumber, idx) => ( 
      <PaginationItem
      style={{cursor:'pointer'}}
        key={idx}
        className={currentPage === pageNumber ? "bg-neutral-100 rounded-md" : ""} 
      >
        <PaginationLink onClick={() => setCurrentPage(pageNumber)}>

          {pageNumber}
        </PaginationLink>
      </PaginationItem>
    ))}
    <PaginationItem style={{cursor:'pointer'}}>
      <PaginationNext onClick={handleNextPage} />
    </PaginationItem>
  </PaginationContent>
  <div className=" text-sm text-muted-foreground float-start mt-4 justifier-end">
        <label htmlFor="rowsPerPage">Nombre lignes par Pages:</label>
        <input
        style={{width:'3rem'}}
          type="number"
          id="rowsPerPage"
          value={userInput}
          onChange={handleUserInputChange}
        />
      </div>
</Pagination>

       </div>
     

      </div>
    </div>
    <div className="posform">
      
      {data && (
      <div id="modifierDiv" style={{transform:"translateY(-30px)"}}></div>
    )}
      {data && (
    <div id="ajouterDiv"  style={{transform:"translateY(-30px)"}}></div>
  )}
            {formVisible && (
              <div className="mb-4" >
                {createPortal(
                  <FormulaireComponentSociete formVisible={true} titre={'Ajouter'} dataLibaghi={null} methode={"create"}/>,
                  document.getElementById('ajouterDiv')
                )}
              </div>
            )}
  </div>
  </div>
             
    
    );
}