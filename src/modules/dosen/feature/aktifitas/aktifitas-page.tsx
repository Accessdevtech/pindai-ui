"use client"
import Breadcrumb from "@/components/atom/bradcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PengabdianList from "./components/pengabdian-list"
import PublicationList from "./components/publication-list"
import ResearchList from "./components/research-list"

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
