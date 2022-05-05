import { SyntheticEvent, useReducer, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FiPlus, FiSearch } from "react-icons/fi";

import { useGetVinmonopoletProductsQuery } from "../store/features/vinmonopolet";

interface alchohol {
  basic: { productId: string, productShortName: string },
  imageUrl: string,
  lastChanged: object,
}

const VinmonopoletProductSearch = () => {
  const [searchString, setSearchString] = useState("");
  const [page, setPage] = useReducer((state: number, action: "next" | "previous" | "reset") => {
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
  }, 1);

  const { data: vinmonopoletProducts = [] } = useGetVinmonopoletProductsQuery(
    { name: searchString, limit: 5, skip: (page - 1) * 5 },
    { skip: !searchString },
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
    <div className="grid grid-cols-4 gap-4 lg:grid-cols-12">
      <div className="col-span-full">
        <section className="p-10 bg-white rounded shadow">
          <form onSubmit={handleSearch} className="flex flex-wrap gap-4">
            <div className="relative flex items-center h-10 bg-white border-b-2 border-transparent border-gray-300 roun grow focus-within:ring-offset-0 border-3 focus-within:border-rose-600">

              <FiSearch className="absolute w-4 h-4 left-4" />
              <input
                type="search"
                name="search"
                placeholder="Search"
                className="w-full h-full pl-10 placeholder-transparent border-none focus:ring-0 outline-0 peer"
              />
              <label
                htmlFor="search"
                className="absolute text-xs text-gray-600 transition-all left-10 -top-3.5 peer-focus:text-xs peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-gray-400 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-1.5"
              >
                Search
              </label>
            </div>
            <button
              type="submit"
              className="h-10 px-4 bg-yellow-300 rounded-full disabled:text-opacity-50 basis-16 shrink-0 grow md:grow-0"
            >
              <strong>
                Search
              </strong>
            </button>
          </form>
        </section>
      </div>

      {vinmonopoletProducts.length !== 0 && (
        <div className="col-span-full ">
          <section className="flex justify-between p-4 bg-white rounded shadow">
            <button onClick={() => setPage("previous")} className={clsx({ invisible: page === 1 })}>
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
          className="flex items-center h-24 bg-white rounded shadow col-span-full lg:col-span-4"
        >
          <div className="relative h-full aspect-square">
            <Image
              src={p.imageUrl}
              layout="fill"
              objectFit="contain"
              alt={p.basic.productShortName}
              sizes="(min-width: 768px) 16vw, 33vw"
            />
          </div>
          <div className="text-lg lg:text-sm grow"><strong>{p.basic.productShortName}</strong></div>
          <button className="flex items-center justify-center w-16 h-full bg-yellow-300 shrink-0"><FiPlus /></button>
        </article>
      ))}
      <section className="mt-20 text-center border col-span-full">
        <h2>Cant find what you are looking for?</h2>
        <div className="my-4">Add it yourself!</div>
        <div className="grid place-items-center">
          <button onClick={() => alert('I dont work yet either')} className="flex items-center justify-center w-20 h-20 bg-yellow-300 rounded-full"><FiPlus /></button>
        </div>
      </section>
    </div>
  );
};

export default VinmonopoletProductSearch;
