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
    // Sécurité
    if (!mood || !moodImages[mood]) return;

    // ===== Thèmes =====
    document.body.classList.remove(
        "soft-mode",
        "motivation-mode",
        "joy-mode"
    );

    if (mood === "fatigue") document.body.classList.add("soft-mode");
    if (mood === "motivation") document.body.classList.add("motivation-mode");
    if (mood === "joyeux") document.body.classList.add("joy-mode");

    // ===== Texte mood =====
    const moodText = document.getElementById("mood-text");
    if (moodText) moodText.textContent = moodMessages[mood];

    // ===== IMAGE DE FOND (ICI EST LA CLÉ ✨) =====
    const moodBg = document.getElementById("mood-background");
    if (moodBg) {
        const images = getDailyMoodImages(mood);

        if (images.length > 0) {
            const chosen = images[Math.floor(Math.random() * images.length)];
            moodBg.style.backgroundImage = `url("${chosen}")`;
        }
    }

    // ===== Voile de transition =====
    const transition = document.getElementById("page-transition");
    if (transition) {
        transition.className = "";
        transition.classList.add("active", "mood-" + mood);
        setTimeout(() => transition.classList.remove("active"), 600);
    }

    // ===== Sauvegarde =====
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
// SERIES - AJOUT DYNAMIQUE
// =====================
const seriesList = document.getElementById('series-list');
const addseriesBtn = document.getElementById('add-series');

function renderseries() {
  seriesList.innerHTML = "";
  const items = JSON.parse(localStorage.getItem('seriesItems')) || [];

  items.forEach((item, index) => {
    const div = document.createElement('section');
    div.className = "aesthetic-block series-card";

    const stars = "⭐".repeat(item.rating);

    div.innerHTML = `
      <img src="${item.image || ''}">
      <div class="series-content">
        <h3>${item.title}</h3>
        <p><strong>Vibe :</strong> ${item.vibe}</p>
        <p><strong>Note :</strong> <span class="stars">${stars}</span> (${item.rating}/5)</p>
        <p>${item.comment}</p>
        <button class="edit-btn" data-index="${index}">Modifier ✏️</button>
      </div>
    `;

    seriesList.appendChild(div);
  });

  // Événement pour chaque bouton Modifier
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = btn.dataset.index;
      const items = JSON.parse(localStorage.getItem('seriesItems')) || [];
      const item = items[idx];

      // Remplir le formulaire avec les données existantes
      document.getElementById('series-title').value = item.title;
      document.getElementById('series-vibe').value = item.vibe;
      document.getElementById('series-comment').value = item.comment;
      document.getElementById('series-rating').value = item.rating;
      document.getElementById('series-image').value = item.image;

      // Supprimer l’ancien élément pour le remplacer lors de l’ajout
      items.splice(idx, 1);
      localStorage.setItem('seriesItems', JSON.stringify(items));
      renderseries();
    });
  });
}


if (addseriesBtn) {
  addseriesBtn.addEventListener('click', () => {
    const title = document.getElementById('series-title').value;
    const vibe = document.getElementById('series-vibe').value;
    const comment = document.getElementById('series-comment').value;
    const rating = Number(document.getElementById('series-rating').value);
    const image = document.getElementById('series-image').value;

    if (!title || !rating) {
      alert("Titre et note obligatoires 🌸");
      return;
    }

    const items = JSON.parse(localStorage.getItem('seriesItems')) || [];
    items.push({ title, vibe, comment, rating, image });
    localStorage.setItem('seriesItems', JSON.stringify(items));

    renderseries();

    document.getElementById('series-title').value = "";
    document.getElementById('series-vibe').value = "";
    document.getElementById('series-comment').value = "";
    document.getElementById('series-rating').value = "";
    document.getElementById('series-image').value = "";
  });

  renderseries();
}

// =====================
// MANGAS - AJOUT DYNAMIQUE
// =====================
const mangasList = document.getElementById('mangas-list');
const addmangasBtn = document.getElementById('add-mangas');

