import { Button, Stack, TextField } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { useForm,} from "react-hook-form";
import toast from 'react-hot-toast';

export default function AjouterPublication() {
    const user = JSON.parse(localStorage.getItem("utilisateur"));

    const {handleSubmit, register, reset,  formState: { errors }, } = useForm();

    const useQuery = useQueryClient();

      const mutation = useMutation({
        mutationFn: (pub) => {
          return axios.post("http://localhost:3000/publication", pub);
        },
        onError: (error) =>{
           toast.error("une erreur est survenu");
        },
        onSuccess: () =>{
          reset();
          useQuery.invalidateQueries("publications")
          toast.success("Publication ajouter avec succès");
        },
        
      })


    const onSubmit = (data) => {
     const publication = {
           ...data,
             idUtilisateur: user.id,
             datePublication: new Date(),
             LikePublication: 0,
             auteur: user.nomUtilisateur,
     }
         mutation.mutate(publication);
    };


  return (
<Stack width={"50%"} marginLeft={50}  marginTop={10}>
    <h1 style={{ marginBottom: 10}}>Ajouter une publication</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
        <Stack sx={{  gap:2, }}>
        <TextField  
        id = "filled-basic"
        label = "Parlez-nous de votre journée "
        variant = "outlined"
        fullWidth
        size ="small"
        type = "text" 
        multiline
         rows={5}
         {...register("textePublication",
         { required: " Entrez votre publication", 
         minLength: { value:20, message:"Entrez un nom de plus de 20 caractères"} })} />

<TextField  
        id = "filled-basic"
        label = "Entrer l'URL de votre image"
        variant = "outlined"
        fullWidth
        size ="small"
        type = "text" 
        {...register("imagePubligation",
        { required: "Entrez votre image " })}
        />
        <Button variant="contained" type='submit' >Publier</Button>
        </Stack>
    </form>
</Stack>
  )
}
