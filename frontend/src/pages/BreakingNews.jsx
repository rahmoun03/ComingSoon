import { useState } from "react";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";

import Dots from '@/assets/images/dots.svg'
import Astro from '@/assets/images/Astro.png'
import flishUp from '@/assets/images/flishUp.svg'
import flishDown from '@/assets/images/flishDown.svg'
import { useTranslation } from "react-i18next";


function Notification({ type, message, onClose }) {
  return (
    <div
      className={`fixed top-6 right-6 z-[9999] px-6 py-4 rounded-lg shadow-lg backdrop-blur-md border
        ${type === "success"
          ? "bg-green-500/20 border-green-400/50 text-green-200"
          : "bg-red-500/20 border-red-400/50 text-red-200"
        } animate-fadeIn`}
    >
      <div className="flex items-center gap-3">
        <span className="font-medium">{message}</span>
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white transition-colors text-lg leading-none"
        >
          ✕
        </button>
      </div>
    </div>
  );
}


function UploadCVForm({ onClose, onSuccess, onError }) {

	const { t } = useTranslation();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
		const formData = new FormData(e.target);
		const response = await fetch("/api/candidate/upload-cv", {
			method: "POST",
			body: formData,
		});

		const data = await response.json();

		if (data.status_code === 400) {
			throw new Error(data?.detail || t("upload_cv_form.error"));
		} else {
			onSuccess(t("upload_cv_form.success"));
			onClose();
		}
		} catch (error) {
		onError(error.message || t("upload_cv_form.error"));
		}
	};

	return (
		<>
		<div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 animate-fadeIn pointer-events-auto p-2">
			<div className="bg-white/10 backdrop-blur-md border border-[#E2E8F0]/30 rounded-xl p-8 w-[28rem] relative shadow-2xl">
			{/* Close button */}
			<button
				className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors text-2xl pointer-events-auto cursor-pointer"
				onClick={onClose}
				aria-label={t("upload_cv_form.close")}
			>
				✕
			</button>

			<h2 className="text-2xl font-bold mb-6 text-white text-start">
				{t("upload_cv_form.title")}
			</h2>

			<form onSubmit={handleSubmit} className="flex flex-col gap-6">
				{/* First Name */}
				<div className="flex flex-col gap-2">
				<label htmlFor="firstname" className="text-white/80 text-sm font-medium">
					{t("upload_cv_form.firstname_label")}
				</label>
				<input
					type="text"
					id="firstname"
					name="firstname"
					className="bg-transparent border-b border-[#E2E8F0]/30 focus:border-white focus:outline-none px-2 py-1 text-white placeholder-gray-400 transition-all"
					placeholder={t("upload_cv_form.firstname_placeholder")}
					required
				/>
				</div>

				{/* Last Name */}
				<div className="flex flex-col gap-2">
				<label htmlFor="lastname" className="text-white/80 text-sm font-medium">
					{t("upload_cv_form.lastname_label")}
				</label>
				<input
					type="text"
					id="lastname"
					name="lastname"
					className="bg-transparent border-b border-[#E2E8F0]/30 focus:border-white focus:outline-none px-2 py-1 text-white placeholder-gray-400 transition-all"
					placeholder={t("upload_cv_form.lastname_placeholder")}
					required
				/>
				</div>

				{/* Phone */}
				<div className="flex flex-col gap-2">
				<label htmlFor="phone" className="text-white/80 text-sm font-medium">
					{t("upload_cv_form.phone_label")}
				</label>
				<input
					type="tel"
					id="phone"
					name="phone"
					className="bg-transparent border-b border-[#E2E8F0]/30 focus:border-white focus:outline-none px-2 py-1 text-white placeholder-gray-400 transition-all"
					placeholder={t("upload_cv_form.phone_placeholder")}
					required
				/>
				</div>

				{/* Email */}
				<div className="flex flex-col gap-2">
				<label htmlFor="email" className="text-white/80 text-sm font-medium">
					{t("upload_cv_form.email_label")}
				</label>
				<input
					type="email"
					id="email"
					name="email"
					className="bg-transparent border-b border-[#E2E8F0]/30 focus:border-white focus:outline-none px-2 py-1 text-white placeholder-gray-400 transition-all"
					placeholder={t("upload_cv_form.email_placeholder")}
					required
				/>
				</div>

				{/* CV Upload */}
				<div className="flex flex-col gap-2">
				<label htmlFor="cv" className="text-white/80 text-sm font-medium">
					{t("upload_cv_form.cv_label")}
				</label>
				<input
					type="file"
					id="cv"
					name="cv"
					accept=".pdf,.doc,.docx"
					className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-white file:text-black hover:file:bg-gray-200 cursor-pointer text-white"
					required
				/>
				</div>

				{/* Submit */}
				<button
				type="submit"
				className="flex flex-row justify-center gap-4 bg-white text-black font-semibold border-[#E2E8F0]/30 border-1 rounded-md px-6 py-4 cursor-pointer pointer-events-auto"
				style={{
					filter: "drop-shadow(0px 0px 10px #ffffff)",
				}}
				>
				{t('upload_cv_form.submit_button')}
				</button>
			</form>
			</div>
		</div>
		</>
	);
}


