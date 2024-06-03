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

function FormulaireComponentPneumatique({ formVisible, titre, dataLibaghi, methode }) {
  const queryClient = useQueryClient();
  const [value, setValue] = useState(formVisible);
  const { data: vehicules } = useQuery('vehicules', VehiculeApi.all);
  const [alertVisible, setAlertVisible] = useState(false); 
  const [alertMessage, setAlertMessage] = useState("");
  const formSchema = z.object({
    Marque_Pneu: z.string().min(2, { message: "Marque_Pneu must be at least 2 characters." }),
    Modele_Pneu: z.string().min(2, { message: "Modele_Pneu must be at least 2 characters." }),
    Dimension_Pneu: z.string().min(2, { message: "Dimension_Pneu must be at least 2 characters." }),
    Type_Pneu: z.string().min(2, { message: "Type_Pneu must be at least 2 characters." }),
    Position_Pneu: z.string().min(2, { message: "Position_Pneu must be at least 2 characters." }),
    Etat_Pneu: z.string().min(2, { message: "Etat_Pneu must be at least 2 characters." }),
    Date_Verification: z.string().min(2, { message: "Date_Verification must be at least 2 characters." }),
    Date_Installation: z.string().min(2, { message: "Date_Installation must be at least 2 characters." }),
    Date_Changement: z.string().min(2, { message: "Date_Changement must be at least 2 characters." }),
    kilometrage_Verification: z.string().min(2, { message: "kilometrage_Verification must be at least 2 characters." }),
    kilometrage_Installation: z.string().min(2, { message: "kilometrage_Installation must be at least 2 characters." }),
    kilometrage_Final: z.string().min(2, { message: "kilometrage_Final must be at least 2 characters." }),
    Historique_Reparations: z.string().min(2, { message: "Historique_Reparations must be at least 2 characters." }),
    id_vehicule: z.coerce.number().int().positive({ message: "id_vehicule must be a positive integer." }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Marque_Pneu: "",
      Modele_Pneu: "",
      Dimension_Pneu: "",
      Type_Pneu: "",
      Position_Pneu: "",
      Etat_Pneu: "",
      Date_Verification: "",
      Date_Installation: "",
      Date_Changement: "",
      kilometrage_Verification: "",
      kilometrage_Installation: "",
      kilometrage_Final: "",
      Historique_Reparations: "",
      id_vehicule: 0,
    },
  });

  const change = () => {
    setValue(!value);
  };

  useEffect(() => {
    if (dataLibaghi) {
      form.reset({
        Marque_Pneu: dataLibaghi.Marque_Pneu || "",
        Modele_Pneu: dataLibaghi.Modele_Pneu || "",
        Dimension_Pneu: dataLibaghi.Dimension_Pneu || "",
        Type_Pneu: dataLibaghi.Type_Pneu || "",
        Position_Pneu: dataLibaghi.Position_Pneu || "",
        Etat_Pneu: dataLibaghi.Etat_Pneu || "",
        Date_Verification: dataLibaghi.Date_Verification || "",
        Date_Installation: dataLibaghi.Date_Installation || "",
        Date_Changement: dataLibaghi.Date_Changement || "",
        kilometrage_Verification: dataLibaghi.kilometrage_Verification || "",
        kilometrage_Installation: dataLibaghi.kilometrage_Installation || "",
        kilometrage_Final: dataLibaghi.kilometrage_Final || "",
        Historique_Reparations: dataLibaghi.Historique_Reparations || "",
        id_vehicule: dataLibaghi.id_vehicule || "",
      });
    }
  }, [dataLibaghi]);

  const updatePneumatiqueMutation = useMutation(async (formData) => {
    const response = await PneumatiqueApi.update(dataLibaghi.id, formData);
    return response.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('pneumatiques');
      setAlertMessage("Pneumatique mise à jour avec succès !");
        setAlertVisible(true);
        setValue(!value);
        hideAlertAfterDelay();
    }
  });

  const createPneumatiqueMutation = useMutation(async (formData) => {
    const response = await PneumatiqueApi.create(formData);
    return response.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('pneumatiques');
      setAlertMessage("Pneumatique créée avec succès !");
      setAlertVisible(true);
      setValue(!value);
      hideAlertAfterDelay(); 
    }
  });

  const submitHandler = async (formData) => {
    try {
      if (methode === 'update') {
        await updatePneumatiqueMutation.mutateAsync(formData);
        console.log('Form submitted successfully');
      } else if (methode === 'create') {
        await createPneumatiqueMutation.mutateAsync(formData);
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

        <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8" style={{ flexDirection: 'column', width: '28rem', height: '40rem', background: 'white', border: '1px solid #eeee', boxShadow: '5px 6px 5px 6px #eeee' }} id='myform'>
          <div><h1 className='font-bold bg-slate-100 px-3 w-96' style={{ marginBottom: '-50px', borderBottom: '2px solid black' }}>{titre}</h1></div>
          <table style={{ zIndex: 1000 }}>
            <tbody>
              <tr>
                <td>
                  <FormField
                    control={form.control}
                    name="Marque_Pneu"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel style={{ marginLeft: "-100px" }}>Marque_Pneu</FormLabel>
                        <FormControl>
                          <Input placeholder="Entrez la marque du pneu" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </td>
                <td>
                  <FormField
                    control={form.control}
                    name="Modele_Pneu"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel style={{ marginLeft: "-100px" }}>Modele_Pneu</FormLabel>
                        <FormControl>
                          <Input type='string' placeholder="Entrez le modèle du pneu" {...field} />
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
                    name="Dimension_Pneu"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel style={{ marginLeft: "-70px" }}>Dimension_Pneu</FormLabel>
                        <FormControl>
                          <Input type='string' placeholder="Entrez la dimension du pneu" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </td>
                <td>
                  <FormField
                    control={form.control}
                    name="Type_Pneu"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel style={{ marginLeft: "-100px" }}>Type_Pneu</FormLabel><br />
                        <FormControl>
                          <Input type='string' placeholder="Entrez le type de pneu" {...field} />
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
                    name="Position_Pneu"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel style={{ marginLeft: "-100px" }}>Position_Pneu</FormLabel><br />
                        <FormControl>
                          <Input type='string' placeholder="Entrez la position du pneu" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </td>
                <td>
                  <FormField
                    control={form.control}
                    name="Etat_Pneu"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel style={{ marginLeft: "-100px" }}>Etat_Pneu</FormLabel><br />
                        <FormControl>
                          <Input type='string' placeholder="Entrez l'état du pneu" {...field} />
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
                    name="Date_Verification"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel style={{ marginLeft: "-80px" }}>Date_Verification</FormLabel><br />
                        <FormControl>
                          <Input type='date' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </td>
                <td>
                  <FormField
                    control={form.control}
                    name="Date_Installation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel style={{ marginLeft: "-80px" }}>Date_Installation</FormLabel><br />
                        <FormControl>
                          <Input type='date' {...field} />
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
                    name="Date_Changement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel style={{ marginLeft: "-40px" }}>Date_Changement</FormLabel><br />
                        <FormControl>
                          <Input type='date' placeholder="Entrez la date changement" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </td>
             
             
                <td>
                  <FormField
                    control={form.control}
                    name="kilometrage_Verification"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel style={{ marginLeft: "-40px" }}>kilometrage_Verification</FormLabel><br />
                        <FormControl>
                          <Input type='string' placeholder="Entrez le kilométrage de vérification" {...field} />
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
                    name="kilometrage_Installation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel style={{ marginLeft: "-40px" }}>kilometrage_Installation</FormLabel><br />
                        <FormControl>
                          <Input type='string' placeholder="Entrez le kilométrage d'installation" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </td>
              <td>
                  <FormField
                    control={form.control}
                    name="kilometrage_Final"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel style={{ marginLeft: "-40px" }}>kilometrage_Final</FormLabel><br />
                        <FormControl>
                          <Input type='string' placeholder="Entrez le kilométrage final" {...field} />
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
                    name="Historique_Reparations"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel style={{ marginLeft: "-40px" }}>Historique_Reparations</FormLabel><br />
                        <FormControl>
                          <Input type='string' placeholder="Entrez l'historique des réparations" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </td>
                <td>
                  <FormField
                    control={form.control}
                    name="id_vehicule"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel style={{ marginLeft: "-80px" }}>id_vehicule</FormLabel><br />
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
              </tr>
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

export default FormulaireComponentPneumatique;
