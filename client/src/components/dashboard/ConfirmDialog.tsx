interface Props {
    title: string;
    description: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmDialog = ({ title, description, onConfirm, onCancel }: Props) => {
    if (!open) return null

    return (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-xl w-full p-6">
                <h2 className="text-lg font-semibold mb-2 text-text-primary">{title}</h2>
                <p className="text-sm text-text-secondary mb-4">{description}</p>
                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 text-sm rounded border border-secondary/50 hover:bg-gray-50 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm rounded bg-danger hover:bg-danger-hover text-white cursor-pointer"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDialog