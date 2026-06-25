<?php

namespace Database\Seeders;

use App\Models\MonitoredProduct;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MonitoredProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $monitoredProduct = [
            [
                "user_id" => 1,
                "name" => "Barber Daily",
                "marketplace" => "Tokopedia",
                "product_url" => "https://tk.tokopedia.com/ZSQRGbfDu",
            ]
        ];

        foreach($monitoredProduct as $product) {
            MonitoredProduct::create($product);
        }
    }
}
