import { AppLogoIcon } from "@/icons/AppLogoIcon";
import { DashboardIcon } from "@/icons/DashboardIcon";
import { FavoriteIcon } from "@/icons/FavoriteIcon";
import { FolderIcon } from "@/icons/FolderIcon";
import { ImportIcon } from "@/icons/ImportIcon";
import { LogoutIcon } from "@/icons/LogoutIcon";
import { SettingsIcon } from "@/icons/SettingsIcon";
import { SharedIcon } from "@/icons/SharedIcon";
import { TrashIcon } from "@/icons/TrashIcon";
import {
  Button,
  Card,
  Col,
  Container,
  Grid,
  Input,
  Progress,
  Row,
  Spacer,
  Text,
  styled,
} from "@nextui-org/react";
import React, { ReactNode } from "react";

export const menu = [
  {
    label: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    label: "My Folder",
    icon: <FolderIcon />,
  },
  {
    label: "Favorite",
    icon: <FavoriteIcon />,
  },
  {
    label: "Recycle Bin",
    icon: <TrashIcon />,
  },
  {
    label: "Shared",
    icon: <SharedIcon />,
  },
  {
    label: "Setting",
    icon: <SettingsIcon />,
  },
];

const InputUpload = styled("div", {
  border: "1px dashed $border",
  borderRadius: "$base",
  textAlign: "center",
  position: "relative",
  width: "182px",
  height: "96px",
  color: "$textMenu",
  cursor: "pointer",
  marginTop: "60px",
  "& .import-icon": {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  "& .import-input": {
    opacity: 0,
    h: "100%",
    w: "100%",
  },
});

const MenuItem = ({ text, icon }: { text: string; icon: ReactNode }) => {
  return (
    <Button
      light
      css={{
        justifyContent: "flex-start",
        "&:hover": {
          color: "$textMenuHover",
        },
      }}
    >
      {icon}
      <Text
        css={{ textAlign: "center", color: "inherit" }}
        weight={"medium"}
        size={"$lg"}
        style={{ marginLeft: "16px" }}
      >
        {text}
      </Text>
    </Button>
  );
};

export default function SideMenu() {
  return (
    <Container
      fluid
      responsive={false}
      css={{
        p: "28px 30px",
        h: "inherit",
        display: "flex",
        borderRight: "1px solid $divider",
      }}
    >
      <Row css={{ flexDirection: "column" }}>
        <Row css={{ px: "$6" }}>
          <AppLogoIcon size={40} />
          <Spacer x={0.8} />
          <Text size={"20px"} color="$textPrimary" css={{ fontWeight: "600" }}>
            Storage
          </Text>
        </Row>
        <Spacer y={2} />

        <Row>
          <Grid.Container gap={1.5} css={{ p: "$0", m: "$0" }} justify="center">
            {menu.map((m) => (
              <Grid xs={12} css={{ px: "$0" }} key={m.label}>
                <MenuItem text={m.label} icon={m.icon} />
              </Grid>
            ))}
          </Grid.Container>
        </Row>
        <InputUpload>
          <div className="import-icon">
            <ImportIcon />
            <Text size={"medium"} color="$textMenu">
              Import File
            </Text>
          </div>
          <div className="import-input">
            <label htmlFor="import-file"></label>
            <input id="import-file" type="file" />
          </div>
        </InputUpload>
      </Row>

      <Row css={{ flexDirection: "column", justifyContent: "flex-end" }}>
        <Card.Divider y={3} />
        <Button
          light
          css={{
            justifyContent: "flex-start",
            "&:hover": {
              color: "$warning",
            },
          }}
          color={"warning"}
        >
          <LogoutIcon />
          <Text
            css={{ textAlign: "center", color: "inherit" }}
            weight={"medium"}
            size={"$lg"}
            style={{ marginLeft: "16px" }}
          >
            Log out
          </Text>
        </Button>
      </Row>
    </Container>
  );
}
