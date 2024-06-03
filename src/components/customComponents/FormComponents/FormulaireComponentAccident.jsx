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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FcOk } from "react-icons/fc";
import AccidentApi from '@/services/Admin/AccidentApi';


function FormulaireComponentAccident({ formVisible,titre,dataLibaghi,methode }) {
  const queryClient = useQueryClient();
  const [value, setValue] = useState(formVisible);
  const { data: vehicules} = useQuery('vehicules', VehiculeApi.all);
 console.log('waa3',vehicules)
    const change = () => {
        setValue(!value);
    }
    const [alertVisible, setAlertVisible] = useState(false); 
  const [alertMessage, setAlertMessage] = useState("");

        const formSchema = z.object({
          
          // Validation du champ NomAgent
          photo: z.string().min({
            message: "photo must be valid.",
          }),
          
          // Validation du champ PrenomAgent
          date_accident: z.string( {
            message: "date_accident must be at least 3 characters.",
          }),
          
          // Validation du champ SexeAgent
          temps_accident: z.string().min(2, {
            message: "temps_accident must be valid",
          }),
          
          // Validation du champ EmailAgent
          lieu: z.string().min(2,{
            message: "lieu must be a valid email address.",
          }),
          cout_dommage: z.coerce.number({
            message: "cout_dommage must be a valid email address.",
          }),
          rapport_police:z.string().min({
            message: "rapport_police must be a valid email address.",
          }),
          statut_resolution:z.enum(['En_cours', 'Résolu','En_attente']),
          

          // Validation du champ TelAgent
          id_vehicule: z.coerce.number( {
            message: "id_vehicule must be at least 1 characters.",
          }),
          id_location: z.coerce.number( {
            message: "id_vehicule must be at least 1 characters.",
          }),
          id_assurance: z.coerce.number( {
            message: "id_vehicule must be at least 1 characters.",
          }),
          
          
         
        });
        const form = useForm({
          resolver: zodResolver(formSchema),
          defaultValues: {
            resolver: zodResolver(formSchema),
            defaultValues: {
              // photo: "",
              date_accident: "",
              temps_accident: "",
              lieu: "",
              cout_dommage: "",
              rapport_police: "",
              statut_resolution: "",
              id_location: 0,
              id_assurance: 0,
              id_vehicule: 0,
            },
          },
        });
        useEffect(() => {
          if (dataLibaghi) {
            form.reset({
              // photo: dataLibaghi.photo || "",
              date_accident: dataLibaghi.date_accident || "",
              temps_accident: dataLibaghi.temps_accident || "",
              lieu: dataLibaghi.lieu || "",
              cout_dommage: dataLibaghi.cout_dommage || "",
              rapport_police: dataLibaghi.rapport_police || "",
              statut_resolution: dataLibaghi.statut_resolution || "",
              id_vehicule: dataLibaghi.id_vehicule || "",
              id_location: dataLibaghi.id_location || "",
              id_assurance: dataLibaghi.id_assurance || "",
            });
          }
        },[dataLibaghi]);
        const updateAccidentMutation = useMutation(async (formData) => {
          const response = await AccidentApi.update(dataLibaghi.id, formData);
          return response.data;
        }, {
          onSuccess: () => {
            queryClient.invalidateQueries('accidents');
            setAlertMessage("Accident mise à jour avec succès !");
            setAlertVisible(true);
            setValue(!value);
            hideAlertAfterDelay();
          }
        });
      
        const createAccidentMutation = useMutation(async (formData) => {
          const response = await AccidentApi.create(formData);
          return response.data;
        }, {
          onSuccess: () => {
            queryClient.invalidateQueries('accidents');
            setAlertMessage("accident créée avec succès !");
            setAlertVisible(true);
            setValue(!value);
            hideAlertAfterDelay();
          }
        });
        const submitHandler = async (formData) => {
          try {
           
            if (methode === 'update') {
              await updateAccidentMutation.mutateAsync(formData);
              console.log('Form submitted successfully');
            } else if (methode === 'create') {
              await createAccidentMutation.mutateAsync(formData);
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
<form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8" style={{  flexDirection: 'column', width: '30rem',height:'30.1rem', background: 'white', border: '1px solid #eeee', boxShadow: '5px 6px 5px 6px #eeee'}} id='myform'>
<div><h1 className=' font-bold bg-slate-100 px-3 w-96' style={{marginBottom:'-50px',borderBottom:'2px solid black'}}>{titre}</h1></div>
    {/* NomAgent */}
    <table style={{ zIndex: 1000 }}>
        <tbody>
        <tr>
               <td> <FormField
                        control={form.control}
                        name="cout_dommage"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel style={{marginLeft: "-80px"}}>cout_dommage</FormLabel>
                            <FormControl>
                                <Input style={{width:'13rem',position:'relative',left:'17px'}} type='number'  placeholder="Entrez cout_dommage" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        /></td>
                <td>
                    {/* PrenomAgent */}
                    <FormField
                    control={form.control}
                    name="date_accident"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel style={{marginLeft: "-100px"}}>date_accident</FormLabel>
                        <FormControl>
                            <Input style={{width:'13rem'}} type='date' placeholder="Entrez status" {...field} />
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
                    name="temps_accident"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel style={{marginLeft: "-80px"}}>temps_accident</FormLabel>
                        <FormControl>
                        <Input style={{width:'13rem',position:'relative',left:'17px'}} placeholder="Entrez la date" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    /></td>
                    <td>
                    {/* EmailAgent */}
                    <FormField
                        control={form.control}
                        name="lieu"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel style={{marginLeft: "-170px"}}>lieu</FormLabel>
                            <FormControl>
                                <Input  style={{width:'13rem'}} placeholder="Entrez lieu" {...field} />
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
                name="photo"
               render={({ field }) => (
               <FormItem>
               <FormLabel style={{marginLeft: "-150px"}}>photo</FormLabel>
               <FormControl>
              <Input style={{width:'13rem',position:'relative',left:'17px'}} type='file' placeholder="Entrez la designation" {...field} />
              </FormControl>
               <FormMessage />
              </FormItem>
               )}
                /></td>
                  <td>
                  <FormField
                        control={form.control}
                        name="rapport_police"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel style={{marginLeft: "-90px"}}>rapport_police</FormLabel>
                            <FormControl>
                                <Input style={{width:'13rem'}} placeholder="Entrez rapport_police" {...field} />
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
                        name="statut_resolution"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel style={{marginLeft: "-70px"}}>statut_resolution</FormLabel>
                            <FormControl>
                            <div>
                                  <select style={{width:'13rem'}} {...field}>
                                  <option value="choisissez" style={{size:'1px'}} selected disabled>choisissez...</option>
                                  <option value="En_cours" style={{size:'12px'}}>En_cours</option>
                                  <option value="Résolu" style={{size:'12px'}}>Résolu</option>
                                  <option value="En_attente" style={{size:'12px'}}>En_attente</option>
                                  </select>
                                </div>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                  </td>
                  <td>
                  <FormField
                        control={form.control}
                        name="id_location"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel style={{marginLeft: "-110px"}}>id_location</FormLabel>
                            <FormControl>
                                <Input  style={{width:'13rem'}} placeholder="Entrez id_location" {...field} />
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
                            <FormLabel style={{marginLeft: "-70px"}}>Immatriculation</FormLabel>
                            <FormControl>
                            <FormSelect style={{width:'13rem'}} {...field} className="form-select">
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
                       <td>
                       <FormField
                        control={form.control}
                        name="id_assurance"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel style={{marginLeft: "-90px"}}>id_assurance</FormLabel>
                            <FormControl>
                                <Input style={{width:'13rem'}}  placeholder="Entrez id_assurance" {...field} />
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

export default FormulaireComponentAccident