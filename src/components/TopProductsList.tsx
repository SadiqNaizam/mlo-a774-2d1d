import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Define the type for a single product
interface Product {
  id: string;
  name: string;
  imageUrl: string;
  sales: number;
}

// Mock data for the top products list
const mockTopProducts: Product[] = [
  {
    id: 'prod_001',
    name: 'Classic Leather Wallet',
    imageUrl: 'https://placehold.co/100x100/F5F5F5/333333?text=Wallet',
    sales: 15032.85,
  },
  {
    id: 'prod_002',
    name: 'Minimalist Wrist Watch',
    imageUrl: 'https://placehold.co/100x100/E0E0E0/333333?text=Watch',
    sales: 12450.50,
  },
  {
    id: 'prod_003',
    name: 'Canvas Messenger Bag',
    imageUrl: 'https://placehold.co/100x100/D6D6D6/333333?text=Bag',
    sales: 9875.00,
  },
  {
    id: 'prod_004',
    name: 'Modern Sunglasses',
    imageUrl: 'https://placehold.co/100x100/C2C2C2/333333?text=Glasses',
    sales: 7654.20,
  },
  {
    id: 'prod_005',
    name: 'Stainless Steel Tumbler',
    imageUrl: 'https://placehold.co/100x100/BDBDBD/333333?text=Tumbler',
    sales: 5120.99,
  },
];

// Helper to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const TopProductsList: React.FC = () => {
  console.log('TopProductsList loaded');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Selling Products</CardTitle>
        <CardDescription>
          Your best-performing products in the selected period.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {mockTopProducts.map((product) => (
            <div key={product.id} className="flex items-center gap-4">
              <Avatar className="hidden h-10 w-10 sm:flex rounded-md">
                <AvatarImage src={product.imageUrl} alt={product.name} />
                <AvatarFallback className="rounded-md">{product.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1 flex-grow">
                <p className="text-sm font-medium leading-none truncate">
                  {product.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  ID: {product.id}
                </p>
              </div>
              <div className="ml-auto font-medium text-right">
                {formatCurrency(product.sales)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopProductsList;