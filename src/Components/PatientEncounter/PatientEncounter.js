import React, { useState } from "react";
import {
  Grid,
  Text,
  Input,
  Textarea,
  Button,
  Radio,
  Checkbox,
  StyledCheckboxGroup,
  Card,
} from "@nextui-org/react";
import AddField from "./AddField";
import { usePutPatientEncounterMutation } from "../../Queries/usePutPatientEncounterMutation";

const PatientEncounter = () => {
  const [encounterFields, setEncounterFields] = useState({
    gyn: false,
    pregnant: false,
    lastPeriod: "",
    height: 0,
    weight: 0,
    temperature: 0,
    systolic: 0,
    diastolic: 0,
    heartRate: 0,
    respRate: 0,
    triageNote: "",
    medNote: "",
    pharmNote: "",
    eyeNote: "",
    dentalNote: "",
    goodiesNote: "",
    location: "",
    open: false,
  });

  const [patientInfo, setPatientInfo] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    sex: "",
    smoker: false,
  });

  // console.log(encounterFields);

  const patientEncounterMutation = usePutPatientEncounterMutation();

  const submitForm = () => {
    patientEncounterMutation.mutate([encounterFields, 1]);
  };

  const handleChange = (propertyName, newValue) => {
    setEncounterFields({ ...encounterFields, [propertyName]: newValue });
  };

  return (
    <Card>
      <Grid.Container gap={2.5} justify="center">
        <Grid xs={12} justify="center">
          <Text h1>Demographics</Text>
        </Grid>
        <Grid xs={4} justify="center">
          <Input
            label="First Name"
            placeholder="John"
            value={patientInfo.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
        </Grid>
        <Grid xs={4} justify="center">
          <Input
            label="Last Name"
            placeholder="Doe"
            value={patientInfo.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        </Grid>
        <Grid xs={4} justify="center">
          <Input
            label="Date of Birth"
            placeholder="01/01/2000"
            type="date"
            value={patientInfo.dateOfBirth}
            onChange={(e) => handleChange("dateOfBirth", e.target.value)}
          />
        </Grid>
        <Grid xs={3} justify="center">
          <Radio.Group
            orientation="horizontal"
            color="gradient"
            label="Sex"
            value={patientInfo.sex}
            onChange={(e) => handleChange("sex", e)}>
            <Radio value="Male" color="primary">
              Male
            </Radio>
            <Radio value="Female" color="secondary">
              Female
            </Radio>
          </Radio.Group>
        </Grid>
        <Grid xs={3} justify="center">
          <Checkbox
            isDisabled={false}
            checked={patientInfo.smoker}
            onChange={(checked) => handleChange("smoker", checked)}
            aria-label="smoker">
            Smoker
          </Checkbox>
        </Grid>
        <Grid xs={3} justify="center">
          <Input label="Height" type="number" />
        </Grid>

        <Grid xs={3} justify="center">
          <Input label="Weight" type="number" />
        </Grid>

        {encounterFields.sex === "Female" && (
          <>
            <Grid xs={4} justify="center">
              <Checkbox
                isDisabled={false}
                checked={encounterFields.gyn}
                onChange={(checked) => handleChange("gyn", checked)}>
                Gyn patient?
              </Checkbox>
            </Grid>

            <Grid xs={4} justify="center">
              <Checkbox
                isDisabled={false}
                checked={encounterFields.pregnant}
                onChange={(checked) => handleChange("pregnant", checked)}>
                Pregnant
              </Checkbox>
            </Grid>

            <Grid xs={4} justify="center">
              <Input
                type="date"
                label="Last Period"
                value={encounterFields.lastPeriod}
                onChange={(e) => handleChange("lastPeriod", e.target.value)}
              />
            </Grid>
          </>
        )}
        <Grid xs={12} justify="center">
          <Text h1 justify="center">
            {" "}
            Vitals{" "}
          </Text>
        </Grid>
        <Grid xs={1}></Grid>
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
        <Grid xs={1}></Grid>

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
        <Grid xs={12} justify="center">
          <AddField name="Chief Complaint" />
        </Grid>
        <Button onPress={submitForm}>Hope this works...</Button>
      </Grid.Container>
    </Card>
  );
};

export default PatientEncounter;
