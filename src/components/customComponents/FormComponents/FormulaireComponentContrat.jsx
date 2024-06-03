import React,{useEffect,useState} from 'react'
import '../../../App.css';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import ContratApi from '@/services/Admin/ContratApi'
import { useMutation,QueryCache, useQueryClient } from 'react-query';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FcOk } from "react-icons/fc";
function FormulaireComponentContrat({ formVisible,titre,dataLibaghi,methode }) {
  const queryClient = useQueryClient();
  const [alertVisible, setAlertVisible] = useState(false); 
  const [alertMessage, setAlertMessage] = useState("");
        const formSchema = z.object({
          // Validation du champ username
          
          // Validation du champ NomAgent
          nomContrat: z.string().min(2, {
            message: "nomContrat must be at least 2 characters.",
          }),
          
          // Validation du champ PrenomAgent
          typeContrat: z.string().min(2, {
            message: "typeContrat must be at least 2 characters.",
          }),
          
          
          
          // Validation du champ AdresseAgent
          descriptionContrat: z.string().min(5, {
            message: "descriptionContrat must be at least 5 characters.",
          }),
          
          
        });
        const form = useForm({
          resolver: zodResolver(formSchema),
          defaultValues: {
            resolver: zodResolver(formSchema),
            defaultValues: {
                nomContrat:"",
                typeContrat:"",
                descriptionContrat:"",
            },
          },
        });
        useEffect(() => {
          if (dataLibaghi) {
            form.reset({
                nomContrat: dataLibaghi.nomContrat || "",
                typeContrat: dataLibaghi.typeContrat || "",
                descriptionContrat: dataLibaghi.descriptionContrat || "",
              
            });
          }
        },[dataLibaghi]);
      
        const updateContratMutation = useMutation(async (formData) => {
          const response = await ContratApi.update(dataLibaghi.id, formData);
          return response.data;
        }, {
          onSuccess: () => {
            queryClient.invalidateQueries('Contrats');
            setAlertMessage("Contrat mise à jour avec succès !");
        setAlertVisible(true);
        setValue(!value);
        hideAlertAfterDelay();
          }
        });
      
        const createContratMutation = useMutation(async (formData) => {
          const response = await ContratApi.create(formData);
          return response.data;
        }, {
          onSuccess: () => {
            queryClient.invalidateQueries('Contrats');
            setAlertMessage("Contrat créée avec succès !");
            setAlertVisible(true);
            setValue(!value);
            hideAlertAfterDelay();
          }
        });


        
        const submitHandler = async (formData) => {
          try {
            console.log('methode',methode)
            if (methode === 'update') {
              await updateContratMutation.mutateAsync(formData);
              console.log('Form submitted successfully');
            } else if (methode === 'create') {
              await createContratMutation.mutateAsync(formData);
              console.log('Form submitted successfully');
            }
          } catch (error) {
            if (error.response && error.response.status === 422) {
              const validationErrors = error.response.data;
              console.error('Validation errors:', validationErrors);
            } else {
              console.error('Form submission error:', error);
            }
          }
        };
        
    const [value, setValue] = useState(formVisible);
   
    const change = () => {
        setValue(!value);
    }
    const hideAlertAfterDelay = () => {
      setTimeout(() => {
        setAlertVisible(false);
      }, 2000); 
    };
    return (
     
    <Form {...form}>
     
<div>
{alertVisible && (
       <Alert style={{ width: '30rem', height: '15rem' }} className="flex flex-col justify-center items-center">
       <AlertTitle className="mb-6">Succès!</AlertTitle>
       <AlertDescription className="flex flex-col items-center" style={{fontSize:'15px'}}>
         {alertMessage}
         <FcOk className="animate-bounce mt-4" style={{ width: '15rem', height: '5rem' }} />
       </AlertDescription>
     </Alert>
      )}
<div className={`${value ? 'slide-in' : 'slide-out'}`}>
<form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8" style={{  flexDirection: 'column', width: '25rem',height:'17rem', background: 'white', border: '1px solid #eeee', boxShadow: '5px 6px 5px 6px #eeee'}} id='myform'>
<div><h1 className=' font-bold bg-slate-100 px-3 w-80' style={{marginBottom:'-50px',borderBottom:'2px solid black'}}>{titre}</h1></div>
    {/* NomAgent */}
    <table style={{ zIndex: 1000 }}>
        <tbody>
            <tr>
                <td><FormField
                control={form.control}
                name="nomContrat"
               render={({ field }) => (
               <FormItem>
               <FormLabel style={{marginLeft: "-60px"}}>nomContrat</FormLabel>
               <FormControl>
              <Input placeholder="Entrez le nom Contrat" {...field} />
              </FormControl>
               <FormMessage />
              </FormItem>
               )}
                /></td>
                <td>
                    {/* PrenomAgent */}
                    <FormField
                    control={form.control}
                    name="typeContrat"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel style={{marginLeft: "-50px"}}>typeContrat</FormLabel>
                        <FormControl>
                            <Input placeholder="Entrez le type Contrat" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                        )}
                        />
                    </td>
            </tr>
            
                 <tr>
                    
                        <td>
                            {/* AdresseAgent */}
                            <FormField
                                control={form.control}
                                name="descriptionContrat"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel style={{marginLeft: "-20px"}}>descriptionContrat</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Entrez description Contrat" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                        </td>
                        <td></td>
                 </tr>
        
        </tbody>
    </table>
    {/* Submit Button */}
    <div  className='flex items-center' style={{marginTop:'10px'}}>
              <div className='btn'>
              <Button  style={{ color: 'white',width:' 4rem',fontSize:'12px',marginRight:'40px'}}  type="submit" >{methode=='create'?"Ajouter":"Modifier"}</Button>
              </div>
              <div className='btn'>
              <Button  style={{ color: 'white',width:' 4rem',fontSize:'12px' }} onClick={change} type="reset">Annuler</Button>
              </div>
      </div>
  </form>  
</div>
</div>

</Form>
  )
}

export default FormulaireComponentContrat


