import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { ExternalLinkIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { EachUtil } from "@/utils/each-utils";

export default function InfoPengabdian() {
  return (
    <div className="flex flex-col grow gap-4">
      <Card className="grow space-y-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Badge
            variant="outline"
            className="bg-cyan-500/30 text-cyan-500 size-fit uppercase tracking-wide font-bold"
          >
            pengabdian
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="flex gap-1.5">
            <p className="capitalize text-muted-foreground">data:</p>
            <Badge
              variant="outline"
              className="bg-green-500/30 text-green-500 uppercase tracking-wide font-semibold"
            >
              10 diterima
            </Badge>
            /
            <Badge
              variant="outline"
              className="bg-red-500/30 text-red-500 uppercase font-semibold tracking-wide"
            >
              5 ditolak
            </Badge>
          </div>
        </CardContent>
      </Card>
      <Card className="grow gap-4 text-muted-foreground">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h5 className="font-semibold capitalize">Pengabdian Terbaru</h5>
        </CardHeader>
        <CardContent>
          <EachUtil
            of={[1, 2, 3, 4, 5, 6, 7, 8]}
            render={(item, index) => (
              <div className="flex justify-between items-center" key={index}>
                <div className="flex gap-3 items-center">
                  <Badge
                    variant="outline"
                    className="bg-cyan-500/30 text-cyan-500 font-bold rounded-lg flex items-center justify-center h-8 w-8"
                  >
                    {index + 1}
                  </Badge>
                  <div className="flex flex-col text-muted-foreground capitalize">
                    <p className="text-xs">Ketua penelitian</p>
                    <p className="font-bold">asdasdasd</p>
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <ExternalLinkIcon />
                </Button>
              </div>
            )}
          />
        </CardContent>
        <CardFooter>
          <Link
            href={`dppm/penelitian`}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "border-primary text-primary hover:bg-accent",
            )}
          >
            Lihat Semua
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
