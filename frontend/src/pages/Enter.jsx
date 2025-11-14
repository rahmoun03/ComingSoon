import Mouse from '@/assets/images/mouse.svg';
import { useTranslation } from "react-i18next";


export default function Enter() {
    const { t } = useTranslation();

    return (
        <section 
            className="relative h-svh md:h-screen w-full flex justify-center items-center text-center"
        >
            <span
                className="font-[Montserrat] font-bold text-[48px] md:text-[64px] lg:text-8xl mix-blend-difference"
                style={{ 
                    WebkitFontSmoothing: 'antialiased',
                }}
            >
                {t('enter_page.title1')} <br /> {t('enter_page.title2')}
            </span>
            <div className="absolute bottom-8 left-1/2 translate-x-[-50%] font-[JetBrains]  flex flex-col items-center gap-5">
                {/* mouse shape */}
                <img src={Mouse} alt='' className="w-8 h-8" />

                {/* arrow down for scroll */}
                <div className="flex flex-col items-center gap-1 animate-bounce">
                    {/* <span className="text-white/70 text-sm font-medium">Scroll down</span> */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
            </div >
        </section>
    )
}