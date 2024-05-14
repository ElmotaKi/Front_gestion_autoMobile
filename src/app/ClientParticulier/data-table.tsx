
// import React, { useState ,useEffect} from "react";
// import ReactDOM from 'react-dom';
// import { BsFiletypeXls } from "react-icons/bs";
// import { FaFileExcel, FaFilePdf } from "react-icons/fa6";
// import  '../../App.css';
// import './btn.css'
// import { ChevronDown, Plus } from "lucide-react";
// import { ImPrinter } from "react-icons/im";
// import { Form } from 'react-bootstrap';
// import FormulaireComponent from "../formulaire/FormulaireComponent";
// import FormulaireComponentClient from "../formulaire/FormulaireComponentClient";

// import ClientParticulierApi from "@/services/Admin/ClientParticulierApi";
// import axios from "axios";

// import {
//   flexRender,
//   getCoreRowModel,
//   SortingState,
//   ColumnFiltersState,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
//   VisibilityState,
// } from "@tanstack/react-table";
// // import { getAgentEx } from "./columns";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../../components/ui/table";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination"

// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "../../components/ui/dropdown-menu";

// import { Button } from "../../components/ui/button";
// import { Input } from "../../components/ui/input";
// import CustomDrawer from "../../components/customComponents/CustomDrawer";
// import { Sheet, FileText ,Printer} from "lucide-react";
// interface Post {
//   id: number;
//   body: string;
// }
// export function DataTable({
//   columns,
//   data,
//   onDeleteSuccess
// }) {
//   const [sorting, setSorting] = useState([])
//   const [columnFilters, setColumnFilters] = useState([])
//   const [columnVisibility, setColumnVisibility] = useState({})
//   const [rowSelection, setRowSelection] = useState({})
//   const [selectedColumn, setSelectedColumn] = useState("nom")
//   const [filtering, setFiltering] = useState('');

//   const [formVisible, setFormVisible] = useState(false);
//     const toggleForm = () => {
//       const newValue = !formVisible;
//       setFormVisible(newValue);
      
//       };
      
//    //debut
//   const rowsPerPage =3;
//   const [Data, setData] = useState<Post[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [postsPerPage, setPostsPerPage] = useState(rowsPerPage);
//   const lastPostIndex = currentPage * postsPerPage;
//   const firstPostIndex = lastPostIndex - postsPerPage;
//   const currentPosts = data.slice(firstPostIndex, lastPostIndex);
//   const totalPosts = data.length
//   const pageNumbers = [];
//     for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
//       pageNumbers.push(i);
      
//     }
  
  
    
    
//     const handleNextPage = () => {
//       if (currentPage < pageNumbers.length) {
//         setCurrentPage(currentPage + 1);
//       }
//     };
  
//     const handlePrevPage = () => {
//       if (currentPage > 1) {
//         setCurrentPage(currentPage - 1);
//       }
//     };
//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     onSortingChange: setSorting,
//     getSortedRowModel: getSortedRowModel(),
//     onColumnFiltersChange: setColumnFilters,
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     onRowSelectionChange: setRowSelection,
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//       rowSelection,
//     },
//     onGlobalFilterChange: setFiltering,
//   })

   
//   const [menuVisible1, setMenuVisible1] = useState(false);
//   const [menuVisible2, setMenuVisible2] = useState(false);

//   const [menuVisible3, setMenuVisible3] = useState(false);

//   const toggleMenu = (id) => {
//     if (id === 1) {
//       setMenuVisible1(!menuVisible1);
//       setMenuVisible2(false)
//       setMenuVisible3(false)
//     }
//     if (id === 2) {
//       setMenuVisible2(!menuVisible2);
//       setMenuVisible1(false)
//       setMenuVisible3(false)
//     }
//     if (id === 3) {
//       setMenuVisible3(!menuVisible3);
//       setMenuVisible1(false)
//       setMenuVisible2(false)
//     }
//   };
//   return (
//     <>
//     <div id="modifierDiv"></div>
//     <div>
//            <div className="flex-1 text-sm text-muted-foreground">
//           {table.getFilteredSelectedRowModel().rows.length} of{" "}
//           {table.getFilteredRowModel().rows.length} ligne(s) sélectionnées.
//         </div>
       
