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
    <div>
      <h1>Ratings</h1>
      <ul>
        {ratings.data?.map((d) => (
          <li>
            {d.basic.productShortName}: {d.rating}
          </li>
        ))}
      </ul>
      <div>
        <button onClick={handleAddRating}>Add a rating</button>
      </div>
    </div>
  );
};

export default Ratings;
