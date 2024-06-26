import NavBar from "@/components/NavBar";
import {ActivitiesProvider} from "@/utils/providers";

export default function Layout({ children }) {
	return (
		<ActivitiesProvider>
			<div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
				<NavBar/>
				<main className="grow flex flex-col container mx-auto mt-12 mb-6">
					{children}
				</main>
			</div>
		</ActivitiesProvider>
	)
}
