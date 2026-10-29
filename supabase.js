const SUPABASE_URL = "https://nakcvafzzvikfsjvwhpz.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_CxPLNlSByHUFgUDXqwdKaw_0OSOQp8I";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

window.addEventListener("load", async () => {
  const status = document.createElement("div");

  status.style.cssText =
    "position:fixed;bottom:12px;left:12px;right:12px;" +
    "padding:14px;border-radius:10px;background:#102a43;" +
    "color:white;text-align:center;z-index:9999;direction:rtl";

  status.textContent = "جاري اختبار الاتصال بقاعدة البيانات...";
  document.body.appendChild(status);

  try {
    const { error } = await supabaseClient
      .from("subjects")
      .select("*")
      .limit(1);

    if (error) throw error;

    status.textContent = "تم الاتصال بقاعدة البيانات بنجاح ✅";
  } catch (error) {
    console.error("Supabase connection test:", error);
    status.textContent =
      "الاتصال لم يكتمل. محتاجين نراجع إعدادات قاعدة البيانات.";
  }
});
