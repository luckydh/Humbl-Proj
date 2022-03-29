/* This component adds a fade out effect at the bottom of the image you provide */

import React from "react";
import "./style.css";

interface Props {
  src: string;
  alt?: string;
}

const FadeOutImage: React.FC<Props> = ({ alt, src }) => (
  <div className="relative pb-1">
    <div className="absolute w-full h-full event-image-gradient" />
    <img className="relative negative-z-index" src={src} width="100%" alt={alt} />
  </div>
);

export default FadeOutImage;
