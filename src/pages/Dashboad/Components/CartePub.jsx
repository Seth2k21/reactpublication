import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function CartePub({publication}) {

     const user = JSON.parse(localStorage.getItem("utilisateur"));
     
    const useQuery = useQueryClient();
    const mutation = useMutation({
        mutationFn: (id) =>{

            return axios.delete(`http://localhost:3000/publication/${id}`);
        },
        onError: (error) =>{
            toast.error("une erreur est survenu");
         },
         onSuccess: () =>{
          
           useQuery.invalidateQueries("publications")
           toast.success("suppression éffectué  avec succès");
         },
    });



    const supprimerPublication = (id) => {

        mutation.mutate(id);

    };

  return (
    <Box width={"100%"} borderRadius={2} marginBottom={3}  bgcolor={"beige"}>
        <Stack direction={"row"} alignItems={"center"} gap={4}>
         <Avatar src={publication.imagePubligation} />
         <Typography>{publication.auteur}</Typography>

         <Typography> 
            {
                 user.id === publication.idUtilisateur &&  (

                    <IconButton arial-label="delete" onClick={() => supprimerPublication(publication.id)}>
                    <DeleteIcon />
                   </IconButton>
                 )

            }
        
         </Typography>

        </Stack> 

        <Typography>{publication.textePublication} </Typography>
        
        
        
        <img  src={publication.imagePubligation} width={"100%"} />
      </Box>
  )
}