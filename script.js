// =====================
// NAVIGATION ENTRE PAGES
// =====================
const navBtns = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');
const transition = document.getElementById("page-transition");

navBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const targetId = btn.dataset.tab;
    const targetPage = document.getElementById(targetId);
    const currentPage = document.querySelector(".page.active");

    if (!targetPage || targetPage === currentPage) return;

    // gestion des boutons actifs
    navBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // transition
    transition.classList.add("active");

    setTimeout(() => {
      currentPage.classList.remove("active");
      targetPage.classList.add("active");
    }, 300);

    setTimeout(() => {
      transition.classList.remove("active");
    }, 700);
  });
});

// =====================
// MOIS DÉROULANTS
// =====================
document.querySelectorAll('.month-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const content = btn.nextElementSibling;
    if (!content) return;
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
  });
});

// =====================
// ONGLET LIVRES / SÉRIES
// =====================
document.querySelectorAll('.tab-btn').forEach(tab => {
  tab.addEventListener('click', () => {
    const container = tab.closest('.month-content');
    if (!container) return;

    container.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    container.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
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
  accueilQuote.textContent = quotes[Math.floor(Math.random() * quotes.length)];
}

// =====================
// JOURNAL - MOODS + THEMES
// =====================
const moodMessages = {
  calme: "Prends ton temps, tout va bien 🌿",
  joyeux: "Savoure ce moment ✨",
  fatigue: "Tu as le droit de ralentir 🌧",
  motivation: "Tu avances, continue 🔥"
};

const moodImages = {
  calme: [
    "https://i.pinimg.com/736x/26/2d/12/262d120715e1c0c82eab2cfb37d4f2ba.jpg",
    "https://i.pinimg.com/736x/59/44/47/594447a713289f1922ff03684506fa2c.jpg",
    "https://i.pinimg.com/736x/48/fb/e7/48fbe77ff1b311f694ee97d88b8603e9.jpg"

  ],
  fatigue: [
    "https://i.pinimg.com/736x/58/26/10/582610b655da013dfe8d00ee6675eaf7.jpg",
    "https://i.pinimg.com/736x/fd/e2/ee/fde2ee0761547a2b1efd2fccd788fd03.jpg",
    "https://i.pinimg.com/736x/7e/09/27/7e0927fbc079a59a16de47947160d5cb.jpg",
    "https://i.pinimg.com/736x/a2/39/18/a23918cfbf98fca7da8a0118324b9b33.jpg",
    "https://i.pinimg.com/736x/3b/0b/08/3b0b08ccec5397b26ba71b898e5f61a2.jpg"


  ],
  motivation: [
    "https://i.pinimg.com/736x/a1/e0/1c/a1e01cc133567cdcdc9a5d053ab19f7b.jpg",
    "https://i.pinimg.com/1200x/3c/ff/aa/3cffaa70d5a10420bfe8e9df55908b8e.jpg",
    "https://i.pinimg.com/736x/ce/3a/98/ce3a98816d6db5ea974926e6ffb999d0.jpg",
    "https://i.pinimg.com/1200x/ba/b0/2a/bab02a656b677a4b4101c2b8c1eff127.jpg",
    "https://i.pinimg.com/736x/d0/96/80/d096804f8a9263acbe592da90f32eb8a.jpg",
    "https://i.pinimg.com/736x/ff/0c/bb/ff0cbbe38f46d6634638b5fc25f28609.jpg",

    

  ],
  joyeux: [
    "https://i.pinimg.com/736x/2e/36/54/2e3654a18030190297e991f6a45313d8.jpg",
    "https://i.pinimg.com/736x/ae/c8/8e/aec88e2c54b4d3a6f30a78391ebbcfc6.jpg",
    "https://i.pinimg.com/736x/48/05/10/4805100539937cf485916f351e44ea90.jpg",
    "https://i.pinimg.com/1200x/0f/76/99/0f769919a3c618f24e271aadbf7df226.jpg",



  ]
};

const moodGallery = document.getElementById('mood-gallery');
const today = new Date().toDateString();

function getDailyMoodImages(mood) {
  const key = "moodImages-" + mood + "-" + today;
  let images = JSON.parse(localStorage.getItem(key));

  if (!images) {
    const pool = moodImages[mood].filter(url => url);
    images = pool.sort(() => 0.5 - Math.random()).slice(0, 4);
    localStorage.setItem(key, JSON.stringify(images));
  }

  return images;
}

function applyMood(mood) {
    // ... ton code existant pour body
    document.body.classList.remove("soft-mode","motivation-mode","joy-mode");
    if (mood === "fatigue") document.body.classList.add("soft-mode");
    if (mood === "motivation") document.body.classList.add("motivation-mode");
    if (mood === "joyeux") document.body.classList.add("joy-mode");

    // Changer texte et images
    document.getElementById('mood-text').innerText = moodMessages[mood];
    if (moodGallery) {
        moodGallery.innerHTML = "";
        const images = getDailyMoodImages(mood);
        images.forEach(url => {
            if (url) {
                const img = document.createElement("img");
                img.src = url;
                moodGallery.appendChild(img);
            }
        });
    }

    // Changer couleur du voile
    const transition = document.getElementById("page-transition");
    if (transition) {
        transition.classList.remove("mood-calme","mood-joyeux","mood-fatigue","mood-motivation");
        transition.classList.add("mood-" + mood);
    }

    localStorage.setItem("mood", mood);
    applyNightMode(mood);
}

// =====================
// MODE NUIT AUTO
// =====================
function applyNightMode(mood) {
  const hour = new Date().getHours();
  const isNight = hour >= 20 || hour < 7;

  document.body.classList.remove(
    "night-mode",
    "night-calme",
    "night-fatigue",
    "night-motivation",
    "night-joyeux"
  );

  if (isNight) {
    document.body.classList.add("night-mode");
    document.body.classList.add("night-" + mood);
  }
}

document.querySelectorAll('.mood-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    applyMood(btn.dataset.mood);
  });
});

