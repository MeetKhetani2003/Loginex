// lib/api.js
export const submitInquiry = async (data) => {
  const res = await fetch("/api/inquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: data.type,
      name: data.name || "Anonymous",
      contactEmail: data.email,
      mobile: data.mobile || "",
      description: data.subject
        ? `${data.subject}: ${data.message || data.description}`
        : data.description || data.message,
    }),
  });

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || "Submission failed");
  }
  return result;
};