//        <div className="flex items-center mt-4 mb-4">
//         {/* Bouton Ajouter à gauche */}
//         <div className="mr-auto">
//           {/* <Button variant="destructive">
//             <CustomDrawer textLtrigger={"AJOUTER"} dataLibaghi={null} methode={"create"}/>
//             <Plus className="ml-2 h-4 w-4" />
//           </Button> */}
          
//              <Button variant="destructive" onClick={toggleForm} className="ml-auto" >
//                  Ajouter
//                    <Plus className="ml-2 h-4 w-4" />
//              </Button>
//              {formVisible && <FormulaireComponentClient formVisible={true} titre={'Ajouter'} dataLibaghi={null} methode={"create"}/>}
        
//         </div>
//         <div >
//         <Button className="btn mx-2" onClick={() => toggleMenu(1)}>
//         <FaFileExcel  color="green"/>
        
//           </Button>
          
          
//         </div>
//         {menuVisible1 && (
//           <div className="menu1">
//                 <Form.Check aria-label="option 1" label=" Nom"/>
//                 <Form.Check aria-label="option 1" label=" Prenom"/>
//                 <Form.Check aria-label="option 1" label=" Sexe"/>
//                 <Form.Check aria-label="option 1" label=" DateNaissance"/>
//                 <Form.Check aria-label="option 1" label=" Tel"/>
//                 <Form.Check aria-label="option 1" label=" Email"/>
//                 <Form.Check aria-label="option 1" label=" Adresse"/>
//                 <Form.Check aria-label="option 1" label=" Ville"/>
//                 <Form.Check aria-label="option 1" label=" CodePostal"/>
//                 <Form.Check aria-label="option 1" label=" CIN"/>
//                 <Form.Check aria-label="option 1" label=" DateValidCIN"/>
//                 <Form.Check aria-label="option 1" label=" NumeroPermis"/>
//                 <Form.Check aria-label="option 1" label=" TypePermis"/>
//                 <Form.Check aria-label="option 1" label=" NumeroPasseport"/>
//                 <Form.Check aria-label="option 1" label=" TypePassport"/>
//                 <Form.Check aria-label="option 1" label=" DateFinPassport"/>
//                 <Form.Check aria-label="option 1" label=" AdresseEtrangere"/>
//           </div>
//         )}
//         <div >
//           <Button className="btn mx-2" onClick={() => toggleMenu(2)} >
//           <ImPrinter color="black" />
//           </Button>
//         </div>
       
//         {menuVisible2 && (
//           <div className="menu2">
//             <Form.Check aria-label="option 1" label=" Nom"/>
//                 <Form.Check aria-label="option 1" label=" Prenom"/>
//                 <Form.Check aria-label="option 1" label=" Sexe"/>
//                 <Form.Check aria-label="option 1" label=" DateNaissance"/>
//                 <Form.Check aria-label="option 1" label=" Tel"/>
//                 <Form.Check aria-label="option 1" label=" Email"/>
//                 <Form.Check aria-label="option 1" label=" Adresse"/>
//                 <Form.Check aria-label="option 1" label=" Ville"/>
//                 <Form.Check aria-label="option 1" label=" CodePostal"/>
//                 <Form.Check aria-label="option 1" label=" CIN"/>
//                 <Form.Check aria-label="option 1" label=" DateValidCIN"/>
//                 <Form.Check aria-label="option 1" label=" NumeroPermis"/>
//                 <Form.Check aria-label="option 1" label=" TypePermis"/>
//                 <Form.Check aria-label="option 1" label=" NumeroPasseport"/>
//                 <Form.Check aria-label="option 1" label=" TypePassport"/>
//                 <Form.Check aria-label="option 1" label=" DateFinPassport"/>
//                 <Form.Check aria-label="option 1" label=" AdresseEtrangere"/>
         
//                </div>
//         )}
//         <div >
//           <Button className="btn mx-2" onClick={() => toggleMenu(3)}>
//           <FaFilePdf color="red" />
  
//           </Button>
//         </div>
        
