const SUPABASE_URL = "https://nakcvafzzvikfsjvwhpz.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_CxPLNlSByHUFgUDXqwdKaw_0OSOQp8I";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

window.addEventListener("load", async () => {
  const status = document.getElementById("connectionStatus");

  if (!status) {
    console.error("عنصر connectionStatus غير موجود في index.html");
    return;
  }

  status.textContent = "جاري اختبار الاتصال بقاعدة البيانات...";

  try {
    const { data, error } = await supabaseClient
      .from("subjects")
      .select("*")
      .limit(1);

    if (error) {
      console.error(
        "Supabase connection test:",
        error.message,
        error.code,
        error.details
      );

      status.textContent =
        "فشل اختبار قاعدة البيانات: " +
        error.message +
        (error.code ? " (الكود: " + error.code + ")" : "");

      return;
    }

    console.log("Supabase connection test succeeded", data);

    status.textContent = "تم الاتصال بقاعدة البيانات بنجاح ✅";
  } catch (error) {
    console.error("Supabase unexpected error:", error);

    status.textContent =
      "حدث خطأ أثناء الاختبار. راجع إعدادات الاتصال.";
  }
});
