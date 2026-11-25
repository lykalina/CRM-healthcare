import { useState } from "react";
import EditIcon from "../../icons/EditIcon/EditIcon.tsx";
import Button from "../Button/Button.tsx";

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
        <div className="bg-bg-card rounded-[10px] pb-[63px]">
            <header className="flex justify-between items-center pt-[20px] pl-[20px] pr-[30px] mb-[30px]">
                <p className="text-[22px] font-bold">{title}</p>
                <div className="flex gap-2">
                    {!isEditing ? (
                        <button
                            type="button"
                            onClick={startEditing}
                            aria-label="Редактировать"
                        >
                            <EditIcon
                                className="cursor-pointer"
                            />
                        </button>
                    ) : (
                        <>
                            <Button
                                title='Cancel'
                                icon={false}
                                onClick={cancelEditing}
                            />
                            <Button
                                title='Save'
                                icon={false}
                                onClick={saveEditing}
                            />
                        </>
                    )}
                </div>
            </header>

            {rows.length > 0 && (
                <div className="px-[20px] overflow-y-scroll max-h-[301px]">
                    {rows.map((row) => (
                        <div
                            key={row.id}
                            className="grid grid-cols-[200px_1fr] gap-x-[20px] py-[10px] border-b border-bg-border last:border-b-0 items-center"
                        >
                            <span className="text-text-secondary">{row.title}</span>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editedValues[row.id] ?? ""}
                                    onChange={(e) => handleChange(row.id, e.target.value)}
                                    className="border border-bg-border rounded px-2 py-1 w-full"
                                />
                            ) : (
                                <span className="text-text-primary">{row.value}</span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}