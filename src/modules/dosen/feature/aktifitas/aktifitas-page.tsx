"use client"
import Breadcrumb from "@/components/atom/bradcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PengabdianList from "./components/pengabdian-list"
import PublicationList from "./components/publication-list"
import ResearchList from "./components/research-list"

const researchProjects = [
  {
    id: "1",
    title: "AI in Education",
    date: "15 January 2023",
  },
  {
    id: "2",
    title: "Sustainable Energy Solutions",
    date: "1 June 2022",
  },
  {
    id: "3",
    title: "Smart City Development",
    date: "10 March 2023",
  },
  {
    id: "4",
    title: "Healthcare Analytics",
    date: "5 April 2023",
  },
]

export default function AktifitasPage() {
  return (
    <div className='flex flex-col gap-4'>
      <Breadcrumb href={"/dashboard/dosen"}>Aktifitas Akademik</Breadcrumb>
      <Tabs defaultValue='research' className='w-full'>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value='research'>Penelitian</TabsTrigger>
          <TabsTrigger value='community-service'>Pengabdian</TabsTrigger>
          <TabsTrigger value='publications'>Publikasi</TabsTrigger>
        </TabsList>
        <TabsContent value='research'>
          <ResearchList />
        </TabsContent>
        <TabsContent value='community-service'>
          <PengabdianList />
        </TabsContent>
        <TabsContent value='publications'>
          <PublicationList />
        </TabsContent>
      </Tabs>
    </div>
  )
}
