export const StatusText: Record<number, string> = {
  0: "禁用",
  1: "启用"
}

export function formatStatus(status?: number) {
  if (status === undefined || status === null) return "-"
  return StatusText[status] ?? `未知(${status})`
}

export type TableColumn = {
  key: string
  title: string
  width?: number
}

export const columns: TableColumn[] = [
  { key: "name", title: "名称" },
  { key: "status", title: "状态", width: 120 }
]
