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
import AgenceApi from '@/services/Admin/AgenceApi';
import ParkingApi from '@/services/Admin/ParkingApi';
import { Alert, FormSelect } from 'react-bootstrap';
import { useMutation,QueryCache, useQueryClient,useQuery } from 'react-query';

function FormulaireComponentVehicule({ formVisible,titre,dataLibaghi,methode }) {
  const queryClient = useQueryClient()
  const { data: agences} = useQuery('agences',AgenceApi.getAll);
  const { data: parkings} = useQuery('parkings',ParkingApi.all);
  const uniqueParkings = parkings && parkings.data
  ? Array.from(new Set(parkings.data.map(parking => parking.Lieu)))
      .map(lieu => parkings.data.find(parking => parking.Lieu === lieu))
  : [];
          // Validation du champ username
          const formSchema = z.object({
            Marque: z.string(),
            Model: z.string(),
            Categorie: z.string(),
            Kilometrage: z.coerce.number(),
            Pneumatique: z.string(),
            NumeroDechassis: z.string(),
            Immatriculation: z.string(),
            DateD_achat: z.string(),
            numeroDePlace: z.coerce.number(),
            Disponibilité: z.enum(['oui', 'non']),
            jourTitulaire: z.string(),
            Montant: z.coerce.number(),
            MontantRestantApayer: z.coerce.number(),
            ImageVoiture: z.string(),
            typeBoiteVitesse: z.enum(['manuelle', 'automatique']),
            annee: z.string(),
            placeAssure: z.coerce.number(),
            typeCarburant: z.string(),
            id_agence: z.coerce.number(),
            id_parking: z.coerce.number(),
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
               <FormLabel style={{marginLeft: "-140px"}}>Marque</FormLabel>
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
                        <FormLabel style={{marginLeft: "-149px"}}>Model</FormLabel>
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
                            <FormLabel style={{marginLeft: "-130px"}}>Categorie</FormLabel>
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
                            <FormLabel style={{marginLeft: "-120px"}}>Kilometrage</FormLabel>
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
                            <FormLabel style={{marginLeft: "-105px"}}>Pneumatique</FormLabel>
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
                                    <FormLabel style={{marginLeft: "-70px"}}>NumeroDechassis</FormLabel>
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
                                <FormLabel style={{marginLeft: "-80px"}}> Immatriculation</FormLabel>
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
                                        <FormLabel style={{marginLeft: "-110px"}}>DateD_achat</FormLabel>
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
                                <FormLabel style={{marginLeft: "-75px"}}>numeroDePlace</FormLabel>
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
                <FormLabel style={{marginLeft: "-110px"}}>Disponibilité</FormLabel>
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
                                <FormLabel style={{marginLeft: "-110px"}}> jourTitulaire</FormLabel>
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
                                <FormLabel style={{marginLeft: "-140px"}}> Montant</FormLabel>
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
                                <FormLabel style={{marginLeft: "-30px"}}> MontantRestantApayer</FormLabel>
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
                                <FormLabel style={{marginLeft: "-80px"}}> typeBoiteVitesse</FormLabel>
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
                                <FormLabel style={{marginLeft: "-145px"}}> annee</FormLabel>
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
                                <FormLabel style={{marginLeft: "-110px"}}> placeAssure</FormLabel>
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
                                <FormLabel style={{marginLeft: "-90px"}}> typeCarburant</FormLabel>
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
                <FormLabel style={{ marginLeft: "-144px" }}>Agence</FormLabel><br />
                <FormControl>
                    <FormSelect {...field} className="form-select">
                        <option value="">Sélectionnez une agence</option>
                        {agences && agences.data && agences.data[1].map((agency) => (
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

                           
                    
                 </tr>
                 <tr>
                 <td>
    <FormField
        control={form.control}
        name="id_parking"
        render={({ field }) => (
            <FormItem>
                <FormLabel style={{ marginLeft: "-123px" }}>Lieu Parking</FormLabel><br />
                <FormControl>
                    <FormSelect {...field} className="form-select">
                        <option value="">Sélectionnez lieu parking</option>
                        {uniqueParkings.map((parking) => (
                            <option key={parking.id} value={parking.id}>
                                {parking.Lieu}
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
                    <FormField
                            control={form.control}
                            name="ImageVoiture"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel style={{marginLeft: "-100px"}}> ImageVoiture</FormLabel>
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

export default FormulaireComponentVehicule




