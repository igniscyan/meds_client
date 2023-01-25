import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function usePostPatientEncounterMutation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function postPatientEncounter([patient_encounter, patient_id]) {
    const res = await fetch(
      `http://localhost:3050/api/insert/patient_encounter/${patient_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patient_encounter),
      }
    );

    if (res.status >= 400) throw new Error(`${res.status}: ${res.statusText}`);

    return res.json();
  }

  return useMutation(postPatientEncounter, {
    onSuccess: (data, variables) => {
      const {patient_id} = variables;
      queryClient.invalidateQueries(["get", "patient_encounter", patient_id]);
      
      navigate("../");
    }
  });
}
