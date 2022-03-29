import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { useTranslation } from "react-i18next";
import { BackButtonEvent } from "@ionic/core";
import Button from "components/Button/Button";
import { Loading } from "components/Loading";
import { Message } from "components/Message/Message";
import ImageEditSelector from "components/imageUploader/ImageSelector";
import { Rect } from "self-define-app";
import { useUpdateAccountImageMutation } from "generated/graphql";
import { useGetCurrentAccount } from "../../hooks/useGetCurrentAccount";
import ImageUploader from "components/imageUploader/ImageUploader";

const ProfileImageCreate: React.FC = () => {
  const { t } = useTranslation();
  const [updateAccountImageMutation] = useUpdateAccountImageMutation();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [image, setImage] = useState<string | undefined>();
  const [dimensions, setDimensions] = useState<Rect | undefined>();
  const [error, setError] = useState(false);
  const { currentAccount: account, refetch } = useGetCurrentAccount();

  useEffect(() => {
    const handleBackButton = (event: Event) => {
      const ionEvent = event as BackButtonEvent;
      ionEvent.detail.register(1, () => {});
    };

    document.addEventListener("ionBackButton", handleBackButton);
    return () => {
      document.removeEventListener("ionBackButton", handleBackButton);
    };
  }, []);

  const displayName = account?.displayName || "You";

  const handleSkip = () => {
    setDone(true);
  };

  const handleImageAdded = async (imageString: string, dimensions: Rect) => {
    setImage(imageString);
    setDimensions(dimensions);
  };

  const handleUpload = async () => {
    try {
      setLoading(true);
      // dimensions x and y set to 0 as we have already cropped and zoomed.
      const submitDimensions = {
        x: 0,
        y: 0,
        w: dimensions?.width,
        h: dimensions?.height,
      };

      const imageData = await updateAccountImageMutation({
        variables: {
          dimensions: submitDimensions,
          image,
        },
      });

      // If we have global account (from prevous creation) and we updated image, update global state and finish.
      if (account && imageData.data?.updateAccountImage?.image) {
        refetch();
        setDone(true);
      } else {
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  };

  if (done) {
    return <Redirect to="/verify?newUser=true" push={false} />;
  }

  if (loading && !done) {
    return (
      <>
        <div className="flex w-full h-full justify-center items-center">
          <span className="flex relative bottom-24">
            <Loading loading={true} />
          </span>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-grow justify-between flex-col">
      <div>
        {error && (
          <div className="h-12">
            <Message variant="error">{t("profile.create.error.there-was-an-error-uploading-your-image")}</Message>
          </div>
        )}
        <div className="content justify-center text-xl text-center text-white">
          {t("page-profile-create.text.greeting", { displayName })}
        </div>
        <div className="mt-16">
          <ImageEditSelector onFinish={handleImageAdded} image={image} />
        </div>
        <div className="flex flex-col mt-2">
          <span className="text-center text-2xl font-bold">{account?.displayName}</span>
          <span className="text-center text-base">@{account?.userName}</span>
        </div>
      </div>
      <div className="mt-6 mb-4">
        {image && (
          <div className="flex flex-row space-x-4 mt-10">
            <Button onClick={handleUpload}>{t("profile-preview.finish.button")}</Button>
          </div>
        )}

        {!image && (
          <div className="flex flex-col justify-center mt-2">
            <ImageUploader onFinish={handleImageAdded}>
              <Button className="mb-2">{t("profile-preview.add-photo.button")}</Button>
            </ImageUploader>

            <Button variant="text" onClick={handleSkip}>
              <span className="font-medium z-10">{t("page-profile-create.button.skip-and-add-later")}</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileImageCreate;
