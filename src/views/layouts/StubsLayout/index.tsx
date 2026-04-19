"use client";
import StubsHeader from "@/views/layouts/headers/StubsHeader";
import ModalRoot from "@/views/shared/ModalRoot";

type Props = {
  children: React.ReactNode;
};

const GuestLayout = ({ children }: Props) => {
  return (
    <>
      <div className="page">
        <StubsHeader />
        <main className="page__main">{children}</main>
      </div>
      <ModalRoot />
    </>
  );
};

export default GuestLayout;