function rendermangas() {
  mangasList.innerHTML = "";
  const items = JSON.parse(localStorage.getItem('mangasItems')) || [];

  items.forEach((item, index) => {
    const div = document.createElement('section');
    div.className = "aesthetic-block mangas-card";

    const stars = "⭐".repeat(item.rating);

    div.innerHTML = `
      <img src="${item.image || ''}">
      <div class="mangas-content">
        <h3>${item.title}</h3>
        <p><strong>Vibe :</strong> ${item.vibe}</p>
        <p><strong>Note :</strong> <span class="stars">${stars}</span> (${item.rating}/5)</p>
        <p>${item.comment}</p>
        <button class="edit-btn" data-index="${index}">Modifier ✏️</button>
      </div>
    `;

    mangasList.appendChild(div);
  });

  // Événement pour chaque bouton Modifier
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = btn.dataset.index;
      const items = JSON.parse(localStorage.getItem('mangasItems')) || [];
      const item = items[idx];

      // Remplir le formulaire avec les données existantes
      document.getElementById('mangas-title').value = item.title;
      document.getElementById('mangas-vibe').value = item.vibe;
      document.getElementById('mangas-comment').value = item.comment;
      document.getElementById('mangas-rating').value = item.rating;
      document.getElementById('mangas-image').value = item.image;

      // Supprimer l’ancien élément pour le remplacer lors de l’ajout
      items.splice(idx, 1);
      localStorage.setItem('mangasItems', JSON.stringify(items));
      rendermangas();
    });
  });
}


if (addmangasBtn) {
  addmangasBtn.addEventListener('click', () => {
    const title = document.getElementById('mangas-title').value;
    const vibe = document.getElementById('mangas-vibe').value;
    const comment = document.getElementById('mangas-comment').value;
    const rating = Number(document.getElementById('mangas-rating').value);
    const image = document.getElementById('mangas-image').value;

    if (!title || !rating) {
      alert("Titre et note obligatoires 🌸");
      return;
    }

    const items = JSON.parse(localStorage.getItem('mangasItems')) || [];
    items.push({ title, vibe, comment, rating, image });
    localStorage.setItem('mangasItems', JSON.stringify(items));

    rendermangas();

    document.getElementById('mangas-title').value = "";
    document.getElementById('mangas-vibe').value = "";
    document.getElementById('mangas-comment').value = "";
    document.getElementById('mangas-rating').value = "";
    document.getElementById('mangas-image').value = "";
  });

  rendermangas();
}

// =====================
// LIVRES - AJOUT DYNAMIQUE
// =====================
const livresList = document.getElementById('livres-list');
const addlivresBtn = document.getElementById('add-livres');

function renderlivres() {
  livresList.innerHTML = "";
  const items = JSON.parse(localStorage.getItem('livresItems')) || [];

  items.forEach((item, index) => {
    const div = document.createElement('section');
    div.className = "aesthetic-block livres-card";

    const stars = "⭐".repeat(item.rating);

    div.innerHTML = `
      <img src="${item.image || ''}">
      <div class="livres-content">
        <h3>${item.title}</h3>
        <p><strong>Vibe :</strong> ${item.vibe}</p>
        <p><strong>Note :</strong> <span class="stars">${stars}</span> (${item.rating}/5)</p>
        <p>${item.comment}</p>
        <button class="edit-btn" data-index="${index}">Modifier ✏️</button>
      </div>
    `;

    livresList.appendChild(div);
  });

  // Événement pour chaque bouton Modifier
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = btn.dataset.index;
      const items = JSON.parse(localStorage.getItem('livresItems')) || [];
      const item = items[idx];

      // Remplir le formulaire avec les données existantes
      document.getElementById('livres-title').value = item.title;
      document.getElementById('livres-vibe').value = item.vibe;
      document.getElementById('livres-comment').value = item.comment;
      document.getElementById('livres-rating').value = item.rating;
      document.getElementById('livres-image').value = item.image;

      // Supprimer l’ancien élément pour le remplacer lors de l’ajout
      items.splice(idx, 1);
      localStorage.setItem('livresItems', JSON.stringify(items));
      renderlivres();
    });
  });
}


