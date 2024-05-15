import React, { useEffect, useState } from 'react';
import '../../../App.css';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

function FormulaireComponentcommercial({ formVisible, titre, dataLibaghi, methode }) {
  const queryClient = useQueryClient();
  const [value, setValue] = useState(formVisible);
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
      setValue(!value);
    }

  });

  const createcommercialMutation = useMutation(async (formData) => {
    const response = await CommercialApi.create(formData);
    console.log(response)
    return response.data;
    
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('commercials');
      setValue(!value);
    }

  });

  const submitHandler = async (formData) => {
    try {
      if (methode === 'update') {
        await updatecommercialMutation.mutateAsync(formData);
        console.log('Formulaire soumis avec succès');
      } else if (methode === 'create') {
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

  return (
    <Form {...form}>
      <div>
        <div className={` ${value ? 'slide-in' : 'slide-out'}`}>
          <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8" style={{ flexDirection: 'column', width: '28rem', height: '28.7rem', background: 'white', border: '1px solid #eeee', boxShadow: '5px 6px 5px 6px #eeee' }} id='myform'>
            <div><h1 className='titre' style={{ marginBottom: '-50px' }}>{titre}</h1></div>
            {/* NomAgent */}
            <table style={{ zIndex: 1000 }}>
              <tbody>
                <tr>
                  <td>
                    <FormField
                      control={form.control}
                      name="CIN"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CIN</FormLabel>
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
                          <FormLabel>Nom</FormLabel>
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
                          <FormLabel>Prenom</FormLabel>
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
                          <FormLabel>Sexe</FormLabel>
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
                          <FormLabel>DateNaissance</FormLabel>
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
                          <FormLabel>Tel</FormLabel>
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
                          <FormLabel>Adresse</FormLabel>
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
                          <FormLabel>Ville</FormLabel>
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
                          <FormLabel>ID de societe</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Entrez l'ID de la societe" {...field} />
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
            <div className='btn' style={{ marginTop: '-1px' }}>
              <Button style={{ color: 'white', width: ' 4rem', fontSize: '12px' }} type="submit" >Soumettre</Button>
              <Button style={{ color: 'white', width: ' 4rem', fontSize: '12px' }} onClick={change} type="reset">Annuler</Button>
            </div>
          </form>
        </div>
      </div>
    </Form>
  );
}

export default FormulaireComponentcommercial;