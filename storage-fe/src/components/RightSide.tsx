import {
  Avatar,
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Grid,
  Link,
  Row,
  Spacer,
  Text,
  User,
} from "@nextui-org/react";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { TheeDotIcon } from "@/icons/TheeDotIcon";
import { AllFilesIcon } from "@/icons/AllFilesIcon";
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
        flexDirection: "column",
        flexWrap: "nowrap",
      }}
    >
      <Dropdown placement="bottom-right">
        <Dropdown.Trigger css={{ width: "100%", justifyContent: "flex-start" }}>
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
            icon={<TheeDotIcon fill="#84868C" />}
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

      <Row css={{ py: "30px" }}>
        <Col>
          <Container fluid css={{ p: "$0", m: "$0" }}>
            <Row>
              <Text
                color="$textMenu"
                size={"$md"}
                weight={"normal"}
                css={{ lineHeight: "17px" }}
              >
                Total Space
              </Text>
            </Row>
            <Row>
              <Text
                color="$textPrimary"
                size={"$lg"}
                weight={"medium"}
                css={{ lineHeight: "24px" }}
              >
                120
              </Text>
              <Text
                color="$textMenu"
                size={"$md"}
                weight={"normal"}
                css={{ lineHeight: "24px", ml: "4px" }}
              >
                GB
              </Text>
            </Row>
          </Container>
        </Col>
        <Col>
          <Container fluid css={{ p: "$0", m: "$0" }}>
            <Row css={{ justifyContent: "flex-end" }}>
              <Text
                color="$textMenu"
                size={"$md"}
                weight={"normal"}
                css={{ lineHeight: "17px" }}
              >
                Used Space
              </Text>
            </Row>
            <Row css={{ justifyContent: "flex-end" }}>
              <Text
                color="$textPrimary"
                size={"$lg"}
                weight={"medium"}
                css={{ lineHeight: "24px" }}
              >
                80
              </Text>
              <Text
                color="$textMenu"
                size={"$md"}
                weight={"normal"}
                css={{ lineHeight: "24px", ml: "4px" }}
              >
                GB
              </Text>
            </Row>
          </Container>
        </Col>
      </Row>

      <Row
        css={{
          pb: "30px",
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
          Recent Files
        </Text>
        <Link
          css={{ color: "$blueChart", fontSize: "$sm", lineHeight: "17px" }}
          href="#"
        >
          See more
        </Link>
      </Row>
      <Row
        css={{
          m: "$0",
          overflow: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Grid.Container gap={1} justify="center">
          {Array(10)
            .fill(1)
            .map((_, i) => (
              <Grid css={{ m: "$0", px: "$0", w: "100%" }} key={i}>
                <Card
                  isPressable
                  isHoverable
                  variant="bordered"
                  css={{ mw: "400px", bg: "#white" }}
                >
                  <Card.Body css={{ py: "$0", m: "$0" }}>
                    <Row
                      css={{ h: "100%", p: "$0", m: "$0" }}
                      align="center"
                      justify="space-between"
                    >
                      <Col span={3} css={{ h: "100%" }}>
                        <Row
                          fluid
                          css={{
                            p: "$0",
                            m: "$0",
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                            h: "100%",
                          }}
                        >
                          <Col
                            css={{
                              borderRadius: "$sm",
                              bg: "$white",
                              h: "50px",
                              w: "50px",
                              justifyContent: "center",
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            <AllFilesIcon />
                          </Col>
                        </Row>
                      </Col>
                      <Col span={9} css={{ h: "100%" }}>
                        <Row align="center">
                          <Grid direction="column" xs={12}>
                            <Text b size={"$lg"}>
                              Documents
                            </Text>
                            <Text
                              css={{ mt: "-$3" }}
                              size={"$md"}
                              color="$describe"
                            >
                              @zoeylang
                            </Text>
                          </Grid>
                          <Text b size={"$base"} color="$blueChart">
                            15GB
                          </Text>
                        </Row>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Grid>
            ))}
        </Grid.Container>
      </Row>
    </Container>
  );
}
