import { redirect } from "next/navigation";

export default function Home() {
	redirect("/auth/login");
	return (
		<div className="">
			<h1>La primera ruta de todas es un login, cómo hago?</h1>
			<h4>Me dicen que reserve siempre esto para un landing</h4>
		</div>
	);
}
