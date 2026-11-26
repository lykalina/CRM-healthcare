import { useState, useEffect } from 'react';
import SectionIcon from '../../icons/SectionIcon/SectionIcon';
import Tabs, { type TabItem } from '../Tabs/Tabs';
import Button from '../Button/Button';

interface InfoProps {
    tab: string;
    columns: TableColumn[];
    data: TableRow[];
}

interface SectionProps {
    title: string;
    tabs: TabItem[];
    info: InfoProps[];
    customerId: string;
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

function ensureSelected(tabs: TabItem[], defaultId?: string): TabItem[] {
    if (tabs.length === 0) return tabs;
    if (tabs.some((tab) => tab.selected)) return tabs;
    const targetId =
        defaultId && tabs.some((t) => t.id === defaultId) ? defaultId : tabs[0].id;
    return tabs.map((tab) => ({ ...tab, selected: tab.id === targetId }));
}

function getStorageKey(customerId: string, tab: string) {
    return `crm-customer-${customerId}-description-${tab}`;
}

function readRows(customerId: string, tab: string): TableRow[] | null {
    try {
        const raw = localStorage.getItem(getStorageKey(customerId, tab));
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : null;
    } catch {
        return null;
    }
}

function writeRows(customerId: string, tab: string, rows: TableRow[]) {
    localStorage.setItem(getStorageKey(customerId, tab), JSON.stringify(rows));
}

function applyOverrides(info: InfoProps[], customerId: string): InfoProps[] {
    return info.map((item) => {
        const overrides = readRows(customerId, item.tab);
        if (!overrides || overrides.length === 0) return item;
        return { ...item, data: [...item.data, ...overrides] };
    });
}

export default function Section({ title, tabs, info, customerId }: SectionProps) {
    const [sectionTabs, setSectionTabs] = useState<TabItem[]>(() =>
        ensureSelected(tabs, 'order')
    );
    const [localInfo, setLocalInfo] = useState<InfoProps[]>(() =>
        applyOverrides(info, customerId)
    );
    const [draftRow, setDraftRow] = useState<Record<string, string>>({});
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        setSectionTabs(ensureSelected(tabs, 'order'));
    }, [tabs]);

    useEffect(() => {
        setLocalInfo(applyOverrides(info, customerId));
    }, [info, customerId]);

    const handleSelectTab = (id: string) => {
        setSectionTabs((prev) =>
            prev.map((tab) => ({ ...tab, selected: tab.id === id }))
        );
        setDraftRow({});
        setShowError(false);
    };

    const activeTabInfo = localInfo.find(
        (el) => el.tab === sectionTabs.find((tab) => tab.selected)?.id
    );

    const hasDraft = Object.values(draftRow).some((v) => v.trim() !== '');

    const handleDraftChange = (key: string, value: string) => {
        setDraftRow((prev) => ({ ...prev, [key]: value }));
        if (showError) setShowError(false);
    };

    const handleSaveDraft = () => {
        if (!activeTabInfo) return;

        const allFilled = activeTabInfo.columns.every(
            (col) => (draftRow[col.key] ?? '').trim() !== ''
        );

        if (!allFilled) {
            setShowError(true);
            return;
        }

        const newRow: TableRow = {
            id: `row-${Date.now()}`,
            values: { ...draftRow },
        };

        setLocalInfo((prev) =>
            prev.map((item) =>
                item.tab === activeTabInfo.tab
                    ? { ...item, data: [...item.data, newRow] }
                    : item
            )
        );

        const overrides = readRows(customerId, activeTabInfo.tab) ?? [];
        writeRows(customerId, activeTabInfo.tab, [...overrides, newRow]);

        setDraftRow({});
        setShowError(false);
    };

    return (
        <section className="bg-bg-card rounded-[10px] pb-[30px]">
            <header className="bg-bg-secondary rounded-[10px] text-bg-card p-[17px] font-semibold text-[30px] flex items-center gap-[14px]">
                <SectionIcon />
                {title}
            </header>
            <div className="mt-[30px]">
                <Tabs tabs={sectionTabs} onSelect={handleSelectTab} />

                {(!activeTabInfo || activeTabInfo.data.length === 0) && (
                    <p className="pl-[20px] mt-[20px]">No information</p>
                )}

                {activeTabInfo?.tab === 'order' && activeTabInfo.columns.length > 0 && (
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
                                                value={draftRow[col.key] ?? ''}
                                                onChange={(e) => handleDraftChange(col.key, e.target.value)}
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
                                                value={draftRow[col.key] ?? ''}
                                                onChange={(e) => handleDraftChange(col.key, e.target.value)}
                                                placeholder={col.placeholder}
                                                className="w-full px-[14px] py-[10px] bg-transparent outline-none text-text-secondary placeholder:text-text-secondary"
                                            />
                                        )}
                                    </td>
                                ))}
                            </tr>
                            </tbody>
                        </table>

                        {hasDraft && (
                            <div className="flex justify-end items-center gap-[16px] mt-[16px]">
                                {showError && (
                                    <span className="text-red-500 text-[16px]">
                                        Please fill in all fields
                                    </span>
                                )}
                                <Button title="Save" icon={false} onClick={handleSaveDraft} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}