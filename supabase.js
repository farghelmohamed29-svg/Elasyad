(() => {
  const SUPABASE_URL = "https://nakcvafzzvikfsjvwhpz.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_CxPLNlSByHUFgUDXqwdKaw_0OSOQp8I";

  function showStatus(message) {
    let box = document.getElementById("connectionStatus");

    if (!box) {
      box = document.createElement("p");
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
    showStatus("جاري التحقق من الاتصال...");

    if (!window.supabase?.createClient) {
      showStatus("خطأ: مكتبة Supabase لم يتم تحميلها.");
      console.error("Supabase JS library is unavailable.");
      return;
    }

    if (
      !SUPABASE_URL.startsWith("https://") ||
      SUPABASE_ANON_KEY === "sb_publishable_CxPLNlSByHUFgUDXqwdKaw_0OSOQp8I" ||
      !SUPABASE_ANON_KEY.trim()
    ) {
      showStatus("خطأ: راجع رابط المشروع والمفتاح العام.");
      return;
    }

    try {
      const client = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
      );

      const { error } = await client
        .from("subjects")
        .select("*")
        .limit(1);

      if (error) {
        console.error("Supabase diagnostic:", {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        });

        showStatus(
          "فشل الاختبار: " +
          error.message +
          (error.code ? " — " + error.code : "")
        );
        return;
      }

      window.supabaseClient = client;
      showStatus("نجح الاتصال والقراءة من جدول subjects ✅");
    } catch (error) {
      console.error("Unexpected Supabase error:", error);
      showStatus("حدث خطأ أثناء الاختبار. راجع وحدة التحكم.");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", testConnection);
  } else {
    testConnection();
  }
})();
