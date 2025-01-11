import { Separator } from "@/components/ui/separator";

export default function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <>
      <Separator className="bg-neutral-400 my-4" />
      <div className="flex items-center justify-between">
        <span className="font-semibold capitalize">{label}</span>
        <span>{value}</span>
      </div>
    </>
  );
}
