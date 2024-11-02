import React, { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:9000";
const CitiesContexts = createContext();
function CitiesContext({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();

        setCities(data);
      } catch {
        alert("There was an error loading data...");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);
  return (
    <CitiesContexts.Provider value={{ cities, isLoading }}>
      {children}
    </CitiesContexts.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContexts);
  if (context === undefined) throw new Error("CitiesProvider");
  return context;
}
export { CitiesContext, useCities };
