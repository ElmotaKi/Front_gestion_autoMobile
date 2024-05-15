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
import AgentApi from '@/services/Admin/AgentApi';
import { useMutation,QueryCache, useQueryClient, useQuery } from 'react-query';
import { FormSelect } from 'react-bootstrap';
import AgenceApi from '@/services/Admin/AgenceApi';

function FormulaireComponentAgent({ formVisible,titre,dataLibaghi,methode }) {
  const queryClient = useQueryClient();
  const [value, setValue] = useState(formVisible);
  const { data: agencies,} = useQuery('agencies', AgenceApi.getAll);
    const change = () => {
        setValue(!value);
    }
        const formSchema = z.object({
          
          // Validation du champ NomAgent
          NomAgent: z.string().min(2, {
            message: "NomAgent must be at least 2 characters.",
          }),
          
          // Validation du champ PrenomAgent
          PrenomAgent: z.string().min(2, {
            message: "PrenomAgent must be at least 2 characters.",
          }),
          
          // Validation du champ SexeAgent
          SexeAgent: z.enum(["Masculin", "Feminin"], {
            message: "SexeAgent must be either 'Masculin' or 'Feminin'.",
          }),
          
          // Validation du champ EmailAgent
          EmailAgent: z.string().email({
            message: "EmailAgent must be a valid email address.",
          }),
          
          // Validation du champ TelAgent
          TelAgent: z.string().min(10, {
            message: "TelAgent must be at least 10 characters.",
          }),
          
          // Validation du champ AdresseAgent
          AdresseAgent: z.string().min(5, {
            message: "AdresseAgent must be at least 5 characters.",
          }),
          
          // Validation du champ VilleAgent
          VilleAgent: z.string().min(2, {
            message: "VilleAgent must be at least 2 characters.",
          }),
          
          // Validation du champ CodePostalAgent
          CodePostalAgent: z.string().min(5, {
            message: "CodePostalAgent must be at least 5 characters.",
          }),
          
          // Validation du champ id_agence
          id_agence: z.coerce.number().int().positive({
            message: "id_agence must be a positive integer.",
          }),
        });
        const form = useForm({
          resolver: zodResolver(formSchema),
          defaultValues: {
            resolver: zodResolver(formSchema),
            defaultValues: {
              NomAgent: "",
              PrenomAgent: "",
              SexeAgent: "",
              EmailAgent: "",
              TelAgent: "",
              AdresseAgent: "",
              VilleAgent: "",
              CodePostalAgent: "",
              id_agence: 0,
            },
          },
        });
        useEffect(() => {
          if (dataLibaghi) {
            form.reset({
              NomAgent: dataLibaghi.NomAgent || "",
              PrenomAgent: dataLibaghi.PrenomAgent || "",
              SexeAgent: dataLibaghi.SexeAgent || "",
              EmailAgent: dataLibaghi.EmailAgent || "",
              TelAgent: dataLibaghi.TelAgent || "",
              AdresseAgent: dataLibaghi.AdresseAgent || "",
              VilleAgent: dataLibaghi.VilleAgent || "",
              CodePostalAgent: dataLibaghi.CodePostalAgent || "",
              id_agence: dataLibaghi.id_agence || "",
            });
          }
        },[dataLibaghi]);
        const updateAgentMutation = useMutation(async (formData) => {
          const response = await AgentApi.update(dataLibaghi.id, formData);
          return response.data;
        }, {
          onSuccess: () => {
            queryClient.invalidateQueries('agents');
            setValue(!value);
          }
        });
      
        const createAgentMutation = useMutation(async (formData) => {
          const response = await AgentApi.create(formData);
          return response.data;
        }, {
          onSuccess: () => {
            queryClient.invalidateQueries('agents');
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
                name="NomAgent"
               render={({ field }) => (
               <FormItem>
               <FormLabel style={{marginLeft: "-165px"}}>Nom</FormLabel>
               <FormControl>
              <Input placeholder="Entrez le nom" {...field} />
              </FormControl>
               <FormMessage />
              </FormItem>
               )}
                /></td>
                <td>
                    {/* PrenomAgent */}
                    <FormField
                    control={form.control}
                    name="PrenomAgent"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel style={{marginLeft: "-165px"}}>Prénom</FormLabel>
                        <FormControl>
                            <Input placeholder="Entrez le prénom" {...field} />
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
                    name="SexeAgent"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel style={{marginLeft: "-165px"}}>Sexe</FormLabel>
                        <FormControl>
                          <div>
                            <select {...field}>
                              <option value="choisissez" style={{size:'1px'}} selected disabled>choisissez...</option>
                            <option value="Masculin" style={{size:'12px'}}>Masculin</option>
                            <option value="Feminin" style={{size:'12px'}}>Féminin</option>
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
                        name="EmailAgent"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel style={{marginLeft: "-165px"}}>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Entrez l'email" {...field} />
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
                        name="TelAgent"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel style={{marginLeft: "-140px"}}>Téléphone</FormLabel>
                            <FormControl>
                                <Input type="tel" placeholder="Entrez le téléphone" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        /></td>
                        <td>
                            {/* AdresseAgent */}
                            <FormField
                                control={form.control}
                                name="AdresseAgent"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel style={{marginLeft: "-144px"}}>Adresse</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Entrez l'adresse" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                        </td>
                 </tr>
                 <tr>
                    <td>{/* VilleAgent */}
                            <FormField
                            control={form.control}
                            name="VilleAgent"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel style={{marginLeft: "-165px"}}>Ville</FormLabel>
                                <FormControl>
                                    <Input placeholder="Entrez la ville" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            /></td>
                            <td>
                              {/* CodePostalAgent */}
                                    <FormField
                                    control={form.control}
                                    name="CodePostalAgent"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel style={{marginLeft: "-114px"}}>Code postal</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Entrez le code postal" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                            </td>
                 </tr>
                 <tr>
                    <td>
                        {/* id_agence */}
                            <FormField
                            control={form.control}
                            name="id_agence"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel style={{marginLeft: "-144px"}}>Agence</FormLabel><br />
                                <FormControl>
                                <FormSelect {...field} className="form-select">
                <option value="">Sélectionnez une agence</option>
                {agencies.data.agences.map((agency) => (
                  <option key={agency.id} value={agency.id}>
                    {agency.NomAgence}
                  </option>
                ))}
              </FormSelect>
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
    <div className='btn' style={{marginTop:'-1px'}}>
    <Button style={{ color: 'white',width:' 4rem',fontSize:'12px'}}  type="submit" >{methode=='create'?"Ajouter":"Modifier"}</Button>
    <Button style={{ color: 'white',width:' 4rem',fontSize:'12px' }} onClick={change} type="reset">Annuler</Button>
   </div>
  </form>  
</div>
</div>

</Form>
  )
}

export default FormulaireComponentAgent