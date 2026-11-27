import { useState } from 'react';
import {useGetTotalBudgetChartQuery} from "../../services/chartApi.ts";

export function useLineChartViewModel() {
    const { data, isLoading, isError, refetch } = useGetTotalBudgetChartQuery();
    const [period, setPeriod] = useState<string | null>(null);

    const activePeriod = period ?? data?.defaultPeriod ?? '';

    return {
        chart: data,
        isLoading,
        isError,
        refetch,
        period: activePeriod,
        setPeriod,
    };
}