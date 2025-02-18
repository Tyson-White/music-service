import styles from "./styles/personal-actions.module.scss";
import GiftIcon from "@/components/ui/svg/gift-icon";
import BringIcon from "@/components/ui/svg/bring-icon";

export default function PersonalActions() {
  return (
    <div className={styles["personal-actions"]}>
      <div></div>
      <button>
        <GiftIcon className={styles.icon} />
      </button>
      <button>
        <BringIcon className={styles.icon} />
      </button>

      <button className={styles.avatar} />
    </div>
  );
}
