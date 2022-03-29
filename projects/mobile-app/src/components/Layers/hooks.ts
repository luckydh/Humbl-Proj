import { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useHardwareBackButton } from "hooks/useHardwareBackButton";
import { HasProps, HasPropsArray, LayerId, Layers } from "./layers";
import { currentLayerState, layersListState, layerPropsState } from "./atoms";

export function useLayerManager() {
  const currentLayer = useRecoilValue(currentLayerState);
  const [layersList, setLayersList] = useRecoilState(layersListState);

  const close = useCallback(() => {
    setLayersList((list) => list.slice(0, list.length - 1));
  }, [setLayersList]);

  const open = useCallback(
    <K extends LayerId, P extends HasPropsArray<Layers[K]>>(layerId: K, ...props: P) => {
      setLayersList((list) => [...list, { id: layerId, props: props[0] ?? {} }]);
    },
    [setLayersList]
  );

  return {
    close,
    open,
    layersList,
    currentLayer,
  };
}

export function useLayerBackButton(layerId: LayerId, callback: () => void) {
  const currentLayer = useRecoilValue(currentLayerState);

  const handleBack = useCallback(() => {
    if (layerId === currentLayer.id) {
      callback();
    }
  }, [layerId, currentLayer, callback]);

  useHardwareBackButton(handleBack);
}

export function useLayerProps<T extends LayerId>(layerId: T) {
  return useRecoilValue(layerPropsState(layerId)) as HasProps<Layers[T]>;
}
