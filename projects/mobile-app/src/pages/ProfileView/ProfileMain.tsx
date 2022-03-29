import React from "react";
import ProfileIndividualView from "./ProfileView";
import ProfileViewMerchant from "./ProfileViewMerchant";
import { ProfileAvatarSkeleton } from "components/Avatar/Avatar";
import { ProfileLayout } from "../../components/PageTemplates/ProfileLayout";
import { VenueProfile } from "pages/VenueProfile";
import { useParams } from "react-router-dom";
import { useGetAccountByIdQuery } from "generated/graphql";

const ProfileMain: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { loading: dataLoading, data } = useGetAccountByIdQuery({
    variables: {
      id,
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  if (dataLoading) {
    return (
      <ProfileLayout>
        <div className="flex w-full h-full justify-center py-12 my-12">
          <ProfileAvatarSkeleton />
        </div>
      </ProfileLayout>
    );
  }
  if (!data?.accountById) {
    return <div>not found</div>;
  }

  // Individuals and Merchants have different components for display, even if the data is the same!
  if (data?.accountById.isMerchant) {
    if (data?.accountById.merchantProfileDetails?.capabilities?.includes("TICKET")) {
      return <VenueProfile id={data?.accountById.id} />;
    }
    return <ProfileViewMerchant account={data?.accountById} />;
  }
  return <ProfileIndividualView account={data?.accountById} />;
};

export default ProfileMain;
