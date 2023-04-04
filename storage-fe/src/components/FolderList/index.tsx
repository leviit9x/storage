import { Container, Grid, Link, Row, Text } from "@nextui-org/react";
import React from "react";
import { CardFolder } from "./CardFolder";

export function FolderList() {
  return (
    <Container fluid responsive={false} css={{ p: "$0", m: "$0" }}>
      <Row
        css={{
          pb: "20px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          color="$textPrimary"
          size={"$2xl"}
          weight={"medium"}
          css={{ lineHeight: "32px" }}
        >
          Folders
        </Text>
        <Link
          css={{ color: "$blueChart", fontSize: "$sm", lineHeight: "17px" }}
          href="#"
        >
          View All
        </Link>
      </Row>
      <Grid.Container
        gap={2}
        css={{
          m: "$0",
          p: "$0",
        }}
      >
        {Array(3)
          .fill(1)
          .map((_, i) => (
            <CardFolder key={i} />
          ))}
      </Grid.Container>
    </Container>
  );
}
