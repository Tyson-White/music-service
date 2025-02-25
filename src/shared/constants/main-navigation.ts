interface NavigationListItem {
  name: string;
  link: string;
}

export const MainNavigationList: NavigationListItem[] = [
  { name: "Add song", link: "/create-song" },
  { name: "Playlists", link: "/playlist" },
];
