/**
 * Utility function that will map multiple routing numbers correctly based on selected country rules
 * Currently, we are supporting countries that just concatenate the strings;
 * @param country Select Country
 * @param routing First Routing Value (or undefined)
 * @param routing2 Second Routing Value (or undefined)
 * @returns
 */
import { Countries } from "../../../utils/Countries";

export const mapToRouting = (
  country: Countries,
  routing: string | undefined,
  routing2: string | undefined
) => {
  // Array.join is a nice way to deal with null/undefined values;
  // The logic added to this will cause problems when we add more countries that require two steps of banking information.
  const finalRouting = [routing, routing2].join(country === Countries.SG ? "-" : "");
  return finalRouting === "" ? undefined : finalRouting;
};
