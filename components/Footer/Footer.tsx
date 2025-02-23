"use client"
import { SiGithub, SiGmail, SiLinkedin } from " @/Icons/Icons"
import { usePathname } from "next/navigation"
import styles from "./ContacMe.module.css"

export default function ContactMeComponent() {
    const pathname = usePathname();
    return (
        <div className={`${styles.ContactMeComponent_container_all} ${pathname ===  "/" ? "bg-bgPrimary border-top border-bgGames border-[3px]" : "bg-bgGames border-top border-bgPrimary border-[1px]"} shadow-top`}>
            <h1 className="text-center text-[38px] font-geistBold text-white tracking-[0.10px]">Franco Chaparro</h1>
            <div className={styles.ContactMeComponent_seccion} >
                <div className="w-[65px] h-[65px]  flex justify-center items-center">
                <a href="mailto:francoo_chaparro@hotmail.com" rel="noopener noreferrer" target="_blank">
                    <SiGmail />
                </a>
                </div>
                <div className="w-[65px] h-[65px] pl-[10px]  flex justify-center items-center">
                <a href="https://github.com/FrancooChaparro" rel="noopener noreferrer" target="_blank">
                    <SiGithub />
                </a>
                </div>
                <div className="w-[65px] h-[65px]  flex justify-center items-center">
                <a href="https://www.linkedin.com/in/franco-chaparro-134743252/" rel="noopener noreferrer" target="_blank">
                    <SiLinkedin />
                </a>
                </div>
            </div>
        </div>
    )
}
