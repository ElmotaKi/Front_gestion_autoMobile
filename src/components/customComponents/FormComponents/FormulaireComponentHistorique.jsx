import React, { useEffect, useState } from 'react';
import '../../../App.css';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FcOk } from "react-icons/fc";
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

import { useMutation, useQueryClient, useQuery } from 'react-query';
import { FormSelect } from 'react-bootstrap';
import AssuranceApi from '@/services/Admin/AssuranceApi';
import VehiculeApi from '@/services/Admin/VehiculeApi';
import PneumatiqueApi from '@/services/Admin/PneumatiqueApi';
import HistoriqueApi from '@/services/Admin/HistoriqueApi';

function FormulaireComponentHistorique({ formVisible, titre, dataLibaghi, methode }) {
  const queryClient = useQueryClient();
  const [value, setValue] = useState(formVisible);
  const { data: vehicules } = useQuery('vehicules', VehiculeApi.all);
  const [alertVisible, setAlertVisible] = useState(false); 
  const [alertMessage, setAlertMessage] = useState("");
  const formSchema = z.object({
    Date_reparation: z.string().min(2,
       { message: "Date_reparation must be at least 2 characters." }),
    Type_reparation: z.string().min(2, { message: "Type_reparation must be at least 2 characters." }),
    cout: z.string().min(2, { message: "cout must be at least 2 characters." }),
    kilometrage: z.string().min(2, { message: "kilometrage must be at least 2 characters." }),
    Etat_Pneu_Avant: z.string().min(2, { message: "Etat_Pneu_Avant must be at least 2 characters." }),
    Etat_Pneu_Apres: z.string().min(2, { message: "Etat_Pneu_Apres must be at least 2 characters." }),
    id_vehicule: z.coerce.number().int().positive({ message: "id_vehicule must be a positive integer." }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
     Date_reparation: "",
     Type_reparation: "",
     cout: "",
     kilometrage: "",
     Etat_Pneu_Avant: "",
     Etat_Pneu_Apres: "",
     id_vehicule: 0,
    },
  });

  const change = () => {
    setValue(!value);
  };

  useEffect(() => {
    if (dataLibaghi) {
      form.reset({
        Date_reparation: dataLibaghi.Date_reparation || "",
        Type_reparation: dataLibaghi.Type_reparation || "",
        cout: dataLibaghi.cout || "",
        kilometrage: dataLibaghi.kilometrage || "",
        Etat_Pneu_Avant: dataLibaghi.Etat_Pneu_Avant || "",
        Etat_Pneu_Apres: dataLibaghi.Etat_Pneu_Apres || "",
        id_vehicule: dataLibaghi.id_vehicule || "",
      });
    }
  }, [dataLibaghi]);

  const updateHistoriqueMutation = useMutation(async (formData) => {
    const response = await HistoriqueApi.update(dataLibaghi.id, formData);
    return response.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('historiques');
      setAlertMessage("historique mise à jour avec succès !");
      setAlertVisible(true);
      setValue(!value);
      hideAlertAfterDelay();
    }
  });

  const createHistoriqueMutation = useMutation(async (formData) => {
    const response = await HistoriqueApi.create(formData);
    return response.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('historiques');
      setAlertMessage("Historique créée avec succès !");
      setAlertVisible(true);
      setValue(!value);
      hideAlertAfterDelay();
    }
  });

  const submitHandler = async (formData) => {
    try {
      if (methode === 'update') {
        await updateHistoriqueMutation.mutateAsync(formData);
        console.log('Form submitted successfully');
      } else if (methode === 'create') {
        await createHistoriqueMutation.mutateAsync(formData);
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
        <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8" style={{ flexDirection: 'column', width: '28rem', height: '30rem', background: 'white', border: '1px solid #eeee', boxShadow: '5px 6px 5px 6px #eeee' }} id='myform'>
          <div><h1 className='font-bold bg-slate-100 px-3 w-96' style={{ marginBottom: '-50px', borderBottom: '2px solid black' }}>{titre}</h1></div>
          <table style={{ zIndex: 1000 }}>
            <tbody>
              <tr>
                <td>
                  <FormField
                    control={form.control}
                    name="Date_reparation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel style={{ marginLeft: "-100px" }}>Date_reparation</FormLabel>
                        <FormControl>
                          <Input type='date'placeholder="Entrez la Date_reparation" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </td>
                <td>
                  <FormField
                    control={form.control}
                    name="Type_reparation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel style={{ marginLeft: "-100px" }}>Type_reparation</FormLabel>
                        <FormControl>
                          <Input type='string' placeholder="Entrez le Type_reparation" {...field} />
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
                    name="cout"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel style={{ marginLeft: "-70px" }}>cout</FormLabel>
                        <FormControl>
                          <Input type='string' placeholder="Entrez la cout" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </td>
                <td>
                  <FormField
                    control={form.control}
                    name="kilometrage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel style={{ marginLeft: "-100px" }}>kilometrage</FormLabel><br />
                        <FormControl>
                          <Input type='string' placeholder="Entrez le kilometrage" {...field} />
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
                    name="Etat_Pneu_Avant"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel style={{ marginLeft: "-100px" }}>Etat_Pneu_Avant</FormLabel><br />
                        <FormControl>
                          <Input type='string' placeholder="Entrez l Etat_Pneu_Avant" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </td>
                <td>
                  <FormField
                    control={form.control}
                    name="Etat_Pneu_Apres"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel style={{ marginLeft: "-100px" }}>Etat_Pneu_Apres</FormLabel><br />
                        <FormControl>
                          <Input type='string' placeholder="Entrez l'Etat_Pneu_Apres" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </td>
              </tr>
              <td>
                  <FormField
                    control={form.control}
                    name="id_vehicule"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel style={{ marginLeft: "-100px" }}>Immatriculation</FormLabel><br />
                        <FormControl>
                          <FormSelect {...field} className="form-select">
                            <option value="">Sélectionnez une Véhicule</option>
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
             
            </tbody>
          </table>
          <div className='flex items-center' style={{ marginTop: '10px' }}>
            <div className='btn'>
              <Button style={{ color: 'white', width: '4rem', fontSize: '12px', marginRight: '40px' }} type="submit">
                {methode === 'create' ? "Ajouter" : "Modifier"}
              </Button>
            </div>
            <div className='btn'>
              <Button style={{ color: 'white', width: '4rem', fontSize: '12px' }} onClick={change} type="reset">Annuler</Button>
            </div>
          </div>
        </form>
      </div>
      </div>
    </Form>
  );
}

export default FormulaireComponentHistorique;
