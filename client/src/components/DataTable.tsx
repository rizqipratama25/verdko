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

    const totalPages = Math.ceil(data.length / itemsPerPage);
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
        <div className="rounded-lg bg-background-secondary shadow-sm border border-secondary/30 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-background-secondary">
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
                    <tbody className="bg-background-secondary divide-y divide-background-secondary">
                        {currentData.map((row, rowIndex) => (
                            <tr key={rowIndex} className="hover:bg-background-secondary/80">
                                {columns.map((column, colIndex) => (
                                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                                        {column.render ? column.render(row) : column.accessor ? row[column.accessor] : null}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DataTable