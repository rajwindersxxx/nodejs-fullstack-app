interface types {
  url: string;
  data: object | null;
  contentType?: string;
}
export async function postRequest({
  url,
  data,
  contentType = "application/json",
}: types) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-Type": contentType,
    },
    body: JSON.stringify(data ?? {}),
    credentials: "include",
  });
  const output = await res.json();
  if (!res.ok) throw new Error(output.message);
  return output;
}
export async function patchRequest({
  url,
  data,
  contentType = "application/json",
}: types) {
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "content-Type": contentType,
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
  const output = await res.json();
  if (!res.ok) throw new Error(output.message);
  return output;
}
