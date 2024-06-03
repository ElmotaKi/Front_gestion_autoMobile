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

import { useMutation,QueryCache, useQueryClient, useQuery } from 'react-query';
import { FormSelect } from 'react-bootstrap';
import AssuranceApi from '@/services/Admin/AssuranceApi';
import VehiculeApi from '@/services/Admin/VehiculeApi';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FcOk } from "react-icons/fc";
function FormulaireComponentAssurance({ formVisible,titre,dataLibaghi,methode }) {
  const queryClient = useQueryClient();
  const [value, setValue] = useState(formVisible);
  const { data: vehicules} = useQuery('vehicules', VehiculeApi.all);
    
  const [alertVisible, setAlertVisible] = useState(false); 
  const [alertMessage, setAlertMessage] = useState("");
        const formSchema = z.object({
          
          // Validation du champ NomAgent
          date_assurance : z.string().date( {
            
            message: "Date must be a valid.",
          }),
          
          date_expiration_assurance : z.string().date( {
            
            message: "Date must be a valid.",
          }),
          // Validation du champ PrenomAgent
          type_assurance:  z.string().min(2, {
            message: "type_assurance:  must be at least 2 characters.",
          }), 
          // Validation du champ id_agence
          id_vehicule: z.coerce.number().int().positive({
            message: "id_vehicule must be a positive integer.",
          }),
        });
        const form = useForm({
          resolver: zodResolver(formSchema),
          defaultValues: {
            resolver: zodResolver(formSchema),
            defaultValues: {
              type_assurance : "",
              date_assurance: "",
              date_expiration_assurance: "",
              id_vehicule: 0,
            },
          },
        });
        const change = () => {
          setValue(!value);
      }
        useEffect(() => {
          if (dataLibaghi) {
            form.reset({
              type_assurance: dataLibaghi.type_assurance || "",
              date_assurance: dataLibaghi.date_assurance || "",
              date_expiration_assurance: dataLibaghi.date_expiration_assurance || "",
              id_vehicule: dataLibaghi.id_vehicule || "",
            });
          }
        },[dataLibaghi]);
        const updateAssuranceMutation = useMutation(async (formData) => {
          const response = await AssuranceApi.update(dataLibaghi.id, formData);
          return response.data;
        }, {
          onSuccess: () => {
            queryClient.invalidateQueries('assurances');
            setAlertMessage("Assurance mise à jour avec succès !");
            setAlertVisible(true);
            setValue(!value);
            hideAlertAfterDelay();
          }
        });
      
        const createAssuranceMutation = useMutation(async (formData) => {
          console.log('data1',formData.data)
          const response = await AssuranceApi.create(formData);
          return response.data;
        }, {
          onSuccess: () => {
            queryClient.invalidateQueries('assurances');
            setAlertMessage("Assurance créée avec succès !");
            setAlertVisible(true);
            setValue(!value);
            hideAlertAfterDelay();
          }
        });
        const submitHandler = async (formData) => {
          console.log('data li baghi',formData)
          try {
            console.log('methode',methode)
            if (methode === 'update') {
              await updateAssuranceMutation.mutateAsync(formData);
              console.log('Form submitted successfully');
            } else if (methode === 'create') {
              console.log('data li baghi2',formData)
              await createAssuranceMutation.mutateAsync(formData);
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
      
        
    
        const hideAlertAfterDelay = () => {
          setTimeout(() => {
            setAlertVisible(false);
          }, 2000); 
        };
    return (
     
    <Form {...form} >
     
<div >
{alertVisible && (
       <Alert style={{ width: '30rem', height: '15rem' }} className="flex flex-col justify-center items-center">
       <AlertTitle className="mb-6">Succès!</AlertTitle>
       <AlertDescription className="flex flex-col items-center" style={{fontSize:'15px'}}>
         {alertMessage}
         <FcOk className="animate-bounce mt-4" style={{ width: '15rem', height: '5rem' }} />
       </AlertDescription>
     </Alert>
      )}
<div  className={` ${value ? 'slide-in' : 'slide-out'} `}>
<form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8" style={{  flexDirection: 'column', width: '28rem',height:'20.1rem', background: 'white', border: '1px solid #eeee', boxShadow: '5px 6px 5px 6px #eeee'}} id='myform'>
<div><h1 className=' font-bold bg-slate-100 px-3 w-96' style={{marginBottom:'-50px',borderBottom:'2px solid black'}}>{titre}</h1></div>
    {/* NomAgent */}
    <table style={{ zIndex: 1000 }}>
        <tbody>
            <tr>
                <td><FormField
                control={form.control}
                name="type_assurance"
               render={({ field }) => (
               <FormItem>
               <FormLabel style={{marginLeft: "-165px"}}>type</FormLabel>
               <FormControl>
              <Input placeholder="Entrez la type assurance " {...field} />
              </FormControl>
               <FormMessage />
              </FormItem>
               )}
                /></td>
                <td>
                    {/* PrenomAgent */}
                    <FormField
                    control={form.control}
                    name="date_assurance"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel style={{marginLeft: "-100px"}}>date assurance</FormLabel>
                        <FormControl>
                            <Input type='date' placeholder="Entrez le Type date assurance" {...field} />
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
                    name="date_expiration_assurance"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel style={{marginLeft: "-80px"}}>date_expiration</FormLabel>
                        <FormControl>
                            <Input type='date' placeholder="Entrez la date expiration assurance" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    /></td>
                    <td>
                    <FormField
                            control={form.control}
                            name="id_vehicule"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel style={{marginLeft: "-80px"}}>Immatriculation</FormLabel><br />
                                <FormControl>
                                <FormSelect {...field} className="form-select">
                                <option value="">Sélectionnez une Vehicule</option>
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
                            /> 
                    </td>
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

export default FormulaireComponentAssurance