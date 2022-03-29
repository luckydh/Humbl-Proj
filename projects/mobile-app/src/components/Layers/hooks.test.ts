import { RecoilRoot } from "recoil";
import { renderHook, act } from "@testing-library/react-hooks";
import { useLayerManager } from "./hooks";

describe("useLayerManager", () => {
  it("should expose a public API", () => {
    const { result } = renderHook(() => useLayerManager(), {
      wrapper: RecoilRoot,
    });

    expect(result.current.open).toBeDefined();
    expect(result.current.close).toBeDefined();
    expect(result.current.layersList).toBeDefined();
    expect(result.current.currentLayer).toBeDefined();
  });

  it("should allow adding a layer to the stack", () => {
    const { result } = renderHook(() => useLayerManager(), {
      wrapper: RecoilRoot,
    });

    act(() => {
      result.current.open("cryptoWalletBuyingFlow", {});
    });

    expect(result.current.layersList).toEqual([
      {
        id: "cryptoWalletBuyingFlow",
        props: {},
      },
    ]);
  });

  it("should allow adding a layer to the stack with props", () => {
    const { result } = renderHook(() => useLayerManager(), {
      wrapper: RecoilRoot,
    });

    act(() => {
      result.current.open("cryptoWalletBuyingFlow", {
        currency: "BTC",
      });
    });

    expect(result.current.layersList).toEqual([
      {
        id: "cryptoWalletBuyingFlow",
        props: {
          currency: "BTC",
        },
      },
    ]);
  });

  it("should allow going back to the previous layer", () => {
    const { result } = renderHook(() => useLayerManager(), {
      wrapper: RecoilRoot,
    });

    act(() => {
      // push 2 layers to the stack
      result.current.open("cryptoWalletBuyingFlow", {});
      result.current.open("addCardFlow", {});

      // and then go close
      result.current.close();
    });

    expect(result.current.layersList).toEqual([
      {
        id: "cryptoWalletBuyingFlow",
        props: {},
      },
    ]);
  });

  it("should update the current layer state when navigating through the stack", () => {
    const { result } = renderHook(() => useLayerManager(), {
      wrapper: RecoilRoot,
    });

    expect(result.current.currentLayer).toBeNull();

    act(() => {
      result.current.open("cryptoWalletBuyingFlow", {});
    });

    expect(result.current.currentLayer).toEqual({
      id: "cryptoWalletBuyingFlow",
      props: {},
    });

    act(() => {
      result.current.open("addCardFlow", {});
    });

    expect(result.current.currentLayer).toEqual({
      id: "addCardFlow",
      props: {},
    });

    act(() => {
      result.current.close();
    });

    expect(result.current.currentLayer).toEqual({
      id: "cryptoWalletBuyingFlow",
      props: {},
    });

    act(() => {
      result.current.close();
    });

    expect(result.current.currentLayer).toBeNull();
  });
});
