import {
    LineChart as RechartsLineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import type {ChartData} from "../../../services/chartApi.ts";

interface LineChartProps {
    chart: ChartData;
    period: string;
    onPeriodChange: (period: string) => void;
}

function formatYTick(value: number, formatter?: 'k' | 'plain') {
    if (formatter === 'k' && value >= 1000) {
        return `${value / 1000}k`;
    }
    return String(value);
}

export default function LineChart({ chart, period, onPeriodChange }: LineChartProps) {
    const points = chart.data[period] ?? [];

    return (
        <div className="bg-bg-card rounded-[10px] p-[20px] lg:p-[30px] w-full text-font-primary">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-[16px] mb-[24px]">
                <h2 className="text-[18px] lg:text-[24px] font-bold ">
                    {chart.title}
                </h2>

                <div className="flex flex-wrap items-center gap-[16px] lg:gap-[24px]">
                    <div className="flex items-center gap-[16px]">
                        {chart.series.map((s) => (
                            <div key={s.key} className="flex items-center gap-[6px]">
                                <span
                                    className="w-[10px] h-[10px] rounded-full"
                                    style={{ backgroundColor: s.color }}
                                />
                                <span className="text-[14px] lg:text-[16px] text-text-primary">
                                    {s.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-[12px]">
                        {chart.periods.map((p) => {
                            const isActive = p === period;
                            return (
                                <button
                                    key={p}
                                    type="button"
                                    onClick={() => onPeriodChange(p)}
                                    className={`text-[14px] lg:text-[16px] capitalize cursor-pointer transition-colors ${
                                        isActive
                                            ? 'text-font-accent font-semibold'
                                            : 'text-text-secondary hover:text-text-primary'
                                    }`}
                                >
                                    {p}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="w-full h-[300px] lg:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={points} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                        <CartesianGrid vertical={false} stroke="#E5E7EB" />
                        <XAxis
                            dataKey="x"
                            tick={{ fill: '#6B7280', fontSize: 13 }}
                            axisLine={false}
                            tickLine={false}
                            interval="preserveStartEnd"
                        />
                        <YAxis
                            domain={chart.yDomain}
                            ticks={chart.yTicks}
                            tickFormatter={(v) => formatYTick(v, chart.yTickFormatter)}
                            tick={{ fill: '#6B7280', fontSize: 13 }}
                            axisLine={false}
                            tickLine={false}
                            width={48}
                        />
                        <Tooltip
                            contentStyle={{
                                borderRadius: 10,
                                border: '1px solid #E5E7EB',
                                fontSize: 13,
                            }}
                        />
                        {chart.series.map((s) => (
                            <Line
                                key={s.key}
                                type="monotone"
                                dataKey={s.key}
                                name={s.label}
                                stroke={s.color}
                                strokeWidth={3}
                                dot={false}
                                activeDot={{ r: 5 }}
                            />
                        ))}
                    </RechartsLineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}