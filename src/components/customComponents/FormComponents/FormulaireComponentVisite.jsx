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
import VehiculeApi from '@/services/Admin/VehiculeApi';
import VisiteTechniqueApi from '@/services/Admin/VisiteTechniqueApi';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FcOk } from "react-icons/fc";
function FormulaireComponentVisite({ formVisible,titre,dataLibaghi,methode }) {
  const queryClient = useQueryClient();
  const [value, setValue] = useState(formVisible);
  const { data: vehicules} = useQuery('vehicules', VehiculeApi.all);
  const [alertVisible, setAlertVisible] = useState(false); 
  const [alertMessage, setAlertMessage] = useState("");
    
        const formSchema = z.object({
          
          // Validation du champ NomAgent
          DateVisite : z.string().date( {
            
            message: "Date must be a valid.",
          }),
          
          // Validation du champ PrenomAgent
          TypeVisite:  z.string().min(2, {
            message: "TypeVidange:  must be at least 2 characters.",
          }),
          
          // Validation du champ SexeAgent
           resultat:  z.enum(["Conforme", "Non_conforme","Echec"], {
          message: "resultat must be either 'Conforme' or 'Non_conforme' or 'Echec'.",
          }),
          // Validation du champ EmailAgent
          DateExpirationVisiteTechnique:  z.string().date({
            message: "Cout must be a valid.",
          }),
          
          // Validation du champ TelAgent
         
         
          
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
              DateVisite : "",
              TypeVisite: "",
              resultat: 0,
              DateExpirationVisiteTechnique: "",
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
              DateVisite: dataLibaghi.DateVisite || "",
              TypeVisite: dataLibaghi.TypeVisite || "",
              resultat: dataLibaghi.resultat || "",
              DateExpirationVisiteTechnique: dataLibaghi.DateExpirationVisiteTechnique || "",
              id_vehicule: dataLibaghi.id_vehicule || "",
            });
          }
        },[dataLibaghi]);
        const updateVisiteMutation = useMutation(async (formData) => {
          const response = await VisiteTechniqueApi.update(dataLibaghi.id, formData);
          return response.data;
        }, {
          onSuccess: () => {
            queryClient.invalidateQueries('visiteTechnique');
            setAlertMessage("Visite Technique mise à jour avec succès !");
        setAlertVisible(true);
        setValue(!value);
        hideAlertAfterDelay();
          }
        });
      
        const createVisiteMutation = useMutation(async (formData) => {
          console.log('data1',formData.data)
          const response = await VisiteTechniqueApi.create(formData);
          return response.data;
        }, {
          onSuccess: () => {
            queryClient.invalidateQueries('visiteTechnique');
            setAlertMessage("Visite Technique créée avec succès !");
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
              await updateVisiteMutation.mutateAsync(formData);
              console.log('Form submitted successfully');
            } else if (methode === 'create') {
              console.log('data li baghi2',formData)
              await createVisiteMutation.mutateAsync(formData);
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
<form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8" style={{  flexDirection: 'column', width: '28rem',height:'24.1rem', background: 'white', border: '1px solid #eeee', boxShadow: '5px 6px 5px 6px #eeee'}} id='myform'>
<div><h1 className=' font-bold bg-slate-100 px-3 w-96' style={{marginBottom:'-50px',borderBottom:'2px solid black'}}>{titre}</h1></div>
    {/* NomAgent */}
    <table style={{ zIndex: 1000 }}>
        <tbody>
            <tr>
                <td><FormField
                control={form.control}
                name="DateVisite"
               render={({ field }) => (
               <FormItem>
               <FormLabel style={{marginLeft: "-125px"}}>DateVisite</FormLabel>
               <FormControl>
              <Input type='date' placeholder="Entrez la DateVisite " {...field} />
              </FormControl>
               <FormMessage />
              </FormItem>
               )}
                /></td>
                <td>
                    {/* PrenomAgent */}
                    <FormField
                    control={form.control}
                    name="TypeVisite"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel style={{marginLeft: "-125px"}}>TypeVisite</FormLabel>
                        <FormControl>
                            <Input placeholder="Entrez leTypeVisite" {...field} />
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
                    name="resultat"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel style={{marginLeft: "-145px"}}>resultat</FormLabel>
                        <FormControl>
                         <div>
                             <select {...field}>
                            <option value="choisissez" style={{size:'1px'}} selected disabled>choisissez...</option>
                            <option value="Conforme" style={{size:'12px'}}>Conforme</option>
                             <option value="Non_conforme" style={{size:'12px'}}>Non_conforme</option>
                             <option value="Echec" style={{size:'12px'}}>Echec</option>
                             </select>
                             </div>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    /></td>
                    <td>
                    {/* EmailAgent */}
                    <FormField
                        control={form.control}
                        name="DateExpirationVisiteTechnique"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel style={{marginLeft: "-100px"}}>DateExpiration</FormLabel>
                            <FormControl>
                                <Input type='date' placeholder="Entrez la DateExpirationVisiteTechnique" {...field} />
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
                        <td>

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

export default FormulaireComponentVisite