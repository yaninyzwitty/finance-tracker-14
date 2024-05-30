import Image from "next/image";
import Link from "next/link";
import React from "react";

function HeaderLogo() {
  return (
    <Link href={"/"}>
      <div className="items-center hidden lg:flex">
        <Image src={"/logo.svg"} alt="logo" width={28} height={28} />
        <p className="text-2xl ml-2.5 font-semibold text-white">Finance</p>
      </div>
    </Link>
  );
}

export default HeaderLogo;
