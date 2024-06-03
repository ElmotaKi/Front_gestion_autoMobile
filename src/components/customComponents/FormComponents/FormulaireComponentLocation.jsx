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

import {FormSelect } from 'react-bootstrap';
import { useMutation,QueryCache, useQueryClient,useQuery } from 'react-query';
import AgentApi from '@/services/Admin/AgentApi';
import SocieteApi from '@/services/Admin/SocieteApi';
import LocationApi from '@/services/Admin/LocationApi';
import ClientParticulierApi from '@/services/Admin/ClientParticulierApi';
import ContratApi from '@/services/Admin/ContratApi';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FcOk } from "react-icons/fc";
function FormulaireComponentLocation({ formVisible,titre,dataLibaghi,methode }) {
  const queryClient = useQueryClient()
  const { data: agents} = useQuery('agents',AgentApi.getAll);
  const { data: ClientParticuliers} = useQuery('ClientParticuliers',ClientParticulierApi.all);
  const  {data: societes} = useQuery('societes',SocieteApi.get);
  const{data: vehicules} = useQuery('vehicules',VehiculeApi.all);
  const{data: Contrats} = useQuery('Contrats',ContratApi.all);
  const [alertVisible, setAlertVisible] = useState(false); 
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState('');
          // Validation des champs
          const formSchema = z.object({
            dateDebutLocation: z.string().date(),
            dateFinLocation: z.string().date(),
            Contrat: z.string(),
            NbrJours: z.coerce.number(),
            Montant:  z.coerce.number(),
            status: z.enum(["Complete", "encours"]),
            DateRetourPrevue: z.string().date(),
            // DateRetourVoiture: z.string().date(),
            KilometrageAvant: z.coerce.number(),
            // KilometrageApres: z.coerce.number(),
            // ImageApres: z.string(),
            ImageAvant:  z.string(),
            id_vehicule: z.coerce.number(),
            id_agent: z.coerce.number(),
            id_clientParticulier: z.coerce.number(),
            id_societe: z.coerce.number(),
            id_contrat: z.coerce.number(),
          });
          
       
          const form = useForm({
            resolver: zodResolver(formSchema),
            defaultValues: {
                dateDebutLocation:'',
                dateFinLocation: '',
                Contrat: '',
                NbrJours: 0,
                Montant: 0,
                status: '',
                DateRetourPrevue: '',
                // DateRetourVoiture: '',
                KilometrageAvant: 0,
                // KilometrageApres: 0,
                // ImageApres: '',
                // ImageAvant: '',
                id_vehicule: 0,
                id_agent: 0,
                id_societe: 0,
                id_clientParticulier: 0,
                id_contrat: 0,
            },
          });
          
        useEffect(() => {
          if (dataLibaghi) {
            form.reset({
                dateDebutLocation: dataLibaghi.dateDebutLocation || "",
                dateFinLocation: dataLibaghi.dateFinLocation || "",
                Contrat: dataLibaghi.Contrat || "",
                NbrJours: dataLibaghi.NbrJours || "",
                Montant: dataLibaghi.Montant || "",
                status: dataLibaghi.status || "",
                DateRetourPrevue: dataLibaghi.DateRetourPrevue || "",
                // DateRetourVoiture: dataLibaghi.DateRetourVoiture || "",
                KilometrageAvant: dataLibaghi.KilometrageAvant || "",
                // KilometrageApres: dataLibaghi.KilometrageApres || "",
                // ImageApres: dataLibaghi.ImageApres || "",
                // ImageAvant: dataLibaghi.ImageAvant  || "",
                id_vehicule: dataLibaghi.id_vehicule || "",
                id_societe: dataLibaghi.id_societe || "",
                id_clientParticulier: dataLibaghi.id_clientParticulier || "",
                id_agent: dataLibaghi.id_agent || "",
                id_contrat: dataLibaghi.id_contrat || "",
            });
          }
        },[dataLibaghi]);
      
        const updateLocationMutation = useMutation(async (formData) => {
          const response = await LocationApi.update(dataLibaghi.id, formData);
          return response.data;
        }, {
          onSuccess: () => {
            queryClient.invalidateQueries('locations');
            setAlertMessage("Location créée avec succès !");
            setAlertVisible(true);
            setValue(!value);
            hideAlertAfterDelay();
          }
        });
      
        const createLocationMutation = useMutation(async (formData) => {
          console.log('data zozo',formData)
          const response = await LocationApi.create(formData);
          return response.data;
        }, {
          onSuccess: () => {
            queryClient.invalidateQueries('locations');
            setAlertMessage("Location créée avec succès !");
            setAlertVisible(true);
            setValue(!value);
            hideAlertAfterDelay();
          }
        });

const testHandle = (e) =>{
    setSelectedOption(e)
    console.log('valeurselectionner',e)
}
        
        const submitHandler = async (formData) => {
          try {
            
            if (methode === 'update') {
              await updateLocationMutation.mutateAsync(formData);
              console.log('Form submitted successfully');
            } else if (methode === 'create') {
               
              await createLocationMutation.mutateAsync(formData);
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
    const hideAlertAfterDelay = () => {
        setTimeout(() => {
          setAlertVisible(false);
        }, 2000); 
      };
    return (
     
    <Form {...form}>
     
<div>
{alertVisible && (
       <Alert style={{ width: '30rem', height: '15rem' }} className="flex flex-col justify-center items-center">
       <AlertTitle className="mb-6">Succès!</AlertTitle>
       <AlertDescription className="flex flex-col items-center" style={{fontSize:'15px'}}>
         {alertMessage}
         <FcOk className="animate-bounce mt-4" style={{ width: '15rem', height: '5rem' }} />
       </AlertDescription>
     </Alert>
      )}
<div className={`${value ? 'slide-in' : 'slide-out'}`}>
<form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8" style={{  flexDirection: 'column', width: '28rem',height:'50rem', background: 'white', border: '1px solid #eeee', boxShadow: '5px 6px 5px 6px #eeee'}} id='myform'>
<div><h1 className=' font-bold bg-slate-100 px-3 w-96' style={{marginBottom:'-50px',borderBottom:'2px solid black'}}>{titre}</h1></div>
 
    <table style={{ zIndex: 1000 }}>
        <tbody>
            <tr>
                <td><FormField
                control={form.control}
                name="dateDebutLocation"
               render={({ field }) => (
               <FormItem>
               <FormLabel style={{marginLeft: "-70px"}}>dateDebutLocation</FormLabel>
               <FormControl>
              <Input type='date' placeholder="Entrez le dateDebutLocation" {...field} />
              </FormControl>
               <FormMessage />
              </FormItem>
               )}
                /></td>
                <td>
                    
                    <FormField
                    control={form.control}
                    name="dateFinLocation"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel style={{marginLeft: "-90px"}}>dateFinLocation</FormLabel>
                        <FormControl>
                            <Input type='date' placeholder="Entrez le dateFinLocation" {...field} />
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
                        name="Contrat"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel style={{marginLeft: "-130px"}}>Contrat</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Entrez Contrat" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </td>
                    <td>
                    
                    <FormField
                        control={form.control}
                        name="NbrJours"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel style={{marginLeft: "-120px"}}>NbrJours</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Entrez NbrJours" {...field} />
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
                        name="Montant"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel style={{marginLeft: "-105px"}}>Montant</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Entrez le Montant" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        /></td>
                        <td>
                        <FormField
                            control={form.control}
                            name="DateRetourPrevue"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel style={{marginLeft: "-80px"}}>DateRetourPrevue</FormLabel>
                                <FormControl>
                                    <Input type='date' placeholder="Entrez  DateRetourPrevue" {...field} />
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
                        name="id_contrat"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel style={{ marginLeft: "-120px" }}>nomContrat</FormLabel><br />
                                <FormControl>
                                    <FormSelect {...field} className="form-select">
                                        <option value="">Sélectionnez un nomContrat</option>
                                        {Contrats && Contrats.data && Contrats.data[0].map((contrat) => (
                                            <option key={contrat.id} value={contrat.id}>
                                                {contrat.nomContrat}
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
        name="id_societe"
        render={({ field }) => (
            <FormItem>
                <FormLabel style={{ marginLeft: "-120px" }}>RaisonSocial</FormLabel><br />
                <FormControl>
                    <FormSelect {...field} className="form-select">
                        <option value="">Sélectionnez un RaisonSocial</option>
                        {societes && societes.data && societes.data.map((societe) => (
                            <option key={societe.id} value={societe.id}>
                                {societe.RaisonSocial}
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
                            name="KilometrageAvant"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel style={{marginLeft: "-75px"}}>KilometrageAvant</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Entrez KilometrageAvant" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                    </td>
                    <td>
    <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
            <FormItem>
                <FormLabel style={{marginLeft: "-110px"}}>status</FormLabel>
                <FormControl>
                <div>
                <select
                            {...field}
                            onChange={(e) => {
                                field.onChange(e);
                                testHandle(e.target.value);
                            }}
                        >
                                  <option value="choisissez" style={{size:'1px'}} selected disabled>choisissez...</option>
                                  <option value="Complete" style={{size:'12px'}}>Complete</option>
                                  <option value="encours" style={{size:'12px'}}>encours</option>
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
                    name="id_clientParticulier"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel style={{ marginLeft: "-144px" }}>Client</FormLabel><br />
                            <FormControl>
                                <FormSelect {...field} className="form-select">
                                    <option value="">Sélectionnez une Client</option>
                                    {ClientParticuliers && ClientParticuliers.data && ClientParticuliers.data[0].map((client) => (
                                        <option key={client.id} value={client.id}>
                                            {client.Nom}
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
                            name="ImageAvant"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel style={{marginLeft: "-120px"}}> ImageAvant</FormLabel>
                                <FormControl>
                                    <Input type='file' placeholder="Entrez  ImageAvant" {...field} />
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
                            <FormLabel style={{ marginLeft: "-90px" }}>Immatriculation</FormLabel><br />
                            <FormControl>
                                <FormSelect {...field} className="form-select">
                                    <option value="">Sélectionnez vehicule</option>
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
        name="id_agent"
        render={({ field }) => (
            <FormItem>
                <FormLabel style={{ marginLeft: "-110px" }}>NomAgent</FormLabel><br />
                <FormControl>
                    <FormSelect {...field} className="form-select">
                        <option value="">Sélectionnez une agent</option>
                        {agents && agents.data && agents.data[0].map((agent) => (
                            <option key={agent.id} value={agent.id}>
                                {agent.NomAgent}
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
     {selectedOption === "Complete" &&  <FormField
                            control={form.control}
                            name="ImageApres"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel style={{marginLeft: "-110px"}}>ImageApres</FormLabel>
                                <FormControl>
                                    <Input type='file' placeholder="Entrez  ImageApres" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />}</td>
                    <td>
    {selectedOption === "Complete" &&
                                    <FormField
                                    control={form.control}
                                    name="DateRetourVoiture"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel style={{marginLeft: "-70px"}}>DateRetourVoiture</FormLabel>
                                        <FormControl>
                                            <Input type='date' typeplaceholder="Entrez DateRetourVoiture" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                    />}
                    </td>
                    </tr>
                    <tr>
                        <td> 
                     {selectedOption === "Complete" && <FormField 
                                control={form.control}
                                name="KilometrageApres"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel style={{marginLeft: "-70px"}}>KilometrageApres</FormLabel>
                                    <FormControl>
                                        <Input type='number' placeholder="Entrez  KilometrageApres" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />}</td>
                        <td></td>
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

export default FormulaireComponentLocation




