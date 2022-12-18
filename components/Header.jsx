import React from "react";
import Image from "next/image";
// import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import Search from "./Search";
import { Icon, SearchIcon } from "@chakra-ui/icons";
import { AiOutlineUser } from "react-icons/ai";
import Link from "next/link";

function Header() {
  return (
    <div className="px-8 py-8">
      <div className="flex justify-between">
        <Link href={'/'}>
        <Image src={"/logo.png"} width={150} height={150} alt={'logo'}></Image>
        </Link>
        <ul className="flex space-x-4 text-white flex-wrap">
          <li className="bg-[#2E343E] px-4 py-2 rounded-md hover:bg-[#323744]">
            <Link className="hover:text-[#76D12A]" href={'/'}>
            Home
            </Link>
          </li>
          <li className="bg-[#2E343E] px-4 py-2 rounded-md hover:bg-[#323744]">
            <Link className="hover:text-[#76D12A]" href={'/'}>Genre</Link>
          </li>
          <li className="bg-[#2E343E] px-4 py-2 rounded-md hover:bg-[#323744]">
            <Link className="hover:text-[#76D12A]" href={'/'}>Country</Link>
          </li>
          <li className="bg-[#2E343E] px-4 py-2 rounded-md hover:bg-[#323744]">
            <Link className="hover:text-[#76D12A]" href={'/movie'}>Movies</Link>
          </li>
          <li className="bg-[#2E343E] px-4 py-2 rounded-md hover:bg-[#323744]">
            <Link className="hover:text-[#76D12A]" href={'/tv'}>TV</Link>
          </li>
          <li className="bg-[#2E343E] px-4 py-2 rounded-md hover:bg-[#323744]">
            <Link className="hover:text-[#76D12A]" href={'/top-imdb'}>Top IMDb</Link>
          </li>
        </ul>
        <ul className="flex space-x-4 flex-wrap">
          <li>
            <Search />
          </li>
          <li className="pt-2">
            <a
              className="bg-[#2E343E] px-4 py-2 rounded-md hover:bg-[#323744] text-white"
              href="#"
            >
              <Icon className="mr-2" as={AiOutlineUser} />
              Login
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
