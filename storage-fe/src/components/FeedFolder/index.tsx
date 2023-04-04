import { ImageFileIcon } from "@/icons/ImageFileIcon";
import { PlusIcon } from "@/icons/PlusIcon";
import { TheeDotIcon } from "@/icons/TheeDotIcon";
import {
  Card,
  Grid,
  Text,
  Button,
  Row,
  Progress,
  Col,
} from "@nextui-org/react";

export function FeedFolder() {
  return (
    <Grid.Container
      gap={2}
      css={{
        flexWrap: "nowrap",
        overflow: "scroll",
        flex: 1,
        "&::-webkit-scrollbar": {
          display: "none",
        },
        cursor: "pointer",
        py: "30px",
      }}
    >
      <Grid>
        <Card isPressable variant="bordered" css={{ w: "90px", h: "194px" }}>
          <Card.Body
            css={{
              justifyContent: "center",
              alignItems: "center",
              h: "100%",
              color: "$textMenu",
            }}
          >
            <Row
              css={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PlusIcon size={15} />
              <Text
                size={"$base"}
                color="inherit"
                weight={"normal"}
                css={{ lineHeight: "17px", textAlign: "center", mt: "16px" }}
              >
                Add new folder
              </Text>
            </Row>
          </Card.Body>
        </Card>
      </Grid>
      {Array(10)
        .fill(1)
        .map((_, i) => (
          <Grid key={i}>
            <Card css={{ w: "153px", h: "194px", bg: "#FFA443" }}>
              <Card.Body css={{ justifyContent: "space-between", h: "100%" }}>
                <Row
                  css={{
                    flexDirection: "column",
                  }}
                >
                  <Col>
                    <Row>
                      <Button
                        auto
                        css={{ backgroundColor: "$white", shadow: "$lg" }}
                        icon={<ImageFileIcon />}
                      />
                      <Button
                        css={{
                          h: "unset",
                          ml: "auto",
                          transform: "rotate(90deg)",
                        }}
                        auto
                        light
                        icon={<TheeDotIcon fill="#ffffff" />}
                      />
                    </Row>
                  </Col>
                  <Col>
                    <Text
                      size={"$lg"}
                      color="$white"
                      weight={"medium"}
                      css={{ lineHeight: "22px", mt: "$8" }}
                    >
                      Images
                    </Text>
                  </Col>
                </Row>
                <Row css={{ flexDirection: "column" }}>
                  <Col>
                    <Text
                      size={"$base"}
                      color="$white"
                      weight={"normal"}
                      css={{ lineHeight: "18px", pb: "12px" }}
                    >
                      20 GB
                    </Text>
                  </Col>
                  <Col>
                    <Progress value={70} shadow color={"primary"} />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Grid>
        ))}
    </Grid.Container>
  );
}
