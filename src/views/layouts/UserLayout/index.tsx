"use client";
import { useEffect } from "react";

import { useAppDispatch } from "@/store/hooks";
import fetchUser from "@/store/auth/operations/fetchUser";
import UserHeader from "@/views/layouts/headers/UserHeader";
import ModalRoot from "@/views/shared/ModalRoot";

type Props = {
  children: React.ReactNode;
};

const UserLayout = ({ children }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      <div className="page">
        <UserHeader />
        <main className="page__main">{children}</main>
      </div>
      <ModalRoot />
    </>
  );
};

export default UserLayout;
