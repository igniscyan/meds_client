import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3050/api/' }),
  endpoints: (builder) => ({
    getPatients: builder.query({
      query: () => `get`,
    }),
    postPatientEncounter: builder.mutation({
      query: (patient_id, body) => ({
        url: `insert/patient_encounter/${patient_id}`,
        method: 'POST',
        body: body,
      }),
    }),
  }),
});

export const { useGetPatientsQuery, usePostPatientEncounterMutation } = api;
