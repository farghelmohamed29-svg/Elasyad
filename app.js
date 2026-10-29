window.currentRole = "student";

window.showAuth = function(role) {
  window.currentRole = role;

  document.getElementById("welcome").classList.add("hidden");
  document.getElementById("auth").classList.remove("hidden");
  document.getElementById("dashboard").classList.add("hidden");

  document.getElementById("studentFields").classList.toggle(
    "hidden", role !== "student"
  );
  document.getElementById("parentFields").classList.toggle(
    "hidden", role !== "parent"
  );

  document.getElementById("authTitle").textContent =
    role === "student" ? "دخول الطالب" : "دخول ولي الأمر";

  document.getElementById("authDesc").textContent =
    role === "student"
      ? "اكتب بيانات الطالب التجريبية."
      : "اكتب بيانات ولي الأمر وكود الطالب.";

  document.getElementById("authError").textContent = "";
};

window.goHome = function() {
  document.getElementById("auth").classList.add("hidden");
  document.getElementById("dashboard").classList.add("hidden");
  document.getElementById("welcome").classList.remove("hidden");
  document.querySelector(".pricing").classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
};

window.demoLogin = function() {
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("authError");

  if (!phone || !password) {
    error.textContent = "اكتب رقم الموبايل وكلمة المرور.";
    return;
  }

  if (window.currentRole === "parent") {
    const code = document.getElementById("studentCode").value.trim();

    if (code !== "SAYAD-1024") {
      error.textContent = "اكتب كود الطالب التجريبي SAYAD-1024.";
      return;
    }

    document.getElementById("linkedStudent").textContent = code;
  } else {
    document.getElementById("studentGrade").textContent =
      document.getElementById("grade").value;
  }

  document.getElementById("auth").classList.add("hidden");
  document.getElementById("welcome").classList.add("hidden");
  document.querySelector(".pricing").classList.add("hidden");
  document.getElementById("dashboard").classList.remove("hidden");

  document.getElementById("studentDash").classList.toggle(
    "hidden", window.currentRole !== "student"
  );
  document.getElementById("parentDash").classList.toggle(
    "hidden", window.currentRole !== "parent"
  );

  document.getElementById("roleLabel").textContent =
    window.currentRole === "student" ? "حساب الطالب" : "حساب ولي الأمر";

  document.getElementById("dashTitle").textContent =
    window.currentRole === "student"
      ? "أهلاً بيك في حسابك"
      : "متابعة الطالب";

  window.scrollTo({ top: 0, behavior: "smooth" });
};

window.logout = function() {
  document.getElementById("phone").value = "";
  document.getElementById("password").value = "";
  document.getElementById("studentCode").value = "";
  window.goHome();
};

window.showMessage = function(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 3500);
};

window.showParentProgress = function() {
  const parentDash = document.getElementById("parentDash");

  if (!parentDash || parentDash.classList.contains("hidden")) {
    window.showMessage("ادخل بحساب ولي الأمر أولاً.");
    return;
  }

  let report = document.getElementById("parentReport");

  if (!report) {
    report = document.createElement("div");
    report.id = "parentReport";
    report.className = "dash-grid";
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
      <progress value="80" max="100"></progress>
      <p>نسبة الإنجاز: 80%</p>
    </article>
    <p class="note">
      هذه بيانات تجريبية للعرض فقط، وليست سجلات حقيقية للطالب.
    </p>
  `;
};

window.addEventListener("DOMContentLoaded", function() {
  const parentDash = document.getElementById("parentDash");

  if (parentDash && !document.getElementById("parentProgressButton")) {
    const button = document.createElement("button");
    button.id = "parentProgressButton";
    button.className = "primary full";
    button.textContent = "عرض تقرير الطالب";
    button.onclick = window.showParentProgress;
    parentDash.insertBefore(button, parentDash.firstChild);
  }
});

window.addEventListener("load", function () {
  const parentDash = document.getElementById("parentDash");

  if (!parentDash) {
    alert("مش لاقي لوحة ولي الأمر في الصفحة");
    return;
  }

  if (document.getElementById("parentProgressButton")) return;

  const button = document.createElement("button");
  button.id = "parentProgressButton";
  button.className = "primary full";
  button.textContent = "عرض تقرير الطالب";
  button.style.display = "block";
  button.style.margin = "20px 0";
  button.onclick = function () {
    if (typeof window.showParentProgress === "function") {
      window.showParentProgress();
    } else {
      alert("دالة التقرير مش موجودة في app.js");
    }
  };

  parentDash.insertBefore(button, parentDash.firstChild);
});
