import { AllFilesIcon } from "@/icons/AllFilesIcon";
import { DashboardIcon } from "@/icons/DashboardIcon";
import { HeartIcon } from "@/icons/HeartIcon";
import { NotificationIcon } from "@/icons/NotificationIcon";
import { ShareIcon } from "@/icons/ShareIcon";
import { TimeIcon } from "@/icons/TimeIcon";
import { TrashIcon } from "@/icons/TrashIcon";
import {
  Button,
  Card,
  Col,
  Container,
  Grid,
  Progress,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import React, { ReactNode } from "react";

export const menu = [
  {
    label: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    label: "All Files",
    icon: <AllFilesIcon />,
  },
  {
    label: "Shared",
    icon: <ShareIcon />,
  },
  {
    label: "Favorites",
    icon: <HeartIcon />,
  },
  {
    label: "Recent",
    icon: <TimeIcon />,
  },
  {
    label: "Trash",
    icon: <TrashIcon />,
  },
];

export default function SideMenu() {
  const MockItem = ({ text, icon }: { text: string; icon: ReactNode }) => {
    return (
      <div>
        <Card isPressable isHoverable css={{ h: "$18", w: "$18" }}>
          <Card.Body>
            <Row justify="center" align="center">
              {icon}
            </Row>
          </Card.Body>
        </Card>
        <Text css={{ textAlign: "center", mt: "$6" }}>{text}</Text>
      </div>
    );
  };
  return (
    <Container fluid css={{ p: "$0" }}>
      <Row>
        <Col span={8}>
          <Grid.Container gap={3} justify="center">
            {menu.map((m) => (
              <Grid xs={6} key={m.label}>
                <MockItem text={m.label} icon={m.icon} />
              </Grid>
            ))}
          </Grid.Container>
        </Col>
      </Row>
      <Row css={{ flexDirection: "column" }}>
        <Col span={8}>
          <Text size={"larger"} b>
            25.32 GB used
          </Text>
          <Text size={"medium"}>79% used - 6.64 GB free</Text>
          <Spacer y={0.5} />
          <Progress value={80} color="error" />
        </Col>
        <Spacer y={4} />
        <Col span={8}>
          <Button shadow color="secondary" css={{ w: "100%" }}>
            Mở rộng bộ nhớ
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
