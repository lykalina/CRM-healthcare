import { api } from './api';

export type TrendDirection = 'up' | 'down';

export interface StatCardData {
    id: string;
    title: string;
    value: string;
    trend: number | null;
    trendDirection: TrendDirection | null;
}



export const statCardsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getStatCards: builder.query<StatCardData[], void>({
            query: () => 'c/3c37-5678-463c-bd29',
            providesTags: ['StatCard'],
        }),
    }),
});

export const { useGetStatCardsQuery } = statCardsApi;