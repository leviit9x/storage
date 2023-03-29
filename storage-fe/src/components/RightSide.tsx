import { Card, Col, Container, Grid, Row, Text } from "@nextui-org/react";
import React from "react";
import { AllFilesIcon } from "@/icons/AllFilesIcon";

export default function RightSide() {
  const MockItem = ({ text }: { text: string }) => {
    return (
      <Card isPressable isHoverable>
        <Card.Body>
          <Row justify="center" align="center">
            <Col span={3}>
              <Row justify={"center"} align={"center"}>
                <AllFilesIcon />
              </Row>
            </Col>
            <Col>
              <Text size="$2xl" b color="#973585">
                Sketch Files
              </Text>
              <Text>Shared with: truongdq.dev@gmail.com</Text>
              <Text color="primary">{new Date().toDateString()}</Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  };

  return (
    <Container fluid>
      <Grid.Container gap={2} justify="center">
        <Grid xs={12}>
          <MockItem text="1 of 1" />
        </Grid>
        <Grid xs={12}>
          <MockItem text="1 of 1" />
        </Grid>
      </Grid.Container>
    </Container>
  );
}
