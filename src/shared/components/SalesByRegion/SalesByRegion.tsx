import type {SalesByRegionData} from "../../../services/dashboardStatsApi.ts";

interface SalesByRegionProps {
    data: SalesByRegionData;
}

export default function SalesByRegion({ data }: SalesByRegionProps) {
    const maxValue = Math.max(...data.data.map((d) => d.value), 1);

    return (
        <div className="p-[20px] lg:p-[24px] w-full font-text text-font-primary">
            <h3 className="text-[18px] lg:text-[24px] font-bold text-text-primary mb-[20px]">
                {data.title}
            </h3>

            <div className="flex flex-col gap-[16px]">
                {data.data.map((item) => {
                    const width = (item.value / maxValue) * 100;

                    return (
                        <div key={item.id}>
                            <div className="flex items-center justify-between gap-[12px] mb-[6px]">
                                <span className="text-[14px] lg:text-[16px] text-text-primary">
                                    {item.region}
                                </span>
                                <span className="text-[14px] lg:text-[16px] text-text-primary font-medium shrink-0">
                                    {item.value}
                                </span>
                            </div>
                            <div className="h-[10px] lg:h-[12px] bg-bg-primary rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#8B5CF6] rounded-full transition-[width] duration-500"
                                    style={{ width: `${width}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}