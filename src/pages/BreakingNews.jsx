import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Dots from '@/assets/images/dots.svg'
import Astro from '@/assets/images/astro.png'
import flishUp from '@/assets/images/flishUp.svg'
import flishDown from '@/assets/images/flishDown.svg'


function UploadCVForm({ onClose }) {

	const handleSubmit = async(e) => {
		e.preventDefault()

		// send data to backend
		try {
			const formData = new FormData(e.target)
			console.log(" formData ", formData)
			const response = await fetch('/api/upload-cv', {
				method: 'POST',
				body: formData
			})
			const data = await response.json()
			onClose();
			console.log(data)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 animate-fadeIn">
		<div className="bg-white/10 backdrop-blur-md border border-[#E2E8F0]/30 rounded-xl p-8 w-[28rem] relative shadow-2xl">
			
			{/* Close button */}
			<button
				className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors text-2xl"
				onClick={onClose}
				aria-label="Close form"
			>
				✕
			</button>

			<h2 className="text-2xl font-bold mb-6 text-white text-start">
				Let us know you
			</h2>

			<form onSubmit={handleSubmit} className="flex flex-col gap-6">
				{/* First Name */}
				<div className="flex flex-col gap-2">
					<label htmlFor="firstName" className="text-white/80 text-sm font-medium">
						First Name
					</label>
					<input
						type="text"
						id="firstName"
						className="bg-transparent border-b border-[#E2E8F0]/30 focus:border-white focus:outline-none px-2 py-1 text-white placeholder-gray-400 transition-all"
						placeholder="Enter your first name"
					/>
				</div>

				{/* Last Name */}
				<div className="flex flex-col gap-2">
					<label htmlFor="lastName" className="text-white/80 text-sm font-medium">
						Last Name
					</label>
					<input
						type="text"
						id="lastName"
						className="bg-transparent border-b border-[#E2E8F0]/30 focus:border-white focus:outline-none px-2 py-1 text-white placeholder-gray-400 transition-all"
						placeholder="Enter your last name"
					/>
				</div>

				{/* Phone */}
				<div className="flex flex-col gap-2">
					<label htmlFor="phone" className="text-white/80 text-sm font-medium">
						Phone
					</label>
					<input
						type="tel"
						id="phone"
						className="bg-transparent border-b border-[#E2E8F0]/30 focus:border-white focus:outline-none px-2 py-1 text-white placeholder-gray-400 transition-all"
						placeholder="Enter your phone number"
					/>
				</div>

				{/* Email */}
				<div className="flex flex-col gap-2">
					<label htmlFor="email" className="text-white/80 text-sm font-medium">
						Email
					</label>
					<input
						type="email"
						id="email"
						className="bg-transparent border-b border-[#E2E8F0]/30 focus:border-white focus:outline-none px-2 py-1 text-white placeholder-gray-400 transition-all"
						placeholder="Enter your email"
					/>
				</div>

				{/* CV Upload */}
				<div className="flex flex-col gap-2">
					<label htmlFor="cv" className="text-white/80 text-sm font-medium">
						Upload CV
					</label>
					<input
						type="file"
						id="cv"
						accept=".pdf,.doc,.docx"
						className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-white file:text-black hover:file:bg-gray-200 cursor-pointer text-white"
					/>
				</div>

				{/* Submit */}
				<button
					type="submit"
					className="mt-4 bg-white text-black font-semibold rounded-md py-2 hover:bg-[#E2E8F0]/70 hover:text-white transition-colors"
				>
					Submit
				</button>
			</form>
		</div>
		</div>
	);
}
  

export default function BreakingNews() {
  const cards = [
    { title: "Cloud & Devops Engineers", description: "(Azure / AWS / GCP, CI/CD pipelines, container orchestration)" },
    { title: "Backend Developers", description: "(Java / Spring Boot, Microservices, API-first architecture)" },
    { title: "QA & Automation Engineers", description: "(API testing, CI integration, performance benchmarking)" },
    { title: "Frontend Engineers", description: "(React, Next.js, R3F, Tailwind, SPA/SSR)" },
  ];

  const [index, setIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);


  const nextSlide = () => setIndex((prev) => (prev + 1) % cards.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + cards.length) % cards.length);

  return (
    <section className="relative top-0 left-0 h-screen w-full flex flex-col bg-black/100">
      <h1 className="text-6xl font-bold text-white p-4 md:p-8 font-[Audiowide]">Breaking News</h1>
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

			{/* Card slider */}
			<div className="absolute top-1/3 left-30 flex flex-row items-center gap-4 h-1/4 w-full overflow-hidden">
				<div
				className="flex flex-row gap-4 transition-transform duration-500 ease-in-out h-full p-2"
				style={{ transform: `translateX(-${index * (18)}rem)` }} // adjust width per card
				>
				{cards.map((card, i) => (
					<div
					key={i}
					className="flex flex-col h-full w-72 gap-6 px-6 py-4 items-start bg-white/10 border-[#E2E8F0]/30 border-1 rounded-md  backdrop-blur-[2px] flex-shrink-0"
					>
					<p className="text-white font-bold">{card.title}</p>
					<p className="text-white font-light">{card.description}</p>
					</div>
				))}
				</div>
          	</div>

			{/* arrows */}
			<div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-full h-1/4 flex flex-row justify-between items-center z-30 p-4">
				<button onClick={prevSlide} className="rounded-full p-2 cursor-pointer">
				<ChevronLeft className="text-white w-8 h-8" />
				</button>
				<button onClick={nextSlide} className="rounded-full p-2 cursor-pointer">
				<ChevronRight className="text-white w-8 h-8" />
				</button>
			</div>

			{/* bottom */}
			<div className="absolute bottom-8 w-full h-24 flex flex-row justify-around items-center">
				<button 
					className="bg-white text-black font-semibold border-[#E2E8F0]/30 border-1 rounded-md px-6 py-4 drop-shadow-md shadow-light-900 cursor-pointer"
					onClick={() => setShowForm(true)}
				>
				Upload CV
				</button>
				<div className="w-1/2 h-2 bg-[#E2E8F0]/30 rounded-md drop-shadow-xl shadow-light-900/80">
				<div
					className="h-full bg-white/80 rounded-md transition-all duration-500"
					style={{ width: `${((index + 1) / cards.length) * 100}%` }}
				></div>
				</div>
          	</div>
        </div>
      </div>
	{showForm && <UploadCVForm onClose={() => setShowForm(false)} />}
    </section>
  );
}
