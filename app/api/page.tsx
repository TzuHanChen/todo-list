import { firaCode } from "../ui/fonts";

function Route({ path, method, requestQuery, requestBody, response }: {
	path: string,
	method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
	requestQuery?: string,
	requestBody?: JSON,
	response: { status: number, body?: JSON | JSON[], error?: string }[],
}) {
	return (
		<section className="mx-auto rounded-xl p-6 w-full max-w-5xl bg-gray-50 flex flex-col gap-6">
			<h2 className="text-xl">/api{path} {method}</h2>
			<code>header: {'{"'}Content-Type: application/json; charset=utf-8{'"}'}</code>
			<p>searchParams: {requestQuery}</p>
			<p>requestBody: {JSON.stringify(requestBody)}</p>
			<p>response:</p>
			{response.map((res, index) => <code key={index}>{JSON.stringify(res)}</code>)}
		</section>
	)
}

export default function APIdocument() {
	return (
		<main className={`bg-gray-100 py-12 px-6 ${firaCode.variable} [&>code]:font-fira`}>
			<h1 className="mx-auto mb-6 max-w-5xl text-3xl font-bold">API 文件</h1>

			<Route path={"/task"} method={"GET"}
				requestQuery={'showCompleted, sortBy, sortOrder, page'}
				response={[
					{
						status: 200, body: [
							{
								"id": 1,
								"name": "Task 1",
								"description": "Description for task 1",
								"is_completed": false,
								"created_at": "2025-05-11T15:04:20.686Z",
								"updated_at": "2025-05-11T15:04:20.686Z"
							},
							{
								"id": 2,
								"name": "Task 2",
								"description": "Description for task 2",
								"is_completed": true,
								"created_at": "2025-05-11T15:04:20.686Z",
								"updated_at": "2025-05-11T15:04:20.686Z"
							},
							{
								"id": 3,
								"name": "Task 3",
								"description": "Description for task 3",
								"is_completed": false,
								"created_at": "2025-05-11T15:04:20.686Z",
								"updated_at": "2025-05-11T15:04:20.686Z"
							}
						]
					},
					{ status: 500, error: "系統發生錯誤，請稍後再試" }
				]} />
		</main>
	)
}