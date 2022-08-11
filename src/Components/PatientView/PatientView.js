import React, { Component } from "react";
import { useGet } from "../../Queries/useGet";
import axios from "axios";
import { Button, Table, Container, Card, Row, Grid } from "@nextui-org/react";

const PatientView = () => {


  const patients = useGet();
  console.log(patients.data);

  if (patients.isLoading) return <div>Loading patients...</div>;

  if (patients.isError)
    return <div>Error loading patients: {patients.error.message}</div>;

  if (patients.data)
    return (
      <div>
        {patients.data.map((patient) => (
          <Table aria-label="Patient Entry Table"
          css={{
            height: "auto",
            minWidth: "100%"
          }}>
            <Table.Header>
              <Table.Column>Name</Table.Column>
              <Table.Column>DOB</Table.Column>
              <Table.Column>Gender</Table.Column>
            </Table.Header>
            <Table.Body>
              <Table.Row key={patient.id}>
                <Table.Cell>{patient.first_name} {patient.last_name}</Table.Cell>
                <Table.Cell>{patient.dob}</Table.Cell>
                <Table.Cell>{patient.gender}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          // <h1 key={patient.id}>
          //   {patient["last_name"]}, {patient["first_name"]}
          // </h1>
        ))}
      </div>
    );
};

export default PatientView;
