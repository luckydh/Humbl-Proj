import { useMutation } from "@apollo/client";
import {
  AddBankingInfoMutation,
  AddBankingInfoMutationVariables,
  AddBankingInfoDocument,
  GetBanksDocument,
  GetBanksQuery,
} from "generated/graphql";

export function useAddBankingInfoMutationWithCacheUpdate() {
  const [mutate, { data, error }] = useMutation<AddBankingInfoMutation, AddBankingInfoMutationVariables>(
    AddBankingInfoDocument,
    {
      update(cache, { data }) {
        // capture the new data as well as the existing cache
        const newBank = data?.addBankingInfo;
        const existingBanks = cache.readQuery<GetBanksQuery>({
          query: GetBanksDocument,
        });

        // if we have new bank data as well as existing data
        // then update the cache manually with the new data.
        if (newBank && existingBanks) {
          cache.writeQuery<GetBanksQuery>({
            query: GetBanksDocument,
            data: {
              getBanks: [...(existingBanks?.getBanks ?? []), newBank],
            },
          });
        }
      },
    }
  );
  return { mutate, data, error };
}
