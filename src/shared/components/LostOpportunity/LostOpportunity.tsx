import type {LostOpportunityData} from "../../../services/dashboardStatsApi.ts";

interface LostOpportunityProps {
    data: LostOpportunityData;
}

export default function LostOpportunity({ data }: LostOpportunityProps) {
    const size = 280;
    const strokeWidth = 32;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    const total = data.segments.reduce((sum, s) => sum + s.value, 0) || 1;

    let offset = 0;

    return (
        <div className="p-[20px] lg:p-[24px] w-full flex flex-col items-center text-font-primary">
            <h3 className="text-[18px] lg:text-[24px] font-bold  mb-[20px] text-center">
                {data.title}
            </h3>

            <div className="relative" style={{ width: size, height: size }}>
                <svg width={size} height={size} className="-rotate-90">
                    {data.segments.map((segment) => {
                        const fraction = segment.value / total;
                        const dash = fraction * circumference;
                        const gap = circumference - dash;
                        const currentOffset = offset;
                        offset += dash;

                        return (
                            <circle
                                key={segment.id}
                                cx={size / 2}
                                cy={size / 2}
                                r={radius}
                                fill="none"
                                stroke={segment.color}
                                strokeWidth={strokeWidth}
                                strokeDasharray={`${dash} ${gap}`}
                                strokeDashoffset={-currentOffset}
                                strokeLinecap="butt"
                            />
                        );
                    })}
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[36px] lg:text-[48px] font-bold text-text-primary leading-none">
                        {data.total}
                    </span>
                    <span className="text-[16px] lg:text-[20px] text-text-secondary mt-[4px]">
                        {data.totalLabel}
                    </span>
                </div>
            </div>
        </div>
    );
}