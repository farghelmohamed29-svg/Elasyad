(function () {
  "use strict";

  let currentRole = "student";
  let selectedSubject = "الفيزياء";

  const $ = (id) => document.getElementById(id);

  const demoLessons = {
    "الفيزياء": [
      { title: "مقدمة في الفيزياء", duration: "20 دقيقة", status: "متاح للمعاينة" },
      { title: "القياس والكميات الفيزيائية", duration: "35 دقيقة", status: "تجريبي" },
      { title: "تطبيقات ومسائل", duration: "25 دقيقة", status: "تجريبي" }
    ],
    "الرياضيات": [
      { title: "مراجعة الأساسيات", duration: "25 دقيقة", status: "متاح للمعاينة" },
      { title: "حل مسائل تدريبية", duration: "30 دقيقة", status: "تجريبي" }
    ],
    "العلوم": [
      { title: "مقدمة في العلوم", duration: "20 دقيقة", status: "متاح للمعاينة" },
      { title: "تطبيقات علمية", duration: "25 دقيقة", status: "تجريبي" }
    ],
    "اللغة العربية": [
      { title: "مراجعة لغوية", duration: "20 دقيقة", status: "تجريبي" },
      { title: "تدريبات القراءة", duration: "25 دقيقة", status: "تجريبي" }
    ],
    "اللغة الإنجليزية": [
      { title: "Vocabulary Practice", duration: "20 دقيقة", status: "تجريبي" },
      { title: "Grammar Practice", duration: "25 دقيقة", status: "تجريبي" }
    ]
  };

  function message(text) {
    const toast = $("toast");

    if (!toast) {
      alert(text);
      return;
    }

    toast.textContent = text;
    toast.classList.remove("hidden");

    clearTimeout(message.timer);
    message.timer = setTimeout(() => {
      toast.classList.add("hidden");
    }, 3500);
  }

  function showAuth(role) {
    if (role !== "student" && role !== "parent") return;

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

    if ($("authDesc")) {
      $("authDesc").textContent =
        role === "student"
          ? "اكتب بيانات الدخول التجريبية."
          : "اكتب بيانات ولي الأمر وكود الطالب التجريبي.";
    }

    if ($("authError")) $("authError").textContent = "";

    window.scrollTo(0, 0);
  }

  function goHome() {
    $("auth")?.classList.add("hidden");
    $("dashboard")?.classList.add("hidden");
    $("welcome")?.classList.remove("hidden");
    document.querySelector(".pricing")?.classList.remove("hidden");
    window.scrollTo(0, 0);
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
        if (error) {
          error.textContent = "كود الطالب التجريبي هو SAYAD-1024.";
        } else {
          message("كود الطالب التجريبي هو SAYAD-1024.");
        }
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

    if (currentRole === "student") {
      setupStudentDashboard();
    } else {
      addReportButton();
    }

    window.scrollTo(0, 0);
  }

  function createSection(id, title, description) {
    let section = $(id);

    if (!section) {
      section = document.createElement("section");
      section.id = id;
      section.className = "panel";
      section.style.maxWidth = "1080px";

      const dash = $("studentDash");
      if (dash) dash.appendChild(section);
    }

    section.replaceChildren();

    const heading = document.createElement("h3");
    heading.textContent = title;

    const paragraph = document.createElement("p");
    paragraph.textContent = description;
    paragraph.className = "muted";

    section.append(heading, paragraph);
    return section;
  }

  function setupStudentDashboard() {
    const subjectSelect = $("subject");

    if (subjectSelect) {
      selectedSubject = subjectSelect.value || "الفيزياء";

      subjectSelect.onchange = function () {
        selectedSubject = this.value;
        showLessons();
      };
    }

    const cards = $("studentDash")?.querySelectorAll(".dash-grid .panel");

    if (cards?.length >= 3) {
      const lessonButton = cards[0].querySelector("button");
      const examButton = cards[1].querySelector("button");
      const liveButton = cards[2].querySelector("button");

      if (lessonButton) {
        lessonButton.onclick = showLessons;
        lessonButton.textContent = "عرض الدروس";
      }

      if (examButton) {
        examButton.onclick = showExams;
        examButton.textContent = "عرض الامتحانات";
      }

      if (liveButton) {
        liveButton.onclick = showLiveLessons;
        liveButton.textContent = "عرض جدول الحصص";
      }
    }
  }

  function showLessons() {
    const subject = $("subject")?.value || selectedSubject;
    const lessons = demoLessons[subject] || [];
    const section = createSection(
      "studentLessons",
      "📚 دروس " + subject,
      "قائمة توضيحية للدروس. تشغيل الفيديوهات والاشتراكات الحقيقية لم يتم تفعيله بعد."
    );

    lessons.forEach((lesson, index) => {
      const card = document.createElement("article");
      card.style.cssText =
        "padding:14px;margin:12px 0;border:1px solid #dbe5ee;border-radius:12px;background:#f8fbfd";

      const title = document.createElement("h4");
      title.textContent = (index + 1) + ". " + lesson.title;

      const duration = document.createElement("p");
      duration.textContent = "المدة: " + lesson.duration;

      const status = document.createElement("p");
      status.textContent = lesson.status;

      const button = document.createElement("button");
      button.type = "button";
      button.className = "secondary";
      button.textContent = "فتح الدرس";
      button.onclick = () =>
        message("ده عرض تجريبي. لازم نضيف فيديو الدرس الحقيقي قبل تشغيله.");

      card.append(title, duration, status, button);
      section.appendChild(card);
    });

    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function showExams() {
    const section = createSection(
      "studentExams",
      "📝 الامتحانات",
      "الامتحانات التالية أمثلة تجريبية وليست امتحانات فعلية."
    );

    const exams = [
      { title: "اختبار قصير", subject: selectedSubject, questions: 10 },
      { title: "امتحان مراجعة", subject: selectedSubject, questions: 20 }
    ];

    exams.forEach((exam) => {
      const card = document.createElement("article");
      card.style.cssText =
        "padding:14px;margin:12px 0;border:1px solid #dbe5ee;border-radius:12px";

      const title = document.createElement("h4");
      title.textContent = exam.title;

      const details = document.createElement("p");
      details.textContent =
        "المادة: " + exam.subject + " — عدد الأسئلة: " + exam.questions;

      const button = document.createElement("button");
      button.type = "button";
      button.className = "primary";
      button.textContent = "بدء الامتحان";

      button.onclick = () =>
        message("نظام حل الامتحانات وتصحيحها لم يتم تفعيله بعد.");

      card.append(title, details, button);
      section.appendChild(card);
    });

    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function showLiveLessons() {
    const section = createSection(
      "studentLiveLessons",
      "📡 جدول الحصص",
      "ده جدول توضيحي. مواعيد وروابط الحصص الفعلية لم تتم إضافتها."
    );

    const items = [
      "حصة شرح ومراجعة — الموعد غير محدد",
      "حل مسائل — الموعد غير محدد"
    ];

    items.forEach((item) => {
      const row = document.createElement("p");
      row.style.cssText =
        "padding:12px;border-bottom:1px solid #dbe5ee";
      row.textContent = "📅 " + item;
      section.appendChild(row);
    });

    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function addReportButton() {
    const parentDash = $("parentDash");
    if (!parentDash) return;

    let button = $("parentProgressButton");

    if (!button) {
      button = document.createElement("button");
      button.id = "parentProgressButton";
      button.type = "button";
      button.textContent = "عرض تقرير الطالب";
      button.className = "primary full";
      button.style.cssText =
        "display:block!important;width:100%;padding:14px;margin:16px 0;cursor:pointer";

      button.onclick = showParentProgress;
      parentDash.prepend(button);
    }
  }

  function showParentProgress() {
    const parentDash = $("parentDash");

    if (
      !parentDash ||
      parentDash.classList.contains("hidden") ||
      currentRole !== "parent"
    ) {
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
      "display:block;position:relative;width:100%;box-sizing:border-box;margin:20px 0;padding:20px;background:#fff;color:#222;border:1px solid #dbe5ee;border-radius:12px";

    report.replaceChildren();

    const title = document.createElement("h2");
    title.textContent = "📊 تقرير الطالب";

    const note = document.createElement("p");
    note.textContent =
      "بيانات توضيحية فقط؛ لم يتم ربط التقرير بسجلات حقيقية.";
    note.style.color = "#a16207";

    const attendance = document.createElement("p");
    attendance.textContent = "📅 الحضور: 4 حصص — الغياب: حصة واحدة";

    const gradesTitle = document.createElement("h3");
    gradesTitle.textContent = "📝 درجات الامتحانات";

    const grades = document.createElement("p");
    grades.textContent = "الامتحان الأول: 16 من 20 — الثاني: 18 من 20";

    const progressTitle = document.createElement("h3");
    progressTitle.textContent = "📈 التقدم الدراسي";

    const progress = document.createElement("progress");
    progress.max = 100;
    progress.value = 80;
    progress.style.width = "100%";

    const progressText = document.createElement("p");
    progressText.textContent = "الدروس المكتملة: 8 من 10 — الإنجاز: 80%";

    report.append(
      title,
      note,
      attendance,
      gradesTitle,
      grades,
      progressTitle,
      progress,
      progressText
    );

    report.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function logout() {
    ["phone", "password", "studentCode"].forEach((id) => {
      if ($(id)) $(id).value = "";
    });

    currentRole = "student";
    goHome();
  }

  window.showAuth = showAuth;
  window.goHome = goHome;
  window.demoLogin = demoLogin;
  window.logout = logout;
  window.showMessage = message;
  window.showParentProgress = showParentProgress;

  function initialize() {
    addReportButton();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
  } else {
    initialize();
  }
})();
