export default function Form() {
	return (
		<section className="w-full h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
			<h1 className="text-3xl font-bold text-gray-800 mb-4">Get Started Today</h1>
			<p className="text-lg text-gray-600 mb-6">Fill out the form below to begin your journey with PerpeX Business School!</p>
			<div className="w-full max-w-4xl h-[80vh] bg-white shadow-2xl rounded-2xl overflow-hidden">
				<iframe
					src="https://tally.so/embed/mYbXMB?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
					width="100%"
					height="100%"
					frameBorder="0"
					marginHeight={0}
					marginWidth={0}
					title="PerpeX Business School Contact Form"
					className="w-full h-full"
				></iframe>
			</div>
		</section>
	);
}
