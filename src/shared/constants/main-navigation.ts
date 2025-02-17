interface NavigationListItem {
  name: string;
  link: string;
}

export const MainNavigationList: NavigationListItem[] = [
  { name: "Home", link: "/" },
  { name: "Playlist", link: "/playlist" },
  { name: "Favourites", link: "/favourites" },
];
