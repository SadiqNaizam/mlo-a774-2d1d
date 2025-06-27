import React, { useState, useMemo } from 'react';
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import Footer from '@/components/layout/Footer';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, MoreHorizontal, Search } from 'lucide-react';

// Define the Order type and create mock data
type OrderStatus = 'Fulfilled' | 'Pending' | 'Cancelled';

type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  status: OrderStatus;
  total: number;
};

const mockOrders: Order[] = [
  { id: 'ORD001', customerName: 'Liam Johnson', customerEmail: 'liam@example.com', date: '2023-07-15', status: 'Fulfilled', total: 250.00 },
  { id: 'ORD002', customerName: 'Olivia Smith', customerEmail: 'olivia@example.com', date: '2023-07-16', status: 'Fulfilled', total: 150.75 },
  { id: 'ORD003', customerName: 'Noah Williams', customerEmail: 'noah@example.com', date: '2023-07-17', status: 'Pending', total: 350.00 },
  { id: 'ORD004', customerName: 'Emma Brown', customerEmail: 'emma@example.com', date: '2023-07-18', status: 'Fulfilled', total: 450.50 },
  { id: 'ORD005', customerName: 'Ava Jones', customerEmail: 'ava@example.com', date: '2023-07-19', status: 'Cancelled', total: 75.00 },
  { id: 'ORD006', customerName: 'James Garcia', customerEmail: 'james@example.com', date: '2023-07-20', status: 'Fulfilled', total: 200.00 },
  { id: 'ORD007', customerName: 'Sophia Miller', customerEmail: 'sophia@example.com', date: '2023-07-21', status: 'Pending', total: 120.25 },
  { id: 'ORD008', customerName: 'Isabella Davis', customerEmail: 'isabella@example.com', date: '2023-07-22', status: 'Fulfilled', total: 80.00 },
  { id: 'ORD009', customerName: 'Mia Rodriguez', customerEmail: 'mia@example.com', date: '2023-07-23', status: 'Cancelled', total: 300.00 },
  { id: 'ORD010', customerName: 'Elijah Martinez', customerEmail: 'elijah@example.com', date: '2023-07-24', status: 'Fulfilled', total: 500.00 },
  { id: 'ORD011', customerName: 'Charlotte Hernandez', customerEmail: 'charlotte@example.com', date: '2023-07-25', status: 'Pending', total: 95.50 },
  { id: 'ORD012', customerName: 'William Lopez', customerEmail: 'william@example.com', date: '2023-07-26', status: 'Fulfilled', total: 180.00 },
];

const ITEMS_PER_PAGE = 8;

const OrdersList = () => {
  console.log('OrdersList page loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'All'>('All');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredOrders = useMemo(() => {
    return mockOrders
      .filter(order => statusFilter === 'All' || order.status === statusFilter)
      .filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getStatusBadgeVariant = (status: OrderStatus) => {
    switch (status) {
      case 'Fulfilled':
        return 'default'; // primary color (blue)
      case 'Pending':
        return 'secondary'; // gray color
      case 'Cancelled':
        return 'destructive'; // red color
      default:
        return 'outline';
    }
  };


  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <LeftSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Orders</CardTitle>
              <CardDescription>
                A list of all recent orders from your store.
              </CardDescription>
              <div className="flex items-center gap-2 pt-4">
                <div className="relative w-full md:w-1/3">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="search" 
                    placeholder="Search orders by ID or name..." 
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1); // Reset to first page on new search
                    }}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                      Status: {statusFilter} <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked={statusFilter === 'All'} onCheckedChange={() => { setStatusFilter('All'); setCurrentPage(1); }}>
                      All
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked={statusFilter === 'Pending'} onCheckedChange={() => { setStatusFilter('Pending'); setCurrentPage(1); }}>
                      Pending
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked={statusFilter === 'Fulfilled'} onCheckedChange={() => { setStatusFilter('Fulfilled'); setCurrentPage(1); }}>
                      Fulfilled
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked={statusFilter === 'Cancelled'} onCheckedChange={() => { setStatusFilter('Cancelled'); setCurrentPage(1); }}>
                      Cancelled
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead><span className="sr-only">Actions</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedOrders.length > 0 ? (
                    paginatedOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>View Order Details</DropdownMenuItem>
                              <DropdownMenuItem>View Customer</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No orders found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
               <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }} />
                  </PaginationItem>
                  {[...Array(totalPages).keys()].map(num => (
                    <PaginationItem key={num}>
                      <PaginationLink href="#" isActive={currentPage === num + 1} onClick={(e) => { e.preventDefault(); handlePageChange(num + 1); }}>
                        {num + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  {totalPages > 5 && <PaginationEllipsis />}
                  <PaginationItem>
                    <PaginationNext href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardFooter>
          </Card>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default OrdersList;