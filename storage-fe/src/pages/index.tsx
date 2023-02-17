import { changeTheme, Switch, useTheme } from "@nextui-org/react";
import MyLayout from "@/components/MyLayout";

export default function Home() {
  const { type, isDark } = useTheme();

  const handleChange = () => {
    const nextTheme = isDark ? "light" : "dark";
    window.localStorage.setItem("data-theme", nextTheme); // you can use any storage
    changeTheme(nextTheme);
  };
  return (
    <MyLayout>
      The current theme is: {type}
      <Switch checked={isDark} onChange={handleChange} />
    </MyLayout>
  );
}
