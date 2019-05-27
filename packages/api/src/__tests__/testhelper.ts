export function toJSON(data: any): string {
  return JSON.stringify(data, Object.keys(data).sort());
}
