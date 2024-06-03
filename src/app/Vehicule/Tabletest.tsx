import React, { useState} from "react";

import { FaFileExcel, FaFilePdf } from "react-icons/fa6";
import  '../../App.css';
import './btn.css'



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

import { createPortal } from "react-dom";

import FormulaireComponentVehicule from "@/components/customComponents/FormComponents/FormulaireComponentVehicule";


export function Tabletest({
  columns,
  data,
  onDeleteSuccess
}) {
    console.log('data li ma7taja',data)
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [filtering, setFiltering] = useState('');
  const [nombreligne,setnombreligne] = useState(4);
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
    setTableWidth(newValue? "30%":"100%");
    
    };
    const [tableWidth, setTableWidth] = useState("100%");


 //Pagination logique
const rowsPerPage =4;

const [currentPage, setCurrentPage] = useState(1);
// const [postsPerPage, setPostsPerPage] = useState(rowsPerPage);
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
  
return (
  <div style={{display:"flex",width:"100%"}}>
  <div style={{"flex":1,width:tableWidth}}>
  <div>
  <div className="flex items-center mt-4 mb-4">
  <div className="mr-auto" >
 
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
    <TableCell key={cell.id} >
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
         
     </div>
   
    
    </div>
  </div>
  <div className="posform">
    
    {data && (
    <div id="modifierDiv" style={{ transform: "translateY(-30px) translateX(-50px)" }}></div>
  )}
    {data && (
      <div id="ajouterDiv" style={{ transform: "translateY(-30px) translateX(-50px)" }}></div>
)}
          {formVisible && (
            <div className="mb-4">
              {createPortal(
                <FormulaireComponentVehicule formVisible={true} titre={'Ajouter'} dataLibaghi={null} methode={"create"}/>,
                document.getElementById('ajouterDiv')
              )}
            </div>
          )}
</div>
</div>
           
  
  );
}