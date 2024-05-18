import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';



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
import VehiculeApi from '@/services/Admin/VehiculeApi'
import { useMutation,QueryCache, useQueryClient } from 'react-query';
function FormulaireComponentVehicule({ formVisible,titre,dataLibaghi,methode }) {
  const queryClient = useQueryClient()
          // Validation du champ username
          const formSchema = z.object({
            Marque: z.string().max(50),
            Model: z.string().max(50),
            Categorie: z.string().max(50),
            Kilometrage: z.coerce.number().max(50),
            Pneumatique: z.string().max(50),
            NumeroDechassis: z.string().max(50),
            Immatriculation: z.string().max(50),
            DateD_achat: z.string().max(50),
            numeroDePlace: z.coerce.number().max(50),
            Disponibilité: z.enum(['oui', 'non']),
            jourTitulaire: z.string().max(50),
            Montant: z.coerce.number().max(50),
            MontantRestantApayer: z.coerce.number().max(50),
            ImageVoiture: z.string().max(50),
            typeBoiteVitesse: z.enum(['manuelle', 'automatique']),
            annee: z.string().max(50),
            placeAssure: z.coerce.number().max(50),
            typeCarburant: z.string().max(50),
            id_agence: z.coerce.number().max(50),
            id_parking: z.coerce.number().max(50),
          });
          
       
          const form = useForm({
            resolver: zodResolver(formSchema),
            defaultValues: {
              Marque: '',
              Model: '',
              Categorie: '',
              Kilometrage: 0,
              Pneumatique: '',
              NumeroDechassis: '',
              Immatriculation: '',
              DateD_achat: '',
              numeroDePlace: 0,
              Disponibilité: '',
              jourTitulaire: '',
              Montant: 0,
              MontantRestantApayer: 0,
            //   ImageVoiture: '',
              typeBoiteVitesse: '',
              annee: '',
              placeAssure: 0,
              typeCarburant: '',
              id_agence: 0,
              id_parking: 0,
            },
          });
          
        useEffect(() => {
          if (dataLibaghi) {
            form.reset({
                Marque:  dataLibaghi.Marque || "",
                Model: dataLibaghi.Model || "",
                Categorie: dataLibaghi.Categorie || "",
                Kilometrage: dataLibaghi.Kilometrage || "",
                Pneumatique: dataLibaghi.Pneumatique || "",
                NumeroDechassis: dataLibaghi.NumeroDechassis || "",
                Immatriculation: dataLibaghi.Immatriculation || "",
                DateD_achat: dataLibaghi.DateD_achat || "",
                numeroDePlace: dataLibaghi.numeroDePlace || "",
                Disponibilité: dataLibaghi.Disponibilite || "",
                jourTitulaire: dataLibaghi.jourTitulaire || "",
                Montant: dataLibaghi.Montant || "",
                MontantRestantApayer: dataLibaghi.MontantRestantApayer || "",
                // ImageVoiture: dataLibaghi.ImageVoiture || "",
                typeBoiteVitesse: dataLibaghi.typeBoiteVitesse || "",
                annee: dataLibaghi.annee || "",
                placeAssure: dataLibaghi.placeAssure || "",
                typeCarburant: dataLibaghi.typeCarburant || "",
                id_agence: dataLibaghi.id_agence || "",
                id_parking: dataLibaghi.id_parking || "",
                
            });
          }
        },[dataLibaghi]);
      
        const updateVehiculeMutation = useMutation(async (formData) => {
          const response = await VehiculeApi.update(dataLibaghi.id, formData);
          return response.data;
        }, {
          onSuccess: () => {
            queryClient.invalidateQueries('vehicules');
            setValue(!value);
          }
        });
      
        const createVehiculeMutation = useMutation(async (formData) => {
          console.log('data zozo',formData)
          const response = await VehiculeApi.create(formData);
          return response.data;
        }, {
          onSuccess: () => {
            queryClient.invalidateQueries('vehicules');
            setValue(!value);
          }
        });


        
        const submitHandler = async (formData) => {
          try {
            if (methode === 'update') {
              await updateVehiculeMutation.mutateAsync(formData);
              console.log('Form submitted successfully');
            } else if (methode === 'create') {
              await createVehiculeMutation.mutateAsync(formData);
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
<div className={`${value ? 'slide-in' : 'slide-out'}`}>
<form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8" style={{  flexDirection: 'column', width: '28rem',height:'60rem', background: 'white', border: '1px solid #eeee', boxShadow: '5px 6px 5px 6px #eeee'}} id='myform'>
<div><h1 className=' font-bold bg-slate-100 px-3 w-96' style={{marginBottom:'-50px',borderBottom:'2px solid black'}}>{titre}</h1></div>
 
    <table style={{ zIndex: 1000 }}>
        <tbody>
            <tr>
                <td><FormField
                control={form.control}
                name="Marque"
               render={({ field }) => (
               <FormItem>
               <FormLabel>Marque</FormLabel>
               <FormControl>
              <Input placeholder="Entrez le Marque" {...field} />
              </FormControl>
               <FormMessage />
              </FormItem>
               )}
                /></td>
                <td>
                    
                    <FormField
                    control={form.control}
                    name="Model"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Model</FormLabel>
                        <FormControl>
                            <Input type='text' placeholder="Entrez le Model" {...field} />
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
                        name="Categorie"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Categorie</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Entrez Categorie" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </td>
                    <td>
                    
                    <FormField
                        control={form.control}
                        name="Kilometrage"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Kilometrage</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Entrez Kilometrage" {...field} />
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
                        name="Pneumatique"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Pneumatique</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Entrez le Pneumatique" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        /></td>
                        <td>
                            <FormField
                                control={form.control}
                                name="NumeroDechassis"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>NumeroDechassis</FormLabel>
                                    <FormControl>
                                        <Input type='text' placeholder="Entrez  NumeroDechassis" {...field} />
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
                            name="Immatriculation"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel> Immatriculation</FormLabel>
                                <FormControl>
                                    <Input placeholder="Entrez  Immatriculation" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            /></td>
                            <td>
                              
                                    <FormField
                                    control={form.control}
                                    name="DateD_achat"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>DateD_achat</FormLabel>
                                        <FormControl>
                                            <Input type='date' typeplaceholder="Entrez DateD_achat" {...field} />
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
                            name="numeroDePlace"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>numeroDePlace</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Entrez numeroDePlace" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                    </td>
                    <td>
    <FormField
        control={form.control}
        name="Disponibilité"
        render={({ field }) => (
            <FormItem>
                <FormLabel>Disponibilité</FormLabel>
                <FormControl>
                <div>
                                  <select {...field}>
                                  <option value="choisissez" style={{size:'1px'}} selected disabled>choisissez...</option>
                                  <option value="oui" style={{size:'12px'}}>oui</option>
                                  <option value="non" style={{size:'12px'}}>non</option>
                                  </select>
                                </div>
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
                            name="jourTitulaire"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel> jourTitulaire</FormLabel>
                                <FormControl>
                                    <Input type='date' placeholder="Entrez  jourTitulaire" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                    </td>

                    <td>
                          <FormField
                            control={form.control}
                            name="Montant"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel> Montant</FormLabel>
                                <FormControl>
                                    <Input type='number' placeholder="Entrez  Montant" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                    </td>
                 </tr>
                 <tr>
                    <td> <FormField
                            control={form.control}
                            name="MontantRestantApayer"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel> MontantRestantApayer</FormLabel>
                                <FormControl>
                                    <Input  type='number' placeholder="Entrez  MontantRestantApayer" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            /></td>
                    <td>
                    <FormField
                            control={form.control}
                            name="typeBoiteVitesse"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel> typeBoiteVitesse</FormLabel>
                                <FormControl>
                                <div>
                                  <select {...field}>
                                  <option value="choisissez" style={{size:'1px'}} selected disabled>choisissez...</option>
                                  <option value="automatique" style={{size:'12px'}}>automatique</option>
                                  <option value="manuelle" style={{size:'12px'}}>manuelle</option>
                                  </select>
                                </div>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                    </td>
                 </tr>
                 <tr>
                    <td> <FormField
                            control={form.control}
                            name="annee"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel> annee</FormLabel>
                                <FormControl>
                                    <Input  type='number' placeholder="Entrez  annee" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            /></td>
                    <td>
                    <FormField
                            control={form.control}
                            name="placeAssure"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel> placeAssure</FormLabel>
                                <FormControl>
                                    <Input type='number' placeholder="Entrez  placeAssure" {...field} />
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
                            name="typeCarburant"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel> typeCarburant</FormLabel>
                                <FormControl>
                                    <Input placeholder="Entrez  typeCarburant" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                    </td>
                    <td>
                    <FormField
                            control={form.control}
                            name="id_agence"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel> id_agence</FormLabel>
                                <FormControl>
                                    <Input type='number' placeholder="Entrez  id_agence" {...field} />
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
                            name="id_parking"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel> id_parking</FormLabel>
                                <FormControl>
                                    <Input type='number' placeholder="Entrez  id_parking" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                    </td>
                    <td>
                    <FormField
                            control={form.control}
                            name="ImageVoiture"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel> ImageVoiture</FormLabel>
                                <FormControl>
                                    <Input type='file' placeholder="Entrez  ImageVoiture" {...field} />
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
    <Button style={{ color: 'white',width:' 4rem',fontSize:'12px'}}  type="submit" >{titre}</Button>
    <Button style={{ color: 'white',width:' 4rem',fontSize:'12px' }} onClick={change} type="reset">Annuler</Button>
   </div>
  </form>  
</div>
</div>

</Form>
  )
}

export default FormulaireComponentVehicule




