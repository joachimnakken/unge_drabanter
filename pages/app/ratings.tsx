import Image from "next/image";
import Meta from "../../components/Meta";
import NavBar from "../../components/NavBar";
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
      <NavBar />
      <main className="p-4">
        <section className="mx-auto border lg:max-w-screen-xl">
          <h1>Ratings</h1>
          <ul className="flex flex-wrap gap-4 mt-4">
            {ratings.data?.map((d, i) => {
              const image = d.imageUrl || "/images/logo.png";
              return (
                <li
                  key={i}
                  className="relative bg-white shadow h-[420px] flex rounded"
                >
                  <div className="relative w-40 h-full">
                    <Image
                      src={image}
                      alt={d.basic.productShortName}
                      layout="fill"
                      objectFit="contain"
                      className="bg-grey-300"
                    />
                  </div>
                  <div className="flex justify-between w-full p-4">
                    <div>
                      <h2>{d.basic.productShortName}</h2>
                      <div>{d.basic.productId}</div>
                    </div>
                    <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white bg-red-400">
                      {d.rating}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <button
          onClick={handleAddRating}
          className="fixed px-4 py-2 bg-yellow-300 right-4 top-32"
        >
          Add a dummy rating
        </button>
      </main>
    </>
  );
};

export default Ratings;
