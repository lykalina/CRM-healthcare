import { useGetCustomersQuery } from '../../../services/customerApi.ts';

export function useCustomersListViewModel() {
    const { data: customers, isLoading, isError, refetch } = useGetCustomersQuery();

    const isEmpty = !isLoading && !isError && (customers?.length ?? 0) === 0;

    return {
        customers: customers ?? [],
        isLoading,
        isError,
        isEmpty,
        refetch,
    };
}