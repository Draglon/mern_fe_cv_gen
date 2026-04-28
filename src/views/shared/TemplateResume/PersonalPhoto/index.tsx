"use client";
import Image from "next/image";

type PersonalPhotoProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const PersonalPhoto = ({ src, alt, width, height }: PersonalPhotoProps) => {
  return (
    <div className="personal-photo">
      <Image
        className="personal-photo__img"
        src={src}
        alt={alt}
        width={width}
        height={height}
        data-testid="personalPhotoImg"
      />
    </div>
  );
};

export default PersonalPhoto;
