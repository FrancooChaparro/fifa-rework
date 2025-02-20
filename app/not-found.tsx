
import Link from 'next/link'

export default async function NotFound() {
    return (
        <div className='flex w-full justify-center items-center h-[100vh] bg-bgPrimary'>
            <div className='flex flex-col gap-5 justify-center w-full items-center'>
                <p className="text-[38px] font-geistBold text-white tracking-[0.10px]">
                    La página que buscaba no existe
                </p>
                <div className="xl:flex gap-10 text-sm hidden">
                    <Link prefetch={false} href="/" className='relative group py-1 pointer-events-auto whitespace-nowrap cursor-pointer font-gotham-bold uppercase tracking-[0.4px] leading-[11.05px] text-[11px] text-white'>
                        VOLVER A LA PAGINA PRINCIPAL
                        <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-hoverCard transition-all duration-200 group-hover:w-full"></span>
                    </Link>
                </div>
            </div>
        </div>

    )
}