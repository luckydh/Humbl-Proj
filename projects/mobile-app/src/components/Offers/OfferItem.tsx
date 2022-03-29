import Button from "components/Button/Button";

import React from "react";
import ContentLoader from "react-content-loader";

interface OfferItemProps {
  image: string;
  name: string;
  link: string;
}
const OfferItem: React.FC<OfferItemProps> = (props) => (
    <div className="flex-col border-2 border-white rounded-xl p-4 my-6 bg-blue">
      <div className="text-white pb-2 text-lg font-medium">{props.name}</div>
      <div className="flex justify-between items-center">
        <div className="bg-white">
          <img src={props.image} alt={props.name} className="block w-20 h-auto" />
        </div>
        <div>
          <Button
            size="small"
            className="uppercase"
            onClick={() => { window.location.href = props.link as string }}
          >
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );

export default OfferItem;

export const OfferItemSkeleton: React.FC = () => (
    <ContentLoader
      className="border-2 border-blue-light rounded-lg p-4 my-6"
      animate={true}
      speed={2}
      width="auto"
      height="auto"
      viewBox="0 0 366 80"
      backgroundColor="#4cb4dd"
      foregroundColor="#127aa3"
    >
      <rect x="0" y="0" rx="3" ry="3" width="171" height="9" />
      <rect x="0" y="44" rx="3" ry="3" width="150" height="40" />
      <rect x="205" y="48" rx="30" ry="30" width="150" height="30" />
    </ContentLoader>
  );
