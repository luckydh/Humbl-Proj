import React from "react";
import { IonLoading } from "@ionic/react";
import "./styles.scss";

export type OverlayLoadingProps = React.ComponentProps<typeof IonLoading>;

export const OverlayLoading: React.FC<OverlayLoadingProps> = (props) => (
  <IonLoading spinner="crescent" data-testid="overlay-loading" cssClass="overlay-loading" {...props} />
);
