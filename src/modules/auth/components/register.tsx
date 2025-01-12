"use client"
import Modal from "@/components/atom/modal"
import { useState } from "react"
import RegisterForm from "./register-form"

export function Register() {
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)

  return (
    <Modal
      name='daftar'
      variant='link'
      title='daftar dosen'
      description='daftar dosen baru di sini'
      btnStyle='capitalize p-0 ml-2'
      open={open}
      setOpen={setOpen}
    >
      <RegisterForm onClose={handleClose} />
    </Modal>
  )
}
