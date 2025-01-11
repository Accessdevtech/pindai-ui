import { IFakultas } from "@/modules/listdata/fakultas.interface";
import { useState } from "react";

export function useDialog(fakultas?: IFakultas[]) {
  const [addOpen, setAddOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<string | null>(null);
  const [alertOpen, setAlertOpen] = useState<string | null>(null);

  const addOpenDialog = () => setAddOpen(true);
  const addCloseDialog = () => setAddOpen(false);
  const addToggleDialog = () => setAddOpen((prev) => !prev);

  const editOpenDialog = () =>
    editOpen ? fakultas?.find((f) => f.id === editOpen) : null;
  const editCloseDialog = () => setEditOpen(null);
  const editToggleDialog = () =>
    editOpen ? fakultas?.find((f) => f.id === editOpen) : setEditOpen(null);

  const openAlert = () =>
    alertOpen ? fakultas?.find((f) => f.id === alertOpen) : null;
  const closeAlert = () => setAlertOpen(null);
  const toggleAlert = () =>
    alertOpen ? fakultas?.find((f) => f.id === alertOpen) : setAlertOpen(null);

  return {
    isOpen: {
      add: addOpen,
      edit: editOpen,
      alert: alertOpen,
    },
    openDialog: {
      add: addOpenDialog,
      edit: editOpenDialog,
      alert: openAlert,
    },
    closeDialog: {
      add: addCloseDialog,
      edit: editCloseDialog,
      alert: closeAlert,
    },
    toggleDialog: {
      add: addToggleDialog,
      edit: editToggleDialog,
      alert: toggleAlert,
    },
  };
}
