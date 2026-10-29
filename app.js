(function () {
  "use strict";

  let currentRole = "student";

  function byId(id) {
    return document.getElementById(id);
  }

  function showMessage(message) {
    const toast = byId("toast");
    if (toast) {
      toast.textContent = message;
      toast.classList.remove("hidden");
      setTimeout(function () {
        toast.classList.add("hidden");
      }, 3500);
    } else {
      alert(message);
    }
  }

  function showAuth(role) {
    currentRole = role;

    if (byId("welcome")) byId("welcome").classList.add("hidden");
    if (byId("auth")) byId("auth").classList.remove("hidden");
    if (byId("dashboard")) byId("dashboard").classList.add("hidden");

    if (byId("studentFields")) {
      byId("studentFields").classList.toggle("hidden", role !== "student");
    }
    if (byId("parentFields")) {
      byId("parentFields").classList.toggle("hidden", role !== "parent");
    }

    if (byId("authTitle")) {
      byId("authTitle").textContent =
        role === "student" ? "دخول الطالب" : "دخول ولي الأمر";
    }
    if (byId("authDesc")) {
      byId("authDesc").textContent =
        role === "student"
          ? "اكتب بيانات الطالب التجريبية."
          : "اكتب بيانات ولي الأمر وكود الطالب.";
    }
    if (byId("authError")) byId("authError").textContent = "";
  }

  function goHome() {
    ["auth", "dashboard"].forEach(function (id) {
      if (byId(id)) byId(id).classList.add("hidden");
    });
    if (byId("welcome")) byId("welcome").classList.remove("hidden");

    const pricing = document.querySelector(".pricing");
    if (pricing) pricing.classList.remove("hidden");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function demoLogin() {
    const phone = byId("phone");
    const password = byId("password");
    const error = byId("authError");

    if (!phone || !password) {
      showMessage("حقول تسجيل الدخول مش موجودة في الصفحة.");
      return;
    }

    if (!phone.value.trim() || !password.value.trim()) {
      if (error) error.textContent = "اكتب رقم الموبايل وكلمة المرور.";
      return;
    }

    if (currentRole === "parent") {
      const code = byId("studentCode");

      if (!code || code.value.trim() !== "SAYAD-1024") {
        if (error) error.textContent = "اكتب كود الطالب التجريبي SAYAD-1024.";
        return;
      }

      if (byId("linkedStudent")) {
        byId("linkedStudent").textContent = code.value.trim();
      }
    } else if (byId("studentGrade") && byId("grade")) {
      byId("studentGrade").textContent = byId("grade").value;
    }

    if (byId("auth")) byId("auth").classList.add("hidden");
    if (byId("welcome")) byId("welcome").classList.add("hidden");

    const pricing = document.querySelector(".pricing");
    if (pricing) pricing.classList.add("hidden");

    if (byId("dashboard")) byId("dashboard").classList.remove("hidden");

    if (byId("studentDash")) {
      byId("studentDash").classList.toggle("hidden", currentRole !== "student");
    }
    if (byId("parentDash")) {
      byId("parentDash").classList.toggle("hidden", currentRole !== "parent");
    }

    if (byId("roleLabel")) {
      byId("roleLabel").textContent =
        currentRole === "student" ? "حساب الطالب" : "حساب ولي الأمر";
    }
    if (byId("dashTitle")) {
      byId("dashTitle").textContent =
        currentRole === "student" ? "أهلاً بيك في حسابك" : "متابعة الطالب";
    }

    if (currentRole === "parent") addReportButton();

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function addReportButton() {
    const parentDash = byId("parentDash");
    if (!parentDash) {
      showMessage("لوحة ولي الأمر مش موجودة في index.html.");
      return;
    }

    let button = byId("parentProgressButton");

    if (!button) {
      button = document.createElement("button");
      button.id = "parentProgressButton";
      button.type = "button";
      button.textContent = "عرض تقرير الطالب";
      button.className = "primary full";
      button.style.cssText =
        "display:block;width:100%;padding:14px;margin:16px 0;cursor:pointer;position:relative;z-index:10;";
      button.addEventListener("click", showParentProgress);
      parentDash.insertBefore(button, parentDash.firstChild);
    }

    button.classList.remove("hidden");
    button.style.display = "block";
  }

  function showParentProgress() {
    const parentDash = byId("parentDash");

    if (!parentDash || parentDash.classList.contains("hidden")) {
      showMessage("ادخل بحساب ولي الأمر أولاً.");
      return;
    }

    let report = byId("parentReport");

    if (!report) {
      report = document.createElement("div");
      report.id = "parentReport";
      report.style.cssText =
        "display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin-top:20px;";
      parentDash.appendChild(report);
    }

    report.innerHTML = `
      <article class="panel">
        <h3>📅 سجل الحضور</h3>
        <p>الحضور: 4 حصص</p>
        <p>الغياب: حصة واحدة</p>
      </article>
      <article class="panel">
        <h3>📝 درجات الامتحانات</h3>
        <p>الامتحان الأول: 16 من 20</p>
        <p>الامتحان الثاني: 18 من 20</p>
      </article>
      <article class="panel">
        <h3>📈 التقدم الدراسي</h3>
        <p>الدروس المكتملة: 8 من 10</p>
        <progress value="80" max="100" style="width:100%"></progress>
        <p>نسبة الإنجاز: 80%</p>
      </article>
      <p style="grid-column:1/-1">
        تنبيه: هذه بيانات تجريبية للعرض فقط، وليست سجلات حقيقية.
      </p>
    `;

    report.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function logout() {
    ["phone", "password", "studentCode"].forEach(function (id) {
      if (byId(id)) byId(id).value = "";
    });
    goHome();
  }

  window.showAuth = showAuth;
  window.goHome = goHome;
  window.demoLogin = demoLogin;
  window.logout = logout;
  window.showMessage = showMessage;
  window.showParentProgress = showParentProgress;

  window.addEventListener("DOMContentLoaded", function () {
    const parentDash = byId("parentDash");
    if (parentDash && !parentDash.classList.contains("hidden")) {
      addReportButton();
    }
  });
})();
