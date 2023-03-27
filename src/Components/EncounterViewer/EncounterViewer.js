import React, { useState } from "react";
import {
  Grid,
  Text,
  Input,
  Button,
  Checkbox,
  Card,
  Textarea,
  Row,
  Table,
  Container,
  Dropdown
} from "@nextui-org/react";
import { Link, useParams } from "react-router-dom";
import { useGetEncounters as getEncounters } from "../../Queries/useGetPatientEncounters";
import { formatDateString } from "../../utils/stringUtils";
import { complaintsObj } from "../utils";
import { useGetPatientCrit as getPatientCrit } from "../../Queries/useGetPatientCrit";
const EncounterViewer = (props) => {
  const { patientId } = useParams();
  const encounters = getEncounters(patientId);
  const patientName = getPatientCrit(patientId);

  if (encounters.loading) return <div>Loading encounters...</div>;

  if (encounters.isError) return <div>Error loading </div>;

  if (patientName.isLoading) return <div>Loading patient name...</div>;
  if (patientName.isError) return <div>Error loading patient name</div>;

  console.log(patientName);

  return (
    <Container fluid css={{ height: "80vh" }}>
      <Text h1>
        Encounter View: {patientName.data[0].first_name}{" "}
        {patientName.data[0].last_name}{" "}
      </Text>
      {encounters.data.length > 0 ? (
        <Table>
          <Table.Header>
            <Table.Column key="date" alignContent="center">
              DATE
            </Table.Column>
            <Table.Column key="chief_complaint" alignContent="center">
              CHIEF COMPLAINT
            </Table.Column>
            <Table.Column key="Edit" alignContent="center">
              EDIT
            </Table.Column>
          </Table.Header>

          <Table.Body>
            {encounters.data.map((encounter) => {
              return (
                <Table.Row key={encounter.id}>
                  <Table.Cell>
                    {formatDateString(encounter.created_at)}
                  </Table.Cell>
                  <Table.Cell>
                    {encounter.chief_complaint ? complaintsObj[encounter.chief_complaint - 1].label : encounter.alt_chief_complaint}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`${encounter.id}`}>
                      <Button size="sm">View Encounter</Button>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      ) : (
        <Container
          display="center"
          css={{ height: "100%", display: "grid", placeContent: "center" }}
        >
          <Text
            align="center"
            h4
            css={{
              height: "100%",
            }}
          >
            This patient doesn't have any encounters yet.
          </Text>
        </Container>
      )}
    </Container>
  );
};

export default EncounterViewer;
