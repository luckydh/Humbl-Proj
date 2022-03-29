import { renderHook, act } from "@testing-library/react-hooks";
import { useSearchCryptoCurrencies } from "./useSearchCryptoCurrencies";

const items = [
  {
    name: "Bitcoin",
    tickerCode: "BTC",
  },
  {
    name: "Ethereum",
    tickerCode: "ETH",
  },
];

describe("useSearchCryptoCurrencies", () => {
  it("should reset the results when the search is empty", () => {
    const { result } = renderHook(() => useSearchCryptoCurrencies("", items));
    expect(result.current.results).toEqual(items);
  });

  it("should not search with less than 3 characters", () => {
    const { result } = renderHook(() => useSearchCryptoCurrencies("bt", items));
    expect(result.current.results).toEqual(items);
  });

  it("should be able to search by ticker code", () => {
    const { result } = renderHook(() => useSearchCryptoCurrencies("btc", items));
    expect(result.current.results).toEqual([
      {
        name: "Bitcoin",
        tickerCode: "BTC",
      },
    ]);
  });

  it("should be able to search by name", () => {
    const { result } = renderHook(() => useSearchCryptoCurrencies("ether", items));
    expect(result.current.results).toEqual([
      {
        name: "Ethereum",
        tickerCode: "ETH",
      },
    ]);
  });

  it("should reset the results when the initial list changes", () => {
    const { result, rerender } = renderHook(
      ({ initialItems }) => useSearchCryptoCurrencies("", initialItems),
      {
        initialProps: { initialItems: undefined },
      }
    );

    expect(result.current.results).toEqual([]);

    rerender({
      initialItems: items as any,
    });

    expect(result.current.results).toEqual(items);
  });

  it("should expose a method to reset the results", () => {
    const { result } = renderHook(() => useSearchCryptoCurrencies("bit", items));

    expect(result.current.results).toEqual([
      {
        name: "Bitcoin",
        tickerCode: "BTC",
      },
    ]);

    act(() => {
      result.current.reset();
    });

    expect(result.current.results).toEqual(items);
  });
});
