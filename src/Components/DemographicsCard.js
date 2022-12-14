import React from "react";
import { Grid, Text, Input, Radio, Checkbox, Container } from "@nextui-org/react";

const DemographicsCard = ({ patientInfo, setPatientInfo }) => {
  const handleChange = (propertyName, newValue) => {
    setPatientInfo((patientInfo) => ({
      ...patientInfo,
      [propertyName]: newValue,
    }));
  };

  return (
    <Container>
      <Grid.Container>
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

        {patientInfo.sex === "Female" && (
          <>
            <Grid xs={4} justify="center">
              <Checkbox
                isDisabled={false}
                checked={patientInfo.gyn}
                onChange={(checked) => handleChange("gyn", checked)}>
                Gyn patient?
              </Checkbox>
            </Grid>

            <Grid xs={4} justify="center">
              <Checkbox
                isDisabled={false}
                checked={patientInfo.pregnant}
                onChange={(checked) => handleChange("pregnant", checked)}>
                Pregnant
              </Checkbox>
            </Grid>

            <Grid xs={4} justify="center">
              <Input
                type="date"
                label="Last Period"
                value={patientInfo.lastPeriod}
                onChange={(e) => handleChange("lastPeriod", e.target.value)}
              />
            </Grid>
          </>
        )}
      </Grid.Container>
    </Container>
  );
};

export default DemographicsCard;
