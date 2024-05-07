import axios from 'axios';
import * as z from "zod";
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const formSchema = z.object({
  emailAddress: z.string(),
  emailPassword: z.string(),
});

function Login() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
      emailPassword: ""
    },
  });

  const submitHandler = async (formData) => {
    const { emailAddress, emailPassword } = formData;
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        email: emailAddress,
        password: emailPassword,
      }, {
        withCredentials: true
      });

      const token = response.data.token;
      localStorage.setItem('token', token);

      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError("Erreur: " + error.response.data.message);
      } else {
        setError("Une erreur s'est produite lors du traitement de votre demande.");
      }
    }
  };

  return (
    <div style={{transform:"translateY(50%)"}}>

      <div className="w-40p flex justify-center">
        <div className="max-w-sm p-4 bg-white rounded-lg shadow-md">
          {error && <p className="error-message">{error}</p>}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)}>
              <FormField
                control={form.control}
                name="emailAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse Email</FormLabel>
                    <Input placeholder="adresse email" type="email" {...field} />
                    
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              <FormField
                control={form.control}
                name="emailPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <Input placeholder="mot de passe" type="password" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <div style={{marginTop:'8px'}}>
              <Button  type="submit">Envoyer</Button></div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
