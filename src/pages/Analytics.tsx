import React, { useState, useEffect } from 'react';
import { DateRange } from 'react-day-picker';
import { subDays } from 'date-fns';

// Custom Layout Components
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import Footer from '@/components/layout/Footer';

// Custom Data Components
import DateRangePicker from '@/components/DateRangePicker';
import SalesTrendChart from '@/components/SalesTrendChart';
import TopProductsList from '@/components/TopProductsList';

// Shadcn UI Components
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// Recharts for additional charts
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

// Mock data for new charts
const trafficData = [
  { name: 'Direct', value: 400 },
  { name: 'Google', value: 300 },
  { name: 'Social Media', value: 300 },
  { name: 'Referral', value: 200 },
];

const customerData = [
    { month: 'Jan', newCustomers: 65 },
    { month: 'Feb', newCustomers: 59 },
    { month: 'Mar', newCustomers: 80 },
    { month: 'Apr', newCustomers: 81 },
    { month: 'May', newCustomers: 56 },
    { month: 'Jun', newCustomers: 55 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Analytics = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 29),
    to: new Date(),
  });

  useEffect(() => {
    console.log('Analytics page loaded');
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <LeftSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 flex flex-col">
          <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex flex-col">
                  <h1 className="text-2xl font-bold">Analytics</h1>
                  <p className="text-muted-foreground">Deep dive into your store's performance.</p>
              </div>
              <DateRangePicker date={date} onDateChange={setDate} />
          </div>

          <div className="grid auto-rows-fr gap-4 w-full md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            <div className="xl:col-span-2">
                <SalesTrendChart />
            </div>
            <div>
                <TopProductsList />
            </div>

            {/* Traffic Sources Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>How customers are finding your store.</CardDescription>
              </CardHeader>
              <CardContent className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={trafficData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {trafficData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value} visits`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Customer Cohorts / New Customers Chart */}
            <Card>
              <CardHeader>
                <CardTitle>New Customer Acquisition</CardTitle>
                <CardDescription>New customers acquired per month.</CardDescription>
              </CardHeader>
              <CardContent className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={customerData}>
                    <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{ fill: 'rgba(206, 206, 206, 0.2)' }} />
                    <Legend />
                    <Bar dataKey="newCustomers" fill="#1e40af" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Analytics;