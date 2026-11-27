import type {StatCardData} from "../../../services/statCardsApi.ts";
import StatCard from "../StatCard/StatCard.tsx";

interface StatCardsGridProps {
    cards: StatCardData[];
    isLoading?: boolean;
    isError?: boolean;
    isEmpty?: boolean;
    onRetry?: () => void;
}

export default function StatCardsGrid({
                                          cards,
                                          isLoading = false,
                                          isError = false,
                                          isEmpty = false,
                                          onRetry,
                                      }: StatCardsGridProps) {
    if (isLoading) return <p className="mt-[24px]">Loading...</p>;
    if (isError) {
        return (
            <div className="mt-[24px]">
                <p>Failed to load stats</p>
                {onRetry && (
                    <button onClick={onRetry} className="mt-[8px] text-font-accent underline">
                        Retry
                    </button>
                )}
            </div>
        );
    }
    if (isEmpty) return <p className="mt-[24px]">No data</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] lg:gap-[24px]">
            {cards.map((card) => (
                <StatCard key={card.id} data={card} />
            ))}
        </div>
    );
}