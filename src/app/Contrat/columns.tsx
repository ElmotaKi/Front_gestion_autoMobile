// import { createPortal } from "react-dom";
// import { ArrowUpDown, MoreHorizontal,Trash  } from "lucide-react";
//  import FormulaireComponent from "../formulaire/FormulaireComponent";
// import { Button } from "../../components/ui/button";
// import React,{useState,useEffect} from "react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "../../components/ui/dropdown-menu";
// import { faCopy, faDeleteLeft, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// import { Checkbox } from "../../components/ui/checkbox"

// import CustomDrawer from "@/components/customComponents/CustomDrawer";
// import CustomDialog from "@/components/customComponents/CustomDialog";
// import IconButton from "@/components/ui/IconButton";

// export type Contrat = {
//     id: number;
//     nomContrat:string;
//     typeContrat:string;
//     descriptionContrat:string;
// };

// export const columns = [
//   // Existing columns for displaying agent details
  
//     {
//       id: "filter-select",
//       header: () => (
//         <DropdownMenu>
//           <DropdownMenuContent>
//             <DropdownMenuItem>
//               <span>Filtrer par:</span>
//             </DropdownMenuItem>
//             <DropdownMenuItem key="nomContrat">nom Contrat</DropdownMenuItem>
//             <DropdownMenuItem key="typeContrat">type Contrat</DropdownMenuItem>
//             <DropdownMenuItem key="descriptionContrat">description Contrat</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       ),
//       cell: () => null, // Empty cell for the dropdown
//       enableSorting: false,
//       enableHiding: false,
//     },
//     {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     id:"nom",
//     accessorKey: "nomContrat",
//     header: ({ column }) => (
//       <Button
//         variant="ghost"
//         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//       >
//         nomContrat
//         <ArrowUpDown className="ml-2 h-4 w-4" />
//       </Button>
//     ),
//   },
//   {
//     id:"type",
//     accessorKey: "typeContrat",
//     header: ({ column }) => (
//       <Button
//         variant="ghost"
//         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//       >
//         typeContrat
//         <ArrowUpDown className="ml-2 h-4 w-4" />
//       </Button>
//     ),
//   },
//   {
//     id:"description",
//     accessorKey: "descriptionContrat",
//     header: ({ column }) => (
//       <Button
//         variant="ghost"
//         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//       >
//         descriptionContrat
//         <ArrowUpDown className="ml-2 h-4 w-4" />
//       </Button>
//     ),
//   },
//   {
//     id: "actions", // Unique identifier for the column
//     header: () => <span>Actions</span>, // Header text
//     cell: ({ row }) => {
//       const contrat = row.original; // Access the current agency location data
//       const [formVisible, setFormVisible] = useState(false);
//       const toggleform = ()=>{
//         setFormVisible(!formVisible);
//       }
//         return (<div className="flex justify-between">
//           {/* <IconButton onClick={() => navigator.clipboard.writeText(agent.id)}>
//     <FontAwesomeIcon icon={faCopy} />
//   </IconButton> */}
//   <div>
//   <IconButton onClick={() => navigator.clipboard.writeText(contrat.id)} color="red" >
//     {/* <CustomDialog dataLibaghi={agent} textLtrigger={<FontAwesomeIcon icon={faTrash} />}/> */}
//     <CustomDialog dataLibaghi={contrat} textLtrigger={<FontAwesomeIcon icon={faTrash} />} />
//   </IconButton>
//   </div>
//   <div>
//   {/* <IconButton onClick={() => navigator.clipboard.writeText(agent.id)} color="green">
//     <CustomDrawer dataLibaghi={agent} textLtrigger={<FontAwesomeIcon icon={faEdit} />} methode={"update"} />
//   </IconButton> */}
//   <IconButton onClick={()=>{navigator.clipboard.writeText(contrat.id);
//   toggleform();}
//   } color="green">
//    <FontAwesomeIcon icon={faEdit} />
//    </IconButton>
  
//    {formVisible &&
//    createPortal(
//    <FormulaireComponent formVisible={formVisible} titre={'Modifier'} dataLibaghi={contrat} methode={"update"}/>,
//    document.getElementById('modifierDiv'))
//    }
  
//   </div>
//   </div>)
//     },
//   },]
