import React, { useState } from 'react';
import { Grid, Text, Input, Button, Checkbox, Card } from '@nextui-org/react';
import AddField from '../AddField';
import DemographicsCard from '../DemographicsCard';
import { usePostPatientEncounterMutation } from '../../Services/api';

const PatientEncounter = () => {
  const [encounterFields, setEncounterFields] = useState({
    height: null,
    weight: null,
    temperature: null,
    systolic: null,
    diastolic: null,
    heartRate: null,
    respRate: null,
    triageNote: null,
    medNote: null,
    pharmNote: null,
    eyeNote: null,
    dentalNote: null,
    goodiesNote: null,
    location: null,
    open: null,
  });

  const [addPatientEncounter, addPatientEncounterResult] =
    usePostPatientEncounterMutation();

  const submitForm = () => {
    // todo: need to get the patient's gyn info before making this mutation
    addPatientEncounter([
      1,
      {
        gyn: null,
        pregnant: null,
        lastPeriod: null,
        ...encounterFields,
      },
    ]);
  };

  const handleChange = (propertyName, newValue) => {
    setEncounterFields({ ...encounterFields, [propertyName]: newValue });
  };

  return (
    <Card>
      <Grid.Container gap={2.5} justify="center">
        {/* Vitals Section */}
        <Grid xs={12} justify="center">
          <Text h1 justify="center">
            Vitals
          </Text>
        </Grid>
        <Grid xs={2}>
          <Input bordered type="number" labelPlaceholder="Temperature" />
        </Grid>
        <Grid xs={2}>
          <Input bordered type="number" labelPlaceholder="Systolic Pressure" />
        </Grid>
        <Grid xs={2}>
          <Input bordered type="number" labelPlaceholder="Diastolic Pressure" />
        </Grid>
        <Grid xs={2}>
          <Input bordered type="number" labelPlaceholder="Heart Rate" />
        </Grid>
        <Grid xs={2}>
          <Input bordered type="number" labelPlaceholder="Respiratory" />
        </Grid>

        {/* Chief Complaint Section */}
        <Grid xs={12} justify="center">
          <Text h1>Chief Complaint</Text>
        </Grid>
        <Grid xs={12} justify="center">
          <Checkbox.Group>
            <Checkbox value="Chest Pain" label="Chest Pain" />
            <Checkbox value="Hernie Gernie" label="Hernie Gernie" />
            <Checkbox value="Poo pain" label="Poo pain" />
          </Checkbox.Group>
        </Grid>

        {/* Add Chief Complaint Section */}
        <Grid xs={12} justify="center">
          <AddField name="Chief Complaint" />
        </Grid>

        {/* Submit Button */}
        <Button onPress={submitForm}>Hope this works...</Button>
      </Grid.Container>
    </Card>
  );
};

export default PatientEncounter;
