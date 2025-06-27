import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface KpiCardProps {
  /**
   * The main title of the KPI card.
   */
  title: string;
  /**
   * The primary value to be displayed, as a string to accommodate formatting (e.g., currency).
   */
  value: string;
  /**
   * The change metric, including the sign (e.g., '+5.2%', '-1.2%').
   */
  change: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, change }) => {
  console.log(`KpiCard loaded for: ${title}`);

  const isPositive = change.startsWith('+');
  const isNegative = change.startsWith('-');

  // Determine text color based on the change value
  const changeTextColorClass = isPositive
    ? "text-emerald-600"
    : isNegative
    ? "text-destructive" // Uses the theme's destructive color (typically red)
    : "text-muted-foreground";

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium tracking-wide">
          {title}
        </CardTitle>
        {/* An icon could be added here in the future if needed */}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${changeTextColorClass}`}>
          {change} from previous period
        </p>
      </CardContent>
    </Card>
  );
};

export default KpiCard;