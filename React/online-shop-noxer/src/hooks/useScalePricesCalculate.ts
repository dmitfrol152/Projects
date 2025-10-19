import { useMemo } from "react";

export function useScalePricesCalculate(
  currentPrice: number,
  oldPrice: number | null
) {
  function calculateScale(currentPrice: number, oldPrice: number | null) {
    if (
      oldPrice === null ||
      currentPrice === null ||
      oldPrice <= 0 ||
      oldPrice <= currentPrice
    ) {
      return null;
    }

    const scale = ((oldPrice - currentPrice) / oldPrice) * 100;
    return Math.round(scale);
  }
  const getScale = useMemo(() => {
    return calculateScale(currentPrice, oldPrice);
  }, [currentPrice, oldPrice]);

  return { getScale };
}
