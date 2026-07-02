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
        <div className="bg-background-secondary rounded-lg shadow-sm border border-secondary/30">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    )
}

export default DataTable