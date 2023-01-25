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
import { Link, useParams } from "react-router-dom";
import { useGetEncounters as getEncounters } from "../../Queries/useGetPatientEncounters";
import {formatDateString} from "../../utils/stringUtils";
import {complaintsObj} from "../utils";

const EncounterViewer = (props) => {
  const {patientId} = useParams();
  const encounters = getEncounters(patientId);

  if (encounters.isLoading) return <div>Loading encounters...</div>;

  if (encounters.isError) return <div>Error loading </div>;

  if (encounters?.data.length > 0) {
    return (
      <Grid.Container gap={1}>
        {encounters.data.map((encounter) => {
          console.log(encounter);
          return (
            <Grid sm={12} md={4} key={encounter.id}>
              <Card isHoverable variant="bordered" css={{ mw: "330px" }}>
                <Card.Header>
                  <Text b>{formatDateString(encounter.created_at)}</Text>
                </Card.Header>
                <Card.Divider />
                <Card.Body css={{ py: "$10" }}>
                  <Text h1>Chief Complaints</Text>
                  <Text> {complaintsObj[encounter.chief_complaint-1].label}</Text>
                </Card.Body>
                <Card.Divider />
                <Card.Footer>
                  <Row justify="flex-end">
                    <Link to={`${encounter.id}`}>
                      <Button size="sm">View Encounter</Button>
                    </Link>
                  </Row>
                </Card.Footer>
              </Card>
            </Grid>
          );
        })}
      </Grid.Container>
    );
  }
};

export default EncounterViewer;