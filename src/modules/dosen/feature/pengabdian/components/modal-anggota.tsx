"use client"
import Modal from "@/components/atom/modal"
import DataTable from "@/components/molecules/data-table"
import { Button } from "@/components/ui/button"
import { Meta } from "@/interface/type"
import { Dosen } from "@/modules/dosen/dosen.interface"
import { dosenSearch } from "@/state/store"
import { useAtom, useSetAtom } from "jotai"
import { useState } from "react"
import { useDebounce } from "use-debounce"
import { useGetAnggota } from "../hook/use-pengabdian/get-anggota"
import {
  anggotaAtom,
  isDialogOpenAtom,
  selectedAnggotaAtom,
} from "../state/store"
import { columnTambahAnggota } from "./column-tambah-anggota"

export default function ModalAnggota() {
  const [value, setValue] = useAtom(dosenSearch)
  const [search] = useDebounce(value, 500)
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [openModal, setOpenModal] = useAtom(isDialogOpenAtom)

  const setAnggota = useSetAtom(anggotaAtom)
  const { data, refetch, isFetching } = useGetAnggota(
    currentPage,
    perPage,
    search,
  )

  const [selectedAnggota, setSelectedAnggota] = useAtom(selectedAnggotaAtom)
  const handleAddAnggota = () => {
    const newAnggota = data?.dosen.filter((anggota: Dosen) =>
      selectedAnggota.includes(anggota.nidn),
    )
    setAnggota(prevAnggota => [...prevAnggota, ...newAnggota!])
    setSelectedAnggota([])
    setOpenModal(false)
  }

  const handleCheckboxChange = (nidn: string) => {
    setSelectedAnggota(prev =>
      prev.includes(nidn)
        ? prev.filter(item => item !== nidn)
        : [...prev, nidn],
    )
  }

  const handleOnClose = () => {
    setOpenModal(false)
    setSelectedAnggota([])
  }

  const columnTambah = columnTambahAnggota({
    handleCheckboxChange,
  })
  return (
    <Modal
      title='Daftar anggota pengabdian'
      name='tambah anggota'
      open={openModal}
      setOpen={setOpenModal}
      description='Menampilkan daftar anggota yang terlibat dalam pengabdian'
      tooltipContent='Klik untuk melihat detail anggota pengabdian'
      className='max-w-3xl'
    >
      <div className='flex-1 overflow-auto'>
        <DataTable
          search
          columns={columnTambah}
          data={data?.dosen || []}
          meta={data?.meta || ({} as Meta)}
          currentPage={currentPage}
          perPage={perPage}
          value={value}
          isLoading={isFetching}
          setPerPage={setPerPage}
          refetch={refetch}
          setValue={setValue}
          onPaginationChange={(page: number) => setCurrentPage(page)}
        />
      </div>
      <div className='flex justify-end gap-2'>
        <Button type='button' onClick={handleAddAnggota} className='capitalize'>
          simpan
        </Button>
        <Button
          variant='outline'
          type='button'
          onClick={handleOnClose}
          className='border-primary capitalize text-primary hover:bg-primary hover:text-primary-foreground'
        >
          close
        </Button>
      </div>
    </Modal>
  )
}
