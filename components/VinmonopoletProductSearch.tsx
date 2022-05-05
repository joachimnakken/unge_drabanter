import { SyntheticEvent, useReducer, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

import { useGetVinmonopoletProductsQuery } from "../store/features/vinmonopolet";

interface alchohol {
  basic: { productId: string, productShortName: string },
  imageUrl: string;
  lastChanged: object,
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
    { name: searchString, limit: 5, skip: (page - 1) * 5 },
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
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-full">
        <section className="p-4 bg-white rounded shadow-lg">
          <form onSubmit={handleSearch} className="flex flex-wrap gap-4">
            <div className="relative flex items-center h-12 bg-white border rounded-full grow">
              <FiSearch className="absolute w-4 h-4 left-4" />
              <input
                type="search"
                name="search"
                placeholder="Search"
                className="w-full h-full px-10 border-none rounded-full shadow-inner outline-none bg-none"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 text-xl text-white bg-green-400 rounded-full disabled:text-opacity-50 basis-16 shrink-0 grow md:grow-0"
            >
              Search
            </button>
          </form>
        </section>
      </div>

      {vinmonopoletProducts.length !== 0 && (
        <div className="col-span-full">
          <section className="flex justify-between p-4 bg-white rounded shadow-lg">
            <button
              onClick={() => setPage("previous")}
              className={clsx({ invisible: page === 1 })}
            >
              <FaArrowLeft />
            </button>

            <div>Page {page}</div>

            <button
              onClick={() => setPage("next")}
              className={clsx({ invisible: vinmonopoletProducts.length !== 5 })}
            >
              <FaArrowRight />
            </button>
          </section>
        </div>
      )}

      {vinmonopoletProducts.map((p: alchohol) => (
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
              +
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default VinmonopoletProductSearch;
