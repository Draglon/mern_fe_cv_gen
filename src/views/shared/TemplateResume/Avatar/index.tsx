"use client";
import Image from "next/image";

type AvatarProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

const Avatar = ({ src, alt, width, height }: AvatarProps) => {
  return (
    <div className="personal-avatar">
      <Image
        className="personal-avatar__img"
        src={src}
        alt={alt}
        width={width}
        height={height}
      />
    </div>
  );
};

export default Avatar;
