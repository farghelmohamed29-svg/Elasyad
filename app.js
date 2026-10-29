(function () {
  "use strict";

  let currentRole = "student";
  let selectedSubject = "اللغة العربية";
  let selectedStage = "ابتدائي";
  let selectedGrade = "الصف الرابع الابتدائي";
  let selectedSystem = "عام";

  const $ = (id) => document.getElementById(id);

  // قوائم مبدئية للمناهج المصرية؛ يلزم مراجعتها مع أحدث قرارات الوزارة.
  const curriculum = {
    "ابتدائي": {
      "الصف الأول الابتدائي": [
        "اللغة العربية", "اللغة الإنجليزية", "الرياضيات",
        "متعدد التخصصات", "التربية الدينية", "القيم واحترام الآخر"
      ],
      "الصف الثاني الابتدائي": [
        "اللغة العربية", "اللغة الإنجليزية", "الرياضيات",
        "متعدد التخصصات", "التربية الدينية", "القيم واحترام الآخر"
      ],
      "الصف الثالث الابتدائي": [
        "اللغة العربية", "اللغة الإنجليزية", "الرياضيات",
        "متعدد التخصصات", "التربية الدينية", "القيم واحترام الآخر"
      ],
      "الصف الرابع الابتدائي": [
        "اللغة العربية", "اللغة الإنجليزية", "الرياضيات",
        "العلوم", "الدراسات الاجتماعية", "تكنولوجيا المعلومات",
        "المهارات المهنية", "التربية الدينية", "التربية الفنية"
      ],
      "الصف الخامس الابتدائي": [
        "اللغة العربية", "اللغة الإنجليزية", "الرياضيات",
        "العلوم", "الدراسات الاجتماعية", "تكنولوجيا المعلومات",
        "المهارات المهنية", "التربية الدينية", "التربية الفنية"
      ],
      "الصف السادس الابتدائي": [
        "اللغة العربية", "اللغة الإنجليزية", "الرياضيات",
        "العلوم", "الدراسات الاجتماعية", "تكنولوجيا المعلومات",
        "المهارات المهنية", "التربية الدينية", "التربية الفنية"
      ]
    },

    "إعدادي": {
      "الصف الأول الإعدادي": [
        "اللغة العربية", "اللغة الإنجليزية", "الرياضيات",
        "العلوم", "الدراسات الاجتماعية", "الحاسب الآلي",
        "التربية الدينية", "التربية الفنية"
      ],
      "الصف الثاني الإعدادي": [
        "اللغة العربية", "اللغة الإنجليزية", "الرياضيات",
        "العلوم", "الدراسات الاجتماعية", "الحاسب الآلي",
        "التربية الدينية", "التربية الفنية"
      ],
      "الصف الثالث الإعدادي": [
        "اللغة العربية", "اللغة الإنجليزية", "الرياضيات",
        "العلوم", "الدراسات الاجتماعية", "الحاسب الآلي",
        "التربية الدينية", "التربية الفنية"
      ]
    },

    "ثانوي عام": {
      "الصف الأول الثانوي": [
        "اللغة العربية", "اللغة الأجنبية الأولى", "الرياضيات",
        "العلوم المتكاملة", "التاريخ", "الفلسفة والمنطق",
        "البرمجة والذكاء الاصطناعي", "التربية الدينية"
      ],
      "الصف الثاني الثانوي": [
        "اللغة العربية", "اللغة الأجنبية الأولى", "الرياضيات",
        "الفيزياء", "الكيمياء", "الأحياء",
        "التاريخ", "الجغرافيا", "علم النفس", "الفلسفة"
      ],
      "الصف الثالث الثانوي": [
        "اللغة العربية", "اللغة الأجنبية الأولى", "الفيزياء",
        "الكيمياء", "الأحياء", "الرياضيات",
        "التاريخ", "الجغرافيا", "الإحصاء"
      ]
    },

    "بكالوريا مصرية": {
      "الصف الأول الثانوي": [
        "اللغة العربية", "اللغة الأجنبية الأولى", "الرياضيات",
        "العلوم المتكاملة", "التاريخ", "الفلسفة والمنطق",
        "البرمجة والذكاء الاصطناعي", "التربية الدينية"
      ],
      "الصف الثاني الثانوي": [
        "اللغة العربية", "اللغة الأجنبية الأولى",
        "التاريخ المصري", "الرياضيات",
        "مواد التخصص حسب المسار"
      ],
      "الصف الثالث الثانوي": [
        "اللغة العربية", "اللغة الأجنبية الأولى",
        "مواد التخصص حسب المسار"
      ]
    }
  };

  const demoLessons = {
    "اللغة العربية": [
      { title: "شرح الدرس الأول", duration: "20 دقيقة" },
      { title: "تدريبات على الدرس", duration: "25 دقيقة" }
    ],
    "اللغة الإنجليزية": [
      { title: "شرح الوحدة الأولى", duration: "20 دقيقة" },
      { title: "تدريبات ومراجعة", duration: "25 دقيقة" }
    ],
    "الرياضيات": [
      { title: "شرح المفاهيم الأساسية", duration: "25 دقيقة" },
      { title: "مسائل وتدريبات", duration: "30 دقيقة" }
    ],
    "العلوم": [
      { title: "مقدمة في العلوم", duration: "20 دقيقة" },
      { title: "شرح وتطبيقات", duration: "25 دقيقة" }
    ],
    "الفيزياء": [
      { title: "مقدمة في الفيزياء", duration: "20 دقيقة" },
      { title: "شرح القوانين وتطبيقاتها", duration: "30 دقيقة" }
    ],
    "الكيمياء": [
      { title: "مقدمة في الكيمياء", duration: "20 دقيقة" },
      { title: "تدريبات وتطبيقات", duration: "25 دقيقة" }
    ],
    "الأحياء": [
      { title: "مقدمة في الأحياء", duration: "20 دقيقة" },
      { title: "شرح وتدريبات", duration: "25 دقيقة" }
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
    message.timer = setTimeout(
      () => toast.classList.add("hidden"),
      3500
    );
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
        "نسخة تجريبية. لا تستخدم كلمة مرور حقيقية.";
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
        if (error) error.textContent = "كود الطالب التجريبي هو SAYAD-1024.";
        else message("كود الطالب التجريبي هو SAYAD-1024.");
        return;
      }

      if ($("linkedStudent")) {
        $("linkedStudent").textContent = "SAYAD-1024";
      }
    } else {
      if ($("grade")) selectedGrade = $("grade").value;
      if ($("studentGrade")) $("studentGrade").textContent = selectedGrade;
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

  function addField(labelText, id, options, parent) {
    const wrapper = document.createElement("div");
    wrapper.className = "field";

    const label = document.createElement("label");
    label.htmlFor = id;
    label.textContent = labelText;

    const select = document.createElement("select");
    select.id = id;

    options.forEach((item) => {
      const option = document.createElement("option");
      option.value = item;
      option.textContent = item;
      select.appendChild(option);
    });

    wrapper.append(label, select);
    parent.appendChild(wrapper);
    return select;
  }

  function setupStudentDashboard() {
    const dash = $("studentDash");
    if (!dash) return;

    let chooser = $("curriculumChooser");

    if (!chooser) {
      chooser = document.createElement("section");
      chooser.id = "curriculumChooser";
      chooser.className = "panel";
      chooser.style.maxWidth = "1080px";
      dash.prepend(chooser);
    }

    chooser.replaceChildren();

    const title = document.createElement("h3");
    title.textContent = "📚 اختار مرحلتك وصفك ومادتك";

    const note = document.createElement("p");
    note.className = "note";
    note.textContent =
      "قوائم المواد مبدئية للتجربة، ويجب مراجعتها وفق أحدث مناهج وقرارات وزارة التربية والتعليم المصرية.";

    chooser.append(title, note);

    const stageSelect = addField(
      "المرحلة التعليمية",
      "curriculumStage",
      ["ابتدائي", "إعدادي", "ثانوي عام", "بكالوريا مصرية"],
      chooser
    );

    const gradeSelect = addField(
      "الصف الدراسي",
      "curriculumGrade",
      Object.keys(curriculum["ابتدائي"]),
      chooser
    );

    const subjectSelect = addField(
      "المادة",
      "curriculumSubject",
      curriculum["ابتدائي"]["الصف الأول الابتدائي"],
      chooser
    );

    function updateGrades() {
      const stage = stageSelect.value;
      const grades = Object.keys(curriculum[stage]);

      gradeSelect.replaceChildren();

      grades.forEach((grade) => {
        const option = document.createElement("option");
        option.value = grade;
        option.textContent = grade;
        gradeSelect.appendChild(option);
      });

      updateSubjects();
    }

    function updateSubjects() {
      const stage = stageSelect.value;
      const grade = gradeSelect.value;
      const subjects = curriculum[stage][grade] || [];

      subjectSelect.replaceChildren();

      subjects.forEach((subject) => {
        const option = document.createElement("option");
        option.value = subject;
        option.textContent = subject;
        subjectSelect.appendChild(option);
      });

      selectedStage = stage;
      selectedGrade = grade;
      selectedSubject = subjects[0] || "";

      if ($("studentGrade")) {
        $("studentGrade").textContent = selectedGrade;
      }
    }

    stageSelect.addEventListener("change", updateGrades);
    gradeSelect.addEventListener("change", updateSubjects);

    subjectSelect.addEventListener("change", () => {
      selectedStage = stageSelect.value;
      selectedGrade = gradeSelect.value;
      selectedSubject = subjectSelect.value;
    });

    const showButton = document.createElement("button");
    showButton.type = "button";
    showButton.className = "primary full";
    showButton.textContent = "عرض دروس المادة";
    showButton.addEventListener("click", () => {
      selectedStage = stageSelect.value;
      selectedGrade = gradeSelect.value;
      selectedSubject = subjectSelect.value;

      if (!selectedSubject) {
        message("اختار المادة أولاً.");
        return;
      }

      showLessons();
    });

    chooser.appendChild(showButton);

    stageSelect.value = curriculum[selectedStage]
      ? selectedStage
      : "ابتدائي";

    updateGrades();

    if (curriculum[stageSelect.value][selectedGrade]) {
      gradeSelect.value = selectedGrade;
      updateSubjects();
    }

    if (curriculum[stageSelect.value][selectedGrade]?.includes(selectedSubject)) {
      subjectSelect.value = selectedSubject;
    }

    setupDashboardButtons();
  }

  function setupDashboardButtons() {
    const cards = $("studentDash")?.querySelectorAll(".dash-grid .panel");
    if (!cards || cards.length < 3) return;

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

  function createSection(id, titleText, descriptionText) {
    let section = $(id);

    if (!section) {
      section = document.createElement("section");
      section.id = id;
      section.className = "panel";
      section.style.maxWidth = "1080px";
      $("studentDash")?.appendChild(section);
    }

    section.replaceChildren();

    const title = document.createElement("h3");
    title.textContent = titleText;

    const description = document.createElement("p");
    description.className = "muted";
    description.textContent = descriptionText;

    section.append(title, description);
    return section;
  }

  function showLessons() {
    const subject = selectedSubject;
    const lessons = demoLessons[subject] || [];
    const section = createSection(
      "studentLessons",
      "📚 " + subject + " — " + selectedGrade,
      lessons.length
        ? "دروس توضيحية تجريبية؛ لم تتم إضافة فيديوهات فعلية بعد."
        : "لم تتم إضافة دروس تجريبية لهذه المادة حتى الآن."
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
      status.textContent = "عرض تجريبي";

      const button = document.createElement("button");
      button.type = "button";
      button.className = "secondary";
      button.textContent = "فتح الدرس";
      button.onclick = () =>
        message("الفيديو الفعلي يحتاج إضافة رابطه وربطه بالاشتراك.");

      card.append(title, duration, status, button);
      section.appendChild(card);
    });

    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function showExams() {
    const section = createSection(
      "studentExams",
      "📝 امتحانات " + selectedSubject,
      "أمثلة تجريبية فقط، وليست امتحانات الوزارة."
    );

    ["اختبار قصير", "امتحان مراجعة"].forEach((name, index) => {
      const card = document.createElement("article");
      card.style.cssText =
        "padding:14px;margin:12px 0;border:1px solid #dbe5ee;border-radius:12px";

      const title = document.createElement("h4");
      title.textContent = name;

      const details = document.createElement("p");
      details.textContent =
        "الصف: " + selectedGrade + " — المادة: " + selectedSubject +
        " — عدد الأسئلة: " + (index === 0 ? 10 : 20);

      const button = document.createElement("button");
      button.type = "button";
      button.className = "primary";
      button.textContent = "بدء الامتحان";
      button.onclick = () =>
        message("نظام الامتحانات والتصحيح لم يتم تفعيله بعد.");

      card.append(title, details, button);
      section.appendChild(card);
    });

    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function showLiveLessons() {
    const section = createSection(
      "studentLiveLessons",
      "📡 جدول الحصص",
      "مواعيد وروابط الحصص الحقيقية لم تتم إضافتها بعد."
    );

    ["حصة شرح ومراجعة", "حل مسائل وتدريبات"].forEach((name) => {
      const row = document.createElement("p");
      row.style.cssText = "padding:12px;border-bottom:1px solid #dbe5ee";
      row.textContent = "📅 " + name + " — الموعد غير محدد";
      section.appendChild(row);
    });

    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function addReportButton() {
    const parentDash = $("parentDash");
    if (!parentDash || $("parentProgressButton")) return;

    const button = document.createElement("button");
    button.id = "parentProgressButton";
    button.type = "button";
    button.textContent = "عرض تقرير الطالب";
    button.className = "primary full";
    button.onclick = showParentProgress;

    parentDash.prepend(button);
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

    report.className = "panel";
    report.style.cssText =
      "display:block;max-width:100%;box-sizing:border-box;margin:20px 0;padding:20px;background:#fff;color:#222;border:1px solid #dbe5ee;border-radius:12px";

    report.replaceChildren();

    const title = document.createElement("h2");
    title.textContent = "📊 تقرير الطالب";

    const note = document.createElement("p");
    note.className = "note";
    note.textContent =
      "بيانات تجريبية للعرض فقط؛ لم يتم ربط التقرير بسجلات حقيقية.";

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
      title, note, attendance, gradesTitle, grades,
      progressTitle, progress, progressText
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
