import React, { useState } from 'react';
import { DateRange } from "react-day-picker";
import { subDays } from "date-fns";

// Custom Layout Components
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import Footer from '@/components/layout/Footer';

// Custom Page-Specific Components
import KpiCard from '@/components/KpiCard';
import DateRangePicker from '@/components/DateRangePicker';
import SalesTrendChart from '@/components/SalesTrendChart';

// shadcn/ui Components for the page
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Mock data for the recent orders table
const recentOrders = [
    { id: 'ORD001', customer: 'Liam Johnson', date: '2023-11-23', status: 'Delivered', total: '$250.00' },
    { id: 'ORD002', customer: 'Olivia Smith', date: '2023-11-22', status: 'Processing', total: '$150.00' },
    { id: 'ORD003', customer: 'Noah Williams', date: '2023-11-21', status: 'Shipped', total: '$350.00' },
    { id: 'ORD004', customer: 'Emma Brown', date: '2023-11-20', status: 'Delivered', total: '$450.00' },
    { id: 'ORD005', customer: 'Ava Jones', date: '2023-11-19', status: 'Canceled', total: '$550.00' },
];

// Mock data for the sales trend chart
const salesData = [
  { time: "Jan", sales: 1860 },
  { time: "Feb", sales: 3050 },
  { time: "Mar", sales: 2370 },
  { time: "Apr", sales: 730 },
  { time: "May", sales: 2090 },
  { time: "Jun", sales: 2140 },
];

const Dashboard = () => {
    console.log('Dashboard page loaded');
    const [date, setDate] = useState<DateRange | undefined>({
        from: subDays(new Date(), 29),
        to: new Date(),
    });

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'Delivered':
                return 'default'; // default is green-ish in many themes
            case 'Processing':
                return 'secondary'; // secondary is often gray
            case 'Shipped':
                return 'outline';
            case 'Canceled':
                return 'destructive';
            default:
                return 'secondary';
        }
    };

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <LeftSidebar />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <Header />
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-semibold">Dashboard</h1>
                        <DateRangePicker date={date} onDateChange={setDate} />
                    </div>
                    {/* KPI Cards */}
                    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                        <KpiCard title="Total Revenue" value="$45,231.89" change="+20.1%" />
                        <KpiCard title="New Orders" value="1,250" change="+15.5%" />
                        <KpiCard title="Average Order Value" value="$125.50" change="-1.2%" />
                    </div>

                    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                        {/* Sales Trend Chart */}
                        <div className="xl:col-span-2">
                             <SalesTrendChart 
                                data={salesData} 
                                title="Sales Trend" 
                                description="Showing sales performance for the selected period."
                             />
                        </div>

                        {/* Recent Orders Table */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Orders</CardTitle>
                                <CardDescription>An overview of your most recent sales.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Customer</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Amount</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {recentOrders.slice(0, 5).map((order) => (
                                            <TableRow key={order.id}>
                                                <TableCell>
                                                    <div className="font-medium">{order.customer}</div>
                                                    <div className="hidden text-sm text-muted-foreground md:inline">
                                                        {order.date}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={getStatusVariant(order.status) as any}>{order.status}</Badge>
                                                </TableCell>
                                                <TableCell className="text-right">{order.total}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Dashboard;