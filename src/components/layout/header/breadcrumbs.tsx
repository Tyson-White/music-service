"use client";

import { usePathname } from "next/navigation";
import { MainNavigationList } from "@/shared/constants/main-navigation";
import Link from "next/link";

export default function Breadcrumbs() {
  const path = usePathname();
  const pathItems = path.split("/").slice(1);

  const list = [
    { name: "Home", link: "/" },
    ...pathItems.map((item) => MainNavigationList.find((navItem) => navItem.link === "/" + item)),
  ];

  return (
    <div className="flex gap-2">
      {list.map((item, index) => (
        <>
          {index !== 0 && ">"}
          <Link href={item?.link || ""} key={index}>
            {item?.name}
          </Link>
        </>
      ))}
    </div>
  );
}
