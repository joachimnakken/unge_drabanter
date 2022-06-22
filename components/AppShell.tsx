import { AppShell as MantineAppShell } from "@mantine/core";
import { useRouter } from "next/router";
import Header from "./Header";

interface AppShellProps {
  children: React.ReactNode;
}

const AppShell = ({ children }: AppShellProps) => {
  const router = useRouter();
  const isLoggedIn = router.pathname.includes("/app");
  return (
    <MantineAppShell
      header={isLoggedIn ? <Header /> : <div />}
      styles={{ main: { display: "flex", justifyContent: "center" } }}
    >
      {children}
    </MantineAppShell>
  );
};

export default AppShell;
