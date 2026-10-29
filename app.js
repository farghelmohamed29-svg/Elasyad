(function () {
  "use strict";

  let currentRole = "student";
  let selectedSubject = "اللغة العربية";
  let selectedStage = "ابتدائي";
  let selectedGrade = "الصف الرابع الابتدائي";
  let selectedSystem = "عام";

  let curriculum = {};
  let curriculumLoading = false;

  const $ = (id) => document.getElementById(id);

  const stageMap = {
    primary: "ابتدائي",
    preparatory: "إعدادي",
    secondary: "ثانوي عام"
  };

  const demoCurriculum = {
    "ابتدائي": {
      "الصف الرابع الابتدائي": [
        "اللغة العربية", "اللغة الإنجليزية", "الرياضيات", "العلوم"
      ],
      "الصف الخامس الابتدائي": [
        "اللغة العربية", "اللغة الإنجليزية", "الرياضيات", "العلوم"
      ],
      "الصف السادس الابتدائي": [
        "اللغة العربية", "اللغة الإنجليزية", "الرياضيات", "العلوم"
      ]
    },
    "إعدادي": {
      "الصف الأول الإعدادي": [
        "اللغة العربية", "اللغة الإنجليزية", "الرياضيات", "العلوم"
      ],
      "الصف الثاني الإعدادي": [
        "اللغة العربية", "اللغة الإنجليزية", "الرياضيات", "العلوم"
      ],
      "الصف الثالث الإعدادي": [
        "اللغة العربية", "اللغة الإنجليزية", "الرياضيات", "العلوم"
      ]
    },
    "ثانوي عام": {
      "الصف الأول الثانوي": [
        "اللغة العربية", "اللغة الإنجليزية", "الرياضيات",
        "الفيزياء", "الكيمياء", "الأحياء"
      ],
      "الصف الثاني الثانوي": [
        "اللغة العربية", "اللغة الإنجليزية", "الرياضيات",
        "الفيزياء", "الكيمياء", "الأحياء"
      ],
      "الصف الثالث الثانوي": [
        "اللغة العربية", "اللغة الإنجليزية", "الرياضيات",
        "الفيزياء", "الكيمياء", "الأحياء"
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

    message.timer = setTimeout(() => {
      toast.classList.add("hidden");
    }, 3500);
  }

  function setText(id, value) {
    const element = $(id);
    if (element) element.textContent = value;
  }

  function showAuth(role) {
    if (role !== "student" && role !== "parent") return;

    currentRole = role;

    $("welcome")?.classList.add("hidden");
    $("auth")?.classList.remove("hidden");
    $("dashboard")?.classList.add("hidden");

    $("studentFields")?.classList.toggle(
      "hidden",
      role !== "student"
    );

    $("parentFields")?.classList.toggle(
      "hidden",
      role !== "parent"
    );

    setText(
      "authTitle",
      role === "student" ? "دخول الطالب" : "دخول ولي الأمر"
    );

    setText(
      "authDesc",
      "دخول تجريبي فقط. لا تستخدم كلمة مرور حقيقية."
    );

    setText("authError", "");

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

    const phoneValue = phone?.value.trim() || "";
    const passwordValue = password?.value.trim() || "";

    if (!phoneValue || !passwordValue) {
      const text = "اكتب رقم الموبايل وكلمة المرور للتجربة.";

      if (error) error.textContent = text;
      else message(text);

      return;
    }

    if (currentRole === "parent") {
      const studentCode = $("studentCode")?.value.trim() || "";

      if (studentCode !== "SAYAD-1024") {
        const text = "كود الطالب التجريبي هو SAYAD-1024.";

        if (error) error.textContent = text;
        else message(text);

        return;
      }

      setText("linkedStudent", "SAYAD-1024");
    }

    if (currentRole === "student") {
      if ($("grade")) {
        selectedGrade = $("grade").value || selectedGrade;
      }

      setText("studentGrade", selectedGrade);
    }

    setText("authError", "");

    $("auth")?.classList.add("hidden");
    $("welcome")?.classList.add("hidden");

    document.querySelector(".pricing")?.classList.add("hidden");

    $("dashboard")?.classList.remove("hidden");

    $("studentDash")?.classList.toggle(
      "hidden",
      currentRole !== "student"
    );

    $("parentDash")?.classList.toggle(
      "hidden",
      currentRole !== "parent"
    );

    setText(
      "roleLabel",
      currentRole === "student"
        ? "حساب الطالب التجريبي"
        : "حساب ولي الأمر التجريبي"
    );

    setText(
      "dashTitle",
      currentRole === "student"
        ? "أهلاً بيك في حسابك"
        : "متابعة الطالب"
    );

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

  async function loadCurriculum() {
    const client = window.supabaseClient;

    if (!client) {
      throw new Error("اتصال قاعدة البيانات غير متاح.");
    }

    const { data, error } = await client
      .from("subjects")
      .select("name, grade_level, grade_name, curriculum_type")
      .eq("active", true)
      .order("grade_name")
      .order("name");

    if (error) throw error;

    const result = {};

    (data || []).forEach((row) => {
      const stage =
        row.curriculum_type ||
        stageMap[row.grade_level];

      if (!stage || !row.grade_name || !row.name) return;

      if (!result[stage]) result[stage] = {};

      if (!result[stage][row.grade_name]) {
        result[stage][row.grade_name] = [];
      }

      if (!result[stage][row.grade_name].includes(row.name)) {
        result[stage][row.grade_name].push(row.name);
      }
    });

    if (!Object.keys(result).length) {
      throw new Error("لا توجد مواد نشطة في جدول subjects.");
    }

    curriculum = result;
  }

  function useDemoCurriculum() {
    curriculum = JSON.parse(JSON.stringify(demoCurriculum));
  }

  async function setupStudentDashboard() {
    const dash = $("studentDash");

    if (!dash || curriculumLoading) return;

    curriculumLoading = true;

    try {
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
      note.textContent = "جاري تحميل المناهج...";

      chooser.append(title, note);

      let usingDemo = false;

      try {
        await loadCurriculum();
      } catch (dbError) {
        console.warn("تعذر تحميل المناهج من Supabase:", dbError);
        useDemoCurriculum();
        usingDemo = true;
      }

      note.textContent = usingDemo
        ? "أنت تستخدم مواد تجريبية. لم يتم تحميل المناهج من قاعدة البيانات."
        : "تم تحميل المواد من قاعدة البيانات.";

      const stages = Object.keys(curriculum);

      if (!stages.length) {
        throw new Error("لا توجد مراحل دراسية متاحة.");
      }

      const firstStage = curriculum[selectedStage]
        ? selectedStage
        : stages[0];

      const stageSelect = addField(
        "المرحلة التعليمية",
        "curriculumStage",
        stages,
        chooser
      );

      stageSelect.value = firstStage;

      const gradeSelect = addField(
        "الصف الدراسي",
        "curriculumGrade",
        Object.keys(curriculum[firstStage] || {}),
        chooser
      );

      const subjectSelect = addField(
        "المادة",
        "curriculumSubject",
        [],
        chooser
      );

      function updateSubjects() {
        const stage = stageSelect.value;
        const grade = gradeSelect.value;
        const subjects = curriculum[stage]?.[grade] || [];

        subjectSelect.replaceChildren();

        subjects.forEach((subject) => {
          const option = document.createElement("option");
          option.value = subject;
          option.textContent = subject;
          subjectSelect.appendChild(option);
        });

        selectedStage = stage;
        selectedGrade = grade;

        if (subjects.includes(selectedSubject)) {
          subjectSelect.value = selectedSubject;
        } else {
          selectedSubject = subjects[0] || "";
          subjectSelect.value = selectedSubject;
        }

        setText("studentGrade", selectedGrade);
      }

      function updateGrades() {
        const grades = Object.keys(
          curriculum[stageSelect.value] || {}
        );

        gradeSelect.replaceChildren();

        grades.forEach((grade) => {
          const option = document.createElement("option");
          option.value = grade;
          option.textContent = grade;
          gradeSelect.appendChild(option);
        });

        if (grades.includes(selectedGrade)) {
          gradeSelect.value = selectedGrade;
        }

        updateSubjects();
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

      updateGrades();
      setupDashboardButtons();
    } catch (error) {
      console.error("خطأ تحميل المناهج:", error);

      const chooser = $("curriculumChooser");

      if (chooser) {
        const note = document.createElement("p");
        note.className = "note";
        note.textContent = "تعذر عرض المناهج. حدّث الصفحة وحاول مرة أخرى.";
        chooser.appendChild(note);
      }

      message("تعذر عرض المناهج.");
    } finally {
      curriculumLoading = false;
    }
  }

  function setupDashboardButtons() {
    const cards = $("studentDash")?.querySelectorAll(
      ".dash-grid .panel"
    );

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
        ? "دروس توضيحية تجريبية؛ لا توجد فيديوهات فعلية مرتبطة بعد."
        : "لم تتم إضافة دروس تجريبية لهذه المادة."
    );

    lessons.forEach((lesson, index) => {
      const card = document.createElement("article");

      card.style.cssText =
        "padding:14px;margin:12px 0;border:1px solid #dbe5ee;" +
        "border-radius:12px;background:#f8fbfd";

      const title = document.createElement("h4");
      title.textContent = (index + 1) + ". " + lesson.title;

      const duration = document.createElement("p");
      duration.textContent = "المدة: " + lesson.duration;

      const status = document.createElement("p");
      status.textContent = "درس تجريبي";

      const button = document.createElement("button");
      button.type = "button";
      button.className = "secondary";
      button.textContent = "فتح الدرس";

      button.onclick = () => {
        message("الفيديو غير مضاف بعد. يجب إضافة رابط الدرس أولاً.");
      };

      card.append(title, duration, status, button);
      section.appendChild(card);
    });

    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
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
        "padding:14px;margin:12px 0;border:1px solid #dbe5ee;" +
        "border-radius:12px";

      const title = document.createElement("h4");
      title.textContent = name;

      const details = document.createElement("p");
      details.textContent =
        "الصف: " + selectedGrade +
        " — المادة: " + selectedSubject +
        " — عدد الأسئلة: " + (index === 0 ? 10 : 20);

      const button = document.createElement("button");
      button.type = "button";
      button.className = "primary";
      button.textContent = "بدء الامتحان";

      button.onclick = () => {
        message("نظام الامتحانات والتصحيح لم يتم تفعيله بعد.");
      };

      card.append(title, details, button);
      section.appendChild(card);
    });

    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  function showLiveLessons() {
    const section = createSection(
      "studentLiveLessons",
      "📡 جدول الحصص",
      "مواعيد وروابط الحصص الحقيقية لم تتم إضافتها بعد."
    );

    ["حصة شرح ومراجعة", "حل مسائل وتدريبات"].forEach((name) => {
      const row = document.createElement("p");

      row.style.cssText =
        "padding:12px;border-bottom:1px solid #dbe5ee";

      row.textContent = "📅 " + name + " — الموعد غير محدد";

      section.appendChild(row);
    });

    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
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
      "display:block;max-width:100%;box-sizing:border-box;" +
      "margin:20px 0;padding:20px;background:#fff;color:#222;" +
      "border:1px solid #dbe5ee;border-radius:12px";

    report.replaceChildren();

    const title = document.createElement("h2");
    title.textContent = "📊 تقرير الطالب";

    const note = document.createElement("p");
    note.className = "note";
    note.textContent =
      "هذه بيانات تجريبية وليست سجلات حقيقية للطالب.";

    const attendance = document.createElement("p");
    attendance.textContent =
      "📅 الحضور: 4 حصص — الغياب: حصة واحدة";

    const gradesTitle = document.createElement("h3");
    gradesTitle.textContent = "📝 درجات الامتحانات";

    const grades = document.createElement("p");
    grades.textContent =
      "الامتحان الأول: 16 من 20 — الثاني: 18 من 20";

    const progressTitle = document.createElement("h3");
    progressTitle.textContent = "📈 التقدم الدراسي";

    const progress = document.createElement("progress");
    progress.max = 100;
    progress.value = 80;
    progress.style.width = "100%";

    const progressText = document.createElement("p");
    progressText.textContent =
      "الدروس المكتملة: 8 من 10 — الإنجاز: 80%";

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

    report.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  function logout() {
    ["phone", "password", "studentCode"].forEach((id) => {
      const field = $(id);
      if (field) field.value = "";
    });

    currentRole = "student";
    goHome();
  }

  // ===== نموذج الاشتراك وإرسال إيصال الدفع =====

  function setupSubscriptionForm() {
    const form = $("subscriptionForm");
    const stage = $("subStage");
    const grade = $("subGrade");
    const button = $("subscriptionSubmit");
    const output = $("subscriptionMessage");

    if (!form || !stage || !grade || !button || !output) return;

    const grades = {
      primary: [
        "الصف الرابع الابتدائي",
        "الصف الخامس الابتدائي",
        "الصف السادس الابتدائي"
      ],
      preparatory: [
        "الصف الأول الإعدادي",
        "الصف الثاني الإعدادي",
        "الصف الثالث الإعدادي"
      ],
      secondary: [
        "الصف الأول الثانوي",
        "الصف الثاني الثانوي",
        "الصف الثالث الثانوي"
      ]
    };

    stage.addEventListener("change", () => {
      grade.replaceChildren();

      const placeholder = document.createElement("option");
      placeholder.value = "";
      placeholder.textContent = "اختر الصف";
      grade.appendChild(placeholder);

      (grades[stage.value] || []).forEach((name) => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        grade.appendChild(option);
      });
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      output.textContent = "";

      const file = $("receipt")?.files?.[0];

      if (!file) {
        output.textContent = "من فضلك ارفع إيصال الدفع.";
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        output.textContent = "حجم الإيصال يجب ألا يتجاوز 5 ميجابايت.";
        return;
      }

      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "application/pdf"
      ];

      if (!allowedTypes.includes(file.type)) {
        output.textContent = "نوع الملف غير مدعوم.";
        return;
      }

      const token = form.querySelector(
        '[name="cf-turnstile-response"]'
      )?.value;

      if (!token) {
        output.textContent = "أكمل التحقق الأمني أولاً.";
        return;
      }

      const data = new FormData(form);

      button.disabled = true;
      button.textContent = "جاري إرسال الطلب...";
      output.textContent = "انتظر حتى يتم إرسال طلبك.";

      try {
        const response = await fetch(
          "https://nakcvafzzvikfsjvwhpz.supabase.co/functions/v1/submit-subscription",
          {
            method: "POST",
            body: data
          }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.error || "تعذر إرسال الطلب."
          );
        }

        output.textContent =
          "تم استلام طلبك بنجاح. انتظر مراجعة الإدارة قبل تفعيل الاشتراك.";

        form.reset();

        grade.innerHTML =
          '<option value="">اختر الصف</option>';

        if (window.turnstile) {
          window.turnstile.reset();
        }
      } catch (error) {
        console.error("Subscription error:", error);
        output.textContent =
          error.message || "حدث خطأ. حاول مرة أخرى.";
      } finally {
        button.disabled = false;
        button.textContent = "إرسال طلب الاشتراك";
      }
    });
  }

  function initialize() {
    addReportButton();
    setupSubscriptionForm();
  }

  window.showAuth = showAuth;
  window.goHome = goHome;
  window.demoLogin = demoLogin;
  window.logout = logout;
  window.showMessage = message;
  window.showParentProgress = showParentProgress;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
  } else {
    initialize();
  }
})();
