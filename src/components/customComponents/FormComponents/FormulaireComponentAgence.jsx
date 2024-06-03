// import React, { useEffect, useState } from "react";
// import "../../../App.css";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useMutation,  useQueryClient } from "react-query";
// import AgenceApi from "@/services/Admin/AgenceApi";

// function FormulaireComponentAgence({
//   formVisible,
//   titre,
//   dataLibaghi,
//   methode,
// }) {
//   const queryClient = useQueryClient();
//   const [value, setValue] = useState(formVisible);

//   const change = () => {
//     setValue(!value);
//   };
//   const formSchema = z.object({
//     // Validation du champ NomAgence
//     NomAgence: z.string().min(2, {
//       message: "Le nom de l'agence doit comporter au moins 2 caractères.",
//     }),

//     // Validation du champ AdresseAgence
//     AdresseAgence: z.string().min(5, {
//       message: "L'adresse de l'agence doit comporter au moins 5 caractères.",
//     }),

//     // Validation du champ VilleAgence
//     VilleAgence: z.string().min(2, {
//       message: "La ville de l'agence doit comporter au moins 2 caractères.",
//     }),

//     // Validation du champ CodePostalAgence
//     CodePostalAgence: z.string().min(5, {
//       message:
//         "Le code postal de l'agence doit comporter au moins 5 caractères.",
//     }),

//     // Validation du champ TelAgence
//     TelAgence: z.string().min(10, {
//       message:
//         "Le numéro de téléphone de l'agence doit comporter au moins 10 caractères.",
//     }),

//     // Validation du champ EmailAgence
//     EmailAgence: z.string().email({
//       message: "Veuillez saisir une adresse e-mail valide pour l'agence.",
//     }),
//   });

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       NomAgence: "",
//       AdresseAgence: "",
//       VilleAgence: "",
//       CodePostalAgence: "",
//       TelAgence: "",
//       EmailAgence: "",
//     },
//   });

//   useEffect(() => {
//     if (dataLibaghi) {
//       form.reset({
//         NomAgence: dataLibaghi.NomAgence || "",
//         AdresseAgence: dataLibaghi.AdresseAgence || "",
//         VilleAgence: dataLibaghi.VilleAgence || "",
//         CodePostalAgence: dataLibaghi.CodePostalAgence || "",
//         TelAgence: dataLibaghi.TelAgence || "",
//         EmailAgence: dataLibaghi.EmailAgence || "",
//       });
//     }
//   }, [dataLibaghi]);

//   const updateAgenceMutation = useMutation(
//     async (formData) => {
//       const response = await AgenceApi.update(dataLibaghi.id, formData);
//       return response.data;
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries("agences");
//         setValue(!value);
//       },
//     }
//   );

