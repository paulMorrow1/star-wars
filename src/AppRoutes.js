import React from "react";
import { Route, Routes } from "react-router-dom";
import ButtonChange from "./ButtonChange";
import Layout from "./Layout";
import SearchAutocomplete from "./SearchAutocomplete";
import Stastics from "./Stastics";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index path="/" element={<ButtonChange />} />
        <Route path="search-autocomplete" element={<SearchAutocomplete />} />
        <Route path="statistics" element={<Stastics />} />
      </Route>
    </Routes>
  );
}