if (addlivresBtn) {
  addlivresBtn.addEventListener('click', () => {
    const title = document.getElementById('livres-title').value;
    const vibe = document.getElementById('livres-vibe').value;
    const comment = document.getElementById('livres-comment').value;
    const rating = Number(document.getElementById('livres-rating').value);
    const image = document.getElementById('livres-image').value;

    if (!title || !rating) {
      alert("Titre et note obligatoires 🌸");
      return;
    }

    const items = JSON.parse(localStorage.getItem('livresItems')) || [];
    items.push({ title, vibe, comment, rating, image });
    localStorage.setItem('livresItems', JSON.stringify(items));

    renderlivres();

    document.getElementById('livres-title').value = "";
    document.getElementById('livres-vibe').value = "";
    document.getElementById('livres-comment').value = "";
    document.getElementById('livres-rating').value = "";
    document.getElementById('livres-image').value = "";
  });

  renderlivres();
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
// RECETTES - CRUD
// =====================

const recipeList = document.getElementById("recipe-list");
const addRecipeBtn = document.getElementById("add-recipe");

function renderRecipes() {
  if (!recipeList) return;

  recipeList.innerHTML = "";
  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];

  recipes.forEach((recipe, index) => {
    const stars = "⭐".repeat(recipe.rating || 0);

    const ingredientsHTML = recipe.ingredients
      .map(i => `<li>${i.trim()}</li>`)
      .join("");

    const card = document.createElement("section");
    card.className = "aesthetic-block recipe-card";

    card.innerHTML = `
    <div class="recipe-main">
        <div class="recipe-content">
        <h3>${recipe.title}</h3>
        <h4><strong>Note :</strong> ${stars} (${recipe.rating}/5)</h4>
        <h4><strong>Temps :</strong> ${recipe.time}</h4>

        <h4>Ingrédients</h4>
        <ul>${ingredientsHTML}</ul>
        </div>

        ${recipe.image ? `<img src="${recipe.image}">` : ""}
    </div>

    <div class="recipe-steps-wrapper">
        <h4>Étapes</h4>
        <p>${recipe.steps}</p>
    </div>

    <div class="recipe-actions">
        <button class="edit-recipe" data-index="${index}">Modifier ✏️</button>
        <button class="delete-recipe" data-index="${index}">Supprimer 🗑️</button>
    </div>
    `;


    recipeList.appendChild(card);
  });

  // SUPPRIMER
  document.querySelectorAll(".delete-recipe").forEach(btn => {
    btn.addEventListener("click", () => {
      const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
      recipes.splice(btn.dataset.index, 1);
      localStorage.setItem("recipes", JSON.stringify(recipes));
      renderRecipes();
    });
  });

  // MODIFIER
  document.querySelectorAll(".edit-recipe").forEach(btn => {
    btn.addEventListener("click", () => {
      const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
      const recipe = recipes[btn.dataset.index];

      document.getElementById("recipe-title").value = recipe.title;
      document.getElementById("recipe-rating").value = recipe.rating;
      document.getElementById("recipe-time").value = recipe.time;
      document.getElementById("recipe-image").value = recipe.image;
      document.getElementById("recipe-ingredients").value = recipe.ingredients.join(", ");
      document.getElementById("recipe-steps").value = recipe.steps;

      recipes.splice(btn.dataset.index, 1);
      localStorage.setItem("recipes", JSON.stringify(recipes));
      renderRecipes();
    });
  });
}

if (addRecipeBtn) {
  addRecipeBtn.addEventListener("click", () => {
    const title = document.getElementById("recipe-title").value;
    const rating = Number(document.getElementById("recipe-rating").value);
    const time = document.getElementById("recipe-time").value;
    const image = document.getElementById("recipe-image").value;
    const ingredients = document
      .getElementById("recipe-ingredients")
      .value.split(",");
    const steps = document.getElementById("recipe-steps").value;

    if (!title || !rating) {
      alert("Titre et note obligatoires 🌸");
      return;
    }

    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    recipes.push({
      title,
      rating,
      time,
      image,
      ingredients,
      steps
    });

    localStorage.setItem("recipes", JSON.stringify(recipes));
    renderRecipes();

    document.querySelectorAll(
      "#recipe-title, #recipe-rating, #recipe-time, #recipe-image, #recipe-ingredients, #recipe-steps"
    ).forEach(i => (i.value = ""));
  });
  

  renderRecipes();
}

