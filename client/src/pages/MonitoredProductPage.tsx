import { format } from "date-fns";
import DataTable from "../components/DataTable"
import { useMonitoredProducts } from "../hooks/monitoredProduct/useMonitoredProducts";
import type { MonitoredProduct } from "../types/monitoredProduct.type";
import { rupiahFormat } from "../utils/rupiahFormat.utils";
import { ArrowUpRight } from "lucide-react";
import StatusFormat from "../components/StatusFormat";

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
      header: 'Current Price',
      accessor: 'current_price',
      render: (row: MonitoredProduct) => <span className="text-sm font-medium text-text-primary">{rupiahFormat(row.current_price)}</span>
    },
    {
      header: 'Status',
      accessor: 'monitoring_status',
      render: (row: MonitoredProduct) => <StatusFormat status="failed"/>
    },
    {
      header: 'Last Checked',
      accessor: 'last_checked_at',
      render: (row: MonitoredProduct) => <span className="text-sm font-medium text-text-primary">{format(new Date(row.last_checked_at), "dd MMM yyyy HH:mm:ss")}</span>
    },
    {
      header: 'URL',
      accessor: 'product_url',
      render: (row: MonitoredProduct) => <span className="text-sm font-medium text-text-primary"><a href={row.product_url} className="flex items-center gap-1">View Product<ArrowUpRight width="15"/></a></span>
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