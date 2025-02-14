"use client";
import { DataTable } from "webtic-ui";

export default function Clientes() {
	const data = [
		{ id: 1, name: "John Doe", request: "Request 1", status: "Pending" },
		{ id: 2, name: "Jane Smith", request: "Request 2", status: "Approved" },
		{ id: 3, name: "Sam Johnson", request: "Request 3", status: "Rejected" },
	];

	const columns = [
		{ Header: "ID", accessor: "id", key: "id", title: "ID" },
		{ Header: "Name", accessor: "name", key: "name", title: "Name" },
		{ Header: "Request", accessor: "request", key: "request", title: "Request" },
		{ Header: "Status", accessor: "status", key: "status", title: "Status" },
	];
	return (
		<div>
			<h1 className="text-2xl font-bold">Clientes</h1>
			<p>Listado de clientes</p>
			<DataTable data={data} columns={columns} tableId={""} />
		</div>
	);
}
