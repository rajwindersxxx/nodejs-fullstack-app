interface types {
  url: string;
  data: FormData | object | null;
  contentType?: string | null;
}
export async function postRequest({ url, data }: types) {
  const isFormData = data instanceof FormData;

  const res = await fetch(url, {
    method: "POST",
    body: isFormData ? data : JSON.stringify(data ?? {}),
    credentials: "include",
    headers: isFormData
      ? undefined
      : {
          "Content-Type": "application/json",
        },
  });

  const output = await res.json();
  if (!res.ok) throw new Error(output.message);
  return output;
}
export async function patchRequest({ url, data }: types) {
  const isFormData = data instanceof FormData;

  const res = await fetch(url, {
    method: "PATCH",
    body: isFormData ? data : JSON.stringify(data ?? {}),
    credentials: "include",
    headers: isFormData
      ? undefined
      : {
          "Content-Type": "application/json",
        },
  });
  const output = await res.json();
  if (!res.ok) throw new Error(output.message);
  return output;
}
export async function deleteRequest({ url, data }: types) {
  const res = await fetch(url, {
    method: "DELETE",
    body: JSON.stringify(data ?? {}),
    credentials: "include",
  });
  const output = await res.json();
  if (!res.ok) throw new Error(output.message);
  return output;
}
