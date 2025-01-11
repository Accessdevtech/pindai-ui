"use client";
import { useState } from "react";
import Modal from "@/components/molecules/modal";
import RegisterForm from "./register-form";

export function Register() {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <Modal
      name="daftar"
      variant="link"
      title="daftar dosen"
      description="daftar dosen baru di sini"
      btnStyle="capitalize p-0 ml-2"
      open={open}
      setOpen={setOpen}
    >
      <RegisterForm onClose={handleClose} />
    </Modal>
  );
}
