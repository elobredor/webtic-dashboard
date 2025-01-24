import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="h-screen w-screen">
			<div className="flex flex-col h-full">
				<Header />
				<div className="flex flex-1">
					<Sidebar />
					{/* Main Content */}
					<div className="flex-1 p-4 overflow-y-auto bg-gray-100">{children}</div>
				</div>
			</div>
		</div>
	);
}
