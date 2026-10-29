(() => {
  const SUPABASE_URL =
    "https://nakcvafzzvikfsjvwhpz.supabase.co";

  const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_CxPLNlSByHUFgUDXqwdKaw_0OSOQp8I";

  function showStatus(message) {
    let box = document.getElementById("connectionStatus");

    if (!box) {
      box = document.createElement("div");
      box.id = "connectionStatus";
      box.style.cssText =
        "position:fixed;bottom:12px;left:12px;right:12px;" +
        "padding:14px;border-radius:10px;background:#102a43;" +
        "color:white;text-align:center;z-index:99999;direction:rtl";
      document.body.appendChild(box);
    }

    box.textContent = message;
  }

  async function testConnection() {
    if (!window.supabase?.createClient) {
      showStatus("خطأ: مكتبة Supabase لم يتم تحميلها.");
      return;
    }

    const client = window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_PUBLISHABLE_KEY
    );

    window.supabaseClient = client;
    showStatus("جاري اختبار الاتصال...");

    try {
      const { error } = await client
        .from("subjects")
        .select("*")
        .limit(1);

      if (error) {
        console.error("Supabase error:", {
          message: error.message,
          code: error.code,
          details: error.details
        });

        showStatus(
          "خطأ قاعدة البيانات: " + error.message
        );
        return;
      }

      showStatus("تم الاتصال بقاعدة البيانات بنجاح ✅");
    } catch (error) {
      console.error("Supabase connection error:", error);
      showStatus("تعذر الاتصال. راجع إعدادات المشروع.");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", testConnection);
  } else {
    testConnection();
  }
})();
