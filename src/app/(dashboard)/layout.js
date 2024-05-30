import NavBar from "@/components/NavBar";

export default function Layout({ children }) {
	return (
		<div className="min-h-screen bg-white dark:bg-gray-900">
			<NavBar/>
			<main>{children}</main>
		</div>
	)
}
