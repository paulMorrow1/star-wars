import React from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "./Layout";
import SearchAutocomplete from "./SearchAutocomplete";
import Stastics from "./Stastics";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index path="/" element={<SearchAutocomplete />} />
        <Route path="statistics" element={<Stastics />} />
      </Route>
    </Routes>
  );
}
