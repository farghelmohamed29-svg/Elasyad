let currentRole = "student";
function showAuth(role){
  currentRole=role;
  document.getElementById('welcome').classList.add('hidden');
  document.querySelector('.pricing').classList.add('hidden');
  document.getElementById('dashboard').classList.add('hidden');
  document.getElementById('auth').classList.remove('hidden');
  document.getElementById('authTitle').textContent=role==='student'?'دخول الطالب':'دخول ولي الأمر';
  document.getElementById('authDesc').textContent=role==='student'?'ادخل بيانات الطالب التجريبية.':'ادخل بيانات ولي الأمر واربط الحساب بكود الطالب.';
  document.getElementById('studentFields').classList.toggle('hidden',role!=='student');
  document.getElementById('parentFields').classList.toggle('hidden',role!=='parent');
  document.getElementById('authError').textContent='';
}
function goHome(){
  document.getElementById('auth').classList.add('hidden');
  document.getElementById('dashboard').classList.add('hidden');
  document.getElementById('welcome').classList.remove('hidden');
  document.querySelector('.pricing').classList.remove('hidden');
}
function demoLogin(){
  const phone=document.getElementById('phone').value.trim();
  const password=document.getElementById('password').value.trim();
  if(!phone||!password){document.getElementById('authError').textContent='اكتب رقم الموبايل وكلمة المرور للعرض التجريبي.';return;}
  if(currentRole==='parent'&&!document.getElementById('studentCode').value.trim()){document.getElementById('authError').textContent='اكتب كود الطالب التجريبي SAYAD-1024.';return;}
  document.getElementById('auth').classList.add('hidden');
  document.getElementById('dashboard').classList.remove('hidden');
  document.getElementById('welcome').classList.add('hidden');
  document.querySelector('.pricing').classList.add('hidden');
  document.getElementById('studentDash').classList.toggle('hidden',currentRole!=='student');
  document.getElementById('parentDash').classList.toggle('hidden',currentRole!=='parent');
  document.getElementById('roleLabel').textContent=currentRole==='student'?'حساب الطالب':'حساب ولي الأمر';
  document.getElementById('dashTitle').textContent=currentRole==='student'?'أهلاً بيك في حسابك':'أهلاً بيك في متابعة ابنك';
  if(currentRole==='student')document.getElementById('studentGrade').textContent=document.getElementById('grade').value;
  else document.getElementById('linkedStudent').textContent=document.getElementById('studentCode').value.trim();
  window.scrollTo({top:0,behavior:'smooth'});
}
function logout(){goHome();document.getElementById('phone').value='';document.getElementById('password').value='';}
function showMessage(message){
  const toast=document.getElementById('toast');toast.textContent=message;toast.classList.remove('hidden');
  setTimeout(()=>toast.classList.add('hidden'),3500);
}
