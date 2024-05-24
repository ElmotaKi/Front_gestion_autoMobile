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
import VidangeApi from '@/services/Admin/VidangeApi';
import { useMutation,QueryCache, useQueryClient, useQuery } from 'react-query';
import { FormSelect } from 'react-bootstrap';
import VehiculeApi from '@/services/Admin/VehiculeApi';

function FormulaireComponentVidange({ formVisible,titre,dataLibaghi,methode }) {
  const queryClient = useQueryClient();
  const [value, setValue] = useState(formVisible);
  const { data: vehicules} = useQuery('vehicules', VehiculeApi.all);
    
    
        const formSchema = z.object({
          
          
          DateVidange : z.string().date( {
            
            message: "Date must be a valid.",
          }),
          
          
          TypeVidange:  z.string().min(2, {
            message: "TypeVidange:  must be at least 2 characters.",
          }),
          
         
          DureeDeVidange: z.coerce.number({
          message: "DureeDeVidange must be a positive integer.",
          }),
         
          Cout:  z.coerce.number({
            message: "Cout must be a valid.",
          }),
          
          
          KilometrageDerniereVidange:z.coerce.number({
            message: "KilometrageDerniereVidange must be a positive integer.",
            }),
         
          
          
          id_vehicule: z.coerce.number().int().positive({
            message: "id_vehicule must be a positive integer.",
          }),
        });
        const form = useForm({
          resolver: zodResolver(formSchema),
          defaultValues: {
            resolver: zodResolver(formSchema),
            defaultValues: {
              DateVidange : "",
              TypeVidange: "",
              DureeDeVidange: 0,
              Cout: "",
              KilometrageDerniereVidange: 0,
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
              DateVidange: dataLibaghi.DateVidange || "",
              TypeVidange: dataLibaghi.TypeVidange || "",
              DureeDeVidange: dataLibaghi.DureeDeVidange || "",
              Cout: dataLibaghi.Cout || "",
              KilometrageDerniereVidange: dataLibaghi.KilometrageDerniereVidange || "",
              id_vehicule: dataLibaghi.id_vehicule || "",
            });
          }
        },[dataLibaghi]);
        const updateVidangeMutation = useMutation(async (formData) => {
          const response = await VidangeApi.update(dataLibaghi.id, formData);
          return response.data;
        }, {
          onSuccess: () => {
            queryClient.invalidateQueries('vidanges');
            setValue(!value);
          }
        });
      
        const createVidangeMutation = useMutation(async (formData) => {
          console.log('data1',formData.data)
          const response = await VidangeApi.create(formData);
          return response.data;
        }, {
          onSuccess: () => {
            queryClient.invalidateQueries('vidanges');
            setValue(!value);
          }
        });
        const submitHandler = async (formData) => {
          console.log('data li baghi',formData)
          try {
            console.log('methode',methode)
            if (methode === 'update') {
              await updateVidangeMutation.mutateAsync(formData);
              console.log('Form submitted successfully');
            } else if (methode === 'create') {
              console.log('data li baghi2',formData)
              await createVidangeMutation.mutateAsync(formData);
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
                name="DateVidange"
               render={({ field }) => (
               <FormItem>
               <FormLabel style={{marginLeft: "-165px"}}>Date</FormLabel>
               <FormControl>
              <Input type='date' placeholder="Entrez la DateVidange " {...field} />
              </FormControl>
               <FormMessage />
              </FormItem>
               )}
                /></td>
                <td>
                    {/* PrenomAgent */}
                    <FormField
                    control={form.control}
                    name="TypeVidange"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel style={{marginLeft: "-165px"}}>Type</FormLabel>
                        <FormControl>
                            <Input placeholder="Entrez le Type Vidange" {...field} />
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
                    name="DureeDeVidange"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel style={{marginLeft: "-165px"}}>Duree</FormLabel>
                        <FormControl>
                            <Input type='number' placeholder="Entrez la Duree De Vidange" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    /></td>
                    <td>
                    {/* EmailAgent */}
                    <FormField
                        control={form.control}
                        name="Cout"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel style={{marginLeft: "-140px"}}>Cout</FormLabel>
                            <FormControl>
                                <Input type='number' placeholder="Entrez le Cout" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </td>
                 </tr>
                 <tr>
                    <td>
                        <FormField
                        control={form.control}
                        name="KilometrageDerniereVidange"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel style={{marginLeft: "-100px"}}>Kilometrage</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Entrez le Kilometrage du Derniere Vidange" {...field} />
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

export default FormulaireComponentVidange