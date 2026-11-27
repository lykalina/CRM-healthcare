import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
    tagTypes: ['User', 'Customer', 'Order', 'Ticket', 'Meeting', 'Certificate', 'Chart', 'StatCard', 'DashboardStats'],
    endpoints: () => ({}),
});