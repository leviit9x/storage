import { Container, Grid, Link, Row, Text } from "@nextui-org/react";
import React from "react";
import { CardFolder } from "../FolderList/CardFolder";
import { RecentTable } from "./RecentTable";

export function RecentUploadList() {
  return (
    <Container
      fluid
      responsive={false}
      css={{ p: "20px", m: "$0", mt: "30px" }}
    >
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
          Recent Uploads
        </Text>
        <Link
          css={{ color: "$blueChart", fontSize: "$sm", lineHeight: "17px" }}
          href="#"
        >
          View All
        </Link>
      </Row>
      <RecentTable />
    </Container>
  );
}
