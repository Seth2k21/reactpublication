import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Dashboad from './pages/Dashboad/Dashboad.jsx';
import Connexion from './pages/Connexion/Connexion.jsx';
import Inscription from './pages/Inscription/Inscription.jsx';
import {  Toaster } from 'react-hot-toast';
import axios from 'axios';
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';

//Creation de l'objet BrowserRouter

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
  path: "/",
  element : <Dashboad />,
},

{
  path: "/connexion",
  element : <Connexion />,
},
{
  path: "/inscription",
  element : <Inscription />,
},

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <Toaster />
    <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
