import { useState } from "react";
import Tab, { TabType } from "../../ui/tab";
import SettingsOverview from "./settings-overview";
import SettingsPasswords from "./settings-passwords";
import { useGet } from "@/src/hooks/use-get";
import { UserDataDto } from "@/src/models/users/user-data-dto";

const tabs: TabType[] = [
  { id: "overview", label: "Overview" },
  { id: "passwords", label: "Passwords" },
];

export default function SettingsContent() {
  const { data: userData, isFetching } = useGet<UserDataDto>({
    url: "users/me",
  });

  const [active, setActive] = useState("overview");

  const renderContent = () => {
    switch (active) {
      case "overview":
        return <SettingsOverview userData={userData!} />;
      case "passwords":
        return <SettingsPasswords isPasswordSet={userData!.isPasswordSet!} />;
      default:
        return null;
    }
  };

  return (
    <>
      {isFetching ? (
        <p>Loading...</p>
      ) : (
        <>
          <Tab tabs={tabs} activeTab={active} setActiveTab={setActive} />
          {renderContent()}
        </>
      )}
    </>
  );
}