export default function BreakingNews() {

	const { t } = useTranslation();
	const cards = t("breaking_news.cards", { returnObjects: true })

	const [index, setIndex] = useState(0);
	const [showForm, setShowForm] = useState(false);
	const [notification, setNotification] = useState(null);



	const nextSlide = () => setIndex((prev) => (prev + 1) % cards.length);
	const prevSlide = () => setIndex((prev) => (prev - 1 + cards.length) % cards.length);

	return (
		<section className="relative top-0 left-0 h-dvh md:h-screen w-full flex flex-col bg-black/50 ">
			{/* Notification outside form */}
		{notification && (
			<Notification
				type={notification.type}
				message={notification.message}
				onClose={() => setNotification(null)}
			/>
		)}
		<div className="md:hidden absolute buttom-0 h-full w-full z-4 bg-gradient-to-t from-black via-black/80 to-black/0"></div>
		
		
		<h1 className="text-2xl md:text-6xl w-full text-center md:text-start font-bold text-white p-4 md:p-8 font-[Audiowide]">{t("breaking_news.title")}</h1>
		<img src={Dots} alt="" className="absolute top-24 right-12 md:right-24 w-48 md:w-72" />
		<img src={Dots} alt="" className="absolute bottom-24 left-12 md:left-24 w-48 md:w-72" />

		<div className="relative flex w-full h-full pl-4 md:pl-60 flex-col md:flex-row justify-center items-center md:justify-start md:items-end overflow-hidden">
			<img src={Astro} alt="" className="h-4/5 md:h-full not-md:absolute md:bottom-0"/>

			{/* flish */}
			<div className="relative flex flex-col md:justify-center justify-between md:gap-40 h-full w-full not-md:pb-40 ">
				<div className="absolute top-0 right-0 h-full w-1/2 z-10  bg-gradient-to-l from-black/100 to-black/0 "></div>
				<div className="md:-translate-30 flex md:flex-row flex-col flex-col-reverse gap-2 md:items-center items-start pl-4 z-20">
						<img src={flishUp} alt="" className="h-32 not-md:-rotate-90 md:h-64 z-20" />
						<p className="text-white font-bold md:text-2xl text-[16px] md:-translate-y-4 z-20">
							{t("breaking_news.announcement")}
						</p>
				</div>
				<div className="md:-translate-x-5 md:-translate-y-20 flex flex-row gap-2 md:items-center items-start not-md:w-full pl-4 z-20">
						<img src={flishDown} alt="" className="h-32 not-md:hidden" />
						<p className="text-white font-light text-[14px] md:text-[23px] md:translate-y-6 z-20">
							{t('breaking_news.cta')}
						</p>
				</div>

				{/* Card slider */}
				<div className="absolute top-1/3 md:left-30 flex flex-row items-center gap-4 h-1/4 w-full overflow-hidden z-5">
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
				<div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-full h-1/4 flex flex-row justify-between items-center z-30 md:p-4">
					<button onClick={prevSlide} className="rounded-full md:p-2 cursor-pointer pointer-events-auto">
						<ChevronLeft className="text-white w-8 h-8" />
					</button>
					<button onClick={nextSlide} className="rounded-full p-2 cursor-pointer pointer-events-auto">
						<ChevronRight className="text-white w-8 h-8" />
					</button>
				</div>

				{/* bottom */}
				<div className="absolute bottom-8 w-full h-24 flex flex-row justify-around items-center pr-4 ">
					<button 
						className="z-20  not-md:w-full flex flex-row justify-center gap-4 bg-white text-black font-semibold border-[#E2E8F0]/30 border-1 rounded-md px-6 py-4 cursor-pointer pointer-events-auto"
						onClick={() => setShowForm(true)}
						style={{
							filter: 'drop-shadow(0px 0px 10px #ffffff)',
						}}
					>
						{t("breaking_news.upload_button")}
						<Download />
					</button>
					<div 
						className=" not-md:hidden  w-1/2 h-2 bg-[#E2E8F0]/30 rounded-md"
						style={{
							filter: 'drop-shadow(0px 0px 10px #ffffff)',
						}}
					>
						<div
							className="h-full bg-white/80 rounded-md transition-all duration-500"
							style={{ width: `${((index + 1) / cards.length) * 100}%` }}
						></div>
					</div>
				</div>
			</div>
		</div>
		{showForm && (
			<UploadCVForm
				onClose={() => setShowForm(false)}
				onSuccess={(msg) => {
					setNotification({ type: "success", message: msg });
					setTimeout(() => setNotification(null), 4000);
			}}
			onError={(msg) => {
				setNotification({ type: "error", message: msg });
				setTimeout(() => setNotification(null), 4000);
			}}
			/>
		)}
		</section>
	);
}
