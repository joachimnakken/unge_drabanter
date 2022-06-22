/* eslint-disable @next/next/no-img-element */
import { Button, Input } from "@mantine/core";
import { ChangeEvent, SyntheticEvent, useRef } from "react";
import { useAddRatingMutation } from "../../store/features/ratings";

const LeggTil = () => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  const [addRating, { isSuccess, isError, isLoading }] = useAddRatingMutation();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      name: { value: string };
      price: { value: string };
      proof: { value: string };
      country: { value: string };
      tastes: { value: string };
      rating: { value: string };
    };

    const {
      name: { value: name },
      price: { value: price },
      proof: { value: proof },
      country: { value: country },
      tastes: { value: tastes },
      rating: { value: rating },
    } = target;

    // Lots of placeholder data here
    addRating({
      basic: { productId: "12345", productShortName: name },
      imageUrl: "https://via.placeholder.com/300",
      rating: +rating,
      lastChanged: {
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      },
      ratedById: "5421",
      ratedFromGroupId: "1333333337",
    });
  };

  const handleImageInput = (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    const reader = new FileReader();

    if (!image) {
      return;
    }

    reader.readAsDataURL(image);
    reader.onload = () => {
      if (imageRef.current) {
        imageRef.current.src = reader.result as string;
      }
    };
  };

  return (
    <div>
      {imageRef.current && (
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjOHPmzH8ACDADZKt3GNsAAAAASUVORK5CYII="
          ref={imageRef}
          alt="Your image"
        />
      )}
      <form onSubmit={handleSubmit}>
        <section>
          <label htmlFor="name">Name</label>
          <Input id="name" name="name" placeholder="Name" />

          <label htmlFor="price">Price</label>
          <Input id="price" name="price" placeholder="Price" />

          <label htmlFor="proof">Proof</label>
          <Input id="proof" name="proof" placeholder="Proof" />

          <label htmlFor="country">Country</label>
          <Input id="country" name="country" placeholder="Country" />

          <label htmlFor="tastes">Tastes</label>
          <Input id="tastes" name="tastes" placeholder="Tastes" />

          <label htmlFor="rating">Rating</label>
          <Input
            id="rating"
            name="rating"
            type="range"
            min={0}
            max={5}
            step={0.5}
          />

          <label htmlFor="image">Image</label>
          <Input
            id="image"
            name="image"
            type="file"
            capture="environment"
            onChange={handleImageInput}
          />

          <Button type="submit" variant="filled">
            Submit
          </Button>
        </section>
      </form>
      {isSuccess && <p>Success!</p>}
      {isError && <p>Error!</p>}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default LeggTil;
