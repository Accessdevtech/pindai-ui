"use client"
import Logo from "@/assets/logo.png"
import Modal from "@/components/atom/modal"
import { useState } from "react"
import RegisterForm from "./register-form"

export function Register() {
  const [open, setOpen] = useState(false)

  return (
    <Modal
      name='daftar'
      variant='link'
      title='daftar dosen'
      description='daftar dosen baru di sini'
      btnStyle='capitalize p-0 ml-2'
      image={Logo}
      open={open}
      setOpen={setOpen}
    >
      <RegisterForm onClose={() => setOpen(false)} />
    </Modal>
  )
}
