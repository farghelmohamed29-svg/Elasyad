(function () {
  "use strict";

  let currentRole = "student";

  const $ = (id) => document.getElementById(id);

  function message(text) {
    const toast = $("toast");
    if (!toast) {
      alert(text);
      return;
    }
    toast.textContent = text;
    toast.classList.remove("hidden");
    setTimeout(() => toast.classList.add("hidden"), 3000);
  }

  function showAuth(role) {
    currentRole = role;

    $("welcome")?.classList.add("hidden");
    $("auth")?.classList.remove("hidden");
    $("dashboard")?.classList.add("hidden");

    $("studentFields")?.classList.toggle("hidden", role !== "student");
    $("parentFields")?.classList.toggle("hidden", role !== "parent");

    if ($("authTitle")) {
      $("authTitle").textContent =
        role === "student" ? "دخول الطالب" : "دخول ولي الأمر";
    }

    if ($("authError")) $("authError").textContent = "";
  }

  function goHome() {
    $("auth")?.classList.add("hidden");
    $("dashboard")?.classList.add("hidden");
    $("welcome")?.classList.remove("hidden");
    document.querySelector(".pricing")?.classList.remove("hidden");
    window.scrollTo(0, 0);
  }

  function addReportButton() {
    const parentDash = $("parentDash");
    if (!parentDash) {
      message("لوحة ولي الأمر غير موجودة في الصفحة.");
      return;
    }

    let button = $("parentProgressButton");

    if (!button) {
      button = document.createElement("button");
      button.id = "parentProgressButton";
      button.type = "button";
      button.textContent = "عرض تقرير الطالب";
      button.className = "primary full";
      button.style.cssText =
        "display:block!important;width:100%;padding:14px;margin:16px 0;cursor:pointer;";

      button.addEventListener("click", showParentProgress);
      parentDash.prepend(button);
    }
  }

  function showParentProgress() {
    const parentDash = $("parentDash");

    if (!parentDash || parentDash.classList.contains("hidden")) {
      message("سجّل الدخول بحساب ولي الأمر أولاً.");
      return;
    }

    let report = $("parentReport");

    if (!report) {
      report = document.createElement("section");
      report.id = "parentReport";
      parentDash.appendChild(report);
    }

    report.style.cssText =
      "display:block!important;visibility:visible!important;opacity:1!important;position:relative;width:100%;box-sizing:border-box;margin:20px 0;padding:20px;background:#fff;color:#222;border-radius:12px;";

    report.innerHTML = `
      <h2>📊 تقرير الطالب</h2>
      <hr>
      <h3>📅 الحضور والغياب</h3>
      <p>الحضور: 4 حصص</p>
      <p>الغياب: حصة واحدة</p>
      <hr>
      <h3>📝 درجات الامتحانات</h3>
      <p>الامتحان الأول: 16 من 20</p>
      <p>الامتحان الثاني: 18 من 20</p>
      <hr>
      <h3>📈 التقدم الدراسي</h3>
      <p>الدروس المكتملة: 8 من 10</p>
      <progress value="80" max="100" style="width:100%"></progress>
      <p>نسبة الإنجاز: 80%</p>
      <p style="color:#a16207">
        تنبيه: البيانات دي تجريبية للعرض فقط، مش سجلات حقيقية.
      </p>
    `;

    report.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function demoLogin() {
    const phone = $("phone");
    const password = $("password");
    const error = $("authError");

    if (!phone?.value.trim() || !password?.value.trim()) {
      if (error) error.textContent = "اكتب رقم الموبايل وكلمة المرور.";
      else message("اكتب رقم الموبايل وكلمة المرور.");
      return;
    }

    if (currentRole === "parent") {
      if ($("studentCode")?.value.trim() !== "SAYAD-1024") {
        if (error) error.textContent = "كود الطالب التجريبي هو SAYAD-1024.";
        else message("كود الطالب التجريبي هو SAYAD-1024.");
        return;
      }

      if ($("linkedStudent")) {
        $("linkedStudent").textContent = "SAYAD-1024";
      }
    } else if ($("grade") && $("studentGrade")) {
      $("studentGrade").textContent = $("grade").value;
    }

    $("auth")?.classList.add("hidden");
    $("welcome")?.classList.add("hidden");
    document.querySelector(".pricing")?.classList.add("hidden");
    $("dashboard")?.classList.remove("hidden");

    $("studentDash")?.classList.toggle("hidden", currentRole !== "student");
    $("parentDash")?.classList.toggle("hidden", currentRole !== "parent");

    if ($("roleLabel")) {
      $("roleLabel").textContent =
        currentRole === "student" ? "حساب الطالب" : "حساب ولي الأمر";
    }

    if ($("dashTitle")) {
      $("dashTitle").textContent =
        currentRole === "student" ? "أهلاً بيك في حسابك" : "متابعة الطالب";
    }

    if (currentRole === "parent") addReportButton();

    window.scrollTo(0, 0);
  }

  function logout() {
    ["phone", "password", "studentCode"].forEach((id) => {
      if ($(id)) $(id).value = "";
    });
    goHome();
  }

  window.showAuth = showAuth;
  window.goHome = goHome;
  window.demoLogin = demoLogin;
  window.logout = logout;
  window.showMessage = message;
  window.showParentProgress = showParentProgress;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addReportButton);
  } else {
    addReportButton();
  }
})();
