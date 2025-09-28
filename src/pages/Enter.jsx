

export default function Enter() {
    return (
        <section className="relative h-screen w-full">
            <div className="absolute bottom-8 left-1/2 translate-x-[-50%] font-[JetBrains] animate-bounce flex flex-col items-center gap-2">
                <span >You’re entering the builder’s realm</span>
                {/* arrow down for scroll */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </div >
        </section>
    )
}