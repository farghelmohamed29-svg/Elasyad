const stage = document.querySelector("#stage");
const subject = document.querySelector("#subject");
const lessonTitle = document.querySelector("#lessonTitle");
const lessonDesc = document.querySelector("#lessonDesc");
const completeBtn = document.querySelector("#completeBtn");
const completeMessage = document.querySelector("#completeMessage");
const progressCount = document.querySelector("#progressCount");
const progressPercent = document.querySelector("#progressPercent");

let completed = localStorage.getItem("sayad-lesson-completed") === "true";

function updateLesson() {
  lessonTitle.textContent = `مقدمة في ${subject.value}`;
  lessonDesc.textContent = `المرحلة: ${stage.value} · أضف شرح ${subject.value} هنا.`;
}
function updateProgress() {
  progressCount.textContent = completed ? "1" : "0";
  progressPercent.textContent = completed ? "100%" : "0%";
  completeBtn.textContent = completed ? "إلغاء الإكمال" : "علّم كمكتمل";
  completeMessage.classList.toggle("hidden", !completed);
}
stage.addEventListener("change", updateLesson);
subject.addEventListener("change", updateLesson);
completeBtn.addEventListener("click", () => {
  completed = !completed;
  localStorage.setItem("sayad-lesson-completed", String(completed));
  updateProgress();
});

document.querySelectorAll(".answer").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".answer").forEach(b => b.classList.remove("correct", "wrong"));
    const correct = button.dataset.correct === "true";
    button.classList.add(correct ? "correct" : "wrong");
    document.querySelector("#quizFeedback").textContent = correct
      ? "إجابة صحيحة! القوة تُقاس بالنيوتن."
      : "مش دي الإجابة. فكّر في وحدة قياس القوة في النظام الدولي.";
  });
});

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
}

let installPrompt;
const installBtn = document.querySelector("#installBtn");
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPrompt = event;
  installBtn.classList.remove("hidden");
});
installBtn.addEventListener("click", async () => {
  if (!installPrompt) return;
  installPrompt.prompt();
  await installPrompt.userChoice;
  installPrompt = null;
  installBtn.classList.add("hidden");
});
updateLesson();
updateProgress();
