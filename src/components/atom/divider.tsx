import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function Divider({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div className="flex flex-row gap-4 items-center justify-center">
      <Separator className={cn(className, "bg-neutral-300")} />
      <p className="bg-primary/30 text-primary rounded-lg text-center text-[10px] py-1.5 px-2 font-semibold uppercase tracking-widest">
        {text}
      </p>
      <Separator className={cn(className, "bg-neutral-300")} />
    </div>
  );
}
