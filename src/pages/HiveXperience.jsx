import Dots from '@/assets/images/dots.svg'

export default function HiveXperience() {

  return (
    <section className="relative h-screen w-full flex flex-row bg-black/80 ">
        <div className="relative flex w-1/2 h-full overflow-hidden  ">
            <img src={Dots} alt="" className="absolute top-0 right-0 w-72 h-72 " />
            <img src={Dots} alt="" className="absolute bottom-0 right-0 w-72 h-72 rotate-90" />
            <img src={Dots} alt="" className="absolute bottom-0 left-0 w-72 h-72" />
            <img src={Dots} alt="" className="absolute top-0 left-0 w-72 h-72 rotate-90" />
        </div>

        <div className="relative flex w-1/2 h-full flex-col justify-start items-center overflow-hidden gap-32 pt-64">
            <img src="/logo/Novelogowhite.svg" alt="" className="w-128" />
            <div className="w-full flex flex-col justify-center items-start">
                <h3 className="font-[JetBrains]">
                    HiveXperience where supernovas become business.
                </h3>
                <p className="text-white font-light w-full translate-y-6 font-[JetBrains]">
                    HiveXperience transforms supernovas into business opportunities.HiveXperience transforms supernovas into business opportunities.HiveXperience transforms supernovas into business opportunities.
                </p>
            </div>
        </div>
    </section>
  );
}
