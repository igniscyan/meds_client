import { useState, useEffect } from "react";
import {useGetDrugs} from "../Queries/useGetDrugs";

const useGetDrugOptions = () => {
  const drugs = useGetDrugs();
  console.log(drugs);
  const [drugOptions, setDrugOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (drugs.status === "success") {
      const options = drugs.data.map((drug) => ({
        label: `${drug.drug_name} (${drug.drug_dosage})`,
        value: drug.id,
      }));
      console.log("options", options);
      setDrugOptions(options);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [drugs.data, drugs.status]);



  return { drugOptions, loading };
};

export default useGetDrugOptions;
