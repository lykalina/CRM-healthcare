import { useState } from 'react';
import EditIcon from '../../icons/EditIcon/EditIcon';
import Button from '../Button/Button';

export interface InfoCardRow {
    id: string;
    title: string;
    value: string;
}

export interface InfoCardProps {
    title: string;
    rows?: InfoCardRow[];
}

interface InfoCardComponentProps {
    infoCard: InfoCardProps;
    onSave?: (rows: InfoCardRow[]) => void;
}

export default function InfoCard({ infoCard, onSave }: InfoCardComponentProps) {
    const { title, rows = [] } = infoCard;

    const [isEditing, setIsEditing] = useState(false);
    const [editedValues, setEditedValues] = useState<Record<string, string>>({});

    const startEditing = () => {
        const draft: Record<string, string> = {};
        rows.forEach((row) => {
            draft[row.id] = row.value;
        });
        setEditedValues(draft);
        setIsEditing(true);
    };

    const cancelEditing = () => {
        setEditedValues({});
        setIsEditing(false);
    };

    const saveEditing = () => {
        const updatedRows = rows.map((row) => ({
            ...row,
            value: editedValues[row.id] ?? row.value,
        }));
        onSave?.(updatedRows);
        setIsEditing(false);
        setEditedValues({});
    };

    const handleChange = (id: string, value: string) => {
        setEditedValues((prev) => ({ ...prev, [id]: value }));
    };

    return (
        <div className="bg-bg-card rounded-[10px] pb-[20px] lg:pb-[63px] min-w-0 w-full">
            <header className="flex justify-between items-center gap-[12px] pt-[14px] lg:pt-[20px] px-[14px] lg:pl-[20px] lg:pr-[30px] mb-[16px] lg:mb-[30px]">
                <p className="text-[16px] sm:text-[18px] lg:text-[22px] font-bold break-words min-w-0">
                    {title}
                </p>
                <div className="flex gap-2 shrink-0">
                    {!isEditing ? (
                        <button
                            type="button"
                            onClick={startEditing}
                            aria-label="Редактировать"
                        >
                            <EditIcon className="cursor-pointer" />
                        </button>
                    ) : (
                        <>
                            <Button title="Cancel" icon={false} onClick={cancelEditing} />
                            <Button title="Save" icon={false} onClick={saveEditing} />
                        </>
                    )}
                </div>
            </header>

            {rows.length > 0 && (
                <div className="px-[14px] lg:px-[20px] overflow-y-auto max-h-[301px]">
                    {rows.map((row) => (
                        <div
                            key={row.id}
                            className="grid grid-cols-1 sm:grid-cols-[120px_1fr] lg:grid-cols-[200px_1fr] gap-x-[20px] gap-y-[2px] py-[10px] border-b border-bg-border last:border-b-0 items-start"
                        >
                            <span className="text-text-secondary text-[13px] lg:text-[16px]">
                                {row.title}
                            </span>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editedValues[row.id] ?? ''}
                                    onChange={(e) => handleChange(row.id, e.target.value)}
                                    className="border border-bg-border rounded px-2 py-1 w-full text-[13px] lg:text-[16px]"
                                />
                            ) : (
                                <span className="text-text-primary text-[13px] lg:text-[16px] break-words min-w-0">
                                    {row.value}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}