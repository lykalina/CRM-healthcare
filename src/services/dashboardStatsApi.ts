import { api } from './api';

export interface RegionSale {
    id: string;
    region: string;
    value: number;
}

export interface SalesByRegionData {
    title: string;
    data: RegionSale[];
}

export interface DonutSegment {
    id: string;
    label: string;
    value: number;
    color: string;
}

export interface LostOpportunityData {
    title: string;
    total: number;
    totalLabel: string;
    segments: DonutSegment[];
}

export interface DashboardStats {
    salesByRegion: SalesByRegionData;
    lostOpportunity: LostOpportunityData;
}

export const dashboardStatsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardStats: builder.query<DashboardStats, void>({
            query: () => 'c/9359-7ada-4ac4-9005',
            providesTags: ['DashboardStats'],
        }),
    }),
});

export const { useGetDashboardStatsQuery } = dashboardStatsApi;