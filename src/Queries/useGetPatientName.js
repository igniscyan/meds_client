import { useQuery } from "@tanstack/react-query";

export function useGetPatientName(patientId) {
  async function getPatientName() {
    const response = await fetch(`/api/get/patient_name/${patientId}`);

    if (response.status >= 400)
      throw new Error(`${response.status}: ${response.statusText}`);
    return response.json();
  }
  return useQuery(["get", "patient_name", patientId], getPatientName);
}
