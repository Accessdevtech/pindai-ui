import { Response } from "@/interface/type"

export interface ScholarData {
  id: string
  name: string
  photo: string
  profile_url: string
  affiliation: string
  citations: string
}

export interface ScholarPublications {
  title: string
  link: string
  author: string
  journal: string
  citation: string
  year: string
}

export interface ScholarProfile extends Omit<ScholarData, "id" | "citations"> {
  h_index: string
  i10_index: string
  total_citations: string
  publications: ScholarPublications[]
}

export interface ScholarProfileResponse extends Response {
  data: ScholarProfile
}

export interface ScholarResponse<T> extends Response {
  data: T[]
}
