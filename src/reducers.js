import { createReducer, createAction } from '@reduxjs/toolkit';
import {} from './actions';

export const patientsReducer = createReducer([], (builder) => {
  //   builder.addCase(getPatients, (state, action) => {});
});

export const demographicsReducer = createReducer(
  {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    sex: '',
    smoker: '',

    gyn: '',
    pregnant: '',
    lastPeriod: '',
  },
  (builder) => {
    builder.addDefaultCase((state, action) => {});
  }
);
