import React from "react";
import { LayerView, LayersWrapper } from "./common";
import { useLayerManager } from "./hooks";
import { layers } from "./layers";

export const LayersContainer: React.FC = () => {
  const { layersList, currentLayer, close } = useLayerManager();

  if (!layersList.length) {
    return null;
  }

  return (
    <LayersWrapper>
      {layersList.map(({ id, props }) => {
        const LayerComponent = layers[id];
        return (
          <LayerView key={id} active={currentLayer.id === id}>
            <LayerComponent {...(props as unknown)} onClose={close} />
          </LayerView>
        );
      })}
    </LayersWrapper>
  );
};
