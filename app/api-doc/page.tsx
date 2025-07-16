import { firaCode } from "@/app/ui/fonts";

function PathMethodList() {
	return (
		<div className="shadow-sm rounded-2xl h-max bg-white p-6 flex flex-col gap-3 lg:sticky lg:top-6">
			<p className="font-medium">目錄</p>
			<div className="border border-gray-200">
				<a className="bg-gray-100 p-3 flex items-center gap-3" href="#api-task">
					<pre className="font-bold">/api/task</pre>
					<p>任務管理</p>
				</a>
				<div className="p-3 flex flex-col gap-3">
					<Method method={"GET"} description="取得所有任務資料" />
					<Method method={"POST"} description="新增任務" />
				</div>
			</div>
			<div className="border border-gray-200">
				<a className="bg-gray-100 p-3 flex items-center gap-3" href="#api-task-[id]">
					<pre className="font-bold">/api/task/[id]</pre>
					<p>特定任務管理</p>
				</a>
				<div className="p-3 flex flex-col gap-3">
					<Method method="GET" description="取得單一任務資料" />
					<Method method="PUT" description="更新任務名稱和描述" />
					<Method method="PATCH" description="更新任務完成與否" />
					<Method method="DELETE" description="刪除任務" />
				</div>
			</div>
		</div>
	)
}

function Path({ path, description, children }: {
	path: string,
	description?: string,
	children?: React.ReactNode
}) {
	return (
		<section id={`api${path.replaceAll('/', '-')}`}
			className="mx-auto shadow-sm rounded-2xl w-full max-w-5xl bg-gray-50">
			<div className="rounded-t-2xl border-b border-b-gray-200 bg-gray-50 p-6 flex items-center gap-6">
				<h2 className="text-xl font-bold"><pre>/api{path}</pre></h2>
				{description && <p>{description}</p>}
			</div>
			<div className="rounded-b-2xl bg-white p-6 flex flex-col gap-4">{children}</div>
		</section>
	)
}

