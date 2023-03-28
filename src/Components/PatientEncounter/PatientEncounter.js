import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Spacer,
  Grid,
  Text,
  Input,
  Button,
  Checkbox,
  Dropdown,
  Card,
  Textarea,
} from "@nextui-org/react";
import AddField from "../AddField";
import useGetDrugOptions from "../../utils/useGetDrugOptions";
import { usePostPatientEncounterMutation } from "../../Queries/usePostPatientEncounterMutation";
import { usePutPatientEncounter } from "../../Queries/usePutPatientEncounterMutation";
import { useGetPatientEncounterById } from "../../Queries/useGetPatientEncounterById";
import { useGetPatientCrit as getPatientCrit } from "../../Queries/useGetPatientCrit";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { triageTemplate } from "./constants";
import { complaintsObj } from "../utils";

const PatientEncounter = () => {
  const [encounterFields, setEncounterFields] = useState({
    chief_complaint: null, //int
    alt_chief_complaint: null, //string
    pregnant: null, //string
    urine_test: null, //int
    glucose: null, //int
    past_medical_history: null, //string
    allergies: null, //string
    history_notes: null, //string
    diagnoses: null, //string
    height: null, //int
    patient_weight: null, //int
    temp: null, //int
    systolic: null, //int 
    diastolic: null, //int
    heart_rate: null,
    resp_rate: null,
    disbursement_1: null,
    disbursement_2: null,
    disbursement_3: null,
    disbursement_4: null,
    disbursement_5: null,
    disbursement_6: null,
    disbursement_7: null,
    disbursement_8: null,
    disbursement_9: null, //int
    disbursement_10: null,
    disbursement_1_quantity: null,
    disbursement_2_quantity: null,
    disbursement_3_quantity: null,
    disbursement_4_quantity: null,
    disbursement_5_quantity: null,
    disbursement_6_quantity: null,
    disbursement_7_quantity: null,
    disbursement_8_quantity: null,
    disbursement_9_quantity: null,
    disbursement_10_quantity: null,
    goodies_disbursement: null, // boolean 1 or 0
    antiparasitic_disbursement: null, // boolean 1 or 0
    fluoride_disbursement: null,
    survey_1: null,
    survey_2: null,
    survey_3: null,
    survey_4: null,
    survey_5: null,
  });
  const { drugOptions, loading } = useGetDrugOptions();

  const { patientId, encounterId } = useParams();
  console.log("Patient ID: ", patientId);
  console.log(encounterId);
  const existingEncounter = useGetPatientEncounterById(encounterId);
  useEffect(() => {
    if (existingEncounter.data && existingEncounter.data !== -1) {
      setEncounterFields(existingEncounter.data[0]);
    }
  }, [existingEncounter.status]);

  const addPatientEncounter = usePostPatientEncounterMutation();
  const updatePatientEncounter = usePutPatientEncounter();
  const patientCrit = getPatientCrit(patientId);
  if (patientCrit.isLoading || loading == true || existingEncounter.loading) return <div>Loading patient encounter...</div>;
  if (patientCrit.isError) return <div> Error loading patient encounter...</div>;
  const submitForm = () => {
    const mutation =
      encounterId === "new" ? addPatientEncounter : updatePatientEncounter;
    console.log(encounterId);
    // TODO: need to get the patient's gyn info before making this mutation
    mutation.mutate([
      {
        chief_complaint: encounterFields.chief_complaint,
        alt_chief_complaint: encounterFields.alt_chief_complaint,
        pregnant: encounterFields.pregnant,
        urine_test: encounterFields.urine_test,
        glucose: encounterFields.glucose,
        past_medical_history: encounterFields.past_medical_history,
        allergies: encounterFields.allergies,
        history_notes: encounterFields.history_notes,
        diagnoses: encounterFields.diagnoses,
        height: encounterFields.height,
        patient_weight: encounterFields.patient_weight,
        temp: encounterFields.temp,
        systolic: encounterFields.systolic,
        diastolic: encounterFields.diastolic,
        heart_rate: encounterFields.heart_rate,
        resp_rate: encounterFields.resp_rate,
        disbursement_1: encounterFields.disbursement_1,
        disbursement_2: encounterFields.disbursement_2,
        disbursement_3: encounterFields.disbursement_3,
        disbursement_4: encounterFields.disbursement_4,
        disbursement_5: encounterFields.disbursement_5,
        disbursement_6: encounterFields.disbursement_6,
        disbursement_7: encounterFields.disbursement_7,
        disbursement_8: encounterFields.disbursement_8,
        disbursement_9: encounterFields.disbursement_9,
        disbursement_10: encounterFields.disbursement_10,
        disbursenement_1_quantity: encounterFields.disbursement_1_quantity,
        disbursenement_2_quantity: encounterFields.disbursement_2_quantity,
        disbursenement_3_quantity: encounterFields.disbursement_3_quantity,
        disbursenement_4_quantity: encounterFields.disbursement_4_quantity,
        disbursenement_5_quantity: encounterFields.disbursement_5_quantity,
        disbursenement_6_quantity: encounterFields.disbursement_6_quantity,
        disbursenement_7_quantity: encounterFields.disbursement_7_quantity,
        disbursenement_8_quantity: encounterFields.disbursement_8_quantity,
        disbursenement_9_quantity: encounterFields.disbursement_9_quantity,
        disbursenement_10_quantity: encounterFields.disbursement_10_quantity,
        goodies_disbursement: encounterFields.goodies_disbursement,
        antiparasitic_disbursement: encounterFields.antiparasitic_disbursement,
        fluoride_disbursement: encounterFields.fluoride_disbursement,
        survey_1: encounterFields.survey_1,
        survey_2: encounterFields.survey_2,
        survey_3: encounterFields.survey_3,
        survey_4: encounterFields.survey_4,
        survey_5: encounterFields.survey_5,
      },
      patientId,
      encounterId,
    ]);
  };
  console.log(patientCrit.data);

  const handleChange = (propertyName, newValue) => {
    setEncounterFields({ ...encounterFields, [propertyName]: newValue });
    console.log(encounterFields);
  };

  let encounterDate = existingEncounter.data[0]
    ? "Encounter Date: " + existingEncounter.data[0].created_at
    : "";

  return (
    <Container xl>
      <Grid.Container gap={1.5} justify="center">
        <Grid xs={12} justify="center">
          <Text h1>
            {" "}
            Encounter: {patientCrit.data[0].first_name}{" "}
            {patientCrit.data[0].last_name}
          </Text>
        </Grid>
        <Grid xs={12} justify="center">
          <Text h3>{encounterDate} </Text>
        </Grid>
      </Grid.Container>
      {/* Vitals Section */}
      <Text h2>Vitals</Text>
      <Grid.Container gap={2} justify="center">
        <Grid xs={6} md={2} >
          <Input
            bordered
            labelRight="F"
            type="number"
            labelPlaceholder="Temperature"
            value={encounterFields.temp || ""}
            onChange={(e) => handleChange("temp", e.target.value)}
          />
        </Grid>
        <Grid xs={6} md={2}>
          <Input
            bordered
            labelRight="mmHg"
            type="number"
            labelPlaceholder="Systolic"
            value={encounterFields.systolic || ""}
            onChange={(e) => handleChange("systolic", e.target.value)}
          />
        </Grid>
        <Grid xs={6} md={2}>
          <Input
            bordered
            labelRight="mmHg"
            type="number"
            labelPlaceholder="Diastolic"
            value={encounterFields.diastolic || ""}
            onChange={(e) => handleChange("diastolic", e.target.value)}
          />
        </Grid>
        <Grid xs={6} md={2}>
          <Input
            bordered
            labelRight="BPM"
            type="number"
            labelPlaceholder="Heart Rate"
            value={encounterFields.heart_rate || ""}
            onChange={(e) => handleChange("heart_rate", e.target.value)}
          />
        </Grid>
        <Grid xs={6} md={2}>
          <Input
            bordered
            labelRight="BrM"
            type="number"
            labelPlaceholder="Respiratory"
            value={encounterFields.resp_rate || ""}
            onChange={(e) => handleChange("resp_rate", e.target.value)}
          />
        </Grid>
        <Grid xs={6} md={3}>
          <Input
            bordered
            labelRight="in"
            type="number"
            labelPlaceholder="Height"
            value={encounterFields.height || ""}
            onChange={(e) => handleChange("height", e.target.value)}
          />
        </Grid>
        <Grid xs={6} md={3}>
          <Input
            bordered
            labelRight="kg"
            type="number"
            labelPlaceholder="Weight"
            value={encounterFields.patient_weight || ""}
            onChange={(e) => handleChange("patient_weight", e.target.value)}
          />
        </Grid>
        <Grid xs={6} md={3}>
          <Input bordered type="text" labelPlaceholder="Urine Test" onChange={(e) => handleChange("urine_test", e.target.value)} value={encounterFields.urine_test || ""}></Input>
        </Grid>
        <Grid xs={6} md={3}>
          <Input bordered labelRight="mg/dL" type="number" labelPlaceholder="Glucose" value={encounterFields.glucose || ""} onChange={(e) => handleChange("glucose", e.target.value)} />
        </Grid>
        {patientCrit.data[0].gender === 'Female' ? (
          <Grid xs={12} md={3} justify="center">
            <Dropdown >
              <Dropdown.Button flat>
                {encounterFields.pregnant || "Pregnancy Test Results"}
              </Dropdown.Button>
              <Dropdown.Menu onAction={(value) => handleChange("pregnant", value)}>
                <Dropdown.Item key="Positive">
                  Positive
                </Dropdown.Item>
                <Dropdown.Item key="Negative">
                  Negative
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Grid>
        ) : null}
      </Grid.Container>
      <Spacer />
      <Text h2>Chief Complaint</Text>
      <Grid.Container gap={2.5} justify="center">
        <Grid xs={12} justify="left">
          <div style={{ width: "100%" }}>
            <Select
              options={complaintsObj}
              autosize={true}
              value={complaintsObj[encounterFields.chief_complaint - 1 || 0]}
              onChange={(e) => handleChange("chief_complaint", e.value)}
            />
          </div>
        </Grid>
        <Grid xs={12} md={12}>
          <Textarea
            label="Alternative Chief Complaint (if applicable)"
            height="auto"
            value={encounterFields.alt_chief_complaint || ""}
            size="s"
            status="secondary"
            fullWidth
            onChange={(e) => handleChange("alt_chief_complaint", e.target.value)}
          />
        </Grid>
      </Grid.Container>
      <Spacer />
      <Text h2>History</Text>
      <Grid.Container gap={2.5} justify="center">
        <Grid xs={12} md={12} justify="center">
          <Textarea
            label="Past Medical History"
            height="auto"
            value={encounterFields.past_medical_history || ""}
            size="l"
            status="secondary"
            fullWidth
            onChange={(e) => handleChange("past_medical_history", e.target.value)}
          />
        </Grid>
        <Grid xs={12} md={12} justify="center">
          <Textarea
            label="Allergies"
            height="auto"
            value={encounterFields.allergies || ""}
            size="l"
            status="secondary"
            fullWidth
            onChange={(e) => handleChange("allergies", e.target.value)}
          />
        </Grid>
        <Grid xs={12} md={12} justify="center">
          <Textarea
            label="Notes"
            height="auto"
            value={encounterFields.history_notes || ""}
            size="l"
            status="secondary"
            fullWidth
            onChange={(e) => handleChange("history_notes", e.target.value)}
          />
        </Grid>
      </Grid.Container>
      <Spacer />
      <Text h2>Diagnoses</Text>
      <Grid.Container gap={2.5} justify="center">
        <Textarea
          label="Diagnoses"
          height="auto"
          value={encounterFields.diagnoses || ""}
          placeholder="Enter diagnoses as comma separated values"
          size="l"
          status="secondary"
          fullWidth
          onChange={(e) => handleChange("diagnoses", e.target.value)}
        />
      </Grid.Container>
      <Spacer />
      <Text h2>Disbursed:</Text>
      <Grid.Container gap={2.5} justify="center">
        <Grid xs={9} justify="left">
          <div style={{ width: "100%" }}>
            <Select
              options={drugOptions}
              autosize={true}
              value={drugOptions[encounterFields.disbursement_1 - 1 || 0]}
              onChange={(e) => handleChange("disbursement_1", e.value)}
            />
          </div>
        </Grid>
        <Grid xs={3} justify="right">
          <Input bordered type="number" labelPlaceholder="Qty" value={encounterFields.disbursement_1_quantity || ""} onChange={(e) => handleChange("disbursement_1_quantity", e.target.value)} />
        </Grid>
        {/* Repeat for each disbursement state */}
        <Grid xs={9} justify="left">
          <div style={{ width: "100%" }}>
            <Select
              options={drugOptions}
              autosize={true}
              value={drugOptions[encounterFields.disbursement_2 - 1 || 0]}
              onChange={(e) => handleChange("disbursement_2", e.value)}
            />
          </div>
        </Grid>
        <Grid xs={3} justify="right">
          <Input bordered type="number" labelPlaceholder="Qty" value={encounterFields.disbursement_2_quantity || ""} onChange={(e) => handleChange("disbursement_2_quantity", e.target.value)} />
        </Grid>
        <Grid xs={9} justify="left">
          <div style={{ width: "100%" }}>
            <Select

              options={drugOptions}
              autosize={true}
              value={drugOptions[encounterFields.disbursement_3 - 1 || 0]}
              onChange={(e) => handleChange("disbursement_3", e.value)}
            />
          </div>
        </Grid>
        <Grid xs={3} justify="right">
          <Input bordered type="number" labelPlaceholder="Qty" value={encounterFields.disbursement_3_quantity || ""} onChange={(e) => handleChange("disbursement_3_quantity", e.target.value)} />
        </Grid>
        <Grid xs={9} justify="left">
          <div style={{ width: "100%" }}>
            <Select
              options={drugOptions}
              autosize={true}
              value={drugOptions[encounterFields.disbursement_4 - 1 || 0]}
              onChange={(e) => handleChange("disbursement_4", e.value)}
            />
          </div>
        </Grid>
        <Grid xs={3} justify="right">
          <Input bordered type="number" labelPlaceholder="Qty" value={encounterFields.disbursement_4_quantity || ""} onChange={(e) => handleChange("disbursement_4_quantity", e.target.value)} />
        </Grid>
        <Grid xs={9} justify="left">
          <div style={{ width: "100%" }}>
            <Select
              options={drugOptions}
              autosize={true}
              value={drugOptions[encounterFields.disbursement_5 - 1 || 0]}
              onChange={(e) => handleChange("disbursement_5", e.value)}
            />
          </div>
        </Grid>
        <Grid xs={3} justify="right">
          <Input bordered type="number" labelPlaceholder="Qty" value={encounterFields.disbursement_5_quantity || ""} onChange={(e) => handleChange("disbursement_5_quantity", e.target.value)} />
        </Grid>
        <Grid xs={9} justify="left">
          <div style={{ width: "100%" }}>
            <Select
              options={drugOptions}
              autosize={true}
              value={drugOptions[encounterFields.disbursement_6 - 1 || 0]}
              onChange={(e) => handleChange("disbursement_6", e.value)}
            />
          </div>
        </Grid>
        <Grid xs={3} justify="right">
          <Input bordered type="number" labelPlaceholder="Qty" value={encounterFields.disbursement_6_quantity || ""} onChange={(e) => handleChange("disbursement_6_quantity", e.target.value)} />
        </Grid>
        <Grid xs={9} justify="left">
          <div style={{ width: "100%" }}>
            <Select
              options={drugOptions}
              autosize={true}
              value={drugOptions[encounterFields.disbursement_7 - 1 || 0]}
              onChange={(e) => handleChange("disbursement_7", e.value)}
            />
          </div>
        </Grid>
        <Grid xs={3} justify="right">
          <Input bordered type="number" labelPlaceholder="Qty" value={encounterFields.disbursement_7_quantity || ""} onChange={(e) => handleChange("disbursement_7_quantity", e.target.value)} />
        </Grid>
        <Grid xs={9} justify="left">
          <div style={{ width: "100%" }}>
            <Select
              options={drugOptions}
              autosize={true}
              value={drugOptions[encounterFields.disbursement_8 - 1 || 0]}
              onChange={(e) => handleChange("disbursement_8", e.value)}
            />
          </div>
        </Grid>
        <Grid xs={3} justify="right">
          <Input bordered type="number" labelPlaceholder="Qty" value={encounterFields.disbursement_8_quantity || ""} onChange={(e) => handleChange("disbursement_8_quantity", e.target.value)} />
        </Grid>
        <Grid xs={9} justify="left">
          <div style={{ width: "100%" }}>
            <Select
              options={drugOptions}
              autosize={true}
              value={drugOptions[encounterFields.disbursement_9 - 1 || 0]}
              onChange={(e) => handleChange("disbursement_9", e.value)}
            />
          </div>
        </Grid>
        <Grid xs={3} justify="right">
          <Input bordered type="number" labelPlaceholder="Qty" value={encounterFields.disbursement_9_quantity || ""} onChange={(e) => handleChange("disbursement_9_quantity", e.target.value)} />
        </Grid>
        <Grid xs={9} justify="left">
          <div style={{ width: "100%" }}>
            <Select
              options={drugOptions}
              autosize={true}
              value={drugOptions[encounterFields.disbursement_10 - 1 || 0]}
              onChange={(e) => handleChange("disbursement_10", e.value)}
            />
          </div>
        </Grid>
        <Grid xs={3} justify="right">
          <Input bordered type="number" labelPlaceholder="Qty" value={encounterFields.disbursement_10_quantity || ""} onChange={(e) => handleChange("disbursement_10_quantity", e.target.value)} />
        </Grid>
      </Grid.Container>
      <Spacer />
      <Text h2>PT Received</Text>
      <Grid.Container gap={2.5} justify="center">
        <Grid xs={6} md={4} justify="center">
          <Checkbox
            size="xl"
            onChange={(checked) => handleChange("goodies_disbursement", checked ? 1 : 0)}
            isSelected={encounterFields.goodies_disbursement === 1 ? true : false}
          >
            Goodies
          </Checkbox>
        </Grid>
        <Grid xs={6} md={4} justify="center">
          <Checkbox
            size="xl"
            onChange={(checked) => handleChange("antiparasitic_disbursement", checked ? 1 : 0)}
          >
            Antiparasitic
          </Checkbox>
        </Grid>
        <Grid xs={6} md={4} justify="center">
          <Checkbox
            size="xl"
            onChange={(checked) => handleChange("fluoride_disbursement", checked ? 1 : 0)}
          >
            Fluoride
          </Checkbox>
        </Grid>
      </Grid.Container>
      <Spacer />
      <Text h2>Survey Responses</Text>
      <Grid.Container gap={2.5} justify="center">
        <Grid xs={12}>
          <Text h3>Por favor, califique su experiencia con el servicio: Please rate your overall experience with the service.</Text>
        </Grid>
        <Grid xs={12} justify="left">
          <Dropdown >
            <Dropdown.Button flat>
              {encounterFields.survey_1 || "Selection"}
            </Dropdown.Button>
            <Dropdown.Menu onAction={(value) => handleChange("survey_1", value)}>
              <Dropdown.Item key="Poor">
                Poor
              </Dropdown.Item>
              <Dropdown.Item key="Average">
                Average
              </Dropdown.Item>
              <Dropdown.Item key="Excellent">
                Excellent
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Grid>
        {/* Repeat 5 more times  */}
        <Grid xs={12}>
          <Text h3>¿Entendió lo que los médicos le dijeron? How well did you understand what the doctors told you?</Text>
        </Grid>
        <Grid xs={12} justify="left">
          <Dropdown >
            <Dropdown.Button flat>
              {encounterFields.survey_2 || "Selection"}
            </Dropdown.Button>
            <Dropdown.Menu onAction={(value) => handleChange("survey_2", value)}>
              <Dropdown.Item key="Poor">
                Poor
              </Dropdown.Item>
              <Dropdown.Item key="Average">
                Average
              </Dropdown.Item>
              <Dropdown.Item key="Excellent">
                Excellent
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Grid>
        <Grid xs={12}>
          <Text h3>¿Hay médicos locales con cuales Ud. se puede hacer controles médicos? Do you have medical providers here to follow up with regarding your medical problems?</Text>
        </Grid>
        <Grid xs={12} justify="left">
          <Dropdown >
            <Dropdown.Button flat>
              {encounterFields.survey_3 || "Selection"}
            </Dropdown.Button>
            <Dropdown.Menu onAction={(value) => handleChange("survey_3", value)}>
              <Dropdown.Item key="Yes">
                Yes
              </Dropdown.Item>
              <Dropdown.Item key="No">
                No
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Grid>
        <Grid xs={12}>
          <Text h3>¿Entiendeeste folleto / papel? Do you understand the pamphlet / paper?</Text>
        </Grid>
        <Grid xs={12} justify="left">
          <Dropdown >
            <Dropdown.Button flat>
              {encounterFields.survey_4 || "Selection"}
            </Dropdown.Button>
            <Dropdown.Menu onAction={(value) => handleChange("survey_4", value)}>
              <Dropdown.Item key="Yes">
                Yes
              </Dropdown.Item>
              <Dropdown.Item key="No">
                No
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Grid>
        <Grid xs={12}>
          <Text h3>¿Sobre cuáles temas de salud le gustaría aprender más? Which health topics would you like to learn more about?</Text>
        </Grid>
        <Grid xs={12} justify="left">
          <Textarea
            label="Enter selected topic of desired further learning."
            height="auto"
            value={encounterFields.survey_5 || ""}
            size="s"
            status="secondary"
            fullWidth
            onChange={(e) => handleChange("survey_5", e.target.value)}
          />
        </Grid>

        {/* Submit Button */}
        <Button onPress={submitForm}>Submit</Button>
      </Grid.Container>
    </Container>
  );
};

export default PatientEncounter;
