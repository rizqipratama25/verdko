import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import type { MonitoredProduct, MonitoredProductPayload } from "../types/monitoredProduct.type";
import toast from "react-hot-toast";
import { isSupportedProductUrl } from "../utils/validateUrl.utils";

// Form Change
export const buildHandleFormMonitoredProductChange = (e: ChangeEvent<HTMLInputElement>, setForm: Dispatch<SetStateAction<MonitoredProductPayload>>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
}

// Submit New Monitored Product
export const buildHandleSubmitNewMonitoredProduct = (
    form: MonitoredProductPayload,
    createMonitoredProduct: (
        payload: MonitoredProductPayload
    ) => Promise<MonitoredProduct>,
    helpers: {
        setShowAddModal: Dispatch<SetStateAction<boolean>>;
        resetForm: () => void;
    }
) => async (e: FormEvent) => {
    e.preventDefault();

    const toastId = toast.loading("Creating new monitored product...");

    try {
        if (!isSupportedProductUrl(form.product_url)) {
            toast.error("Invalid product URL!", { id: toastId });
            return;
        }

        await createMonitoredProduct(form);

        toast.success("Monitored product created successfully!", { id: toastId });
        helpers.setShowAddModal(false);
        helpers.resetForm();
    } catch (error: any) {
        const message = error.response?.data?.errors || error.response?.data?.message || "Something went wrong!";
        toast.error(message, { id: toastId });
    }
}

// Edit Monitored Product
export const buildHandleEditMonitoredProduct = (
    editingId: number | null,
    form: MonitoredProductPayload,
    updateMonitoredProduct: (
        payload: {
            id: number;
            payload: MonitoredProductPayload;
        }
    ) => Promise<MonitoredProduct>,
    helpers: {
        setShowEditModal: Dispatch<SetStateAction<boolean>>;
        setEditingId: Dispatch<SetStateAction<number | null>>;
        resetForm: () => void;
    }
) => async (e: FormEvent) => {
    e.preventDefault();

    if (!editingId) return;

    const toastId = toast.loading("Updating monitored product...");

    try {
        if (!isSupportedProductUrl(form.product_url)) {
            toast.error("Invalid product URL!", { id: toastId });
            return;
        }

        await updateMonitoredProduct({
            id: editingId,
            payload: form
        });

        toast.success("Monitored product updated successfully!", { id: toastId });
        helpers.setShowEditModal(false);
        helpers.setEditingId(null);
        helpers.resetForm();
    } catch (error: any) {
        const message = error.response?.data?.errors || error.response?.data?.message || "Something went wrong!";
        toast.error(message, { id: toastId });
    }
}

// Delete Monitored Product
export const buildHandleDeleteMonitoredProduct = (
    deleteMonitoredProduct: (
        id: number,
    ) => Promise<null>
) => async (monitoredProduct: MonitoredProduct) => {
    const toastId = toast.loading("Deleting monitored product...");

    try {
        await deleteMonitoredProduct(monitoredProduct.id);
        toast.success("Monitored product deleted successfully!", { id: toastId });
    } catch (error: any) {
        const message = error.response?.data?.errors || error.response?.data?.message || "Something went wrong!";
        toast.error(message, { id: toastId });
    }
}