function Method({ method, description }: {
	method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD',
	description?: string,
}) {
	let methodTag = <></>
	switch (method) {
		case 'GET':
			methodTag = <span className="rounded-full bg-sky-100 py-2 px-4 text-sky-800 font-bold">{method}</span>
			break;
		case "POST":
			methodTag = <span className="rounded-full bg-green-100 py-2 px-4 text-green-800 font-bold">{method}</span>
			break;
		case "PUT":
			methodTag = <span className="rounded-full bg-orange-100 py-2 px-4 text-orange-800 font-bold">{method}</span>
			break;
		case "PATCH":
			methodTag = <span className="rounded-full bg-teal-100 py-2 px-4 text-teal-800 font-bold">{method}</span>
			break;
		case "DELETE":
			methodTag = <span className="rounded-full bg-red-100 py-2 px-4 text-red-800 font-bold">{method}</span>
			break;
		case "OPTIONS":
			methodTag = <span className="rounded-full bg-indigo-100 py-2 px-4 text-indigo-800 font-bold">{method}</span>
			break;
		case "HEAD":
			methodTag = <span className="rounded-full bg-purple-100 py-2 px-4 text-purple-800 font-bold">{method}</span>
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

function TextBlock({ children }: { children?: React.ReactNode }) {
	return (
		<pre className="rounded-lg bg-gray-50 py-2 px-4">{children}</pre>
	)
}

type Parameter = { name: string, type: string, rule: string };

function ParametersTable({ parameters }: {
	parameters: Parameter[]
}) {
	return (
		<div className="w-full overflow-x-auto">
			<table className="text-left [&_th]:border [&_th]:border-gray-200 [&_th]:bg-gray-100 [&_th]:py-2 [&_th]:px-4 [&_th]:font-medium [&_td]:border [&_td]:border-gray-200 [&_td]:py-2 [&_td]:px-4">
				<thead>
					<tr>
						<th>參數名稱</th><th>類型</th><th>限制</th>
					</tr>
				</thead>
				<tbody>
					{parameters.map((param, index) =>
					(
						<tr key={index}>
							<td>{param.name}</td><td>{param.type}</td><td>{param.rule}</td>
						</tr>
					)
					)}
				</tbody>
			</table>
		</div>
	)
}

function CodeBlock({ children }: { children?: React.ReactNode }) {
	return (
		<pre className="overflow-x-auto bg-gray-900 p-4 rounded-lg text-gray-100">{children}</pre>
	)
}

function SearchParams({ searchParams }: { searchParams: Parameter[] }) {
	return (
		<div>
			<p className="mb-2 font-medium">SearchParams</p>
			<ParametersTable parameters={searchParams} />
		</div>
	)
}

function Params({ params }: { params: string[] }) {
	return (
		<div>
			<p className="mb-2 font-medium">Params</p>
			<TextBlock>{params.map((param, index) => <p key={index}>{param}</p>)}</TextBlock>
		</div>
	)
}

function RequestBody({ requestBody }: { requestBody: Parameter[] }) {
	return (
		<div>
			<p className="mb-2 font-medium">Request body</p>
			<ParametersTable parameters={requestBody} />
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
			<CodeBlock>{responseExample}</CodeBlock>
		</div>
	)
}

function Line() {
	return <hr className="my-3 border-t-gray-200" />
}

function Paths() {
	return (
		<div className="grow flex flex-col gap-6">
			<Path path={"/task"} description="任務管理">
				<Method method={"GET"} description="取得所有任務資料" />
				<SearchParams searchParams={[
					{
						name: 'showCompleted',
						type: 'string',
						rule: '"completed" | "uncompleted" | "all"'
					},
					{
						name: 'sortBy',
						type: 'string',
						rule: '"created_at" | "updated_at"'
					},
					{
						name: 'sortOrder',
						type: 'string',
						rule: '"asc" | "desc"'
					},
					{
						name: 'page',
						type: 'number',
						rule: ''
					},
				]} />
				<TextBlock>預設查詢條件：顯示所有任務、根據創建時間新到舊排序</TextBlock>
				<ResponseExample responseExample={
					`{
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
}

{ status: 500, error: "系統發生錯誤，請稍後再試" }`} />
				<Line />

				<Method method={"POST"} description="新增任務" />
				<RequestBody requestBody={[
					{
						name: 'name',
						type: 'string',
						rule: '必填，最多 10 個字'
					},
					{
						name: 'description',
						type: 'string',
						rule: '選填，最多 100 個字'
					},
				]} />
				<ResponseExample responseExample={
					`{
  status: 200, body: {
    "id": 4,
    "name": "Task 4",
    "description": null,
    "is_completed": false,
    "created_at": "2025-07-13T14:11:17.985Z",
    "updated_at": "2025-07-13T14:11:17.985Z"
  }
}

{ status: 400, error: "請輸入任務名稱" }

{ status: 400, error: "任務名稱長度不得超過 10 個字" }

{ status: 400, error: "任務描述長度不得超過 100 個字" }

{ status: 500, error: "系統發生錯誤，請稍後再試" }`} />
			</Path>

			<Path path="/task/[id]" description="特定任務管理">
				<Method method="GET" description="取得單一任務資料" />
				<Params params={['id: number']} />
				<ResponseExample responseExample={
					`{
  status: 200, body: {
    "id": 1,
    "name": "Task 1",
    "description": "Description for task 1",
    "is_completed": false,
    "created_at": "2025-05-11T15:04:20.686Z",
    "updated_at": "2025-05-11T15:04:20.686Z"
  }
}

{ status: 500, error: "系統發生錯誤，請稍後再試" }`} />
				<Line />

				<Method method="PUT" description="更新任務名稱和描述" />
				<Params params={['id: number']} />
				<RequestBody requestBody={[
					{
						name: 'name',
						type: 'string',
						rule: '必填，最多 10 個字'
					},
					{
						name: 'description',
						type: 'string',
						rule: '選填，最多 100 個字'
					},
				]} />
				<ResponseExample responseExample={
					`{
  status: 200, body: {
    id: 4,
    name: 'Task 4',
    description: 'Description for task 4',
    is_completed: false,
    created_at: 2025-07-14T15:25:19.282Z,
    updated_at: 2025-07-14T15:26:01.017Z
  }
}

{ status: 400, error: "請輸入任務名稱" }

{ status: 400, error: "任務名稱長度不得超過 10 個字" }

{ status: 400, error: "任務描述長度不得超過 100 個字" }

{ status: 404, error: "任務不存在" }

{ status: 500, error: "系統發生錯誤，請稍後再試" }`} />
				<Line />

				<Method method="PATCH" description="更新任務完成與否" />
				<Params params={['id: number']} />
				<ResponseExample responseExample={
					`{
  status: 200, body: {
    id: 4,
    name: 'Task 4',
    description: 'Description for task 4',
    is_completed: true,
    created_at: 2025-07-14T15:25:19.282Z,
    updated_at: 2025-07-14T15:26:01.017Z
  }
}

{ status: 404, error: "任務不存在" }

{ status: 500, error: "系統發生錯誤，請稍後再試" }`} />
				<Line />

				<Method method="DELETE" description="刪除任務" />
				<Params params={['id: number']} />
				<ResponseExample responseExample={
					`{ status: 204, body: null }

{ status: 404, error: "任務不存在" }

{ status: 500, error: "系統發生錯誤，請稍後再試" }`} />
			</Path>
		</div>
	)
}

export default function APIdocument() {
	return (
		<main className={`bg-gray-100 py-12 px-6 flex flex-col gap-6 ${firaCode.variable} [&_code]:font-fira-code [&_pre]:font-fira-code`}>
			<div className="mx-auto w-full max-w-5xl">
				<h1 className="mb-6 text-3xl font-bold">API 文件</h1>
				<div className="shadow-sm rounded-2xl bg-white p-6">
					<p>Request header</p>
					<code>{'{ "'}Content-Type: application/json; charset=utf-8{'" }'}</code>
				</div>
			</div>

			<section className="relative mx-auto w-full max-w-5xl flex flex-col gap-6 lg:flex-row">
				<PathMethodList />
				<Paths />
			</section>
		</main>
	)
}