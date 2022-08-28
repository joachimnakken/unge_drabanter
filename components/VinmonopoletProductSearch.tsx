import { SyntheticEvent, useReducer, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

import { FaArrowLeft, FaArrowRight, FaGlassWhiskey } from "react-icons/fa";
import { FiPlus, FiSearch } from "react-icons/fi";

import { useGetVinmonopoletProductsQuery } from "../store/features/vinmonopolet";
import {
  ActionIcon,
  Button,
  Card,
  Grid,
  Group,
  Input,
  Space,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import Link from "next/link";

interface IBasic {
  productId: string;
  productShortName: string;
}

interface IDate {
  date: string;
  time: string;
}

interface alchohol {
  basic: IBasic;
  imageUrl: string;
  lastChanged: IDate;
}

const VinmonopoletProductSearch = () => {
  const [searchString, setSearchString] = useState("");
  const [page, setPage] = useReducer(
    (state: number, action: "next" | "previous" | "reset") => {
      switch (action) {
        case "next":
          return state + 1;
        case "previous":
          return Math.max(state - 1, 1);
        case "reset":
          return 1;
        default:
          return state;
      }
    },
    1
  );

  const { data: vinmonopoletProducts = [] } = useGetVinmonopoletProductsQuery(
    { name: searchString, limit: 9, skip: (page - 1) * 9 },
    { skip: !searchString }
  );

  const handleSearch = (e: SyntheticEvent): void => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      search: { value: string };
    };

    setSearchString(target.search.value);
    setPage("reset");
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <Group grow>
          <Input
            icon={<FiSearch />}
            type="search"
            name="search"
            placeholder="Search"
          />
          <Button
            leftIcon={<FaGlassWhiskey />}
            type="submit"
            style={{ flexGrow: "0" }}
          >
            <strong>Search</strong>
          </Button>
        </Group>
      </form>
      <Space h={40} />
      {vinmonopoletProducts.length !== 0 && (
        <Group position="center">
          <UnstyledButton onClick={() => setPage("previous")}>
            <ActionIcon color="yellow" size="lg" radius="xs" variant="filled">
              <FaArrowLeft />
            </ActionIcon>
          </UnstyledButton>

          <div style={{ textAlign: "center" }}>
            <Text>Page {page}</Text>
          </div>

          <UnstyledButton
            onClick={() => setPage("next")}
            className={clsx({ invisible: vinmonopoletProducts.length !== 5 })}
          >
            <ActionIcon color="yellow" size="lg" radius="xs" variant="filled">
              <FaArrowRight />
            </ActionIcon>
          </UnstyledButton>
        </Group>
      )}

      <Space h={40} />
      <Grid grow>
        {vinmonopoletProducts.map((p: alchohol) => {
          const {
            basic = {
              productShortName: "",
              productId: "",
            },
            imageUrl = "",
          } = p;
          const { productId = "", productShortName = "" } = basic;
          return (
            <Grid.Col span={4} key={productId}>
              <Card shadow="sm" p="lg" radius="md" withBorder>
                <Group>
                  <div style={{ position: "relative", width: "50px" }}>
                    <Image
                      src={imageUrl}
                      width={50}
                      height={100}
                      objectFit="contain"
                      alt={productShortName}
                      sizes="(min-width: 768px) 16vw, 33vw"
                    />
                  </div>
                  <Stack>
                    <strong>{productShortName}</strong>
                    <span>{productId}</span>
                  </Stack>
                  <Button>
                    <FiPlus />
                  </Button>
                </Group>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>
      <section className="mt-20 text-center border col-span-full">
        <h2>Cant find what you are looking for?</h2>
        <Link href="/app/legg-til" passHref>
          <Button component="a" leftIcon={<FiPlus />}>
            Legg til rating
          </Button>
        </Link>
      </section>
    </>
  );
};

export default VinmonopoletProductSearch;
