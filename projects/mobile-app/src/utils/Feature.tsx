import { FeatureType, useGetFeaturesQuery } from "generated/graphql";
import React from "react";

type FeatureProps = {
  name: string;
  children: React.ReactElement;
  fallback?: React.ReactElement;
};

/**
 * Feature component renders children when feature is available and active
 * from the backend, or shows fallback if not.
 * @param featureProps
 * @returns
 */
export const Feature: React.FC<FeatureProps> = ({ name, fallback, children }) => {
  const { feature, features } = useGetFeature(name);

  if (!features) {
    return null;
  }

  // For dev, show info block if feature does not exist in backend. This will get stripped on build.
  if (process.env.NODE_ENV === "development" && !feature) {
    return (
      <>
        {fallback}
        <span className="block bg-yellow p-3 rounded-md">
          <span className="mx-2">No feature named</span>
          <code className="rounded-md bg-red text-white px-3 py-2">{name}</code>
        </span>
      </>
    );
  }

  if (feature?.enabled) {
    return children;
  }

  if (fallback) {
    return fallback;
  }

  return null;
};

interface GetFeature {
  features: FeatureType[] | undefined;
  feature: FeatureType | undefined;
}

const useGetFeature = (name: string): GetFeature => {
  // We call to fetch features on load while animation is showing.
  // We can use apollo cache to manage not refetching featureset unless needed.
  const { data } = useGetFeaturesQuery({
    fetchPolicy: "cache-first",
  });

  const features = data?.features?.features;
  const feature = features?.find((feat) => feat.name === name);
  return { feature, features };
};

export const useFeatureFlag = (name: string): boolean | undefined => {
  const { features, feature } = useGetFeature(name);

  if (process.env.NODE_ENV === "development" && features && !feature) {
    // eslint-disable-next-line no-console
    console.error(
      `There is no feature named "${name}"\nAvailable features are:\n${features
        ?.map((feat) => `• ${feat.name}`)
        .join("\n")}`
    );
  }

  return feature?.enabled;
};
