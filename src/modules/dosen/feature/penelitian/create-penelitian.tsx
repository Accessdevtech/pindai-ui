"use client";
import { useForm } from "react-hook-form";
import { penelitianSchema, PenelitianType } from "./schema/penelitian-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { anggota } from "./state/store";
import { useAtom, useAtomValue } from "jotai";
import { Card, CardContent } from "@/components/ui/card";
import Form from "@/components/molecules/form";
import InputField from "@/components/molecules/input-field";
import Breadcrumb from "@/components/molecules/bradcrumb";
import { ROUTE } from "@/services/route";
import Divider from "@/components/atom/divider";
import TextAreaField from "@/components/molecules/text-area-field";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SelectField from "@/components/molecules/select-field";
import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";
import Modal from "@/components/molecules/modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/contexts/auth-context";
import { Dosen } from "../../dosen.interface";
import DataTable from "@/components/molecules/data-table";
import { columnTambahAnggota } from "./components/column-tambah-anggota";
import { Meta } from "@/interface/type";
import { useGetAnggota } from "./hook/use-penelitian/get-anggota";
import { dosenSearch } from "@/state/store";
import { useDebounce } from "use-debounce";
import { useState } from "react";
import { columnAnggotaView } from "./components/column-anggota-view";
import { useGetListPenelitian } from "./hook/use-penelitian/get-list-penelitian";
import { useGetListIndeksasi } from "./hook/use-indeksasi/get-list-indeksasi";
import { columnJenisPenelitian } from "./components/column-jenis-penelitian";
import { EachUtil } from "@/utils/each-utils";
import { Badge } from "@/components/ui/badge";
import { columnJenisIndeksasi } from "./components/column-jenis-indeksasi";
import { useCreatePenelitian } from "./hook/use-penelitian/create-penelitian";

