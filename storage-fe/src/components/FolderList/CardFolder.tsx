import React from "react";
import {
  Avatar,
  AvatarProps,
  Row,
  Col,
  Text,
  Button,
  Grid,
  CSS,
  Card,
} from "@nextui-org/react";
import { ClockIcon } from "@/icons/ClockIcon";
import { FolderIcon } from "@/icons/FolderIcon";

interface Props {
  avatarProps?: AvatarProps;
  onClick?: () => void;
}

export type UserTwitterCardProps = Props & { css?: CSS };
const pictureUsers = [
  "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  "https://i.pravatar.cc/150?u=a04258114e29026702d",
];
export const CardFolder: React.FC<UserTwitterCardProps> = ({
  avatarProps,
  css,
  onClick,
  ...props
}) => {
  return (
    <Grid css={{ py: "$0" }}>
      <Card css={{ mw: "250px" }} isPressable>
        <Grid.Container
          css={{
            borderRadius: "$lg",
            padding: "$sm",
            ...css,
          }}
          onClick={onClick}
          {...props}
        >
          <Row align="center" justify="space-between">
            <Col span={3}>
              <Button
                auto
                css={{ backgroundColor: "$white", shadow: "$lg" }}
                icon={<FolderIcon fill="#3CC0FE" />}
              />
            </Col>
            <Col span={9}>
              <Avatar.Group
                count={3}
                css={{ w: "100%", justifyContent: "flex-end" }}
              >
                {pictureUsers.map((url, index) => (
                  <Avatar
                    key={index}
                    size="md"
                    pointer
                    src={url}
                    bordered
                    color="gradient"
                    stacked
                  />
                ))}
              </Avatar.Group>
            </Col>
          </Row>
          <Grid.Container>
            <Grid xs={12}>
              <Text
                color={"$textPrimary"}
                css={{ lineHeight: "19px", mt: "12px" }}
                size={16}
                weight={"medium"}
              >
                Dribble Assets
              </Text>
            </Grid>
          </Grid.Container>

          <Grid.Container
            alignContent="center"
            justify="flex-start"
            css={{ mt: "10px" }}
          >
            <Grid xs={12}>
              <Text color="$textMenu" size={12} css={{ lineHeight: "15px" }}>
                72 Files
              </Text>
            </Grid>

            <Grid xs={12} css={{ mt: "10px", alignItems: "center" }}>
              <ClockIcon size={12} />
              <Text
                color="$textMenu"
                size={12}
                css={{ lineHeight: "15px", ml: "8px" }}
              >
                Lost charges Yesterday
              </Text>
            </Grid>
          </Grid.Container>
        </Grid.Container>
      </Card>
    </Grid>
  );
};
