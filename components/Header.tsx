import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import { Button, Group, Header as MantineHeader } from "@mantine/core";

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
    <MantineHeader height={80}>
      <Group position="apart" px="sm" align="center" style={{ height: "100%" }}>
        <Group>
          <Link href="/" passHref>
            <a>
              <Image src="/logo.svg" width={54} height={54} alt="logo" />
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

        <Button onClick={() => logout()} variant="outline">
          <strong>Logout</strong>
        </Button>
      </Group>
    </MantineHeader>
  );
};

export default NavBar;
