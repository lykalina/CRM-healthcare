import {useGetStatCardsQuery} from "../../services/statCardsApi.ts";

export function useStatCardsViewModel() {
    const { data, isLoading, isError, refetch } = useGetStatCardsQuery();

    const isEmpty = !isLoading && !isError && (data?.length ?? 0) === 0;

    return {
        cards: data ?? [],
        isLoading,
        isError,
        isEmpty,
        refetch,
    };
}