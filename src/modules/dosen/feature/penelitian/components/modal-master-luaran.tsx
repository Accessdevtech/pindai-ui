import SelectField from "@/components/atom/select-field"
import { FieldPath, FieldValues, UseControllerProps } from "react-hook-form"
import { useGetListLuaran } from "../hook/use-luaran/get-luaran"

export default function ModalMasterLuaran<TFormValue extends FieldValues>({
  ...props
}: {
  control: UseControllerProps<TFormValue>["control"]
  name: FieldPath<TFormValue>
}) {
  const { data: listLuaran } = useGetListLuaran()

  return (
    <div className='flex grow items-end gap-2'>
      <SelectField
        label='jenis luaran'
        {...props}
        options={listLuaran?.data || []}
      />
    </div>
  )
}
