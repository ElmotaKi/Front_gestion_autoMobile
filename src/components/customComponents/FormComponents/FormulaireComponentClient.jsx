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
import ClientParticulierApi from '@/services/Admin/ClientParticulierApi'
import { useMutation,QueryCache, useQueryClient } from 'react-query';
function FormulaireComponentClient({ formVisible,titre,dataLibaghi,methode }) {
  const queryClient = useQueryClient();
        const formSchema = z.object({
          // Validation du champ username
          
          // Validation du champ Nom
          Nom: z.string().min(2, {
            message: "Nom must be at least 2 characters.",
          }),
          
          // Validation du champ PrenomAgent
          Prenom: z.string().min(2, {
            message: "PrenomAgent must be at least 2 characters.",
          }),
          
          // Validation du champ SexeAgent
          Sexe: z.enum(["Masculin", "Feminin"], {
            message: "SexeAgent must be either 'Masculin' or 'Feminin'.",
          }),
          
          // Validation du champ EmailAgent
          DateNaissance: z.string().date({
            message: "EmailAgent must be a valid email address.",
          }),
          
          // Validation du champ TelAgent
          Tel: z.string().min(10, {
            message: "TelAgent must be at least 10 characters.",
          }),
          
          // Validation du champ AdresseAgent
          Email: z.string().min(5, {
            message: "AdresseAgent must be at least 5 characters.",
          }),
          
          // Validation du champ VilleAgent
          Adresse: z.string().min(2, {
            message: "VilleAgent must be at least 2 characters.",
          }),
          
          // Validation du champ CodePostalAgent
          Ville: z.string().min(5, {
            message: "CodePostalAgent must be at least 5 characters.",
          }),

          CodePostal: z.string().min(2, {
            message: "CodePostalAgent must be at least 5 characters.",
          }),
          
          CIN: z.string().min(5, {
            message: "CodePostalAgent must be at least 5 characters.",
          }),
           
          DateValidCIN: z.string().min(5, {
            message: "CodePostalAgent must be at least 5 characters.",
          }),

          NumeroPermis: z.string().min(2, {
            message: "CodePostalAgent must be at least 5 characters.",
          }),
          TypePermis: z.string().min(2, {
            message: "CodePostalAgent must be at least 5 characters.",
          }),
          NumeroPasseport: z.string().min(5, {
            message: "CodePostalAgent must be at least 5 characters.",
          }),
          TypePassport: z.string().min(2, {
            message: "CodePostalAgent must be at least 5 characters.",
          }),
          DateFinPassport: z.string().min(5, {
            message: "CodePostalAgent must be at least 5 characters.",
          }),
          AdresseEtrangere: z.string().min(5, {
            message: "CodePostalAgent must be at least 5 characters.",
          }),
          
        });
        const form = useForm({
          resolver: zodResolver(formSchema),
          defaultValues: {
            resolver: zodResolver(formSchema),
            defaultValues: {
              Nom:"",
              Prenom:"",
              Sexe:"",
              DateNaissance:"",
              Tel:"",
              Email:"",
              Adresse:"",
              Ville:"",
              CodePostal:"",
              CIN:"",
              DateValidCIN:"",
              NumeroPermis:"",
              TypePermis:"",
              NumeroPasseport:"",
              TypePassport:"",
              DateFinPassport:"",
              AdresseEtrangere:"",
            },
          },
        });
        useEffect(() => {
          if (dataLibaghi) {
            form.reset({
              Nom: dataLibaghi.Nom || "",
              Prenom: dataLibaghi.Prenom || "",
              Sexe: dataLibaghi.Sexe || "",
              DateNaissance: dataLibaghi.DateNaissance || "",
              Tel: dataLibaghi.Tel || "",
              Email: dataLibaghi.Email || "",
              Adresse: dataLibaghi.Adresse || "",
              Ville: dataLibaghi.Ville || "",
              CodePostal: dataLibaghi.CodePostal || "",
              CIN: dataLibaghi.CIN || "",
              DateValidCIN: dataLibaghi.DateValidCIN || "",
              NumeroPermis: dataLibaghi.NumeroPermis || "",
              TypePermis: dataLibaghi.TypePermis || "",
              NumeroPasseport: dataLibaghi.NumeroPasseport || "",
              TypePassport: dataLibaghi.TypePassport || "",
              DateFinPassport: dataLibaghi.DateFinPassport || "",
              AdresseEtrangere: dataLibaghi.AdresseEtrangere || "",
            });
          }
        },[dataLibaghi]);
      
        const updateClientMutation = useMutation(async (formData) => {
          const response = await ClientParticulierApi.update(dataLibaghi.id, formData);
          return response.data;
        }, {
          onSuccess: () => {
            queryClient.invalidateQueries('ClientParticuliers');
            setValue(!value);
          }
        });
      
        const createClientMutation = useMutation(async (formData) => {
          const response = await ClientParticulierApi.create(formData);
          return response.data;
        }, {
          onSuccess: () => {
            queryClient.invalidateQueries('ClientParticuliers');
            setValue(!value);
          }
        });


        
        const submitHandler = async (formData) => {
          try {
            console.log('methode',methode)
            if (methode === 'update') {
              await updateClientMutation.mutateAsync(formData);
              console.log('Form submitted successfully');
            } else if (methode === 'create') {
              await createClientMutation.mutateAsync(formData);
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
                name="Nom"
               render={({ field }) => (
               <FormItem>
               <FormLabel>Nom</FormLabel>
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
                    name="Prenom"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Prénom</FormLabel>
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
                    name="Sexe"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Sexe</FormLabel>
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
                        name="DateNaissance"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>DateNaissance</FormLabel>
                            <FormControl>
                                <Input type="date" placeholder="Entrez DateNaissance" {...field} />
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
                        name="Tel"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Téléphone</FormLabel>
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
                                name="Email"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Adresse</FormLabel>
                                    <FormControl>
                                        <Input type='email' placeholder="Entrez l'Email" {...field} />
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
                            name="Adresse"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Adresse</FormLabel>
                                <FormControl>
                                    <Input placeholder="Entrez l'Adresse" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            /></td>
                            <td>
                              {/* CodePostalAgent */}
                                    <FormField
                                    control={form.control}
                                    name="Ville"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Ville</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Entrez la Ville" {...field} />
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
                            name="CodePostal"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>CodePostal</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Entrez CodePostal" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                    </td>
                    <td>
                           <FormField
                            control={form.control}
                            name="CIN"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>CIN</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Entrez CIN" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                    </td>
                 </tr>
                 <tr>
                  <td><FormField
                            control={form.control}
                            name="DateValidCIN"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>DateValidCIN</FormLabel>
                                <FormControl>
                                    <Input type="date" placeholder="Entrez DateValidCIN" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            /></td>
                  <td>
                  <FormField
                            control={form.control}
                            name="NumeroPermis"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>NumeroPermis</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Entrez NumeroPermis" {...field} />
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
                            name="TypePermis"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>TypePermis</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Entrez TypePermis" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                  </td>
                  <td>
                  <FormField
                            control={form.control}
                            name="NumeroPasseport"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>NumeroPasseport</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Entrez NumeroPasseport" {...field} />
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
                            name="TypePassport"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>TypePassport</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Entrez TypePassport" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                  </td>
                  <td>
                           <FormField
                            control={form.control}
                            name="DateFinPassport"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>DateFinPassport</FormLabel>
                                <FormControl>
                                    <Input type="date" placeholder="Entrez DateFinPassport" {...field} />
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
                            name="AdresseEtrangere"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>AdresseEtrangere</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Entrez AdresseEtrangere" {...field} />
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

export default FormulaireComponentClient