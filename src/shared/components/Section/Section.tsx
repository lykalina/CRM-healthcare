import SectionIcon from "../../icons/SectionIcon/SectionIcon.tsx";
import Tabs, {type TabItem} from "../Tabs/Tabs.tsx";
import {useState} from "react";

interface InfoProps {
    tab: string;
    columns: TableColumn[];
    data: TableRow[];
}

interface SectionProps {
    title: string;
    tabs: TabItem[];
    info: InfoProps[];
}

export type ColumnType = 'text' | 'date' | 'number' | 'select';

export interface TableColumn {
    key: string;
    title: string;
    placeholder: string;
    type?: ColumnType;
    options?: string[];
}

export interface TableRow {
    id: string;
    values: Record<string, string>;
}

export default function Section({title, tabs, info}: SectionProps) {
    const [sectionTabs, setTabs] = useState<TabItem[]>(tabs);

    const handleSelectTab = (id: string) => {
        setTabs((prev) =>
            prev.map((tab) => ({
                ...tab,
                selected: tab.id === id,
            }))
        );
    };

    const activeTabInfo = info.find(el => el.tab === sectionTabs?.find(tab => tab.selected)?.id )

    return (
        <section>
            <header className="bg-bg-secondary rounded-[10px] text-bg-card p-[17px] font-semibold text-[30px] flex items-center gap-[14px]">
                <SectionIcon />
                {title}
            </header>
            <div className="mt-[30px]">
                <Tabs tabs={sectionTabs} onSelect={handleSelectTab} />
                {activeTabInfo?.data.length === 0 && (
                    <p className="pl-[20px] mt-[20px]">No information</p>
                )}
                {activeTabInfo?.tab === 'order' && activeTabInfo.data.length > 0 && (
                    <div className="mt-[30px] px-[20px] overflow-x-auto">
                        <table className="w-full border-collapse text-[16px]">
                            <thead>
                            <tr className="bg-bg-card">
                                {activeTabInfo.columns.map((col) => (
                                    <th
                                        key={col.key}
                                        className="text-left font-semibold text-text-primary px-[14px] py-[12px] border border-bg-border"
                                    >
                                        {col.title}
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {activeTabInfo.data.map((row) => (
                                <tr key={row.id} className="bg-bg-card">
                                    {activeTabInfo.columns.map((col) => (
                                        <td
                                            key={col.key}
                                            className="px-[14px] py-[10px] border border-bg-border text-text-primary"
                                        >
                                            {row.values[col.key] ?? ''}
                                        </td>
                                    ))}
                                </tr>
                            ))}

                            <tr className="bg-bg-card">
                                {activeTabInfo.columns.map((col) => (
                                    <td key={col.key} className="border border-bg-border p-0">
                                        {col.type === 'select' ? (
                                            <select
                                                defaultValue=""
                                                className="w-full px-[14px] py-[10px] bg-transparent outline-none text-text-secondary"
                                            >
                                                <option value="" disabled>
                                                    {col.placeholder}
                                                </option>
                                                {col.options?.map((opt) => (
                                                    <option key={opt} value={opt}>
                                                        {opt}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                type={col.type === 'number' ? 'number' : col.type === 'date' ? 'date' : 'text'}
                                                placeholder={col.placeholder}
                                                className="w-full px-[14px] py-[10px] bg-transparent outline-none text-text-secondary placeholder:text-text-secondary"
                                            />
                                        )}
                                    </td>
                                ))}
                            </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    )
}