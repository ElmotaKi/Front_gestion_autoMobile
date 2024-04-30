/* eslint-disable react/prop-types */
import { useEffect } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
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



function CustomDrawer({ dataLibaghi, textLtrigger, methode }) {
  const formSchema = z.object({
    // Validation du champ username
    
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
    id_agence: z.string({
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
        id_agence: "",
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


  const submitHandler = async (formData) => {
    try {
      if (methode==="update"){
      const response = await AgentApi.update(dataLibaghi.id, formData);
      console.log("Form submitted successfully:", response);
    } else if (methode==="create"){
      const response = await AgentApi.create(formData);
      console.log("Form submitted successfully:", response);
    }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const validationErrors = error.response.data;
        console.error("Validation errors:", validationErrors);
        } else {
        console.error("Form submission error:", error);
      }
    }
  };
  
  
  return (
    <Drawer>
      <DrawerTrigger>{textLtrigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{textLtrigger}</DrawerTitle>
          <DrawerDescription>
    
          <Form {...form}>
  <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8">
    {/* NomAgent */}
    <FormField
      control={form.control}
      name="NomAgent"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Nom</FormLabel>
          <FormControl>
            <Input placeholder="Entrez le nom" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* PrenomAgent */}
    <FormField
      control={form.control}
      name="PrenomAgent"
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

    {/* SexeAgent */}
    <FormField
      control={form.control}
      name="SexeAgent"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Sexe</FormLabel>
          <FormControl>
            <select {...field}>
              <option value="Masculin">Masculin</option>
              <option value="Feminin">Féminin</option>
            </select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* EmailAgent */}
    <FormField
      control={form.control}
      name="EmailAgent"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="email" placeholder="Entrez l'email" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* TelAgent */}
    <FormField
      control={form.control}
      name="TelAgent"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Téléphone</FormLabel>
          <FormControl>
            <Input type="tel" placeholder="Entrez le téléphone" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* AdresseAgent */}
    <FormField
      control={form.control}
      name="AdresseAgent"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Adresse</FormLabel>
          <FormControl>
            <Input placeholder="Entrez l'adresse" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* VilleAgent */}
    <FormField
      control={form.control}
      name="VilleAgent"
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

    {/* CodePostalAgent */}
    <FormField
      control={form.control}
      name="CodePostalAgent"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Code postal</FormLabel>
          <FormControl>
            <Input placeholder="Entrez le code postal" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* id_agence */}
    <FormField
      control={form.control}
      name="id_agence"
      render={({ field }) => (
        <FormItem>
          <FormLabel>ID d'agence</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Entrez l'ID de l'agence" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Submit Button */}
    <DrawerClose>
    <Button type="submit">Soumettre</Button></DrawerClose>
  </form>
</Form>



          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default CustomDrawer;
