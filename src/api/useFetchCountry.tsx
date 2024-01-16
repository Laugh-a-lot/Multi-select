import { useEffect, useState } from "react";
import { Country } from "../types/Country";


const useFetchProducts = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchData() {
      const response: Country[] = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,capital,flags"
      )
        .then((res) => res.json())
        .catch((err) => console.log(err));
      if (Array.isArray(response)) setCountries(response);
      setLoading(false);
    }

  useEffect(() => {
    fetchData();
  }, []);
  return { countries, loading };
};

export default useFetchProducts;
