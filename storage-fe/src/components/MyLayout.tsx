import { Grid, useTheme } from "@nextui-org/react";
import { ReactNode } from "react";
import Header from "./Header";
import SideMenu from "@/components/SideMenu";
import RightSide from "@/components/RightSide";

export interface MyLayoutProps {
  children: ReactNode;
}

function MyLayout({ children }: MyLayoutProps) {
  const { isDark } = useTheme();
  return (
    <Grid.Container
      style={{
        backgroundColor: isDark ? "black" : "white",
        height: "100vh",
        padding: `20px 60px`,
      }}
    >
      <Grid xs={12}>
        <Header />
      </Grid>
      <Grid xs={3}>
        <SideMenu />
      </Grid>

      <Grid xs={6}>{children}</Grid>

      <Grid xs={3}>
        <RightSide />
      </Grid>
    </Grid.Container>
  );
}

export default MyLayout;
