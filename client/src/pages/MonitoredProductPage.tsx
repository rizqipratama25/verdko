import DataTable from "../components/DataTable"
import { useMonitoredProducts } from "../hooks/monitoredProduct/useMonitoredProducts";
import type { MonitoredProduct } from "../types/monitoredProduct.type";

const MonitoredProductPage = () => {
  const {data: monitoredProducts = [], isLoading} = useMonitoredProducts();

  const monitoredProductColumns = [
    {
      header: 'ID',
      accessor: 'id',
      render: (row: MonitoredProduct) => <span className="text-sm font-medium text-text-primary">{row.id}</span>
    },
    {
      header: 'Produk',
      accessor: 'name',
      render: (row: MonitoredProduct) => <span className="text-sm font-medium text-text-primary">{row.name}</span>
    },
    {
      header: 'Marketplace',
      accessor: 'marketplace',
      render: (row: MonitoredProduct) => <span className="text-sm font-medium text-text-primary">{row.marketplace}</span>
    },
    {
      header: 'URL',
      accessor: 'product_url',
      render: (row: MonitoredProduct) => <span className="text-sm font-medium text-text-primary">{row.product_url}</span>
    },
    {
      header: 'Current Price',
      accessor: 'current_price',
      render: (row: MonitoredProduct) => <span className="text-sm font-medium text-text-primary">{row.current_price}</span>
    },
    {
      header: 'Status',
      accessor: 'monitoring_status',
      render: (row: MonitoredProduct) => <span className="text-sm font-medium text-text-primary">{row.monitoring_status}</span>
    },
    {
      header: 'Last Checked',
      accessor: 'last_checked_at',
      render: (row: MonitoredProduct) => <span className="text-sm font-medium text-text-primary">{row.last_checked_at}</span>
    },
  ];

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <DataTable columns={monitoredProductColumns} data={monitoredProducts} />
    </div>
  )
}

export default MonitoredProductPage