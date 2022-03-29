import { useGetAccountByIdQuery } from "../generated/graphql";
import { useCurrentAccountId } from "../state/cache";

export function useGetCurrentAccount() {
  const currentAccountId = useCurrentAccountId();
  const { data, ...props } = useGetAccountByIdQuery({
    variables: { id: `${currentAccountId}` },
    fetchPolicy: "cache-and-network",
  });

  const currentAccount = data?.accountById;

  return { currentAccount, ...props };
}
