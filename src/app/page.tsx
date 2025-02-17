import StartPanel from "@/components/home/start-panel";

import styles from "@/components/home/styles/home.module.scss";
import TrackListTable from "@/components/home/track-list-table";

export default function Home() {
  return (
    <div className={"content-container " + styles.home}>
      <StartPanel />

      <div className={styles.home__grid}>
        <TrackListTable />
      </div>
    </div>
  );
}
