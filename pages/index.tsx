import Heading from '@/components/Heading';
import { useGlobal } from '@/functionality/GlobalFunctionality';
import Head from 'next/head'

export default function Home() {
  const { loaderComplete } = useGlobal();

  return (
    <>
      <div className="h-full w-full">
        <main>
          <Heading loaderComplete={loaderComplete} />
        </main>
      </div>
    </>
  )
}
