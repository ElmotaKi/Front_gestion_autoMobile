import React,{useEffect,useState} from 'react'
import '../../App.css'
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
import AgentApi from '@/services/Admin/AgentApi';
function FormulaireComponentParking({ formVisible,titre,dataLibaghi,methode }) {
        const formSchema = z.object({
          
          
          // Validation du champ Capacite
          Capacite: z.number( {
            message: "Capacite must be at least 2 characters.",
          }),
          
          // Validation du champ PlaceRestantes
          PlaceRestantes: z.number({
            message: "PlaceRestantes must be at least 2 characters.",
          }),
        
          
          // Validation du champ pannes
          pannes: z.string( {
            message: "pannes must be at least 5 characters.",
          }),
          
        
        });
        const form = useForm({
          resolver: zodResolver(formSchema),
          defaultValues: {
            resolver: zodResolver(formSchema),
            defaultValues: {
              Capacite: "",
              PlaceRestantes: "",
              pannes: "",
              
            },
          },
        });
        useEffect(() => {
          if (dataLibaghi) {
            form.reset({
              Capacite: dataLibaghi.Capacite || "",
              PlaceRestantes: dataLibaghi.PlaceRestantes || "",
              pannes: dataLibaghi.pannes || "",
            });
          }
        },[dataLibaghi]);
      
        const submitHandler = async (formData) => {
          
          try {
           
            if (methode === "update") {
              
              const response = await ParkingApi.update(dataLibaghi.id, formData);
              console.log("Form submitted successfully:", response);
              
            } else if (methode === "create") {
              const response = await ParkingApi.create(formData);
              console.log("Form submitted successfully:", response);
            }
            // Mettre à jour l'état formVisible après la soumission réussie
           setValue(false); // ou toute autre logique pour masquer le formulaire
          } catch (error) {
            if (error.response && error.response.status === 422) {
              const validationErrors = error.response.data;
              console.error("Validation errors:", validationErrors);
            } else {
              console.error("Form submission error:", error);
            }
          }
        };
        
    const [value, setValue] = useState(formVisible);
   
    const change = () => {
        setValue(!value);
    }
   
    return (
     
    <Form {...form}>
     
<div>
<div className={`form-container ${value ? 'slide-in' : 'slide-out'}`}>
<form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8" style={{  flexDirection: 'column', width: '28rem',height:'28.7rem', background: 'white', border: '1px solid #eeee', boxShadow: '5px 6px 5px 6px #eeee'}} id='myform'>
<div><h1 className='titre' style={{marginBottom:'-50px'}}>{titre}</h1></div>
    {/* Capacite */}
    <table style={{ zIndex: 1000 }}>
        <tbody>
            <tr>
                <td><FormField
                control={form.control}
                name="Capacite"
               render={({ field }) => (
               <FormItem>
               <FormLabel>Capacité</FormLabel>
               <FormControl>
              <Input placeholder="Entrez la capacité" {...field} />
              </FormControl>
               <FormMessage />
              </FormItem>
               )}
                /></td>
                <td>
                    {/* PlaceRestantes */}
                    <FormField
                    control={form.control}
                    name="PlaceRestantes"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Places Restantes</FormLabel>
                        <FormControl>
                            <Input placeholder="Entrez les Places Restantes" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                        )}
                        />
                    </td>
            </tr>
                 <tr>
                    <td>{/* pannes */}
                        <FormField
                        control={form.control}
                        name="pannes"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>pannes</FormLabel>
                            <FormControl>
                                <Input placeholder="Entrez les pannes" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        /></td>
                        
                 </tr>
                
                 
        </tbody>
    </table>
    {/* Submit Button */}
    <div className='btn' style={{marginTop:'-1px'}}>
    <Button style={{ color: 'white',width:' 4rem',fontSize:'12px'}}  type="submit" >Soumettre</Button>
    <Button style={{ color: 'white',width:' 4rem',fontSize:'12px' }} onClick={change} type="reset">Annuler</Button>
   </div>
  </form>  
</div>
</div>

</Form>
  )
}

export default FormulaireComponentParking


