import React from "react";
import { Avatar } from "../Avatar/Avatar";
import { RatingDisplay } from "../Rating/Rating";
import { ReviewType } from "generated/graphql";

interface Props {
  review: ReviewType;
}

const defaultSender = {
  userName: "",
  displayName: "HUMBL User",
  image: "https://ui-avatars.com/api/?background=3B5B7B&color=fff&size=148&name=H",
};

export const ReviewItem: React.FC<Props> = ({ review }) => {
  const sender = review.transaction?.sender ?? defaultSender;
  return (
    <div className="flex items-start mt-12 first:mt-0 pr-4">
      <Avatar src={sender.image} />
      <div className="ml-4">
        <p className="font-medium text-lg leading-normal">{sender.displayName}</p>
        {sender.userName && <p className="font-medium text-lg leading-normal">@{sender.userName}</p>}
        <RatingDisplay rating={review.rating!} size="small" className="mt-1 mb-2" />
        <p className="text-base leading-tight ion-text-wrap" style={{ overflowWrap: "anywhere" }}>
          {review.detail}
        </p>
      </div>
    </div>
  );
};

export default ReviewItem;
