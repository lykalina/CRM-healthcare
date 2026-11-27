import type {StatCardData} from "../../../services/statCardsApi.ts";

interface StatCardProps {
    data: StatCardData;
}

export default function StatCard({ data }: StatCardProps) {
    const { title, value, trend, trendDirection } = data;
    const hasTrend = trend !== null && trendDirection !== null;
    const isUp = trendDirection === 'up';

    return (
        <div className="bg-bg-card rounded-[10px] p-[20px] lg:p-[24px] flex flex-col justify-between gap-[24px] min-h-[140px] lg:min-h-[160px] font-text">
            <p className="text-[18px] lg:text-[20px] text-font-shady">
                {title}
            </p>

            <div className="flex items-end gap-[12px] flex-wrap">
                <p className="text-[35px] lg:text-[40px] font-bold text-font-primary leading-none">
                    {value}
                </p>

                {hasTrend && (
                    <span
                        className={`flex items-center gap-[4px] text-[18px] lg:text-[22px] ${
                            isUp ? 'text-green-500' : 'text-red-500'
                        }`}
                    >
                        <span aria-hidden="true">{isUp ? '↑' : '↓'}</span>
                        <span>{trend}%</span>
                    </span>
                )}
            </div>
        </div>
    );
}