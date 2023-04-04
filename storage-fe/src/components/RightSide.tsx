import {
  Avatar,
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Row,
  Spacer,
  Text,
  User,
} from "@nextui-org/react";
import React from "react";
import { AllFilesIcon } from "@/icons/AllFilesIcon";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { TheeDotIcon } from "@/icons/TheeDotIcon";
ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Dung lượng sử dụng"],
  datasets: [
    {
      data: [30, 70],
      backgroundColor: ["#48B4F6", "#e9e9e9"],
      hoverBackgroundColor: ["#48B4F6", "#e9e9e9"],
    },
  ],
};

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
    <Container
      fluid
      responsive={false}
      css={{
        p: "28px 30px",
        h: "inherit",
        display: "flex",
        borderLeft: "1px solid $divider",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}
    >
      <Row css={{ flexDirection: "column" }}>
        <Dropdown placement="bottom-right">
          <Dropdown.Trigger
            css={{ width: "100%", justifyContent: "flex-start" }}
          >
            <User
              bordered
              zoomed
              as="button"
              size="lg"
              color="primary"
              name="Tony Reichert"
              description="@tonyreichert"
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            />
          </Dropdown.Trigger>
          <Dropdown.Menu color="secondary" aria-label="Actions">
            <Dropdown.Item key="new" command="⌘N">
              New file
            </Dropdown.Item>
            <Dropdown.Item key="copy" command="⌘C">
              Copy link
            </Dropdown.Item>
            <Dropdown.Item key="edit" command="⌘⇧E">
              Edit file
            </Dropdown.Item>
            <Dropdown.Item withDivider key="delete" color="error" command="⌘⇧D">
              Delete file
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Row css={{ py: "30px" }}>
          <Col>
            <Text
              color="$textPrimary"
              size={"$xl"}
              weight={"medium"}
              css={{ lineHeight: "24px" }}
            >
              Storage
            </Text>
          </Col>
          <Col>
            <Button
              css={{ h: "unset", ml: "auto" }}
              color={"warning"}
              auto
              light
              icon={
                <TheeDotIcon
                  fill="#84868C
              "
                />
              }
            />
          </Col>
        </Row>
        <Row css={{ h: "140px", position: "relative" }}>
          <Doughnut
            data={data}
            options={{
              rotation: -90,
              circumference: 180,
              cutout: 50,
              borderColor: "transparent",
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                title: {
                  display: false,
                },
                legend: {
                  display: false,
                },
              },
            }}
          />
          <Container
            css={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
            }}
            fluid
          >
            <Row css={{ justifyContent: "center", alignItems: "end" }} fluid>
              <Text
                size={"28px"}
                color="$textPrimary"
                css={{ fontWeight: "600", lineHeight: "33px" }}
              >
                70
              </Text>
              <Spacer x={0.2} />
              <Text size={"14px"} color="$textMenu" css={{ fontWeight: "600" }}>
                GB Used
              </Text>
            </Row>
          </Container>
        </Row>
      </Row>
    </Container>
  );
}
