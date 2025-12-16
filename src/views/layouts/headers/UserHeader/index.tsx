"use client";
import Navigation from "@/views/shared/Navigation";
import ThemeSwitcher from "@/views/shared/ThemeSwitcher";
import LocalSwitcherSelect from "@/views/shared/LocalSwitcherSelect";
import UserDropdownMenu from "./UserDropdownMenu";

const UserHeader = () => {
  return (
    <header className="page__header justify-content-space-between">
      <div className="d-flex align-items-center">
        <Navigation />
      </div>
      <div className="d-flex align-items-center gap-16">
        <LocalSwitcherSelect />
        <ThemeSwitcher />
        <UserDropdownMenu />
      </div>
    </header>
  );
};

export default UserHeader;
