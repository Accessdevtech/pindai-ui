import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EllipsisVerticalIcon } from "lucide-react";
import { Fakultas } from "../dashboard.interface";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface CardFakultasProps {
  data: Fakultas;
  index: number;
}

export default function CardFakultas({ data, index }: CardFakultasProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between text-sm">
        <Badge
          variant="outline"
          className="bg-primary/30 text-primary font-bold rounded-lg flex items-center justify-center h-9 w-9"
        >
          {index + 1}
        </Badge>
        <Popover>
          <PopoverTrigger>
            <EllipsisVerticalIcon className="text-muted-foreground h-5 w-5" />
          </PopoverTrigger>
          <PopoverContent className="p-0 overflow-hidden w-36" align="end">
            <Link
              href="dppm/fakultas"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "w-full items-start justify-start capitalize",
              )}
            >
              fakultas
            </Link>
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent className="flex flex-col items-start gap-4 text-muted-foreground">
        <h1 className="text-lg leading-none capitalize">{data.name}</h1>
        <p className="flex items-start gap-2 capitalize">
          <span className="text-2xl">{data.dosen_count}</span> dosen
        </p>
      </CardContent>
    </Card>
  );
}
