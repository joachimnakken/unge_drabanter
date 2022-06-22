import { AppShell as MantineAppShell } from "@mantine/core";
import NavBar from "./NavBar";

interface AppShellProps {
  children: React.ReactNode;
}

const AppShell = ({ children }: AppShellProps) => {
  return (
    <MantineAppShell
      header={<NavBar />}
      styles={{ main: { display: "flex", justifyContent: "center" } }}
    >
      {children}
    </MantineAppShell>
  );
};

export default AppShell;
