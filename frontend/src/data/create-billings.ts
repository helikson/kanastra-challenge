export async function createBilling(data: File) {
   const formData = new FormData();
   formData.set("csv_file", data, data.name);

   await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/${import.meta.env.VITE_API_UPLOAD}`,
      {
         method: "POST",
         body: formData,
      },
   );
}