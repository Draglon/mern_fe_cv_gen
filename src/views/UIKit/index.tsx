"use client";
import Alerts from "./components/Alerts";
import Forms from "./components/Forms";

const UIKit = () => {
  return (
    <div className="page__wrapper">
      <section className="section">
        <Alerts />
        <Forms />
      </section>
    </div>
  );
};

export default UIKit;
