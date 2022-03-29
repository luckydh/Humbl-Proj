import React from "react";
import cx from "classnames";
import { LayerId, Layers } from "./layers";

export type LayerComponentProps<K extends LayerId> = (Layers[K] extends { props: unknown }
  ? Layers[K]["props"]
  : { props?: never }) & {
  onClose: () => void;
};

export interface LayerViewProps {
  active: boolean;
}

export const LayerView: React.FC<LayerViewProps> = ({ active, children }) => (
  <div className={cx("flex-grow flex flex-col", { hidden: !active })}>{children}</div>
);

export const LayersWrapper: React.FC = ({ children }) => (
  <div className="absolute inset-0 z-10 flex flex-col safe-area-top bg-blue">{children}</div>
);
