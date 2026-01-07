// =====================
// NAVIGATION PAGES
// =====================
const navBtns = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');

navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const current = document.querySelector('.page.active');
        const targetPage = document.getElementById(btn.dataset.tab);

        if(current === targetPage) return; // si la page est déjà active

        // Animation disparition page actuelle
        current.style.opacity = 0;
        current.style.transform = "translateY(-20px)";

        setTimeout(() => {
            // Retirer active de l'ancienne page
            current.classList.remove('active');
            current.style.transform = "translateY(20px)"; // reset pour réutilisation

            // Ajouter active à la nouvelle page
            targetPage.classList.add('active');
            setTimeout(() => {
                targetPage.style.opacity = 1;
                targetPage.style.transform = "translateY(0)";
            }, 50);
        }, 300);

        // Mettre le bouton actif
        navBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});



// Onglets mois
const tabs = document.querySelectorAll('.tab-btn');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const parent = tab.closest('.month-content');
        parent.querySelectorAll('.tab-btn').forEach(t=>t.classList.remove('active'));
        tab.classList.add('active');
        parent.querySelectorAll('.tab-content').forEach(c=>c.classList.remove('active'));
        parent.querySelector(`#${tab.dataset.tab}`).classList.add('active');
    });
});

// Mois déroulants
const monthBtns = document.querySelectorAll('.month-btn');
monthBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
});

// Compteurs animés
const counters = document.querySelectorAll('.counter span');
counters.forEach(counter=>{
    const updateCount = () => {
        const target = +counter.parentElement.dataset.target;
        let count = +counter.innerText;
        let increment = target/100;
        if(count<target){
            counter.innerText = Math.ceil(count+increment);
            setTimeout(updateCount,20);
        } else { counter.innerText = target; }
    }
    updateCount();
});

// Mur de partages
document.getElementById('shareForm').addEventListener('submit', e=>{
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const msg = form.message.value;
    const div = document.createElement('div');
    div.innerHTML = `<strong>${name}:</strong> ${msg}`;
    document.querySelector('.shares').appendChild(div);
    form.reset();
    alert("Message envoyé ✨");
});

// Citations aléatoires
const quotes = [
    "Chaque jour est une nouvelle aventure 🌸",
    "Souris à la vie ✨",
    "Le bonheur se trouve dans les petites choses 💿",
    "Respire, tout va bien 🌿"
];
function showRandomQuote(){
    const q = quotes[Math.floor(Math.random()*quotes.length)];
    const container = document.querySelector('.aesthetic-block p');
    if(container) container.innerText = q;
}
setInterval(showRandomQuote,10000);
showRandomQuote();
