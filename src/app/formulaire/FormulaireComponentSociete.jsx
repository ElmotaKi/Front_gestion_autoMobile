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
//import AgentApi from '@/services/Admin/AgentApi';
import SocieteApi from '@/services/Admin/SocieteApi'
function FormulaireComponentSociete({ formVisible,titre,dataLibaghi,methode }) {
        const formSchema = z.object({
          // Validation du champ username
          
          // Validation du champ Nom
          RaisonSocial: z.string().min(2, {
            message: "RaisonSocial must be at least 2 characters.",
          }),
          
          // Validation du champ PrenomAgent
          ICE: z.number().min(1, {
            message: "Ice must be at least 2 characters.",
          }),
          
          // Validation du champ SexeAgent
          NumeroCNSS: z.number(["Masculin", "Feminin"], {
            message: "NumeroCNSS must be either 'Masculin' or 'Feminin'.",
          }),
          
          // Validation du champ EmailAgent
          NumeroFiscale: z.number({
            message: "NumeroFiscale must be a valid email address.",
          }),
          
          // Validation du champ TelAgent
         RegistreCommercial: z.string().min(10, {
            message: "RegistreCommercial must be at least 10 characters.",
          }),
          
          
          
          // Validation du champ VilleAgent
          AdresseSociete: z.string().min(2, {
            message: " AdresseSocietemust be at least 2 characters.",
          }),
          
          // Validation du champ CodePostalAgent
        
          
        });
        const form = useForm({
          resolver: zodResolver(formSchema),
          defaultValues: {
            resolver: zodResolver(formSchema),
            defaultValues: {
               RaisonSocial:"",
               ICE:"",
               NumeroCNSS:"",
               NumeroFiscale:"",
               RegistreCommercial:"",
               AdresseSociete:"",
              
            },
          },
        });
        useEffect(() => {
            if (dataLibaghi) {
              form.reset({
                RaisonSocial: dataLibaghi.RaisonSocial || "",
                ICE: dataLibaghi.ICE || "",
                NumeroCNSS: dataLibaghi.NumeroCNSS || "",
                NumeroFiscale: dataLibaghi.NumeroFiscale || "",
                RegistreCommercial: dataLibaghi.RegistreCommercial || "",
                AdresseSociete: dataLibaghi.AdresseSociete || "",
              });
            }
          }, [dataLibaghi]);
          
        const submitHandler = async (formData) => {
         
          try {
           
            if (methode === "update") {
              const response = await SocieteApi.update(dataLibaghi.id, formData);
              console.log("Form submitted successfully:", response);
              
            } else if (methode === "create") {
              const response = await SocieteApi.create(formData);
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
<form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8" style={{  flexDirection: 'column', maxwidth: '30rem',maxheight:'60rem', background: 'white', border: '1px solid #eeee', boxShadow: '5px 6px 5px 6px #eeee'}} id='myform'>
<div><h1 className='titre' style={{marginBottom:'-50px'}}>{titre}</h1></div>
    {/* Nom */}
    <table style={{ zIndex: 1000 }}>
        <tbody>
            <tr>
                <td><FormField
                control={form.control}
                name="RaisonSocial"
               render={({ field }) => (
               <FormItem>
               <FormLabel>RaisonSocial</FormLabel>
               <FormControl>
              <Input placeholder="Entrez le RaisonSocial" {...field} />
              </FormControl>
               <FormMessage />
              </FormItem>
               )}
                /></td>
                <td>
                    {/* PrenomAgent */}
                    <FormField
                    control={form.control}
                    name="ICE"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>ICE</FormLabel>
                        <FormControl>
                            <Input placeholder="Entrez le ICE" {...field} />
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
                    name="NumeroCNSS"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>NumeroCNSS</FormLabel>
                        <FormControl>
                        <Input type="number" placeholder="Entrez  NumeroCNSS" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    /></td>
                    <td>
                    {/* EmailAgent */}
                    <FormField
                        control={form.control}
                        name="NumeroFiscale"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>NumeroFiscale</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Entrez NumeroFiscale" {...field} />
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
                        name="RegistreCommercial"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>RegistreFiscale</FormLabel>
                            <FormControl>
                                <Input type="tel" placeholder="Entrez le RegistreFiscale" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        /></td>
                        <td>
                            {/* AdresseAgent */}
                            <FormField
                                control={form.control}
                                name="AdresseSociete"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>AdresseSociete</FormLabel>
                                    <FormControl>
                                        <Input type='AdresseSociete' placeholder="Entrez AdresseSociete" {...field} />
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

export default FormulaireComponentSociete