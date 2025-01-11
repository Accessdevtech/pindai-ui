import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Role } from "@/interface/type";
import { cn } from "@/lib/utils";
import { ROUTE } from "@/services/route";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function InfoPengabdianCard({
  role,
}: {
  role: Role | undefined;
}) {
  return (
    <div className="flex flex-col grow gap-4">
      <Card className="flex flex-col grow p-6 text-muted-foreground">
        <Link
          href={`${ROUTE.DASHBOARD}/${role}/penelitian}`}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "border-primary text-primary hover:bg-primary hover:text-primary-foreground",
          )}
        >
          <ArrowRightIcon className="h-4 w-4" />
          <span className="capitalize">lihat ajuan penelitian</span>
        </Link>
      </Card>
      <Card className="flex flex-col grow p-6 text-muted-foreground">
        <h5 className="font-semibold capitalize">informasi kaprodi</h5>
        <p>Berisikan informasi tentang data diri anda.</p>
        <Separator className="bg-neutral-400 my-4" />
        <div className="flex items-center justify-between">
          <span className="font-semibold capitalize">Penelitian</span>
          <span>
            <ArrowRightIcon className="h-4 w-4" />
          </span>
        </div>

        <Separator className="bg-neutral-400 my-4" />
        <div className="flex items-center justify-between">
          <span className="font-semibold capitalize">Penelitian</span>
          <span>
            <ArrowRightIcon className="h-4 w-4" />
          </span>
        </div>
      </Card>
    </div>
  );
}