export default function CreatePenelitian() {
  const { user } = useAuthContext();
  const [value, setValue] = useAtom(dosenSearch);
  const [search] = useDebounce(value, 500);

  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [anggotaValue, setAnggotaValue] = useAtom(anggota);

  const form = useForm<PenelitianType>({
    resolver: zodResolver(penelitianSchema),
    defaultValues: {
      tahun_akademik: "",
      semester: "",
      judul: "",
      deskripsi: "",
      jenis_penelitian: "",
      jenis_indeksasi: "",
    },
  });

  const { data: listPenelitian } = useGetListPenelitian();
  const { data: listIndeksasi } = useGetListIndeksasi();

  const { data: dataAnggota, refetch } = useGetAnggota(currentPage, search);

  const { mutate } = useCreatePenelitian({
    onSuccess: () => {
      setAnggotaValue([]);
      form.reset();
      refetch();
    },
    onError: () => {
      refetch();
    },
  });

  const onSubmit = async (data: PenelitianType) => {
    const formData = {
      ...data,
      anggota: anggotaValue,
    };
    mutate(formData);
  };

  const columnTambah = columnTambahAnggota();
  const columnsView = columnAnggotaView();
  const columnsJenisPenelitian = columnJenisPenelitian();
  const columnsJenisIndeksasi = columnJenisIndeksasi();

  return (
    <div>
      <Breadcrumb href={`${ROUTE.DASHBOARD}/dosen/penelitian`}>
        Buat Penelitian
      </Breadcrumb>
      <Card className="max-w-full">
        <CardContent className="py-6">
          <Form form={form} onSubmit={onSubmit}>
            <div className="flex flex-col gap-4 w-full">
              <Divider
                text="data penelitian-tahap 1"
                className="w-[34%] lg:w-[43%]"
              />
              <div className="flex flex-col lg:flex-row gap-4 lg:items-center w-full">
                <InputField
                  name="tahun_akademik"
                  label="Tahun Akademik"
                  control={form.control}
                />
                <SelectField
                  name="semester"
                  label="Semester"
                  control={form.control}
                  options={[
                    {
                      id: "ganjil",
                      name: "ganjil",
                    },
                    {
                      id: "genap",
                      name: "genap",
                    },
                  ]}
                />
                <FormItem className="flex-grow">
                  <FormLabel className="uppercase text-xs tracking-wider">
                    kode penelitian
                  </FormLabel>
                  <FormControl>
                    <Input disabled defaultValue={"0000"} />
                  </FormControl>
                </FormItem>
              </div>
              <InputField name="judul" label="judul" control={form.control} />
              <TextAreaField
                name="deskripsi"
                label="deskripsi"
                control={form.control}
              />
              <div className="flex flex-col lg:flex-row gap-4 lg:items-center w-full">
                <div className="flex items-end grow gap-2">
                  <SelectField
                    name="jenis_penelitian"
                    label="jenis penelitian"
                    control={form.control}
                    options={listPenelitian?.data || []}
                  />
                  <Modal
                    title="Detail jenis Penelitian"
                    Icon={InfoIcon}
                    size="icon"
                    description="Berisi informasi tentang jenis penelitian yang akan dilakukan, apakah itu penelitian dasar, terapan atau pengembangan"
                    tooltipContent="Detail jenis Penelitian"
                    className="max-w-5xl"
                  >
                    <div className="rounded-md border flex-1 overflow-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <EachUtil
                              of={columnsJenisPenelitian}
                              render={(column) => (
                                <TableHead key={column.header as string}>
                                  {column.header as string}
                                </TableHead>
                              )}
                            />
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <EachUtil
                            of={listPenelitian?.data || []}
                            render={(item, index) => (
                              <TableRow key={item.id}>
                                <TableCell className="border-r">
                                  {item.name}
                                </TableCell>
                                <TableCell className="flex flex-wrap gap-2 overflow-hidden max-w-xs">
                                  {item.kriteria.map((keterangan, index) => (
                                    <Badge
                                      key={index}
                                      className="capitalize text-ellipsis"
                                    >
                                      {keterangan}
                                    </Badge>
                                  ))}
                                </TableCell>
                                <TableCell className="border-l">
                                  {item.keterangan}
                                </TableCell>
                              </TableRow>
                            )}
                          />
                        </TableBody>
                      </Table>
                    </div>
                  </Modal>
                </div>

                <div className="flex items-end grow gap-2">
                  <SelectField
                    name="jenis_indeksasi"
                    label="jenis indeksasi"
                    control={form.control}
                    options={listIndeksasi?.data || []}
                  />
                  <Modal
                    title="Detail jenis indeksasi"
                    Icon={InfoIcon}
                    size="icon"
                    description="Berisi informasi tentang jenis indeksasi yang akan digunakan, apakah itu Sinta, Scopus, WoS, Dimensions, atau DOAJ"
                    tooltipContent="Detail jenis indeksasi"
                    className="max-w-5xl"
                  >
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <EachUtil
                            of={columnsJenisIndeksasi}
                            render={(column) => (
                              <TableHead key={column.header as string}>
                                {column.header as string}
                              </TableHead>
                            )}
                          />
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <EachUtil
                          of={listIndeksasi?.data || []}
                          render={(item, index) => (
                            <TableRow key={item.id}>
                              <TableCell className="border-r">
                                {item.name}
                              </TableCell>
                              <TableCell className="flex flex-wrap gap-2 overflow-hidden max-w-xs">
                                {item.kriteria.map((keterangan, index) => (
                                  <Badge
                                    key={index}
                                    className="capitalize text-ellipsis"
                                  >
                                    {keterangan}
                                  </Badge>
                                ))}
                              </TableCell>
                              <TableCell className="border-l">
                                {item.keterangan}
                              </TableCell>
                            </TableRow>
                          )}
                        />
                      </TableBody>
                    </Table>
                  </Modal>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 w-full mt-4">
              <Divider
                text="data ketua penelitian-tahap 2.1"
                className="w-[30%] lg:w-[41.5%]"
              />
              <div className="flex flex-col lg:flex-row gap-4 lg:items-center w-full">
                <FormItem className="flex-grow">
                  <Label className="uppercase text-xs tracking-wider">
                    NIDN
                  </Label>
                  <Input
                    defaultValue={user?.nidn === null ? "0000" : user?.nidn}
                    disabled
                  />
                </FormItem>
                <FormItem className="flex-grow">
                  <Label className="uppercase text-xs tracking-wider">
                    NO. HP
                  </Label>
                  <Input
                    defaultValue={(user as Dosen)?.phone_number}
                    disabled
                  />
                </FormItem>
                <FormItem className="flex-grow">
                  <Label className="uppercase text-xs tracking-wider">
                    Prodi
                  </Label>
                  <Input defaultValue={(user as Dosen)?.prodi} disabled />
                </FormItem>
              </div>
              <div className="flex flex-col lg:flex-row gap-4 lg:items-center w-full">
                <FormItem className="flex-grow">
                  <Label className="uppercase text-xs tracking-wider">
                    Nama Lengkap (Tanpa Gelar)
                  </Label>
                  <Input defaultValue={user?.name} disabled />
                </FormItem>
                <FormItem className="flex-grow">
                  <Label className="uppercase text-xs tracking-wider">
                    Nama Lengkap (Menggunakan Gelar)
                  </Label>
                  <Input
                    defaultValue={(user as Dosen)?.name_with_title}
                    disabled
                  />
                </FormItem>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full">
                <FormItem className="flex-grow">
                  <Label className="uppercase text-xs tracking-wider">
                    Email
                  </Label>
                  <Input defaultValue={user?.email} disabled />
                </FormItem>
                <FormItem className="flex-grow">
                  <Label className="uppercase text-xs tracking-wider">
                    Scholar ID
                  </Label>
                  <Input defaultValue={(user as Dosen)?.scholar_id} disabled />
                </FormItem>
                <FormItem className="flex-grow">
                  <Label className="uppercase text-xs tracking-wider">
                    Scopus ID
                  </Label>
                  <Input defaultValue={(user as Dosen)?.scopus_id} disabled />
                </FormItem>
                <FormItem className="flex-grow">
                  <Label className="uppercase text-xs tracking-wider">
                    Jabatan funsional
                  </Label>
                  <Input
                    defaultValue={(user as Dosen)?.job_functional}
                    disabled
                  />
                </FormItem>
              </div>
              <FormItem className="flex-grow">
                <Label className="uppercase text-xs tracking-wider">
                  Affiliasi kampus
                </Label>
                <Input
                  defaultValue={(user as Dosen)?.affiliate_campus}
                  disabled
                />
              </FormItem>
            </div>

            <div className="flex flex-col gap-4 w-full mt-4">
              <Divider
                text="data anggota (tahap pilih anggota) penelitian-tahap 2.2"
                className="w-[17.5%] lg:w-[36%]"
              />
              <div className="flex flex-col lg:flex-row gap-2">
                <Modal
                  title="Daftar anggota penelitian"
                  name="tambah anggota"
                  open={open}
                  setOpen={setOpen}
                  description="Menampilkan daftar anggota yang terlibat dalam penelitian"
                  tooltipContent="Klik untuk melihat detail anggota penelitian"
                  className="max-w-3xl"
                >
                  <div className="flex-1 overflow-auto">
                    <DataTable
                      columns={columnTambah}
                      data={dataAnggota?.dosen || []}
                      meta={dataAnggota?.meta || ({} as Meta)}
                      currentPage={0}
                      value={value}
                      refetch={refetch}
                      setValue={setValue}
                      onPaginationChange={(page: number) =>
                        setCurrentPage(page)
                      }
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => setOpen(false)}
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground capitalize"
                    >
                      close
                    </Button>
                  </div>
                </Modal>
                <Modal
                  title="Daftar anggota penelitian manual"
                  name="tambah anggota manual"
                  description="Tambahkan anggota penelitian secara manual dengan mengisi form yang tersedia"
                  tooltipContent="Detail anggota penelitian"
                  variant="outline"
                  btnStyle="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <div>
                    Isi form berikut untuk menambahkan anggota penelitian
                  </div>
                </Modal>
              </div>

              <DataTable
                columns={columnsView}
                data={anggotaValue}
                meta={{ current_page: 1, last_page: 1 } as Meta}
                currentPage={0}
              />
            </div>

            <Button className="w-full mt-4">simpan</Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