//         {menuVisible3 && (
//           <div className="menu3">
//                 <Form.Check aria-label="option 1" label=" Nom"/>
//                 <Form.Check aria-label="option 1" label=" Prenom"/>
//                 <Form.Check aria-label="option 1" label=" Sexe"/>
//                 <Form.Check aria-label="option 1" label=" DateNaissance"/>
//                 <Form.Check aria-label="option 1" label=" Tel"/>
//                 <Form.Check aria-label="option 1" label=" Email"/>
//                 <Form.Check aria-label="option 1" label=" Adresse"/>
//                 <Form.Check aria-label="option 1" label=" Ville"/>
//                 <Form.Check aria-label="option 1" label=" CodePostal"/>
//                 <Form.Check aria-label="option 1" label=" CIN"/>
//                 <Form.Check aria-label="option 1" label=" DateValidCIN"/>
//                 <Form.Check aria-label="option 1" label=" NumeroPermis"/>
//                 <Form.Check aria-label="option 1" label=" TypePermis"/>
//                 <Form.Check aria-label="option 1" label=" NumeroPasseport"/>
//                 <Form.Check aria-label="option 1" label=" TypePassport"/>
//                 <Form.Check aria-label="option 1" label=" DateFinPassport"/>
//                 <Form.Check aria-label="option 1" label=" AdresseEtrangere"/>
//          </div>
//         )}
//         {/* Dropdown Colonnes à droite */}
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="outline">
//               Colonnes
//               <ChevronDown className="ml-2 h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             {table
//               .getAllColumns()
//               .filter((column) => column.getCanHide())
//               .map((column) => (
//                 <DropdownMenuCheckboxItem
//                   key={column.id}
//                   className="capitalize"
//                   checked={column.getIsVisible()}
//                   onCheckedChange={(value) => column.toggleVisibility(!!value)}
//                 >
//                   {column.id}
//                 </DropdownMenuCheckboxItem>
//               ))}
//           </DropdownMenuContent>
//         </DropdownMenu>
//         {/* Input de recherche */}
        
//       </div>
      
//               <div className="mb-4">
//           <Input
//             placeholder="Rechercher ..."
//             value={filtering}
//             onChange={(e) => setFiltering(e.target.value)}
//             className="w-full"
//           />
//         </div>
        
        
//         {/* <div className="">
//           <Input
//             placeholder="Filter ..."
//             value={filtering}
//             onChange={(e) => setFiltering(e.target.value)}
//             className="max-w-sm"
//           />
//         </div> */}
//         {/* <div className="">
//           <Button variant="destructive" className="ml-auto">
//             <CustomDrawer textLtrigger={"AJOUTER"} dataLibaghi={null} methode={"create"}/>
//             <Plus className="ml-2 h-4 w-4" />
//           </Button>
//         </div> */}
//         {/* <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="outline" className="ml-auto">
//               Colonnes
//               <ChevronDown className="ml-2 h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             {table
//               .getAllColumns()
//               .filter((column) => column.getCanHide())
//               .map((column) => (
//                 <DropdownMenuCheckboxItem
//                   key={column.id}
//                   className="capitalize"
//                   checked={column.getIsVisible()}
//                   onCheckedChange={(value) => column.toggleVisibility(!!value)}
//                 >
//                   {column.id}
//                 </DropdownMenuCheckboxItem>
//               ))}
//           </DropdownMenuContent>
//         </DropdownMenu> */}
       
