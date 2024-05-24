import {useEffect,useState} from 'react'
import '../../../App.css';
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
import ParkingApi from '@/services/Admin/ParkingApi';
import { useMutation,QueryCache, useQueryClient } from 'react-query';

function FormulaireComponentParking({ formVisible, titre, dataLibaghi, methode }) {
  const queryClient = useQueryClient();
  const [value, setValue] = useState(formVisible);
   
    const change = () => {
        setValue(!value);
    }
        const formSchema = z.object({

          Capacite:z.coerce.number().int({
            message: "Capacite must be a  integer.",
          }),
          PlaceRestantes: z.coerce.number().int().positive({
            message: "PlaceRestantes must be a positive integer.",
          }),
          pannes:z.string().min(2, {
            message: "pannes must be at least 2 characters.",
          }),
          Lieu:z.string().min(2, {
            message: "Lieu must be at least 2 characters.",
          }),
        });
        
        const form = useForm({
          resolver: zodResolver(formSchema),
          defaultValues: {
            resolver: zodResolver(formSchema),
            defaultValues: {
              Capacite: "",
              PlaceRestantes: "",
              pannes: "",
              Lieu: "",
            },
          },
        });
        useEffect(() => {
          if (dataLibaghi) {
            form.reset({
              Capacite: dataLibaghi.Capacite || "",
              PlaceRestantes: dataLibaghi.PlaceRestantes || "",
              pannes: dataLibaghi.pannes || "",
              Lieu:dataLibaghi.Lieu || "",
            });
          }
        },[dataLibaghi]);
      
        const updateParkingMutation = useMutation(async (formData) => {
          const response = await ParkingApi.update(dataLibaghi.id, formData);
          console.log('response dyli',response)
          return response.data;
        }, {
          onSuccess: () => {
            queryClient.invalidateQueries('parkings');
            setValue(!value);
          }
        });
      
        const createParkingMutation = useMutation(async (formData) => {
          const response = await ParkingApi.create(formData);
          return response.data;
        }, {
          onSuccess: () => {
            queryClient.invalidateQueries('parkings');
            setValue(!value);
          }
        });
        const submitHandler = async (formData) => {
          try {
            console.log('methode',methode)
            if (methode === 'update') {
              await updateParkingMutation.mutateAsync(formData);
              console.log('Form submitted successfully');
            } else if (methode === 'create') {
              console.log('data dyali',formData)
              await createParkingMutation.mutateAsync(formData);
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
    return (
     
    <Form {...form}>
     
<div>
<div  className={`${value ? 'slide-in' : 'slide-out'}`}>
<form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8" style={{  flexDirection: 'column', width: '28rem',height:'20rem', background: 'white', border: '1px solid #eeee', boxShadow: '5px 6px 5px 6px #eeee'}} id='myform'>

<div><h1 className=' font-bold bg-slate-100 px-3 w-96' style={{marginBottom:'-50px',borderBottom:'2px solid black'}}>{titre}</h1></div>
    {/* Capacite */}
    <table style={{ zIndex: 1000 }}>
        <tbody>
            <tr>
                <td><FormField
                control={form.control}
                name="Capacite"
               render={({ field }) => (
               <FormItem>
               <FormLabel style={{marginLeft: "-100px"}}>Capacité</FormLabel>
               <FormControl>
              <Input placeholder="Entrez la capacité" {...field} />
              </FormControl>
               <FormMessage />
              </FormItem>
               )}
                /></td>
                <td>
                    {/* PlaceRestantes */}
                    <FormField
                    control={form.control}
                    name="PlaceRestantes"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel style={{marginLeft: "-70px"}}>Places Restantes</FormLabel>
                        <FormControl>
                            <Input placeholder="Entrez les Places Restantes" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                        )}
                        />
                    </td>
            </tr>
                 <tr>
                    <td>{/* pannes */}
                        <FormField
                        control={form.control}
                        name="pannes"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel style={{marginLeft: "-130px"}}>pannes</FormLabel>
                            <FormControl>
                                <Input placeholder="Entrez les pannes" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        /></td>
                        <td>{/* pannes */}
                        <FormField
                        control={form.control}
                        name="Lieu"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel style={{marginLeft: "-160px"}}>Lieu</FormLabel>
                            <FormControl>
                                <Input placeholder="Entrez le Lieu" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        /></td>
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

export default FormulaireComponentParking
