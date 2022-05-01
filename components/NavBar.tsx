import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const nav = [
  { label: "Rated products", href: "/rated" },
  { label: "Stuff1", href: "app/stuff1" },
  { label: "Stuff2", href: "app/stuff2" },
];

const NavBar = () => {
  const router = useRouter();
  const logout = async () => {
    await fetch("/api/logout");
    router.push("/");
  };

  return (
    <div className="flex w-full px-6 py-2 border shadow-lg">
      <div className="mr-8">
        <Image src="/logo.svg" width={54} height={54} alt="logo" />
      </div>

      <ul className="flex items-center justify-center space-x-8">
        {nav.map((item) => (
          <Link key={item.label} href={item.href} passHref>
            <li className="cursor-pointer">
              <strong>{item.label}</strong>
            </li>
          </Link>
        ))}

        <button className="p-2 border-2" onClick={() => logout()}>
          LOGOUT
        </button>
      </ul>
    </div>
  );
};

export default NavBar;
