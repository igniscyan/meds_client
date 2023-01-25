import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePutPatient() {
  const queryClient = useQueryClient();
  
  async function putPatient([patientInfo, hideModal, patientId]) {
    const res = await fetch(
      `http://localhost:3050/api/update/patient/${patientId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientInfo),
      }
    );

    if (res.status >= 400) throw new Error(`${res.status}: ${res.statusText}`);

    return res.json();
  }

  return useMutation(putPatient, {
    onSuccess: (data, variables) => {
      const [_, hideModal] = variables;
      queryClient.invalidateQueries(["get"]);
      hideModal();
    },
    onError: (data, variables) => {},
    onSettled: (data, variables) => {
    },
  });
}
