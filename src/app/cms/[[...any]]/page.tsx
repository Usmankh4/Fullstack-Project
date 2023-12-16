import dynamic from 'next/dynamic'

const CMS = dynamic(async () => await import('../CMS'), {
 ssr: false,
})
export default function Home() {
    return <CMS/>;
}
