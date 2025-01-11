import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { IDosen } from "@/modules/dppm/feature/dosen/dosen.interface";

export default function DetailDosen({ dosen }: { dosen: IDosen }) {
  return (
    <Table>
      <TableBody className="border">
        <TableRow>
          <TableHead className="border-r">Nama</TableHead>
          <TableCell>{dosen?.name}</TableCell>
        </TableRow>
        <TableRow>
          <TableHead className="border-r">Email</TableHead>
          <TableCell>{dosen?.email}</TableCell>
        </TableRow>
        <TableRow>
          <TableHead className="border-r">NIDN</TableHead>
          <TableCell>{dosen?.nidn}</TableCell>
        </TableRow>
        <TableRow>
          <TableHead className="border-r">Alamat</TableHead>
          <TableCell>{dosen?.address}</TableCell>
        </TableRow>
        <TableRow>
          <TableHead className="border-r">Prodi</TableHead>
          <TableCell>{dosen?.prodi}</TableCell>
        </TableRow>
        <TableRow>
          <TableHead className="border-r">Afiliasi</TableHead>
          <TableCell>{dosen?.affiliate_campus}</TableCell>
        </TableRow>
        <TableRow>
          <TableHead className="border-r">Jabatan Fungsional</TableHead>
          <TableCell>{dosen?.job_functional}</TableCell>
        </TableRow>
        <TableRow>
          <TableHead className="border-r">Shrolar ID </TableHead>
          <TableCell>{dosen?.scholar_id}</TableCell>
        </TableRow>
        <TableRow>
          <TableHead className="border-r">Scopus ID </TableHead>
          <TableCell>{dosen?.scopus_id}</TableCell>
        </TableRow>

        <TableRow>
          <TableHead className="border-r">Status</TableHead>
          <TableCell>{dosen?.is_active ? "Aktif" : "Tidak Aktif"}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
