import { EachUtil } from "@/utils/each-utils";
import CardFakultas from "./components/card-fakultas";
import { Breadcrumb, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Fakultas } from "./dashboard.interface";
import InfoPenelitian from "./components/info-penelitian";
import InfoPengabdian from "./components/info-pengabdian";
import { useFakultas } from "./hooks/use-fakultas";
import { toast } from "sonner";

export default function DashboardDppm() {
  const { data, isLoading, isError, error } = useFakultas();

  if (!data) return null;

  if (isLoading) return toast.loading("Loading...");
  if (isError) return toast.error(error?.message);

  return (
    <div className="space-y-4">
      <section className="flex flex-col gap-3">
        <Breadcrumb>
          <BreadcrumbPage className="text-muted-foreground">
            Dashboard
          </BreadcrumbPage>
        </Breadcrumb>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <EachUtil
            of={data?.fakultas || []}
            render={(fakultas: Fakultas, index) => (
              <CardFakultas data={fakultas} index={index} key={index} />
            )}
          />
        </div>
      </section>
      <section className="flex flex-col gap-3">
        <Breadcrumb>
          <BreadcrumbPage className="text-muted-foreground">
            Penelitian / Pengabdian
          </BreadcrumbPage>
        </Breadcrumb>
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <InfoPenelitian />
          <InfoPengabdian />
        </div>
      </section>
    </div>
  );
}
