import React from "react";
import ReactDOM from "react-dom/client";
// Asumiendo que Home.jsx está en la carpeta src/pages
import Home from "./pages/Home.jsx"; // Agrega '.jsx' si es necesario

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// pages

import Contador from "./pages/Contador"; // Importa el nuevo componente

const router = createBrowserRouter([
  // ...otros rutas
  {
    path: "/contador",
    element: <Contador />, // Agrega la ruta del contador
  },
  // ...otros rutas
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
