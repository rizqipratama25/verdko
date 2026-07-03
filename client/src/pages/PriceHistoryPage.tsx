import { usePriceHistories } from "../hooks/priceHistory/usePriceHistories"
import type { Pricehistory } from "../types/priceHistory.type";

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
    ];
  
    if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>PriceHistoryPage</div>
  )
}

export default PriceHistoryPage