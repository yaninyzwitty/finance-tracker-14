"use client";
import React, {useEffect, useState} from "react";
import HeaderLogo from "./header-logo";
import Navigation from "./navigation";
import {UserButton, ClerkLoading, ClerkLoaded} from "@clerk/nextjs";
import {Loader2} from "lucide-react";
import WelcomeMsg from "./welcome-msg";
import {Skeleton} from "./ui/skeleton";
import Filters from "./filters";

function Header() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded)
    return (
      <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-36">
        <div className="max-w-screen-2xl mx-auto">
          <div className="w-full flex justify-between items-center mb-14">
            <div className="flex items-center lg:gap-x-16">
              <div className="flex items-center gap-x-2">
                <Skeleton className="w-[30px] lg:w-[60px] h-[30px] lg:h-[60px] lg:rounded-full bg-blue-500/20 " />
                <Skeleton className="hidden lg:block w-[100px] h-[30px]  bg-blue-500/15 " />
              </div>
              <div className="hidden lg:flex items-center space-x-4">
                <Skeleton className="w-[100px] h-8 bg-blue-500/15 " />
                <Skeleton className="w-[100px] h-8  bg-blue-500/15 " />
                <Skeleton className="w-[100px] h-8  bg-blue-500/15" />
                <Skeleton className="w-[100px] h-8  bg-blue-500/15" />
              </div>
            </div>
            <Skeleton className="w-[40px] h-[40px] rounded-full bg-blue-500/15 " />
          </div>
          <div className="flex  space-y-4 flex-col">
            <Skeleton className=" w-1/2 lg:w-1/3 h-[40px] bg-blue-500/15 " />
            <Skeleton className="w-1/2 lg:w-1/3 h-[30px] bg-blue-500/15 " />
          </div>
        </div>
      </header>
    );
  return (
    <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-36">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex justify-between items-center mb-14">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo />
            <Navigation />
          </div>

          <ClerkLoading>
            <Loader2 className="size-8 animate-spin text-slate-400" />
          </ClerkLoading>
          <ClerkLoaded>
            <UserButton afterSignOutUrl="/" />
          </ClerkLoaded>
        </div>
        <WelcomeMsg />
        <Filters />
      </div>
    </header>
  );
}

export default Header;
