import { firaCode } from "../ui/fonts";

function Route({ path, description, children }: {
	path: string,
	description?: string,
	children?: React.ReactNode
}) {
	return (
		<section className="mx-auto shadow-sm rounded-2xl w-full max-w-5xl bg-gray-50">
			<div className="rounded-t-2xl border-b border-b-gray-300 bg-gray-50 p-6">
				<h2 className="text-xl font-bold">/api{path}</h2>
				{description && <p className="mt-3 text-gray-700">{description}</p>}
			</div>
			<div className="rounded-b-2xl bg-white p-6 flex flex-col gap-4">{children}</div>
		</section>
	)
}

function Method({ method, description }: {
	method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
	description?: string,
}) {
	let methodTag = <></>
	switch (method) {
		case 'GET':
			methodTag = <span className="rounded-full bg-blue-100 py-2 px-4 text-blue-800 font-bold">{method}</span>
			break;
		case "POST":
			methodTag = <span className="rounded-full bg-green-100 py-2 px-4 text-green-800 font-bold">{method}</span>
			break;
		case "PUT":
			methodTag = <span className="rounded-full bg-orange-100 py-2 px-4 text-orange-800 font-bold">{method}</span>
			break;
		case "PATCH":
			methodTag = <span className="rounded-full bg-cyan-100 py-2 px-4 text-cyan-800 font-bold">{method}</span>
			break;
		case "DELETE":
			methodTag = <span className="rounded-full bg-red-100 py-2 px-4 text-red-800 font-bold">{method}</span>
			break;
		default:
			break;
	}
	return (
		<p className="flex gap-4 items-center">
			{methodTag}
			{description && <span className="font-medium">{description}</span>}
		</p>
	)
}

function SearchParams({ searchParams }: { searchParams?: string[] }) {
	return (
		<div>
			<p className="mb-2 font-medium">SearchParams</p>
			<pre className="overflow-x-auto rounded-lg bg-gray-50 py-2 px-4">
				{searchParams
					? searchParams.map((params, index) => <p key={index}>{params}</p>)
					: 'No searchParams'}</pre>
		</div>
	)
}

function RequestBody({ requestBody }: { requestBody?: string }) {
	return (
		<div>
			<p className="mb-2 font-medium">Request body</p>
			{requestBody
				? <pre className="overflow-x-auto bg-gray-900 p-4 rounded-lg text-gray-100">{requestBody}</pre>
				: <p className="rounded-lg bg-gray-50 py-2 px-4 text-gray-700">No request body</p>}
		</div>
	)
}

// function RequestExample() {
// 	return <></>
// }

function ResponseExample({ responseExample }: { responseExample: string }) {
	return (
		<div>
			<p className="mb-2 font-medium">Response example</p>
			<pre className="overflow-x-auto bg-gray-900 p-4 rounded-lg text-gray-100">{responseExample}</pre>
		</div>
	)
}

function Line() {
	return <hr className="my-3 border-t-gray-300" />
}

export default function APIdocument() {
	return (
		<main className={`bg-gray-100 py-12 px-6 flex flex-col gap-6 ${firaCode.variable} [&_code]:font-fira-code [&_pre]:font-fira-code`}>
			<div className="mx-auto w-full max-w-5xl">
				<h1 className="mb-6 text-3xl font-bold">API 文件</h1>
				<div className="shadow-sm rounded-2xl bg-white p-6">
					<p>Request header</p>
					<code>{'{"'}Content-Type: application/json; charset=utf-8{'"}'}</code>
				</div>
			</div>

			<Route path={"/task"} description="任務管理">
				<Method method={"GET"} description="取得所有任務資料" />
				<SearchParams searchParams={[
					'showCompleted: "completed" | "uncompleted" | "all"',
					'sortBy: "created_at" | "updated_at"',
					'sortOrder: "ASC" | "DESC"',
					'page: number']} />
				<ResponseExample responseExample={`{
  status: 200, body: [
    {
      "id": 1,
      "name": "Task 1",
      "description": "Description for task 1",
      "is_completed": false,
      "created_at": "2025-05-11T15:04:20.686Z",
      "updated_at": "2025-05-11T15:04:20.686Z"
    },
  ]
},

{ status: 500, error: "系統發生錯誤，請稍後再試" }`} />
				<Line />

				<Method method={"POST"} description="特定任務管理" />
				<RequestBody requestBody={`{
  "name": '任務名稱',
  "description": '任務描述',
}`} />
				<ResponseExample responseExample={`{
  status: 200, body: {}
},

{ status: 400, error: "請輸入任務名稱" }

{ status: 400, error: "任務名稱長度不得超過 10 個字" }

{ status: 400, error: "任務描述長度不得超過 100 個字" }

{ status: 500, error: "系統發生錯誤，請稍後再試" }`} />
			</Route>

			<Route path="/task/[id]" />
		</main>
	)
}