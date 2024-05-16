import axios from 'axios';
import * as z from "zod";
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FaSpinner } from 'react-icons/fa'; // Import loading spinner icon

const formSchema = z.object({
  emailAddress: z.string(),
  emailPassword: z.string(),
});

function Login() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // State to manage loading state
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
      setLoading(true); // Set loading to true on form submit
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
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div style={{ transform: "translateY(20%)" }}>
      <div className="w-full flex justify-center">
        <div className="max-w-lg w-full p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl mb-4">Bonjour</h1>
          {error && <p className="p-4 bg-red-500 text-white font-bold rounded ">{error}</p>}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)}>
              <FormField
                control={form.control}
                name="emailAddress"
                render={({ field }) => (
                  <FormItem className='mb-5 w-96'>
                    <FormLabel className="text-lg">Adresse Email</FormLabel>
                    <Input placeholder="adresse email" type="email" {...field} required/>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              <FormField
                control={form.control}
                name="emailPassword"
                render={({ field }) => (
                  <FormItem className='w-96'>
                    <FormLabel className="text-lg">Mot de passe</FormLabel>
                    <Input placeholder="mot de passe" type="password" {...field} required/>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <div style={{ marginTop: '16px' }}>
                <Button type="submit" className=' w-96 bg-red-600 hover:bg-red-800 hover:text-white py-2 px-4 text-lg mt-4' disabled={loading}>
                  {loading ? <FaSpinner className="animate-spin mr-2" /> : null}
                  {loading ? 'Chargement...' : 'Se connecter'} 
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
