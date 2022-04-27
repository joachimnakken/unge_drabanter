import { SyntheticEvent, useReducer, useState } from "react";
import Image from "next/image";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { useGetVinmonopoletProductsQuery } from "../store/features/vinmonopolet";

const VinmonopoletProductSearch = () => {
  const [searchString, setSearchString] = useState("");
  const [page, setPage] = useReducer(
    (state: number, action: "next" | "previous") => {
      switch (action) {
        case "next":
          return state + 1;
        case "previous":
          return Math.max(state - 1, 1);
        default:
          return state;
      }
    },
    1
  );

  const { data: vinmonopoletProducts = [] } = useGetVinmonopoletProductsQuery(
    { name: searchString, limit: 5, skip: (page - 1) * 5 },
    { skip: !searchString }
  );

  const handleSearch = (e: SyntheticEvent): void => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      search: { value: string };
    };

    setSearchString(target.search.value);
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-full">
        <section className="p-4 bg-white rounded shadow-lg">
          <form onSubmit={handleSearch} className="flex flex-wrap gap-4">
            <input
              type="search"
              name="search"
              placeholder="Search..."
              className="h-16 text-xl rounded-full shadow-inner grow"
            />
            <button
              type="submit"
              className="h-16 px-6 text-xl text-white bg-green-400 rounded-full disabled:text-opacity-50 basis-16 shrink-0 grow md:grow-0"
            >
              Search
            </button>
          </form>
        </section>
      </div>

      {vinmonopoletProducts.length !== 0 && (
        <div className="col-span-full">
          <section className="flex justify-between p-4 bg-white rounded shadow-lg">
            {page > 1 ? (
              <button onClick={() => setPage("previous")}>
                <FaArrowLeft />
              </button>
            ) : (
              <div />
            )}
            <div>Page {page}</div>
            {vinmonopoletProducts.length === 5 ? (
              <button onClick={() => setPage("next")}>
                <FaArrowRight />
              </button>
            ) : (
              <div />
            )}
          </section>
        </div>
      )}

      {vinmonopoletProducts.map((p) => (
        <article
          key={p.basic.productId}
          className="flex h-24 py-2 bg-white rounded shadow-lg col-span-full md:col-span-2"
        >
          <div className="relative basis-16 shrink-0">
            <Image
              src={p.imageUrl}
              layout="fill"
              objectFit="contain"
              alt={p.basic.productShortName}
              sizes="(min-width: 768px) 16vw, 33vw"
            />
          </div>
          <div className="text-lg font-bold grow">
            {p.basic.productShortName}
          </div>

          <div className="flex items-center justify-center basis-24 shrink-0">
            <button className="h-8 px-4 text-white bg-green-400 rounded">
              ADD
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default VinmonopoletProductSearch;
