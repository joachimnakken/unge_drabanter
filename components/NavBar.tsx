import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaGlassWhiskey, FaHamburger, FaRandom } from "react-icons/fa";
import { AiTwotoneStar } from "react-icons/ai";

const nav = [
  { label: "Rated products", href: "/", icon: <AiTwotoneStar /> },
  { label: "Stuff 1", href: "/app/stuff1", icon: <FaGlassWhiskey /> },
  { label: "Stuff 2", href: "/app/stuff1", icon: <FaRandom /> },
];

const NavBar = () => {
  const router = useRouter();
  const { pathname } = router;
  const logout = async () => {
    await fetch("/api/logout");
    router.push("/");
  };



  return (
    <div className="flex items-center justify-between w-full px-6 py-2 bg-white border shadow-lg">
      <div className="flex">
        <div className="mr-8">
          <Link href="/" passHref>
            <a>
              <Image src="/logo.svg" width={54} height={54} alt="logo" />
            </a>
          </Link>
        </div>

        <ul className="items-center justify-center hidden space-x-4 md:flex">
          {nav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.label} className={clsx(isActive && "border-b-2 border-black",)}>
                <Link href={item.href} passHref>
                  <a className="flex items-center">
                    <span className="mr-2">{item.icon}</span>
                    <strong>{item.label}</strong>
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      <button className="p-4 bg-yellow-300 md:hidden ring-yellow-300 ring-offset-4 ring-4" onClick={() => alert('implement me!')}>
        <FaHamburger />
      </button>
      <button className="hidden px-4 py-2 text-sm bg-yellow-300 md:block ring-4 ring-yellow-300 ring-offset-4" onClick={() => logout()}>
        <strong>Logout</strong>
      </button>
    </div>
  );
};

export default NavBar;
