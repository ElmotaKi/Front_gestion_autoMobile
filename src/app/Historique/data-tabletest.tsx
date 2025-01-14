import React, { useState} from "react";

import { FaFileExcel, FaFilePdf } from "react-icons/fa6";
import  '../../App.css';

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
import FormulaireComponentHistorique from "@/components/customComponents/FormComponents/FormulaireComponentHistorique";
import CustomDialog from "@/components/customComponents/CustomDialog";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
interface Post {
  id: number;
  body: string;
}
export function DataTabletest({
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
  const selectedRows = table.getSelectedRowModel().rows;
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
          const response = await axios.post('http://127.0.0.1:8000/api/exportxlsx/Historique', {columns: headerContentArray }, { responseType: 'blob' });
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'historique.xlsx');
          document.body.appendChild(link);
          link.click();
      } catch (error) {
          console.error('Erreur lors de l\'exportation :', error);
      }
  };

  const handleExportpdf = async () => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/exportpdf/Historique', { columns: headerContentArray }, { responseType: 'blob' });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'historique.pdf');
        document.body.appendChild(link);
        link.click();
    } catch (error) {
        console.error('Erreur lors de l\'exportation :', error);
    }
};

const handlePrint = () => {
  axios.post('http://127.0.0.1:8000/api/print/Historique', { columns: headerContentArray })
    .then((response) => {
      // Ouvrez une nouvelle fenêtre avec le contenu de l'impression
      window.open(response.data.url, '_blank');
    })
    .catch((error) => {
      console.error('Erreur lors de l\'impression :', error);
    });
};
  
 
  

const [select,setselect] = useState(false);
const toggleSelect =() =>{
  setselect(!select);
}
  return (
    <div style={{display:"flex",width:"100%"}}>
    <div style={{"flex":1,width:tableWidth}}>
   

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
      <div id="modifierDiv"></div>
    )}
      {data && (
    <div id="ajouterDiv" style={{transform:"translate(-30px)"}}></div>
  )}
            {formVisible && (
              <div className="mb-4">
                {createPortal(
                  <FormulaireComponentHistorique  formVisible={true} titre={'Ajouter'} dataLibaghi={null} methode={"create"}/>,
                  document.getElementById('ajouterDiv')
                )}
              </div>
            )}
  </div>
  </div>
             
    
    );
}