document.addEventListener("click", e => {
  if (!e.target.classList.contains("print-recipe")) return;

  const index = e.target.dataset.index;
  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  const r = recipes[index];

  const ingredientsHTML = recipe.ingredients.map(raw => {
  const name = raw.trim().toLowerCase();
  const key = Object.keys(INGREDIENTS_DB).find(i => name.includes(i));
  const emoji = key ? INGREDIENTS_DB[key] : "🍃";
  

  return `<li class="ingredient-item">${emoji} ${raw}</li>`;
}).join("");


  const printWindow = window.open("", "", "width=00,height=1000");
  printWindow.document.write(`
    <html>
      <head>
        <title>${r.title}</title>
        <style>
          body {
            font-family: 'Urbanist', sans-serif;
            padding: 40px;
            color: #333;
          }
          h1 { font-size: 32px; }
          h2 { margin-top: 30px; }
          ul { padding-left: 20px; }
          h5 { margin-left: 20px; }
          img {
            max-width: 100%;
            border-radius: 12px;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <h1>${r.title}</h1>
        <p><strong>Temps :</strong> ${r.time}</p>
        <p><strong>Note :</strong> ${"⭐".repeat(r.rating)}</p>
        ${r.image ? `<img src="${r.image}">` : ""}
        <h2>Ingrédients</h2>
        <ul>${ingredients}</ul>
        <h2>Étapes</h2>
        <h5>${r.steps}</h5>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
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
// =====================
// A REGARDER / LIRE
// =====================
const watchList = document.getElementById("watch-list");
const addWatchBtn = document.getElementById("add-watch");

function renderWatchList() {
  if (!watchList) return;
  watchList.innerHTML = "";

  const items = JSON.parse(localStorage.getItem("watchItems")) || [];

  items.forEach((item, index) => {
    const div = document.createElement("section");
    div.className = "watch-card aesthetic-block";

    div.innerHTML = `
    <div class="watch-content">
        <h3>${item.title}</h3>
        <p><strong>${item.type}</strong></p>
        ${item.note ? `<p>${item.note}</p>` : ""}
    
        <button data-index="${index}" class="delete-watch">Supprimer</button>
    </div>
        ${item.image ? `<img src="${item.image}" class="watch-image">` : ""}
    `;

    watchList.appendChild(div);
  });

  document.querySelectorAll(".delete-watch").forEach(btn => {
    btn.addEventListener("click", () => {
      const items = JSON.parse(localStorage.getItem("watchItems")) || [];
      items.splice(btn.dataset.index, 1);
      localStorage.setItem("watchItems", JSON.stringify(items));
      renderWatchList();
    });
  });
}

if (addWatchBtn) {
  addWatchBtn.addEventListener("click", () => {
    const title = document.getElementById("watch-title").value;
    const type = document.getElementById("watch-type").value;
    const note = document.getElementById("watch-note").value;
    const image = document.getElementById("watch-image").value;



    if (!title) return;

    const items = JSON.parse(localStorage.getItem("watchItems")) || [];
    items.push({ title, type, note, image });

    localStorage.setItem("watchItems", JSON.stringify(items));
    renderWatchList();

    document.getElementById("watch-title").value = "";
    document.getElementById("watch-note").value = "";
  });

  renderWatchList();
}
// =====================
// RAPPEL ACCUEIL - A REGARDER
// =====================
const randomWatch = document.getElementById("random-watch");

if (randomWatch) {
  const items = JSON.parse(localStorage.getItem("watchItems")) || [];

  if (items.length > 0) {
    const item = items[Math.floor(Math.random() * items.length)];
    randomWatch.innerHTML = `
      <h4>À regarder</h4>
      <strong>${item.title}</strong>
      <p>${item.type}</p>
      ${item.image ? `<img src="${item.image}" class="random-watch-img">` : ""}
    `;
  }
}
/* // =====================
// IMAGES DOUCES DU JOUR
// =====================
const dailyImagesContainer = document.getElementById("daily-images");

if (dailyImagesContainer) {
  const images = JSON.parse(localStorage.getItem("watchItems")) || [];

  if (images.length > 0) {
    const today = new Date().toDateString();
    let index = today.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
    index = index % images.length;

    const imageUrl = images[index].image;

    for (let i = 0; i < 3; i++) {
      const div = document.createElement("div");
      div.className = "daily-image";

      div.style.top = `${20 + Math.random() * 200}px`;
      div.style.right = `${20 + Math.random() * 200}px`;
      div.style.setProperty("--rot", `${-5 + Math.random() * 10}deg`);

      div.innerHTML = `<img src="${imageUrl}" alt="">`;
      dailyImagesContainer.appendChild(div);
    }
  }
} */
// =====================
// NOTIFICATIONS D'ALLER SUR LE SITE
// =====================
if ("Notification" in window) {
  Notification.requestPermission();
}

function dailyReminder() {
  if (Notification.permission === "granted") {
    new Notification("🌸 Petit rappel doux", {
      body: "Va faire un tour sur ton cocon 💛",
      icon: "/icon.png"
    });
  }
}
const lastNotif = localStorage.getItem("lastNotif"); /* permet d'avoir une notification par jour d'aller sur le site */ 
if (lastNotif !== today) {
  dailyReminder();
  localStorage.setItem("lastNotif", today);
}

if (randomWatch) {
  randomWatch.addEventListener("click", () => {
    const targetId = randomWatch.dataset.tab;
    const targetPage = document.getElementById(targetId);

    if (!targetPage) return;

    // désactiver pages
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));

    // activer la bonne page
    targetPage.classList.add("active");

    // scroll en haut (mobile friendly)
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
const CACHE_NAME = "journal-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js"
];

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
const notifBtn = document.getElementById("enable-notifs");

if (notifBtn) {
  notifBtn.addEventListener("click", async () => {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      alert("🌸 Notifications activées");
    } else {
      alert("Notifications refusées");
    }
  });
}

