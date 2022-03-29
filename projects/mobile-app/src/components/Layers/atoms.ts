import { atom, selector, selectorFamily } from "recoil";
import { HasProps, LayerId, Layers } from "./layers";

interface LayerObject<K extends LayerId> {
  id: K;
  props: HasProps<Layers[K]>;
}

export const layersListState = atom<LayerObject<LayerId>[]>({
  key: "layersListState",
  default: [],
});

export const currentLayerState = selector({
  key: "currentLayerState",
  get: ({ get }) => {
    const layersList = get(layersListState);
    return layersList[layersList.length - 1] ?? null;
  },
});

export const layerPropsState = selectorFamily({
  key: "layerPropsState",
  get:
    (layerId: LayerId) =>
    ({ get }) => {
      const layersList = get(layersListState);
      const layer = layersList.find((item) => item.id === layerId);
      return layer?.props;
    },
});
