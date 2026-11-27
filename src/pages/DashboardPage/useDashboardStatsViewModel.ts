import {useGetDashboardStatsQuery} from "../../services/dashboardStatsApi.ts";

export function useDashboardStatsViewModel() {
    const { data, isLoading, isError, refetch } = useGetDashboardStatsQuery();

    return {
        stats: data,
        isLoading,
        isError,
        refetch,
    };
}