//   const createAgenceMutation = useMutation(
//     async (formData) => {
//       const response = await AgenceApi.create(formData);
//       return response.data;
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries("agences");
//         setValue(!value);
//       },
//     }
//   );
//   const submitHandler = async (formData) => {
//     try {
//       console.log("methode", methode);
//       if (methode === "update") {
//         await updateAgenceMutation.mutateAsync(formData);
//         console.log("agence:Form submitted successfully");
//       } else if (methode === "create") {
//         await createAgenceMutation.mutateAsync(formData);
//         // console.log("agence:Form submitted successfully");
//         return()=>{
//           <Alert>
//               <Terminal className="h-4 w-4" />
//                <AlertTitle>Heads up!</AlertTitle>
//                 <AlertDescription>
//                  You can add components and dependencies to your app using the cli.
//                </AlertDescription>
//         </Alert>
//         }
        
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 422) {
//         const validationErrors = error.response.data;
//         console.error("Validation errors:", validationErrors);
//       } else {
//         console.error("Form submission error:", error);
//       }
//     }
//   };

//   return (
//     <Form {...form}>
//       <div>
//         <div className={` ${value ? "slide-in" : "slide-out"}`}>
//         <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8" style={{  flexDirection: 'column', width: '28rem',height:'22.1rem', background: 'white', border: '1px solid #eeee', boxShadow: '5px 6px 5px 6px #eeee'}} id='myform'>

//            <div><h1 className=' font-bold bg-slate-100 px-3 w-96' style={{marginBottom:'-50px',borderBottom:'2px solid black'}}>{titre}</h1></div>

//             {/* NomAgent */}
//             <table style={{ zIndex: 1000 }}>
//               <tbody>
//                 <tr>
//                   <td>
//                     {/* NomAgence */}
//                     <FormField
//                       control={form.control}
//                       name="NomAgence"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel style={{marginLeft: "-160px"}}>Nom</FormLabel>
//                           <FormControl>
//                             <Input placeholder="Entrez le nom" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </td>
//                   <td>
//                     {/* AdresseAgence */}
//                     <FormField
//                       control={form.control}
//                       name="AdresseAgence"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel style={{marginLeft: "-142px"}}>Adresse</FormLabel>
//                           <FormControl>
//                             <Input placeholder="Entrez l'adresse" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>
//                     {/* VilleAgence */}
//                     <FormField
//                       control={form.control}
//                       name="VilleAgence"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel style={{marginLeft: "-160px"}}>Ville</FormLabel>
//                           <FormControl>
//                             <Input placeholder="Entrez la ville" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </td>
//                   <td>
//                     {/* CodePostalAgence */}
//                     <FormField
//                       control={form.control}
//                       name="CodePostalAgence"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel style={{marginLeft: "-110px"}}>Code postal</FormLabel>
//                           <FormControl>
//                             <Input
//                               placeholder="Entrez le code postal"
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>
//                     {/* TelAgence */}
//                     <FormField
//                       control={form.control}
//                       name="TelAgence"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel style={{marginLeft: "-120px"}}>Téléphone</FormLabel>
//                           <FormControl>
//                             <Input
//                               type="tel"
//                               placeholder="Entrez le téléphone"
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </td>
//                   <td>
//                     {/* EmailAgence */}
//                     <FormField
//                       control={form.control}
//                       name="EmailAgence"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel style={{marginLeft: "-150px"}}>Email</FormLabel>
//                           <FormControl>
//                             <Input
//                               type="email"
//                               placeholder="Entrez l'email"
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             {/* Submit Button */}
//             <div  className='flex items-center' style={{marginTop:'10px'}}>
//               <div className='btn'>
//               <Button  style={{ color: 'white',width:' 4rem',fontSize:'12px',marginRight:'40px'}}  type="submit" >{methode=='create'?"Ajouter":"Modifier"}</Button>
//               </div>
//               <div className='btn'>
//               <Button  style={{ color: 'white',width:' 4rem',fontSize:'12px' }} onClick={change} type="reset">Annuler</Button>
//               </div>
//       </div>
//           </form>
//         </div>
//       </div>
//     </Form>
//   );
// }

// export default FormulaireComponentAgence;
import React, { useEffect, useState } from "react";
import "../../../App.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { FcOk } from "react-icons/fc";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "react-query";
import AgenceApi from "@/services/Admin/AgenceApi";

function FormulaireComponentAgence({
  formVisible,
  titre,
  dataLibaghi,
  methode,
}) {
  const queryClient = useQueryClient();
  const [value, setValue] = useState(formVisible);
  const [alertVisible, setAlertVisible] = useState(false); 
  const [alertMessage, setAlertMessage] = useState("");

  const change = () => {
    setValue(!value);
  };

  const formSchema = z.object({
    NomAgence: z.string().min(2, {
      message: "Le nom de l'agence doit comporter au moins 2 caractères.",
    }),
    AdresseAgence: z.string().min(5, {
      message: "L'adresse de l'agence doit comporter au moins 5 caractères.",
    }),
    VilleAgence: z.string().min(2, {
      message: "La ville de l'agence doit comporter au moins 2 caractères.",
    }),
    CodePostalAgence: z.string().min(5, {
      message: "Le code postal de l'agence doit comporter au moins 5 caractères.",
    }),
    TelAgence: z.string().min(10, {
      message: "Le numéro de téléphone de l'agence doit comporter au moins 10 caractères.",
    }),
    EmailAgence: z.string().email({
      message: "Veuillez saisir une adresse e-mail valide pour l'agence.",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      NomAgence: "",
      AdresseAgence: "",
      VilleAgence: "",
      CodePostalAgence: "",
      TelAgence: "",
      EmailAgence: "",
    },
  });

  useEffect(() => {
    if (dataLibaghi) {
      form.reset({
        NomAgence: dataLibaghi.NomAgence || "",
        AdresseAgence: dataLibaghi.AdresseAgence || "",
        VilleAgence: dataLibaghi.VilleAgence || "",
        CodePostalAgence: dataLibaghi.CodePostalAgence || "",
        TelAgence: dataLibaghi.TelAgence || "",
        EmailAgence: dataLibaghi.EmailAgence || "",
      });
    }
  }, [dataLibaghi]);

  const updateAgenceMutation = useMutation(
    async (formData) => {
      const response = await AgenceApi.update(dataLibaghi.id, formData);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("agences");
        setAlertMessage("Agence mise à jour avec succès !");
        setAlertVisible(true);
        setValue(!value);
        hideAlertAfterDelay();
      },
    }
  );

  const createAgenceMutation = useMutation(
    async (formData) => {
      const response = await AgenceApi.create(formData);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("agences");
        setAlertMessage("Agence créée avec succès !");
        setAlertVisible(true);
        setValue(!value);
        hideAlertAfterDelay(); 
      },
    }
  );

  const submitHandler = async (formData) => {
    try {
      if (methode === "update") {
        await updateAgenceMutation.mutateAsync(formData);
      } else if (methode === "create") {
        await createAgenceMutation.mutateAsync(formData);
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
  const hideAlertAfterDelay = () => {
    setTimeout(() => {
      setAlertVisible(false);
    }, 2000); 
  };
  return (
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

      <Form {...form}>
        <div className={`${value ? "slide-in" : "slide-out"}`}>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className="space-y-8"
            style={{
              flexDirection: "column",
              width: "28rem",
              height: "22.1rem",
              background: "white",
              border: "1px solid #eeee",
              boxShadow: "5px 6px 5px 6px #eeee",
            }}
            id="myform"
          >
            <div>
              <h1
                className="font-bold bg-slate-100 px-3 w-96"
                style={{
                  marginBottom: "-50px",
                  borderBottom: "2px solid black",
                }}
              >
                {titre}
              </h1>
            </div>
            <table style={{ zIndex: 1000 }}>
              <tbody>
                <tr>
                  <td>
                    <FormField
                      control={form.control}
                      name="NomAgence"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel style={{ marginLeft: "-160px" }}>
                            Nom
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Entrez le nom" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                  <td>
                    <FormField
                      control={form.control}
                      name="AdresseAgence"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel style={{ marginLeft: "-142px" }}>
                            Adresse
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Entrez l'adresse" {...field} />
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
                      name="VilleAgence"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel style={{ marginLeft: "-160px" }}>
                            Ville
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Entrez la ville" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                  <td>
                    <FormField
                      control={form.control}
                      name="CodePostalAgence"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel style={{ marginLeft: "-110px" }}>
                            Code postal
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Entrez le code postal"
                              {...field}
                            />
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
                      name="TelAgence"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel style={{ marginLeft: "-120px" }}>
                            Téléphone
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="Entrez le téléphone"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                  <td>
                    <FormField
                      control={form.control}
                      name="EmailAgence"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel style={{ marginLeft: "-150px" }}>
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Entrez l'email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex items-center" style={{ marginTop: "10px" }}>
              <div className="btn">
                <Button
                  style={{
                    color: "white",
                    width: "4rem",
                    fontSize: "12px",
                    marginRight: "40px",
                  }}
                  type="submit"
                >
                  {methode === "create" ? "Ajouter" : "Modifier"}
                </Button>
              </div>
              <div className="btn">
                <Button
                  style={{ color: "white", width: "4rem", fontSize: "12px" }}
                  onClick={change}
                  type="reset"
                >
                  Annuler
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Form>
    </div>
  );
}

export default FormulaireComponentAgence;

