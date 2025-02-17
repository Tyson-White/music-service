"use client";

import Breadcrumbs from "./breadcrumbs";
import PersonalActions from "./personal-actions";
import { MainNavigationList } from "@/shared/constants/main-navigation";
import SearchInput from "./search-input";

import Link from "next/link";
import styles from "./styles/header.module.scss";
import { useState } from "react";

export default function Header() {
  const [searchIsActive, setSearchIsActive] = useState(false);

  return (
    <header className={styles.header}>
      <Breadcrumbs />
      <div className={styles.header__center}>
        <SearchInput isActive={searchIsActive} toggler={setSearchIsActive} />
        <nav className={styles.navigation + ` ${searchIsActive ? styles.hidden : ""}`}>
          {MainNavigationList.map((navigationItem) => (
            <Link className={styles.navigation__item} key={navigationItem.link} href={navigationItem.link}>
              {navigationItem.name}
            </Link>
          ))}
        </nav>
      </div>
      <PersonalActions />
    </header>
  );
}
