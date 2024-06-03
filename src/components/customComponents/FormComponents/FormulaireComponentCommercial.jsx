import React, { useEffect, useState } from 'react';
import '../../../App.css';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useQuery } from 'react-query';
import {FormSelect} from 'react-bootstrap';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CommercialApi from '@/services/Admin/CommercialApi';
import { useMutation, useQueryClient } from 'react-query';
import SocieteApi from '@/services/Admin/SocieteApi';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FcOk } from "react-icons/fc";
function FormulaireComponentcommercial({ formVisible, titre, dataLibaghi, methode }) {
  const queryClient = useQueryClient();
  const [value, setValue] = useState(formVisible);
  const { data: societes} = useQuery('societes', SocieteApi.get);
  const [alertVisible, setAlertVisible] = useState(false); 
  const [alertMessage, setAlertMessage] = useState("");
  const change = () => {
    setValue(!value);
  };

  const formSchema = z.object({
    CIN: z.string().min(2, {
      message: "CIN doit comporter au moins 2 caractères.",
    }),
    Nom: z.string().min(2,{
      message: "Nom doit comporter au moins 2 caractères.",
    }),
    Prenom: z.string().min(2,{
      message: "Prenom doit comporter au moins 2 caractères.",
    }),
    Sexe: z.enum(["Masculin", "Feminin"],{
      message: "Sexe doit être 'Masculin' ou 'Feminin'.",
    }),
    DateNaissance: z.string().date( {
      message: "Date de naissance doit être une date valide.",
    }),
    Tel: z.string().min(8, {
      message: "Tel doit comporter au moins 10 caractères.",
    }),
    Adresse: z.string().min(5, {
      message: "Adresse doit comporter au moins 5 caractères.",
    }),
    Ville: z.string().min(2, {
      message: "Ville doit comporter au moins 2 caractères.",
    }),
    id_societe: z.coerce.number().int().positive({
      message: "id_agence must be a positive integer.",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      CIN: "",
      Nom: "",
      Prenom: "",
      Sexe: "",
      DateNaissance: "",
      Tel: "",
      Adresse:"",
      Ville:"",
      id_societe: 0,
    },
  });

  useEffect(() => {
    if (dataLibaghi) {
      form.reset({
        CIN: dataLibaghi.CIN || "",
        Nom: dataLibaghi.Nom || "",
        Prenom: dataLibaghi.Prenom || "",
        Sexe: dataLibaghi.Sexe || "",
        DateNaissance: dataLibaghi.DateNaissance || "",
        Tel: dataLibaghi.Tel || "",
        Adresse:dataLibaghi.Adresse || "",
        Ville:dataLibaghi.Ville || "",
        id_societe: dataLibaghi.id_societe || "",
      });
    }
  }, [dataLibaghi]);

  const updatecommercialMutation = useMutation(async (formData) => {
    const response = await CommercialApi.update(dataLibaghi.id, formData);
    console.log(response)
    return response.data;
    console.log(response.data)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('commercials');
      setAlertMessage("Commercial mise à jour avec succès !");
      setAlertVisible(true);
      setValue(!value);
      hideAlertAfterDelay();
    }

  });

  const createcommercialMutation = useMutation(async (formData) => {
    const response = await CommercialApi.create(formData);
    console.log(response)
    return response.data;
    
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('commercials');
      setAlertMessage("Commercial créée avec succès !");
      setAlertVisible(true);
      setValue(!value);
      hideAlertAfterDelay();
    }

  });

  const submitHandler = async (formData) => {
    try {
      if (methode === 'update') {
       
        await updatecommercialMutation.mutateAsync(formData);
        console.log('Formulaire soumis avec succès');
      } else if (methode === 'create') {
        console.log('my data',formData)
        await createcommercialMutation.mutateAsync(formData);
        console.log('Formulaire soumis avec succès');
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const validationErrors = error.response.data;
        console.error('Erreurs de validation :', validationErrors);
      } else {
        console.error('Erreur lors de la soumission du formulaire :', error);
      }
    }
  };
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
        <div className={` ${value ? 'slide-in' : 'slide-out'}`}>
          <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8" style={{ flexDirection: 'column', width: '28rem', height: '35rem', background: 'white', border: '1px solid #eeee', boxShadow: '5px 6px 5px 6px #eeee' }} id='myform'>
          <div><h1 className=' font-bold bg-slate-100 px-3 w-96' style={{marginBottom:'-50px',borderBottom:'2px solid black'}}>{titre}</h1></div>            {/* NomAgent */}
            <table style={{ zIndex: 1000 }}>
              <tbody>
                <tr>
                  <td>
                    <FormField
                      control={form.control}
                      name="CIN"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel  style={{marginLeft: "-165px"}}>CIN</FormLabel>
                          <FormControl>
                            <Input placeholder="Entrez le CIN" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                  <td>
                    <FormField
                      control={form.control}
                      name="Nom"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel  style={{marginLeft: "-165px"}}>Nom</FormLabel>
                          <FormControl>
                            <Input placeholder="Entrez le Nom" {...field} />
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
                      name="Prenom"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel  style={{marginLeft: "-130px"}}>Prenom</FormLabel>
                          <FormControl>
                            <Input placeholder="Entrez le prenom" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                  <td>
                    <FormField
                      control={form.control}
                      name="Sexe"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel  style={{marginLeft: "-165px"}}>Sexe</FormLabel>
                          <FormControl>
                            <div>
                              <select {...field}>
                                <option value="choisissez" style={{ size: '1px' }} selected disabled>choisissez...</option>
                                <option value="Masculin" style={{ size: '12px' }}>Masculin</option>
                                <option value="Feminin" style={{ size: '12px' }}>Féminin</option>
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
                      name="DateNaissance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel  style={{marginLeft: "-90px"}}>DateNaissance</FormLabel>
                          <FormControl>
                            <Input type="date" placeholder="Entrez la date naissance" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                  <td>
                    <FormField
                      control={form.control}
                      name="Tel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel  style={{marginLeft: "-165px"}}>Tel</FormLabel>
                          <FormControl>
                            <Input placeholder="Entrez tel" {...field} />
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
                      name="Adresse"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel  style={{marginLeft: "-140px"}}>Adresse</FormLabel>
                          <FormControl>
                            <Input placeholder="Entrez l adresse" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                  <td>
                    <FormField
                      control={form.control}
                      name="Ville"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel  style={{marginLeft: "-165px"}}>Ville</FormLabel>
                          <FormControl>
                            <Input placeholder="Entrez la ville" {...field} />
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
                      name="id_societe"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel  style={{marginLeft: "-40px"}}>Societe</FormLabel>
                          <FormControl>     
                          <FormSelect {...field} className="form-select">
                        <option value="">Selectionnez une societe</option>
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
  );
}

export default FormulaireComponentcommercial;
