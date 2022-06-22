import Image from "next/image";
import Meta from "../../components/Meta";
import NavBar from "../../components/Header";
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
      <Meta title="Young drabants" description="Johnny Tester" />

      <main>
        <section>
          <h1>Ratings</h1>
          <ul>
            {ratings.data?.map((d, i) => {
              const image = d.imageUrl || "/images/logo.png";
              return (
                <li key={i} style={{ position: "relative" }}>
                  <div>
                    <Image
                      src={image}
                      loader={({ src }) => src}
                      alt={d.basic.productShortName}
                      layout="fill"
                      objectFit="contain"
                      className="bg-grey-300"
                    />
                  </div>
                  <div>
                    <h2>{d.basic.productShortName}</h2>
                    <div>{d.basic.productId}</div>
                  </div>
                  <div>{d.rating}</div>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </>
  );
};

export default Ratings;
