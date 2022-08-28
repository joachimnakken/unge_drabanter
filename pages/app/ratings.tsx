import {
  AspectRatio,
  Container,
  Grid,
  Group,
  Paper,
  SimpleGrid,
  Title,
} from "@mantine/core";
import Image from "next/image";
import Meta from "../../components/Meta";

import {
  useAddRatingMutation,
  useAllRatingsQuery,
} from "../../store/features/ratings";

const Ratings = () => {
  const ratings = useAllRatingsQuery();
  const [addRating] = useAddRatingMutation();

  const handleAddRating = () => {
    addRating({
      basic: { productId: "1234", productShortName: "Hello world" },
      imageUrl:
        "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
      rating: 5,
      lastChanged: {
        date: "1337",
        time: "1337",
      },
      ratedById: "133337",
      ratedFromGroupId: "",
    });
  };

  return (
    <>
      <Meta title="Young drabants" description="Tester" />
      <main>
        <Container>
          <Title order={1}>Rated products:</Title>

          <SimpleGrid cols={3} spacing="xs">
            {ratings.data?.map((d, i) => {
              const image = d.imageUrl || "/images/logo.png";
              return (
                <Paper shadow="xs" radius="xs" p="md" key={i}>
                  <Group>
                    <h2>{d.basic.productShortName}</h2>
                    <div>{d.basic.productId}</div>

                    <div>{d.rating}</div>
                  </Group>
                  <AspectRatio
                    ratio={4 / 4}
                    sx={{ maxWidth: 100 }}
                    style={{ position: "relative" }}
                  >
                    <Image
                      src={image}
                      loader={({ src }) => src}
                      alt={d.basic.productShortName}
                      layout="fill"
                      objectFit="cover"
                    />
                  </AspectRatio>
                </Paper>
              );
            })}
          </SimpleGrid>
        </Container>
      </main>
    </>
  );
};

export default Ratings;
