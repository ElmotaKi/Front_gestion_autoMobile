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
import SocieteApi from '@/services/Admin/SocieteApi';
import { useMutation, useQueryClient } from 'react-query';

function FormulaireComponentSociete({ formVisible, titre, dataLibaghi, methode }) {
  const queryClient = useQueryClient();
  const [value, setValue] = useState(formVisible);
  const change = () => {
    setValue(!value);
}
  const formSchema = z.object({
    RaisonSocial: z.string().min(2, {
      message: "Raison sociale doit comporter au moins 2 caractères.",
    }),
    ICE: z.coerce.number({
      message: "ICE doit comporter au moins 2 caractères.",
    }),
    NumeroCNSS:z.coerce.number({
      message: "Numéro CNSS doit comporter au moins 10 caractères.",
    }),
    NumeroFiscale:z.coerce.number( {
      message: "Numéro fiscal doit comporter au moins 10 caractères.",
    }),
    RegistreCommercial: z.string().min(5, {
      message: "Registre commercial doit comporter au moins 5 caractères.",
    }),
    AdresseSociete: z.string().min(5, {
      message: "Adresse de la société doit comporter au moins 5 caractères.",
    }),
    id_societe: z.coerce.number( {
      message: "ID de la société doit comporter au moins 5 caractères.",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      RaisonSocial: "",
      ICE: "",
      NumeroCNSS: "",
      NumeroFiscale: "",
      RegistreCommercial: "",
      AdresseSociete: "",
      id_societe: 0,
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
        id_societe: dataLibaghi.id_societe || "",
      });
    }
  }, [dataLibaghi]);

  const updateSocieteMutation = useMutation(async (formData) => {
    const response = await SocieteApi.update(dataLibaghi.id, formData);
    return response.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('societes');
      setValue(!value);
    }

  });

  const createSocieteMutation = useMutation(async (formData) => {
    const response = await SocieteApi.create(formData);
    return response.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('societes');
      setValue(!value);
    }

  });

  const submitHandler = async (formData) => {
    try {
      if (methode === 'update') {
        await updateSocieteMutation.mutateAsync(formData);
        console.log('Formulaire soumis avec succès');
      } else if (methode === 'create') {
        await createSocieteMutation.mutateAsync(formData);
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
          <div><h1 className=' font-bold bg-slate-100 px-3 w-96' style={{marginBottom:'-50px',borderBottom:'2px solid black'}}>{titre}</h1></div>
            <table style={{ zIndex: 1000 }}>
              <tbody>
                <tr>
                  <td>
                    {/* RaisonSocial */}
                    <FormField
                      control={form.control}
                      name="RaisonSocial"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel style={{marginLeft: "-100px"}}>Raison Sociale</FormLabel>
                          <FormControl>
                            <Input type="string" placeholder="Entrez la Raison Sociale" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                  <td>
                    {/* ICE */}
                    <FormField
                      control={form.control}
                      name="ICE"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel style={{marginLeft: "-180px"}}>ICE</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Entrez l'ICE" {...form.register("ICE")} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    {/* NumeroCNSS */}
                    <FormField
                      control={form.control}
                      name="NumeroCNSS"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel style={{marginLeft: "-100px"}}>Numéro CNSS</FormLabel>
                          <FormControl>
                          <Input type="number" placeholder="Entrez l'numero cnss" {...form.register("ICE", { valueAsNumber: true })} />

                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                  <td>
                    {/* NumeroFiscale */}
                    <FormField
                      control={form.control}
                      name="NumeroFiscale"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel style={{marginLeft: "-100px"}}>Numéro Fiscale</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Entrez le numéro fiscal" {...form.register("NumeroFiscale")} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    {/* RegistreCommercial */}
                    <FormField
                      control={form.control}
                      name="RegistreCommercial"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel style={{marginLeft: "-50px"}}>Registre Commercial</FormLabel>
                          <FormControl>
                            <Input type="text" placeholder="Entrez le registre commercial" {...form.register("RegistreCommercial")} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                  <td>
                    {/* AdresseSociete */}
                    <FormField
                      control={form.control}
                      name="AdresseSociete"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel style={{marginLeft: "-70px"}}>Adresse Société</FormLabel>
                          <FormControl>
                            <Input type="text" placeholder="Entrez l'adresse de la société" {...form.register("AdresseSociete")} />
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

export default FormulaireComponentSociete;
