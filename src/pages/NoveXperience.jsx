import Dots from '@/assets/images/dots.svg'

export default function NoveXperience() {

  return (
	<section className="relative top-0 left-0 h-screen w-full flex flex-col bg-black/100">
		<h1 className="text-6xl font-bold text-white p-4 md:p-8 font-[Audiowide]">NoveXperience</h1>
		<img src={Dots} alt="" className="absolute top-0 right-24 w-72 h-72" />
		<img src={Dots} alt="" className="absolute bottom-0 left-24 w-72 h-72" />

		<div className="relative flex w-full h-full pl-60 flex-row justify-start items-end overflow-hidden">
			<img src={Astro} alt="" className="w-2/5 " />

			{/* flish */}
			<div className="relative flex flex-col justify-center gap-40 h-full w-full">
				<div className="absolute top-1/3 left-25 h-1/4 w-full z-10 bg-light-200 bg-gradient-to-l from-black/100 to-black/0"></div>
				<div className="-translate-30 flex flex-row gap-2 items-center">
					<img src={flishUp} alt="" className=" w-64" />
					<p className="text-white font-bold text-2xl -translate-y-4">
						We’re hiring 70 Expert Profiles in the next 2 months for full-time CDI positions on international projects.
					</p>
				</div>
				<div className="-translate-x-5 -translate-y-20 flex flex-row gap-2 items-center">
					<img src={flishDown} alt="" className="w-32" />
					<p className="text-white font-light text-[23px] w-1/2 translate-y-6">
					If this is your territory, upload your CV now and join a team where your code doesn’t just run it scales globally.
					</p>
				</div>
			</div>
		</div>
	</section>
  );
}
