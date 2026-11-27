import { api } from './api';

export interface ChartSeries {
    key: string;
    label: string;
    color: string;
}

export interface ChartPoint {
    x: string;
    [seriesKey: string]: string | number;
}

export interface ChartData {
    title: string;
    series: ChartSeries[];
    periods: string[];
    defaultPeriod: string;
    data: Record<string, ChartPoint[]>;
    yDomain: [number, number];
    yTicks: number[];
    yTickFormatter?: 'k' | 'plain';
}

export const chartApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getTotalBudgetChart: builder.query<ChartData, void>({
            query: () => 'c/509c-cdba-49da-bb58',
            providesTags: ['Chart'],
        }),
    }),
});

export const { useGetTotalBudgetChartQuery } = chartApi;