//         <div className="rounded-md border">
//           <Table>
//             <TableHeader>
//               {table.getHeaderGroups().map((headerGroup) => (
//                 <TableRow key={headerGroup.id}>
//                   {headerGroup.headers.map((header) => (
//                     <TableHead key={header.id}>
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(header.column.columnDef.header, header.getContext())}
//                     </TableHead>
//                   ))}
//                 </TableRow>
//               ))}
//             </TableHeader>
//             <TableBody>
//           {table.getRowModel().rows?.slice(firstPostIndex, lastPostIndex).map((row) => (
//               <TableRow
//                 key={row.id}
//                 data-state={row.getIsSelected() && "selected"}
//               >
//                 {row.getVisibleCells().map((cell) => (
//                   <TableCell key={cell.id}>
//                     {flexRender(
//                       cell.column.columnDef.cell,
//                       cell.getContext()
//                     )}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))}
//             {table.getRowModel().rows?.length === 0 && (
//               <TableRow>
//                 <TableCell colSpan={columns.length} className="h-24 text-center">
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//           </Table>
//           {/* <div className="flex items-center justify-end space-x-2 py-4">
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => table.previousPage()}
//               disabled={!table.getCanPreviousPage()}
//             >
//               Page précédente
//             </Button>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => table.nextPage()}
//               disabled={!table.getCanNextPage()}
//             >
//               Page suivante
//             </Button>
//           </div> */}
//           <Pagination>
//   <PaginationContent>
//     <PaginationItem>
//       <PaginationPrevious onClick={handlePrevPage} />
//     </PaginationItem>
 
//     {pageNumbers.map((pageNumber, idx) => ( // Changed pageNumbers to pageNumber
//       <PaginationItem
//         key={idx}
//         className={currentPage === pageNumber ? "bg-neutral-100 rounded-md" : ""} // Removed comma from className
//       >
//         <PaginationLink onClick={() => setCurrentPage(pageNumber)}>
//           {/* {pageNumber} Display the page number */}
//           {pageNumber}
//         </PaginationLink>
//       </PaginationItem>
//     ))}
//     <PaginationItem>
//       <PaginationNext onClick={handleNextPage} />
//     </PaginationItem>
//   </PaginationContent>
// </Pagination>
//         </div>
//       </div></>
//     ); 
// }
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
import { createPortal } from "react-dom";
import axios from "axios";
import FormulaireComponentClient from "@/components/customComponents/FormComponents/FormulaireComponentClient";

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
  const [selectedColumns, setSelectedColumns] = useState(['NomAgent', 'SexeAgent', 'TelAgent']);
  
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
    setTableWidth(newValue?"50%":"100%");
    
    };
    const [tableWidth, setTableWidth] = useState("100%");


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
          const response = await axios.post('http://127.0.0.1:8000/api/exportxlsx/Agent', {columns: headerContentArray }, { responseType: 'blob' });
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'export.xlsx');
          document.body.appendChild(link);
          link.click();
      } catch (error) {
          console.error('Erreur lors de l\'exportation :', error);
      }
  };

  const handleExportpdf = async () => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/exportpdf/Agent', { columns: headerContentArray }, { responseType: 'blob' });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'export.pdf');
        document.body.appendChild(link);
        link.click();
    } catch (error) {
        console.error('Erreur lors de l\'exportation :', error);
    }
};
const handleColumnChange = (e) => {
  const { value, checked } = e.target;
  if (checked) {
      setSelectedColumns([...selectedColumns, value]);
  } else {
      setSelectedColumns(selectedColumns.filter(col => col !== value));
  }
};
const handlePrint = () => {
  axios.post('http://127.0.0.1:8000/api/print/Agent', { columns: headerContentArray })
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
<div style={{display:"flex",width:"100%"}}>
  <div style={{"flex":1,width:tableWidth}}>
  <div>
  <div className="flex items-center mt-4 mb-4">
    <div className="mr-auto">
   
      
         <Button variant="destructive" onClick={toggleForm} className="ml-auto" >
             Ajouter
               <Plus className="ml-2 h-4 w-4" />
         </Button>
    
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
    {row.getVisibleCells().map((cell,index)=>(
      <TableCell key={cell.id}  ignoreBorder={index <= 2}>
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
</Pagination>

<div className="flex-1 text-sm text-muted-foreground float-start mt-4">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} ligne(s) sélectionnées.
      </div>
     
              </div>
    </div>
    <div className="posform">
      
    {data && (
    <div id="modifierDiv"></div>
  )}
    {data && (
  <div id="ajouterDiv"></div>
)}
          {formVisible && (
            <div className="mb-4">
              {createPortal(
                <FormulaireComponentClient formVisible={true} titre={'Ajouter'} dataLibaghi={null} methode={"create"} />,
                document.getElementById('ajouterDiv')
              )}
            </div>
          )}
        </div>
      
   

  </div>
  </>
  
    
  );
}