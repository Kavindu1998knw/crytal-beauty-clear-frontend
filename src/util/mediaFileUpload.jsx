import { createClient } from "@supabase/supabase-js";

//upload image file to the database
export function mediaUpload(file) {
  const supabase = createClient(
    import.meta.env.VITE_NEXT_PUBLIC_SUPABASE_URL,
    import.meta.env.VITE_NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const promise = new Promise((res, rej) => {
    if (file == null) {
      rej("No File Selected");
    } else {
      const timestamp = new Date().getTime();
      const fileName = timestamp + file.name;
      console.log("Please wait....");
      supabase.storage
        .from("images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        })
        .then(() => {
          const url = supabase.storage.from("images").getPublicUrl(fileName)
            .data.publicUrl;
          res(url);
        })
        .catch((e) => {
          rej("File Upload Fail");
          console.log(e);
        });
    }
  });
  return promise;
}
