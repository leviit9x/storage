import { Container, Row, Col, Spacer, useTheme } from "@nextui-org/react";
import { ReactNode } from "react";
import Header from "./Header";

export interface MyLayoutProps {
  leftSide?: ReactNode;
  rightSide?: ReactNode;
  children: ReactNode;
}

function MyLayout({ children, leftSide, rightSide }: MyLayoutProps) {
  const { isDark } = useTheme();
  return (
    <Container
      fluid
      style={{
        backgroundColor: isDark ? "black" : "white",
        height: "100vh",
      }}
    >
      <Header />
      <Spacer y={2} />
      <Row>
        <Col span={3}>{leftSide}</Col>
        <Col span={6}>{children}</Col>
        <Col span={3}>{rightSide}</Col>
      </Row>
    </Container>
  );
}

export default MyLayout;
