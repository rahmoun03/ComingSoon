import { motion } from "framer-motion"
import Dots from "@/assets/images/dots.svg"
import { useTranslation } from "react-i18next"

export default function HiveXperience() {

	const { t } = useTranslation();
	
	return (
		<section className="relative h-svh md:h-screen w-full flex flex-col md:flex-row bg-black/50 overflow-hidden">
			{/* Left Side */}
			<motion.div
				className="relative flex w-full md:w-1/2 h-1/2 md:h-full overflow-hidden"
				initial={{ x: "-100%", opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				exit={{ x: "-100%", opacity: 0 }}
				transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
			>
				{/* Animated floating dots */}
				<motion.img
					src={Dots}
					alt=""
					className="absolute top-0 right-0 w-40 h-40 md:w-72 md:h-72"
					animate={{ y: [0, -20, 0] }}
					transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
				/>
				<motion.img
					src={Dots}
					alt=""
					className="absolute bottom-0 right-0 w-40 h-40 md:w-72 md:h-72 rotate-90"
					animate={{ x: [0, 20, 0] }}
					transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
				/>
				<motion.img
					src={Dots}
					alt=""
					className="absolute bottom-0 left-0 w-40 h-40 md:w-72 md:h-72"
					animate={{ y: [0, 15, 0] }}
					transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
				/>
				<motion.img
					src={Dots}
					alt=""
					className="absolute top-0 left-0 w-40 h-40 md:w-72 md:h-72 rotate-90"
					animate={{ x: [0, -15, 0] }}
					transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
				/>
			</motion.div>

			{/* Right Side */}
			<motion.div
				className="relative flex w-full md:w-1/2 h-1/2 md:h-full flex-col justify-center items-center gap-16 md:gap-32 p-6 md:pt-64"
				initial={{ x: "100%", opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				exit={{ x: "100%", opacity: 0 }}
				transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
			>
				{/* Logo animation */}
				<motion.img
					src="/logo/HivelogoWhite.svg"
					alt=""
					className="w-40 md:w-128"
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
				/>

				{/* Staggered text reveal */}
				<motion.div
					className="w-full flex flex-col justify-center items-center md:items-start gap-4 font-[JetBrains] text-center md:text-left"
					initial="hidden"
					animate="show"
					variants={{
						hidden: {},
						show: {
							transition: { staggerChildren: 0.3, delayChildren: 0.8 },
						},
					}}
				>
					{t('hive.quotes', {returnObjects : true}).map((line, i) => (
						<motion.p
							key={i}
							className="text-white font-light text-sm md:text-base lg:text-lg"
							variants={{
								hidden: { y: 20, opacity: 0 },
								show: { y: 0, opacity: 1, transition: { duration: 0.8 } },
							}}
						>
							{line}
						</motion.p>
					))}
				</motion.div>
			</motion.div>
		</section>
	)
}
