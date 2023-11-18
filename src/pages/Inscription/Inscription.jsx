import { Box, Button, Stack, TextField, Typography,   } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useForm,} from "react-hook-form";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export default function Inscription() {
  const navigate = useNavigate();
  const {handleSubmit, register,  formState: { errors } } = useForm();
  const onSubmit = (data) => {
            if(data.motPass !== data.confirmeMotPass){
              toast.error("les mots de passe ne correspondent pas");
            }
            else{
             axios.get(`http://localhost:3000/utilisateurs?emailUtilisateur=${data.emailUtilisateur}`)
             .then((res) => {
               if(res.data.length > 0){
                toast.error('Un compte existe déjà avec cette adresse email', {
                  icon: '👏',
                });
               } else{
                axios.post("http://localhost:3000/utilisateurs", data)
                .then((res) => {
                  console.log(res);
                  toast.success("Inscription réussie");
                  navigate("/connexion"); 
                })
                .catch((err) => {
                  console.log(err);
                  toast.error("une erreur est survenu")
                });
                
               }
             });
    
            }
  }; 

  return (
    <Stack alignItems={"center"} justifyContent={"center"} width={"100%"} height={"100vh"}>
       <Box width={400} sx={{  backgroundColor:"darkgray",  padding: 3, borderRadius: 5, }}>
       <Typography variant="h5">Inscription</Typography>

       <form style={{marginTop:5,}} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={"column"} gap={2}>

        <TextField
         id="filled-basic"
         label="Veillez saisir votre nom" 
         variant="filled" 
         fullWidth size="small"
        {...register("nomUtilisateur",
       { required: "Veill ez saisir un nom", 
       minLength: { value:5, message:"Entrez un nom de plus de 5 caractères"} })} />

<TextField
         id="filled-basic"
         label="Veillez saisir votre email" 
         variant="filled" 
         fullWidth size="small" 
         type='email'
        {...register("emailUtilisateur",
       { required: "Veiller entrer votre email", 
         pattern:"/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i" })} />

       <TextField 
       id="filled-basic" 
       label="Veillez saisir un mot de passe" 
       variant="filled" 
       fullWidth size="small" 
       type='Password'
       {...register("motPass",
       { required: "Veillez saisir votre mot de passse", 
       minLength: { value:8, message:"Entrez un mot de passe de plus 8 caractères"} })}/> 

         <TextField id="filled-basic" 
         label="Confirmez votre mot de passe" 
         variant="filled" 
         fullWidth size="small" 
        type='Password'
        {...register("confirmeMotPass",
       { required: "Veillez confirmer votre mot de passe", 
       minLength: { value:8, message:"Entrez un mot de passe de plus de 8 caractères"} })} /> 

        </Stack>

        <Button variant="contained" type='submit' sx={{ marginTop: 2, }}>Inscription</Button>
       </form>

      </Box>
    </Stack>
  )
}

