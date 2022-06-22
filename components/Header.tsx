import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import {
  Button,
  Group,
  Header as MantineHeader,
  MediaQuery,
} from "@mantine/core";

import { useRouter } from "next/router";
import { navItems } from "../config/nav";

const NavBar = () => {
  const router = useRouter();
  const { pathname } = router;
  const logout = async () => {
    await fetch("/api/logout");
    router.push("/");
  };

  return (
    <MantineHeader height={60}>
      <Group position="apart" px="sm" align="center" style={{ height: "100%" }}>
        <Group>
          <Link href="/" passHref>
            <a>
              <Image src="/logo.svg" width={44} height={44} alt="logo" />
            </a>
          </Link>

          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link href={item.href} key={item.label} passHref>
                <a style={{ textDecoration: isActive ? "underline" : "none" }}>
                  <span>
                    <item.icon style={{ marginRight: 4 }} />
                  </span>
                  <strong>{item.label}</strong>
                </a>
              </Link>
            );
          })}
        </Group>
        <MediaQuery
          smallerThan="lg"
          styles={{
            display: "none",
            fontSize: 40,
            "&:hover": { backgroundColor: "silver" },
          }}
        >
          <Button onClick={() => logout()} variant="outline">
            <strong>Logout</strong>
          </Button>
        </MediaQuery>
      </Group>
    </MantineHeader>
  );
};

export default NavBar;
