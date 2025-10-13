export type FieldType = "text" | "number" | "date"

export type FieldConfig = {
  id: string
  key: string
  type: FieldType
  value: string
}

export type Payload = {
  fields: Omit<FieldConfig, "id">[]
}
