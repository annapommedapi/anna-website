// =====================
// NAVIGATION ENTRE PAGES
// =====================
const navBtns = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');

navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.dataset.tab;
        const targetPage = document.getElementById(targetId);
        const currentPage = document.querySelector('.page.active');

        if (!targetPage || targetPage === currentPage) return;

        // désactiver anciens boutons
        navBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // transition sortie
        currentPage.classList.remove('active');

        setTimeout(() => {
            pages.forEach(p => p.classList.remove('active'));
            targetPage.classList.add('active');
        }, 200);
    });
});


// =====================
// MOIS DÉROULANTS
// =====================
document.querySelectorAll('.month-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        if (!content) return;

        content.style.display =
            content.style.display === 'block' ? 'none' : 'block';
    });
});


// =====================
// ONGLET LIVRES / SÉRIES
// =====================
document.querySelectorAll('.tab-btn').forEach(tab => {
    tab.addEventListener('click', () => {
        const container = tab.closest('.month-content');
        if (!container) return;

        container.querySelectorAll('.tab-btn')
            .forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        container.querySelectorAll('.tab-content')
            .forEach(c => c.classList.remove('active'));

        const target = container.querySelector(`#${tab.dataset.tab}`);
        if (target) target.classList.add('active');
    });
});


// =====================
// COMPTEURS ANIMÉS
// =====================
document.querySelectorAll('.counter').forEach(counter => {
    const span = counter.querySelector('span');
    const target = Number(counter.dataset.target);
    let current = 0;

    const update = () => {
        if (current < target) {
            current += Math.ceil(target / 60);
            span.textContent = Math.min(current, target);
            requestAnimationFrame(update);
        }
    };
    update();
});


// =====================
// PARTAGES / AVIS
// =====================
const shareForm = document.getElementById('shareForm');
if (shareForm) {
    shareForm.addEventListener('submit', e => {
        e.preventDefault();

        const name = shareForm.name.value;
        const msg = shareForm.message.value;

        const div = document.createElement('div');
        div.innerHTML = `<strong>${name}</strong> : ${msg}`;

        const heart = document.createElement('button');
        heart.innerHTML = "❤️ <span>0</span>";
        heart.style.marginLeft = "10px";

        heart.addEventListener('click', () => {
            const span = heart.querySelector('span');
            span.textContent = Number(span.textContent) + 1;
        });

        div.appendChild(heart);
        document.querySelector('.shares').appendChild(div);
        shareForm.reset();
    });
}


// =====================
// CITATION D'ACCUEIL
// =====================
const accueilQuote = document.querySelector('#accueil .aesthetic-block p');
const quotes = [
    "Chaque jour est une nouvelle aventure 🌸",
    "Respire, tout va bien 🌿",
    "Les petites choses comptent ✨",
    "Avance doucement 💗"
];

if (accueilQuote) {
    accueilQuote.textContent =
        quotes[Math.floor(Math.random() * quotes.length)];
}


// =====================
// JOURNAL – MOOD
// =====================
const moodMessages = {
    calme: "Prends ton temps 🌿",
    joyeux: "Savoure ce moment ✨",
    fatigue: "Tu peux ralentir 🌧",
    motivation: "Tu es capable 🔥"
};

const moodText = document.getElementById('mood-text');

document.querySelectorAll('.mood-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const mood = btn.dataset.mood;
        moodText.textContent = moodMessages[mood];
        localStorage.setItem('mood', mood);
    });
});

const savedMood = localStorage.getItem('mood');
if (savedMood && moodText) {
    moodText.textContent = moodMessages[savedMood];
}


// =====================
// PHRASE DU JOUR
// =====================
const dailyQuoteEl = document.getElementById('daily-quote');
const dailyQuotes = [
    "Tu fais de ton mieux 🌸",
    "Le calme est une force 🌿",
    "Sois douce avec toi-même 💗",
    "Chaque pas compte ✨"
];

if (dailyQuoteEl) {
    const today = new Date().toDateString();
    if (localStorage.getItem('quoteDate') !== today) {
        localStorage.setItem(
            'dailyQuote',
            dailyQuotes[Math.floor(Math.random() * dailyQuotes.length)]
        );
        localStorage.setItem('quoteDate', today);
    }
    dailyQuoteEl.textContent = localStorage.getItem('dailyQuote');
}


// =====================
// SPORT
// =====================
let sportTime = Number(localStorage.getItem('sportTime')) || 0;
const sportTimeEl = document.getElementById('sport-time');
if (sportTimeEl) sportTimeEl.textContent = sportTime;

document.querySelectorAll('.sport-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        sportTime += Number(btn.dataset.add);
        localStorage.setItem('sportTime', sportTime);
        sportTimeEl.textContent = sportTime;
    });
});

const sportQuotes = [
    "Bouger doucement suffit 🌿",
    "Écoute ton corps 💗",
    "Chaque mouvement compte ✨"
];

const sportQuoteEl = document.getElementById('sport-quote');
if (sportQuoteEl) {
    sportQuoteEl.textContent =
        sportQuotes[Math.floor(Math.random() * sportQuotes.length)];
}
// =====================
// DROPDOWN MOBILE
// =====================
const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownMenu = document.querySelector('.dropdown-menu');

if (dropdownBtn && dropdownMenu) {
    dropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.style.display =
            dropdownMenu.style.display === 'flex' ? 'none' : 'flex';
    });

    document.addEventListener('click', () => {
        dropdownMenu.style.display = 'none';
    });
}
// =====================
// CULTURE - AJOUT DYNAMIQUE
// =====================
const cultureList = document.getElementById('culture-list');
const addCultureBtn = document.getElementById('add-culture');

function renderCulture() {
    cultureList.innerHTML = "";
    const items = JSON.parse(localStorage.getItem('cultureItems')) || [];

    items.forEach(item => {
        const div = document.createElement('section');
        div.className = "aesthetic-block culture-card";

        const stars = "⭐".repeat(item.rating);

        div.innerHTML = `
            <img src="${item.image || ''}">
            <div class="culture-content">
                <h3>${item.title}</h3>
                <p><strong>Vibe :</strong> ${item.vibe}</p>
                <p><strong>Note :</strong> <span class="stars">${stars}</span> (${item.rating}/5)</p>
                <p>${item.comment}</p>
            </div>
        `;

        cultureList.appendChild(div);
    });
}

if (addCultureBtn) {
    addCultureBtn.addEventListener('click', () => {
        const title = document.getElementById('culture-title').value;
        const vibe = document.getElementById('culture-vibe').value;
        const comment = document.getElementById('culture-comment').value;
        const rating = Number(document.getElementById('culture-rating').value);
        const image = document.getElementById('culture-image').value;

        if (!title || !rating) {
            alert("Titre et note obligatoires 🌸");
            return;
        }

        const items = JSON.parse(localStorage.getItem('cultureItems')) || [];
        items.push({ title, vibe, comment, rating, image });
        localStorage.setItem('cultureItems', JSON.stringify(items));

        renderCulture();

        document.getElementById('culture-title').value = "";
        document.getElementById('culture-vibe').value = "";
        document.getElementById('culture-comment').value = "";
        document.getElementById('culture-rating').value = "";
        document.getElementById('culture-image').value = "";
    });

    renderCulture();
}