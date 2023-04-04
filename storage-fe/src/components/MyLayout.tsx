import { Col, Container, Grid, Row, useTheme } from "@nextui-org/react";
import { ReactNode } from "react";
import Header from "./Header";
import SideMenu from "@/components/SideMenu";
import RightSide from "@/components/RightSide";
import Div100vh from "react-div-100vh";

export interface MyLayoutProps {
  children: ReactNode;
}

function MyLayout({ children }: MyLayoutProps) {
  const { isDark } = useTheme();
  return (
    <Div100vh>
      <Container
        fluid
        css={{
          p: "$0",
          m: "$0",
          h: "inherit",
          bgColor: isDark ? "black" : "white",
        }}
        gap={0}
        responsive={false}
      >
        <Row
          css={{
            p: "$0",
            m: "$0",
            h: "inherit",
          }}
          fluid
        >
          <Col
            css={{
              w: "240px",
              h: "inherit",
              display: "flex",
              position: "sticky",
              top: 0,
            }}
          >
            <SideMenu />
          </Col>
          <Col
            css={{
              h: "inherit",
              px: "30px",
              py: "26px",
              w: "calc(100% - 600px)",
              overflowY: "auto",
            }}
          >
            <Header />
            <Row fluid css={{ p: "$0", m: "$0", flexDirection: "column" }}>
              {children}
            </Row>
          </Col>
          <Col css={{ w: "360px", h: "inherit", position: "sticky", top: 0 }}>
            <RightSide />
          </Col>
        </Row>
      </Container>
    </Div100vh>
  );
}

export default MyLayout;
