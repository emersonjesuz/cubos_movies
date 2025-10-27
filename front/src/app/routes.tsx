import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Login from "../pages/login";
import Movies from "../pages/Movies";
import Register from "../pages/Register";
import { ProtectRouter } from "./ProtectRouter";
import RootLayout from "./RootLayout";
import MovieDetails from "../pages/MovieDetails";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route element={<Login />} path="/login" />
      <Route element={<Register />} path="/Cadastro" />
      <Route element={<Movies />} path="/" />
      <Route element={<ProtectRouter redirect="/" />}>
        <Route element={<MovieDetails />} path="/filme/:id" />
      </Route>
    </Route>
  )
);
