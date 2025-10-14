import { useState } from "react";
import styles from "./DashboardPage.module.css";
import ProfileTabPage from "@/components/templates/ProfileTabPage/ProfileTabPage";
import MyToursTabPage from "@/components/templates/MyToursTabPage/MyToursTabPage";
import TransactionsTabPage from "@/components/templates/TransactionsTabPage/TransactionsTabPage";
import Image from "next/image";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTabPage />;
      case "myTours":
        return <MyToursTabPage />;
      case "transactions":
        return <TransactionsTabPage />;
      default:
        return <ProfileTabPage />;
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.sidebar}>
        <button
          onClick={() => setActiveTab("profile")}
          className={`${styles.tabBtn} ${
            activeTab === "profile" ? styles.active : ""
          }`}
        >
          <Image
            src="/icons/profileBlack.svg"
            alt="profile icon"
            width={30}
            height={30}
          />
          پروفایل
        </button>
        <button
          onClick={() => setActiveTab("myTours")}
          className={`${styles.tabBtn} ${
            activeTab === "myTours" ? styles.active : ""
          }`}
        >
          <Image
            src="/icons/sun-fog-black.svg"
            alt="tours icon"
            width={30}
            height={30}
          />
          تورهای من
        </button>
        <button
          onClick={() => setActiveTab("transactions")}
          className={`${styles.tabBtn} ${
            activeTab === "transactions" ? styles.active : ""
          }`}
        >
          <Image
            src="/icons/convert-card.svg"
            alt="transactions icon"
            width={30}
            height={30}
          />
          تراکنش‌ها
        </button>
      </div>

      <div className={styles.main}>{renderContent()}</div>
    </div>
  );
};

export default DashboardPage;
