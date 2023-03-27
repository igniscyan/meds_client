import { useQuery } from "@tanstack/react-query";

export function useGetPatientCrit(patientId) {
  async function getPatientCrit() {
    const response = await fetch(`/api/get/patient_crit/${patientId}`);

    if (response.status >= 400)
      throw new Error(`${response.status}: ${response.statusText}`);
    return response.json();
  }
  return useQuery(["get", "patient_crit", patientId], getPatientCrit);
}
