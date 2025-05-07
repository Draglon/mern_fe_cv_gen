"use client";
// import Logo from "@/views/shared/Logo";
import Navigation from "@/views/shared/Navigation";
import ThemeSwitcher from "@/views/shared/ThemeSwitcher";
import LocalSwitcherSelect from "@/views/shared/LocalSwitcherSelect";
import UserDropdownMenu from "./UserDropdownMenu";

const UserHeader = () => {
  return (
    <header className="page__header">
      {/* <Logo /> */}
      <div className="d-flex align-items-center">
        <Navigation />
        <LocalSwitcherSelect />
        <ThemeSwitcher />
        <UserDropdownMenu />
      </div>
    </header>
  );
};

export default UserHeader;
