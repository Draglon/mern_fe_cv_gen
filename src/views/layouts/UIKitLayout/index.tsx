"use client";
import UIKitHeader from "@/views/layouts/headers/UIKitHeader";
import ModalRoot from "@/views/shared/ModalRoot";

type Props = {
  children: React.ReactNode;
};

const UIKitLayout = ({ children }: Props) => {
  return (
    <>
      <div className="page">
        <UIKitHeader />
        <main className="page__main">{children}</main>
      </div>
      <ModalRoot />
    </>
  );
};

export default UIKitLayout;
