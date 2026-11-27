import { api } from './api';

export interface CurrentUser {
    id: number;
    firstName: string;
    lastName: string;
    avatarUrl: string;
    isOnline: boolean;
}

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentUser: builder.query<CurrentUser, void>({
            query: () => ({ url: 'c/d134-b000-4420-9d3a', baseUrl: '' }),
            providesTags: ['User'],
        }),
    }),
});

export const { useGetCurrentUserQuery } = userApi;