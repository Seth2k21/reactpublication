import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material';
import AjouterPublication from './Components/AjouterPublication';
import axios from 'axios';
import { useQueryClient, useQuery  } from '@tanstack/react-query';
import DeleteIcon from '@mui/icons-material/Delete';
import CartePub from './Components/CartePub';





export default function Dashboad() {

  const navigate = useNavigate();
useEffect(()=>{
if(!localStorage.getItem("utilisateur")){
  navigate("/connexion");
} 
});

const queryClient = useQueryClient();
const {data: publications, error, isLoading, } = useQuery({
    queryKey:["publications"],
    queryFn: () => axios.get("http://localhost:3000/publication").then((res) => res.data),
    onerror: (error) => console.log(error),
});

if (isLoading) {

  return <div>Chargement...</div>;
}


let pubTrier = publications.sort((a, b) => {
  return new Date(b.datePublication) - new Date(a.datePublication);
}); 
if(publications){

}

  return (
    <Box>
      <Navbar />
      <AjouterPublication />
     <Box width={"60%"} margin={"auto"} marginTop={10} color={"black"} fontSize={50}>
     {publications && pubTrier.map((publication) => (

          <CartePub publication={publication} />

     ))}
     </Box>
    </Box>
  )
}
