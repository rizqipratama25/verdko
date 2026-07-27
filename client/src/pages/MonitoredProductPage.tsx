import { format, formatDistanceToNow } from "date-fns";
import DataTable from "../components/dashboard/DataTable"
import { useMonitoredProducts } from "../hooks/monitoredProduct/useMonitoredProducts";
import type { MonitoredProduct, MonitoredProductPayload } from "../types/monitoredProduct.type";
import { rupiahFormat } from "../utils/rupiahFormat.utils";
import { ArrowUpRight, Edit, Plus, Trash2 } from "lucide-react";
import StatusFormat from "../components/common/StatusFormat";
import { useUpdateMonitoredProduct } from "../hooks/monitoredProduct/useUpdateMonitoredProduct";
import { useEffect, useState, type ChangeEvent } from "react";
import { useDeleteMonitoredProduct } from "../hooks/monitoredProduct/useDeleteMonitoredProduct";
import { buildHandleDeleteMonitoredProduct, buildHandleEditMonitoredProduct, buildHandleFormMonitoredProductChange, buildHandleSubmitNewMonitoredProduct } from "../handlers/monitoredProduct.handler";
import Modal from "../components/common/Modal";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { useCreateMonitoredProduct } from "../hooks/monitoredProduct/useCreateMonitoredProduct";
import PageHeader from "../components/dashboard/PageHeader";
import ConfirmDialog from "../components/dashboard/ConfirmDialog";

const MonitoredProductPage = () => {
  const [_, forceRender] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      forceRender(prev => prev + 1);
    }, 60_000);

    return () => clearInterval(interval);
  }, [])

  // Get Monitored Product List
  const { data: monitoredProducts = [], isLoading } = useMonitoredProducts();

  // Add Monitored Product
  const { mutateAsync: createMonitoredProduct, isPending: isCreatingMonitoredProduct } = useCreateMonitoredProduct();
  const [showAddModal, setShowAddModal] = useState(false);

  // Update Monitored Product
  const { mutateAsync: updateMonitoredProduct, isPending: isUpdatingMonitoredProduct } = useUpdateMonitoredProduct();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Delete Monitored Product
  const { mutateAsync: deleteMonitoredProduct } = useDeleteMonitoredProduct();
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<MonitoredProduct | null>(null);

  // Form
  const [form, setForm] = useState<MonitoredProductPayload>({
    name: "",
    marketplace: "Tokopedia",
    product_url: ""
  });
  const resetForm = () => setForm({
    name: "",
    marketplace: "Tokopedia",
    product_url: ""
  });

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => buildHandleFormMonitoredProductChange(e, setForm);
  const handleSubmitNewMonitoredProduct = buildHandleSubmitNewMonitoredProduct(form, createMonitoredProduct, { setShowAddModal, resetForm });
  const handleEditMonitoredProduct = buildHandleEditMonitoredProduct(editingId, form, updateMonitoredProduct, { setShowEditModal, setEditingId, resetForm });
  const handleDeleteProvince = buildHandleDeleteMonitoredProduct(deleteMonitoredProduct);
  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    handleDeleteProvince(deleteTarget);
    setShowConfirm(false);
    setDeleteTarget(null);
  }

  const columns = [
    {
      header: 'ID',
      accessor: 'id',
      render: (row: MonitoredProduct) => <span className="text-sm font-medium text-text-primary">{row.id}</span>
    },
    {
      header: 'Product',
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
      render: (row: MonitoredProduct) => <StatusFormat status={row.monitoring_status} />
    },
    {
      header: 'Last Checked',
      accessor: 'last_checked_at',
      render: (row: MonitoredProduct) =>
        row.last_checked_at ? (
          <span
            className="text-sm font-medium text-text-primary"
            title={format(new Date(row.last_checked_at), "dd MMM yyyy HH:mm:ss")}
          >
            {formatDistanceToNow(new Date(row.last_checked_at), {
              addSuffix: true,
            })}
          </span>
        ) : (
          <span className="text-sm font-medium text-text-muted">Awaiting First Check</span>
        )
    },
    {
      header: 'URL',
      accessor: 'product_url',
      render: (row: MonitoredProduct) => <span className="text-sm font-medium text-text-primary"><a href={row.product_url} target="_blank" className="flex items-center gap-1">View Product<ArrowUpRight width="15" /></a></span>
    },
  ];

  const actions = [
    {
      label: 'Edit',
      icon: Edit,
      color: 'text-info',
      hoverColor: 'bg-info/10',
      onClick: (row: MonitoredProduct) => {
        setEditingId(row.id);
        setForm({
          name: row.name,
          marketplace: row.marketplace,
          product_url: row.product_url
        });
        setShowEditModal(true);
      }
    },
    {
      label: 'Delete',
      icon: Trash2,
      color: 'text-danger',
      hoverColor: 'bg-danger/10',
      onClick: (row: MonitoredProduct) => {
        setDeleteTarget(row);
        setShowConfirm(true);
      }
    }
  ]

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <PageHeader title="Monitored Products" description="Manage your monitored products here.">
        <Button className="flex items-center justify-center gap-2 px-4 py-2" onClick={() => setShowAddModal(true)}><Plus size={20} />Add New</Button>
      </PageHeader>

      <DataTable columns={columns} data={monitoredProducts} actions={actions} />

      {showAddModal && (
        <Modal setShowModal={setShowAddModal} modalTitle="Add Monitored Product">
          <form onSubmit={handleSubmitNewMonitoredProduct} className="space-y-4 text-text-primary">
            <Input label="Name" name="name" value={form.name} onChange={handleFormChange} placeholder="Enter the product name" type="text" required={true} />
            <Input label="Marketplace" name="marketplace" value="Tokopedia" onChange={handleFormChange} placeholder="Enter the marketplace name" type="text" required={true} disabled={true} />
            <Input label="Product URL" name="product_url" value={form.product_url} onChange={handleFormChange} placeholder="Enter the product URL" type="text" required={true} />

            <Button className="py-2" disabled={isCreatingMonitoredProduct}>
              {isCreatingMonitoredProduct ? "Creating..." : "Create"}
            </Button>
          </form>
        </Modal>
      )}

      {showEditModal && (
        <Modal setShowModal={setShowEditModal} modalTitle="Edit Monitored Product">
          <form onSubmit={handleEditMonitoredProduct} className="space-y-4 text-text-primary">
            <Input label="Name" name="name" value={form.name} onChange={handleFormChange} placeholder="Enter the product name" type="text" required={true} />
            <Input label="Marketplace" name="marketplace" value="Tokopedia" onChange={handleFormChange} placeholder="Enter the marketplace name" type="text" required={true} disabled={true} />
            <Input label="Product URL" name="product_url" value={form.product_url} onChange={handleFormChange} placeholder="Enter the product URL" type="text" required={true} />

            <Button className="py-2" disabled={isUpdatingMonitoredProduct}>
              {isUpdatingMonitoredProduct ? "Updating..." : "Update"}
            </Button>
          </form>
        </Modal>
      )}

      {showConfirm && (
        <ConfirmDialog
          title="Delete Monitored Product?"
          description={`Are you sure you want to delete "${deleteTarget?.name}"? This will permanently remove its monitoring data and cannot be undone.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => {
            setShowConfirm(false);
            setDeleteTarget(null);
          }}
        />
      )}
    </>
  )
}

export default MonitoredProductPage