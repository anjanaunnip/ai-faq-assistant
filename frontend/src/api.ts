const API_URL = "";

export type FAQ = {
  id: string;
  question: string;
  answer: string;
};

export const fetchFAQs = async (): Promise<FAQ[]> => {
  const res = await fetch(`${API_URL}/api/faqs`);
  return res.json();
};

export const addFAQ = async (faq: Omit<FAQ, "id">): Promise<FAQ> => {
  const res = await fetch(`${API_URL}/api/faqs`, {
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

  const res = await fetch(`${API_URL}/api/faqs/${id}`, {
    method: "PUT",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(faq)
  });

  return res.json();
};


export const deleteFAQ = async(id:string)=>{
  await fetch(`${API_URL}/api/faqs/${id}`,{
    method:"DELETE"
  });
};


export const rewriteAnswer = async (
  answer:string
):Promise<{rewrittenAnswer:string}>=>{

 const res = await fetch(`/api/ai/rewrite`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({answer})
 });

 return res.json();

};
