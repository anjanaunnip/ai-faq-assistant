const API_URL = "/api";

export type FAQ = {
  id: string;
  question: string;
  answer: string;
};

export const fetchFAQs = async (): Promise<FAQ[]> => {
  const res = await fetch(`${API_URL}/faqs`);
  return res.json();
};

export const addFAQ = async (faq: Omit<FAQ, "id">): Promise<FAQ> => {
  const res = await fetch(`${API_URL}/faqs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(faq),
  });
  return res.json();
};

export const updateFAQ = async (
  id: string,
  faq: Omit<FAQ, "id">
): Promise<FAQ> => {
  const res = await fetch(`${API_URL}/faqs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(faq),
  });
  return res.json();
};

export const deleteFAQ = async (id: string): Promise<void> => {
  await fetch(`${API_URL}/faqs/${id}`, {
    method: "DELETE",
  });
};

export const rewriteAnswer = async (
  answer: string
): Promise<{ rewrittenAnswer: string }> => {
  const res = await fetch("http://localhost:5000/ai/rewrite", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answer }),
  });

  return res.json();
};
