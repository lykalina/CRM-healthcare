import DropdownButton from '../../shared/components/DropdownButton/DropdownButton';
import {useLineChartViewModel} from "./useLineChartViewModel.ts";
import LineChart from "../../shared/components/LineChart/LineChart.tsx";
import {useStatCardsViewModel} from "./useStatCardsViewModel.ts";
import StatCardsGrid from "../../shared/components/StatCardsGrid/StatCardsGrid.tsx";
import {useDashboardStatsViewModel} from "./useDashboardStatsViewModel.ts";
import LostOpportunity from "../../shared/components/LostOpportunity/LostOpportunity.tsx";
import SalesByRegion from "../../shared/components/SalesByRegion/SalesByRegion.tsx";

export default function DashboardPage() {
    const lineChart = useLineChartViewModel();
    const statCards = useStatCardsViewModel();
    const dashboardStats = useDashboardStatsViewModel();

    return (
        <div className="pb-[31px] pt-[80px] lg:pt-0">
            <header className="rounded-[10px] pt-[20px] lg:pt-[44px] pb-[28px] pl-[20px] bg-bg-card font-semibold text-[30px] text-font-accent">
                <h1>Dashboard</h1>
                <DropdownButton
                    title="Actions"
                    variant="primary"
                    items={[]}
                />
            </header>
            <main className="mt-[20px] lg:mt-[35px] flex flex-col lg:flex-row gap-[20px] lg:gap-[32px]">
                <div className="flex flex-col gap-[16px] flex-1 min-w-0">
                    {lineChart.isLoading && <p>Loading...</p>}
                    {lineChart.isError && <p>Failed to load chart</p>}
                    {lineChart.chart && (
                        <LineChart
                            chart={lineChart.chart}
                            period={lineChart.period}
                            onPeriodChange={lineChart.setPeriod}
                        />
                    )}
                    <StatCardsGrid
                        cards={statCards.cards}
                        isLoading={statCards.isLoading}
                        isError={statCards.isError}
                        isEmpty={statCards.isEmpty}
                        onRetry={statCards.refetch}
                    />
                </div>

                <div className="flex flex-col gap-[16px] flex-1 max-w-[735px] min-w-0 bg-bg-card rounded-[10px]">
                    {dashboardStats.isLoading && <p>Loading stats...</p>}
                    {dashboardStats.isError && <p>Failed to load stats</p>}
                    {dashboardStats.stats && (
                        <>
                            <SalesByRegion data={dashboardStats.stats.salesByRegion} />
                            <LostOpportunity data={dashboardStats.stats.lostOpportunity} />
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}