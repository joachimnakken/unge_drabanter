import Image from "next/image";

const ItemCard = () => {
  return (
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
      <div className="text-lg font-bold grow">{p.basic.productShortName}</div>

      <div className="flex items-center justify-center basis-24 shrink-0">
        <button className="h-8 px-4 text-white bg-green-400 rounded">
          ADD
        </button>
      </div>
    </article>
  );
};

export default ItemCard;
