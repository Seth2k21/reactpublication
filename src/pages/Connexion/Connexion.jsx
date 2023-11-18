import { Box, Button, Stack, TextField, Typography, } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm,} from "react-hook-form";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';



export default function Inscription() {
  const navigate = useNavigate();
  const {handleSubmit, register,  formState: { errors } } = useForm();
  
  useEffect(()=>{
    if (localStorage.getItem("utilisateur")) {
      navigate("/");
    }
  })

  const onSubmit = (data) => {
      axios.get(
        `http://localhost:3000/utilisateurs?emailUtilisateur=${data.emailUtilisateur}&motPass=${data.motPass}`
      ).then(res =>{
        if(res.data.length > 0){
          localStorage.setItem("utilisateur", JSON.stringify(res.data[0]));
          toast.success("connexion réussir");
          navigate("/");
        }else{
          toast.error("Les identifiants sont incorrects");

        }
      })

    };
  return (
    <Stack alignItems={"center"} justifyContent={"center"} width={"100%"} height={"100vh"}>
       <Box width={400} sx={{  backgroundColor:"darkgray",  padding: 3, borderRadius: 5, }}>
       <Typography variant="h5">Connectez-vous</Typography>

       <form style={{marginTop:5,}} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={"column"} gap={2}>

        

<TextField
         id="filled-basic"
         label="email" 
         variant="standard" 
         fullWidth size="small" 
         type='email'
        {...register("emailUtilisateur",
       { required: "Veiller entrer votre email", 
         pattern:"/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i" })} />

       <TextField 
       id="filled-basic" 
       label="mot de passe" 
       variant="standard" 
       fullWidth size="small" 
       type='Password'
       {...register("motPass",
       { required: "Veillez saisir votre mot de passse", 
       minLength: { value:8, message:"Entrez un mot de passe de plus 8 caractères"} })}/> 

        

        </Stack>

        <Button variant="contained" type='submit' sx={{ marginTop: 2, }}>Connexion</Button>
        <Typography sx={{ paddingTop: 1, }}>Voulez-vous créer un compte ?{""}
         <Link to="/inscription">Cliquez ici</Link> </Typography>
       </form>

      </Box>
    </Stack>
  )
}

