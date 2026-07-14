import { format } from "date-fns";
import DataTable from "../components/dashboard/DataTable";
import { usePriceHistories } from "../hooks/priceHistory/usePriceHistories"
import type { Pricehistory } from "../types/priceHistory.type";
import { rupiahFormat } from "../utils/rupiahFormat.utils";
import PageHeader from "../components/dashboard/PageHeader";

const PriceHistoryPage = () => {
  const { data: priceHistories = [], isLoading } = usePriceHistories();

  const priceHistoriesColumns = [
      {
        header: 'ID',
        accessor: 'id',
        render: (row: Pricehistory) => <span className="text-sm font-medium text-text-primary">{row.id}</span>
      },
      {
        header: 'Product',
        accessor: 'monitored_product',
        render: (row: Pricehistory) => <span className="text-sm font-medium text-text-primary">{row.monitored_product}</span>
      },
      {
        header: 'Price',
        accessor: 'price',
        render: (row: Pricehistory) => <span className="text-sm font-medium text-text-primary">{rupiahFormat(row.price)}</span>
      },
      {
        header: 'Detected At',
        accessor: 'detected_at',
        render: (row: Pricehistory) => <span className="text-sm font-medium text-text-primary">{format(new Date(row.detected_at), "dd MMM yyyy HH:mm:ss")}</span>
      },
    ];
  
    if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      <PageHeader title="Price History" description="Track historical price changes for your monitored products." />
      <DataTable columns={priceHistoriesColumns} data={priceHistories} />
    </div>
  )
}

export default PriceHistoryPage