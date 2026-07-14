import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, type ComponentType, type ReactNode } from "react";

interface Column {
    header: string;
    accessor?: string;
    render?: (row: any) => ReactNode;
}

interface Action {
    label: string;
    icon: ComponentType<{ size?: number }>;
    color: string;
    hoverColor: string;
    onClick: (row: any) => void;
}

interface Props {
    columns: Column[];
    data: any[];
    actions?: Action[];
    itemsPerPage?: number
}

const DataTable = ({ columns, data, actions, itemsPerPage = 5 }: Props) => {
    const [currentPage, setCurrentPage] = useState(1);

    const itemLength = data.length;
    const totalPages = Math.ceil(itemLength / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    }

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1)
    }

    return (
        <div className="rounded-lg bg-surface shadow-sm border border-secondary/30 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-surface">
                        <tr>
                            {columns.map((column, index) => (
                                <th
                                    key={index}
                                    className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider"
                                >
                                    {column.header}
                                </th>
                            ))}
                            {actions && (
                                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                                    Aksi
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="bg-surface divide-y divide-surface">
                        {currentData.map((row, rowIndex) => (
                            <tr key={rowIndex} className="hover:bg-surface/80">
                                {columns.map((column, colIndex) => (
                                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                                        {column.render ? column.render(row) : column.accessor ? row[column.accessor] : null}
                                    </td>
                                ))}
                                {actions && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="flex items-center gap-2">
                                            {actions.map((action, actionIndex) => {
                                                const Icon = action.icon;
                                                return (
                                                    <button
                                                        key={actionIndex}
                                                        onClick={() => action.onClick(row)}
                                                        className={`p-2 ${action.color} hover:${action.hoverColor} rounded-lg transition-colors cursor-pointer`}
                                                        title={action.label}
                                                    >
                                                        <Icon size={18} />
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-text-secondary">
                    Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to <span className="font-medium">{Math.min(indexOfLastItem, itemLength)}</span> of <span className="font-medium">{itemLength}</span> results
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-lg border ${currentPage === 1
                            ? 'border-gray-200 text-text-muted cursor-not-allowed'
                            : 'border-gray-300 text-text-secondary hover:bg-gray-50'
                            }`}
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <div className="flex gap-1">
                        {[...Array(totalPages)].map((_, index) => {
                            const pageNumber = index + 1;
                            return (
                                <button
                                    key={pageNumber}
                                    onClick={() => handlePageChange(pageNumber)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === pageNumber
                                        ? 'bg-primary text-white'
                                        : 'text-text-secondary hover:bg-primary/10'
                                        }`}
                                >
                                    {pageNumber}
                                </button>
                            )
                        })}
                    </div>

                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-lg border ${currentPage === totalPages
                            ? 'border-gray-200 text-text-muted cursor-not-allowed'
                            : 'border-gray-300 text-text-secondary hover:bg-gray-50'
                            }`}
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div >
    )
}

export default DataTable