const savedMood = localStorage.getItem("mood");
if (savedMood) applyMood(savedMood);

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
  if (localStorage.getItem('quoteDate') !== today) {
    localStorage.setItem('dailyQuote', dailyQuotes[Math.floor(Math.random() * dailyQuotes.length)]);
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
if (sportQuoteEl) sportQuoteEl.textContent = sportQuotes[Math.floor(Math.random() * sportQuotes.length)];

// =====================
// DROPDOWN MOBILE
// =====================
const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownMenu = document.querySelector('.dropdown-menu');

if (dropdownBtn && dropdownMenu) {
  dropdownBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownMenu.style.display = dropdownMenu.style.display === 'flex' ? 'none' : 'flex';
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

  items.forEach((item, index) => {
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
        <button class="edit-btn" data-index="${index}">Modifier ✏️</button>
      </div>
    `;

    cultureList.appendChild(div);
  });

  // Événement pour chaque bouton Modifier
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = btn.dataset.index;
      const items = JSON.parse(localStorage.getItem('cultureItems')) || [];
      const item = items[idx];

      // Remplir le formulaire avec les données existantes
      document.getElementById('culture-title').value = item.title;
      document.getElementById('culture-vibe').value = item.vibe;
      document.getElementById('culture-comment').value = item.comment;
      document.getElementById('culture-rating').value = item.rating;
      document.getElementById('culture-image').value = item.image;

      // Supprimer l’ancien élément pour le remplacer lors de l’ajout
      items.splice(idx, 1);
      localStorage.setItem('cultureItems', JSON.stringify(items));
      renderCulture();
    });
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

// =====================
// EXPORT DONNÉES
// =====================
const exportBtn = document.createElement("button");
exportBtn.textContent = "Exporter mes données 🌸";
exportBtn.id = "export-data";
exportBtn.style.margin = "20px";
if (cultureList) cultureList.parentNode.insertBefore(exportBtn, cultureList);

exportBtn.addEventListener("click", () => {
  const data = {
    culture: localStorage.getItem("cultureItems"),
    moods: localStorage.getItem("mood"),
    sport: localStorage.getItem("sportTime")
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "journal_backup.json";
  link.click();
});

// =====================
// MOOD TRACKER MENSUEL
// =====================
const tracker = document.getElementById("mood-tracker");

if (tracker) {
  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  tracker.innerHTML = "";

  for (let i = 1; i <= daysInMonth; i++) {
    const day = document.createElement("div");
    day.className = "mood-day";

    const key = `mood-${i}`;
    const storedMood = localStorage.getItem(key);
    if (storedMood) day.classList.add("mood-" + storedMood);

    tracker.appendChild(day);
  }

  if (savedMood) {
    const todayNumber = new Date().getDate();
    localStorage.setItem(`mood-${todayNumber}`, savedMood);
  }
}
