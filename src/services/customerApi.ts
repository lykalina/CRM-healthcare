import { api } from './api';
import type {InfoCardProps} from "../shared/components/InfoCard/InfoCard.tsx";
import type {TabItem} from "../shared/components/Tabs/Tabs.tsx";
import type {TableColumn, TableRow} from "../shared/components/Section/Section.tsx";

export interface CustomerListItem {
    id: number;
    name: string;
}

export interface CustomerDetails {
    id: string;
    information: InfoCardProps;
    master: InfoCardProps;
    description: {
        title: string;
        tabs: TabItem[];
        info: {
            tab: string;
            columns: TableColumn[];
            data: TableRow[];
        }[];
    };
}

export const customerApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCustomers: builder.query<CustomerListItem[], void>({
            query: () => ({ url: 'c/8ec6-9af6-4b46-b2af', baseUrl: '' }),
            providesTags: ['Customer'],
        }),
        getCustomer: builder.query<CustomerDetails, string>({
            query: () => ({ url: 'c/ff1d-ce3b-4509-84ae', baseUrl: '' }),
            providesTags: (_result, _error, id) => [{ type: 'Customer', id }],
        }),
    }),
});

export const {
    useGetCustomersQuery,
    useGetCustomerQuery,
} = customerApi;