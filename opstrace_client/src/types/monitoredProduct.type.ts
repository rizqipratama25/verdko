export interface MonitoredProduct {
    id: number;
    user_id: number;
    name: string;
    marketplace: string;
    product_url: string;
    current_price: number;
    last_checked_at: string;
    monitoring_status: string;
}

export interface MonitoredProductPayload {
    
}