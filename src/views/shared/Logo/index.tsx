import Image from "next/image";

import logo from "@/assets/image/logo.png";

const Logo = () => {
  return (
    <div className="logo">
      <Image
        className="logo__img"
        src={logo}
        alt="logo"
        width="87"
        height="32"
        data-testid="logoImg"
      />
    </div>
  );
};

export default Logo;
