window.currentRole = "student";

window.showAuth = function(role) {
  window.currentRole = role;

  document.getElementById("welcome").classList.add("hidden");
  document.querySelector(".pricing").classList.add("hidden");
  document.getElementById("dashboard").classList.add("hidden");
  document.getElementById("auth").classList.remove("hidden");

  document.getElementById("authTitle").textContent =
    role === "student" ? "دخول الطالب" : "دخول ولي الأمر";

  document.getElementById("authDesc").textContent =
    role === "student"
      ? "ادخل بيانات الطالب التجريبية."
      : "ادخل بيانات ولي الأمر واربط الحساب بكود الطالب.";

  document.getElementById("studentFields").classList.toggle("hidden", role !== "student");
  document.getElementById("parentFields").classList.toggle("hidden", role !== "parent");
  document.getElementById("authError").textContent = "";
};

window.goHome = function() {
  document.getElementById("auth").classList.add("hidden");
  document.getElementById("dashboard").classList.add("hidden");
  document.getElementById("welcome").classList.remove("hidden");
  document.querySelector(".pricing").classList.remove("hidden");
};

window.demoLogin = function() {
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("authError");

  if (!phone || !password) {
    error.textContent = "اكتب رقم الموبايل وكلمة المرور للعرض التجريبي.";
    return;
  }

  if (
    window.currentRole === "parent" &&
    !document.getElementById("studentCode").value.trim()
  ) {
    error.textContent = "اكتب كود الطالب التجريبي SAYAD-1024.";
    return;
  }

  document.getElementById("auth").classList.add("hidden");
  document.getElementById("dashboard").classList.remove("hidden");
  document.getElementById("welcome").classList.add("hidden");
  document.querySelector(".pricing").classList.add("hidden");

  document.getElementById("studentDash").classList.toggle("hidden", window.currentRole !== "student");
  document.getElementById("parentDash").classList.toggle("hidden", window.currentRole !== "parent");

  document.getElementById("roleLabel").textContent =
    window.currentRole === "student" ? "حساب الطالب" : "حساب ولي الأمر";

  document.getElementById("dashTitle").textContent =
    window.currentRole === "student"
      ? "أهلاً بيك في حسابك"
      : "أهلاً بيك في متابعة ابنك";

  if (window.currentRole === "student") {
    document.getElementById("studentGrade").textContent =
      document.getElementById("grade").value;
  } else {
    document.getElementById("linkedStudent").textContent =
      document.getElementById("studentCode").value.trim();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
};

window.logout = function() {
  window.goHome();
  document.getElementById("phone").value = "";
  document.getElementById("password").value = "";
};

window.showMessage = function(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 3500);
};
window.showParentProgress = function() {
  const container = document.getElementById("parentProgress");

  if (!container) {
    window.showMessage("لازم نضيف مكان لوحة المتابعة في صفحة HTML أولاً.");
    return;
  }

  container.innerHTML = `
    <section class="progress-panel" dir="rtl">
      <h2>متابعة الطالب</h2>
      <p>كود الطالب: ${
        document.getElementById("linkedStudent")?.textContent || "غير محدد"
      }</p>

      <div class="progress-card">
        <h3>الحضور والغياب</h3>
        <p>الحضور: 4 حصص</p>
        <p>الغياب: حصة واحدة</p>
      </div>

      <div class="progress-card">
        <h3>درجات الامتحانات</h3>
        <p>الامتحان الأول: 16 من 20</p>
        <p>الامتحان الثاني: 18 من 20</p>
      </div>

      <div class="progress-card">
        <h3>التقدم الدراسي</h3>
        <p>الدروس المكتملة: 8 من 10</p>
        <progress value="80" max="100"></progress>
        <p>نسبة الإنجاز: 80%</p>
      </div>

      <p class="demo-note">
        هذه بيانات تجريبية وليست سجلاً حقيقياً للطالب.
      </p>
    </section>
  `;
};
