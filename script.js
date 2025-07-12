/* ---------------- helpers de cookies ---------------- */
const setCookie = (name, value, days = 365) => {
  const exp = new Date(Date.now() + days*864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${exp};path=/`;
};
const getCookie = name => {
  const m = document.cookie.split('; ').find(r => r.startsWith(name+'='));
  return m ? decodeURIComponent(m.split('=')[1]) : '';
};

/* ---------------- saludo inicial -------------------- */
let userName = getCookie('law_user');
if(!userName){
  userName = prompt('¡Bienvenida/o! ¿Cómo te llamas?')?.trim() || 'Estudiante';
  setCookie('law_user', userName);
}
document.getElementById('userHeader').textContent = `Malla Derecho – ${userName}`;

/* ---------------- estado almacenado ----------------- */
let passed = [];
try{ passed = JSON.parse(getCookie('law_passed') || '[]'); }catch{ passed = []; }

/* ---------------- gestor de clic -------------------- */
document.querySelectorAll('.course').forEach(course => {
  const id = course.dataset.id;
  if(passed.includes(id)) course.classList.add('passed');

  course.addEventListener('click', () => {
    const willPass = !course.classList.contains('passed');
    course.classList.toggle('passed');

    if(willPass){
      if(!passed.includes(id)) passed.push(id);
      confetti({ particleCount: 120, spread: 70, origin:{ y:0.6 } });
    }else{
      passed = passed.filter(r => r !== id);
    }
    setCookie('law_passed', JSON.stringify(passed));
  });
});
