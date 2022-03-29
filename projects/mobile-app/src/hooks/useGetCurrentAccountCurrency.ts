import { useGetAccountByIdQuery } from "../generated/graphql";
import { useCurrentAccountId } from "../state/cache";

/**
 * Since this hook is used broadly and storybook doesn't
 * have a global module mock, this allows us to stub in
 * the hook and allow the stories to run.
 */
const accountByIdQuery = process.env.STORYBOOK
  ? // eslint-disable-next-line no-empty-pattern
    ({}) => ({} as { data: undefined })
  : useGetAccountByIdQuery;

export function useGetCurrentAccountCurrency() {
  const currentAccountId = useCurrentAccountId();
  const { data } = accountByIdQuery({
    variables: { id: `${currentAccountId}` },
    fetchPolicy: "cache-and-network",
  });

  return data?.accountById?.country?.currencyCode ?? "USD";
}
