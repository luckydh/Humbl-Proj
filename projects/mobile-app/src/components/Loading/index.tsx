import * as React from "react";
import { IonSpinner } from "@ionic/react";

export const Loading = ({ loading }: { loading: boolean }): React.ReactElement => {
  if (!loading) {
    return <></>;
  }

  return (
    <span>
      <IonSpinner
        name="crescent"
        data-testid="loading"
        className="w-20 h-20 text-white"
      />
    </span>
  );
};
