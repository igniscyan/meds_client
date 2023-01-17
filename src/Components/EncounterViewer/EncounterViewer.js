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
} from "@nextui-org/react";

import { useGetPatientEncounter as getEncounters } from "../../Queries/useGetPatientEncounters";

const EncounterViewer = ({ patient_id }) => {
  const encounters = getEncounters();

  if (encounters.isLoading) return <div>Loading encounters...</div>;

  if (encounters.isError) return <div>Error loading </div>;

  if (encounters.data) {
    return (
      <Grid.conatiner gap={2}>
        {encounters.map((encounter) => {
          <Grid sm={12} md={5}>
            <Card isHoverable variant="bordered" css={{ mw: "330px" }}>
              <Card.Header>
                <Text b>{encounter.created_at}</Text>
              </Card.Header>
              <Card.Divider />
              <Card.Body css={{ py: "$10" }}>
                <Text h1>Chief Complaints</Text>
                <Text> {encounter.chief}</Text>
              </Card.Body>
              <Card.Divider />
              <Card.Footer>
                <Row justify="flex-end">
                  <Button size="sm">View Encounter</Button>
                </Row>
              </Card.Footer>
            </Card>
          </Grid>;
        })}
      </Grid.conatiner>
    );
  }
};
