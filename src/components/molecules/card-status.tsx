import StatusBadge from "@/components/atom/status-badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function CardStatus({ data }: { data: any }) {
  return (
    <Card className="grow">
      <CardHeader className="flex flex-row items-center justify-between text-xs uppercase tracking-wide">
        <StatusBadge status={data.status} message={data.message} />
      </CardHeader>
      <CardContent className="flex flex-col items-start gap-4 text-muted-foreground">
        <p className="flex items-start gap-2 capitalize">
          <span className="text-2xl">{data.totalDosen}</span> dosen
        </p>
      </CardContent>
    </Card>
  );
}
