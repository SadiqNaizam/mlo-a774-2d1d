import * as React from "react"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Define the shape of a single data point
interface SalesDataPoint {
  time: string;
  sales: number;
}

// Define the props for the component
interface SalesTrendChartProps {
  data?: SalesDataPoint[];
  title?: string;
  description?: string;
}

// Default mock data if no data is provided
const defaultChartData: SalesDataPoint[] = [
  { time: "Jan", sales: 1860 },
  { time: "Feb", sales: 3050 },
  { time: "Mar", sales: 2370 },
  { time: "Apr", sales: 730 },
  { time: "May", sales: 2090 },
  { time: "Jun", sales: 2140 },
  { time: "Jul", sales: 2500 },
  { time: "Aug", sales: 3100 },
  { time: "Sep", sales: 2800 },
  { time: "Oct", sales: 1900 },
  { time: "Nov", sales: 2400 },
  { time: "Dec", sales: 3500 },
];

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

const SalesTrendChart: React.FC<SalesTrendChartProps> = ({
  data = defaultChartData,
  title = "Sales Trend",
  description = "A visual representation of sales over the selected period.",
}) => {
  console.log("SalesTrendChart loaded");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              accessibilityLayer
              data={data}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `$${Number(value) / 1000}k`}
              />
              <Tooltip
                cursor={true}
                content={
                  <ChartTooltipContent
                    labelFormatter={(label) => `Time: ${label}`}
                    formatter={(value) => `$${Number(value).toLocaleString()}`}
                    indicator="dot"
                  />
                }
              />
              <Line
                dataKey="sales"
                type="monotone"
                stroke="var(--color-sales)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default SalesTrendChart;