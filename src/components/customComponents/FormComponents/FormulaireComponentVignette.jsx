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
import VignetteApi from '@/services/Admin/VignetteApi';
import { useMutation,QueryCache, useQueryClient, useQuery } from 'react-query';
import { FormSelect } from 'react-bootstrap';
import VehiculeApi from '@/services/Admin/VehiculeApi';
import { DessertIcon } from 'lucide-react';
//import VisiteTechniqueApi from '@/services/Admin/VisiteTechniqueApi';

function FormulaireComponentVignette({ formVisible,titre,dataLibaghi,methode }) {
  const queryClient = useQueryClient();
  const [value, setValue] = useState(formVisible);
  const { data: vehicules} = useQuery('vehicules', VehiculeApi.all);
 console.log('waa3',vehicules)
    const change = () => {
        setValue(!value);
    }
        const formSchema = z.object({
          
          // Validation du champ NomAgent
          designation: z.string().min(2, {
            message: "designation must be at least 2 characters.",
          }),
          
          // Validation du champ PrenomAgent
          status: z.string().min(2, {
            message: "status must be at least 3 characters.",
          }),
          
          // Validation du champ SexeAgent
          date_vignette: z.string().min(2, {
            message: "date_vignette must be either 'Masculin' or 'Feminin'.",
          }),
          
          // Validation du champ EmailAgent
          date_expiration_vignette: z.string().min(2,{
            message: "date_expiration_vignette must be a valid email address.",
          }),
          
          // Validation du champ TelAgent
          id_vehicule: z.string().min(1, {
            message: "id_vehicule must be at least 1 characters.",
          }),
          
          // Validation du champ AdresseAgent
          
          
          // Validation du champ VilleAgent
         
          
          // Validation du champ CodePostalAgent
          
          
          // Validation du champ id_agence
         
        });
        const form = useForm({
          resolver: zodResolver(formSchema),
          defaultValues: {
            resolver: zodResolver(formSchema),
            defaultValues: {
              designation: "",
              status: "",
              date_vignette: "",
              date_expiration_vignette: "",
              id_vehicule: 0,
            },
          },
        });
        useEffect(() => {
          if (dataLibaghi) {
            form.reset({
              designation: dataLibaghi.designation || "",
              status: dataLibaghi.status || "",
              date_vignette: dataLibaghi.date_vignette || "",
              date_expiration_vignette: dataLibaghi. date_expiration_vignette || "",
              id_vehicule: dataLibaghi.id_vehicule || "",
            });
          }
        },[dataLibaghi]);
        const updateAgentMutation = useMutation(async (formData) => {
          const response = await VignetteApi.update(dataLibaghi.id, formData);
          return response.data;
        }, {
          onSuccess: () => {
            queryClient.invalidateQueries('vignettes');
            setValue(!value);
          }
        });
      
        const createAgentMutation = useMutation(async (formData) => {
          const response = await VignetteApi.create(formData);
          return response.data;
        }, {
          onSuccess: () => {
            queryClient.invalidateQueries('vignettes');
            setValue(!value);
          }
        });
        const submitHandler = async (formData) => {
          try {
            console.log('methode',methode)
            if (methode === 'update') {
              await updateAgentMutation.mutateAsync(formData);
              console.log('Form submitted successfully');
            } else if (methode === 'create') {
              await createAgentMutation.mutateAsync(formData);
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
      
        
    
   
    return (
     
    <Form {...form} >
     
<div >

<div  className={` ${value ? 'slide-in' : 'slide-out'} `}>
<form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8" style={{  flexDirection: 'column', width: '28rem',height:'30.1rem', background: 'white', border: '1px solid #eeee', boxShadow: '5px 6px 5px 6px #eeee'}} id='myform'>
<div><h1 className=' font-bold bg-slate-100 px-3 w-96' style={{marginBottom:'-50px',borderBottom:'2px solid black'}}>{titre}</h1></div>
    {/* NomAgent */}
    <table style={{ zIndex: 1000 }}>
        <tbody>
            <tr>
                <td><FormField
                control={form.control}
                name="designation"
               render={({ field }) => (
               <FormItem>
               <FormLabel style={{marginLeft: "-100px"}}>designation</FormLabel>
               <FormControl>
              <Input placeholder="Entrez la designation" {...field} />
              </FormControl>
               <FormMessage />
              </FormItem>
               )}
                /></td>
                <td>
                    {/* PrenomAgent */}
                    <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel style={{marginLeft: "-100px"}}>status</FormLabel>
                        <FormControl>
                            <Input placeholder="Entrez status" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                        )}
                        />
                    </td>
            </tr>
            <tr>
                <td> {/* SexeAgent */}
                    <FormField
                    control={form.control}
                    name="date_vignette"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel style={{marginLeft: "-100px"}}>date_vignette</FormLabel>
                        <FormControl>
                        <Input type="date" placeholder="Entrez la date" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    /></td>
                    <td>
                    {/* EmailAgent */}
                    <FormField
                        control={form.control}
                        name="date_expiration_vignette"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel style={{marginLeft: "-70px"}}>date_expiration</FormLabel>
                            <FormControl>
                                <Input type="date" placeholder="date_expiration_vignette" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </td>
                 </tr>
                 <tr>
                    <td>{/* TelAgent */}
                        <FormField
                        control={form.control}
                        name="id_vehicule"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel style={{marginLeft: "-90px"}}>Immatriculation</FormLabel>
                            <FormControl>
                            <FormSelect {...field} className="form-select">
                <option value="">Sélectionnez une vehicule</option>
                {vehicules && vehicules.data && vehicules.data[0].map((vehicule) => (
                  <option key={vehicule.id} value={vehicule.id}>
                    {vehicule.Immatriculation}
                    
                  </option>

                ))}
                </FormSelect>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        /></td>
                       
                 </tr>
                 <tr>
                   
                         
                 </tr>
                 <tr>
                    
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

export default FormulaireComponentVignette