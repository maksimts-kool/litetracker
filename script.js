// Sõnavara massiiv: iga objekt sisaldab hajusrakenduste termini eesti keeles (et) ja vene keeles (ru)
const words = [
  { et: "hajusrakendus", ru: "распределённое приложение" },
  { et: "server", ru: "сервер" },
  { et: "klient", ru: "клиент" },
  { et: "võrk", ru: "сеть" },
  { et: "andmebaas", ru: "база данных" },
  { et: "sõlm", ru: "узел" },
  { et: "päring", ru: "запрос" },
  { et: "vastus", ru: "ответ" },
  { et: "protokoll", ru: "протокол" },
  { et: "koormusjaotur", ru: "балансировщик нагрузки" },
  { et: "replikatsioon", ru: "репликация" },
  { et: "tõrketaluvus", ru: "отказоустойчивость" },
  { et: "skaleeritavus", ru: "масштабируемость" },
  { et: "vahemälu", ru: "кэш" },
  { et: "sõnum", ru: "сообщение" },
  { et: "järjekord", ru: "очередь" },
  { et: "mikroteenus", ru: "микросервис" },
  { et: "pilv", ru: "облако" },
  { et: "ühendus", ru: "соединение" },
  { et: "viivitus", ru: "задержка" },
  { et: "sünkroniseerimine", ru: "синхронизация" },
  { et: "tehing", ru: "транзакция" },
  { et: "liides", ru: "интерфейс" },
  { et: "turvalisus", ru: "безопасность" }
];

// Ühine statistika mõlema veeru jaoks – loendurid on väljaspool setupQuiz funktsiooni, et neid jagada
const stats = { correct: 0, wrong: 0 };

// Valib massiivist juhusliku sõna – Math.random() annab arvu 0..1, mis korrutatakse massiivi pikkusega.
// Kui "exclude" on antud, valitakse uuesti seni, kuni saadakse eelmisest erinev sõna (ei korda sama sõna järjest)
function getRandomWord(exclude) {
  let word;
  do {
    word = words[Math.floor(Math.random() * words.length)];
  } while (word === exclude && words.length > 1);
  return word;
}

// Normaliseerib vastuse: eemaldab tühikud, teeb väiketähtedeks ja asendab "ё" tähega "е",
// et kasutaja ei saaks vale vastust ainult suurtähe või ё/е erinevuse pärast
function normalize(text) {
  return text.trim().toLowerCase().replace(/ё/g, "е");
}

// Tulemuse tüübile vastav Lucide ikoon (avatud lähtekoodiga ikoonikomplekt)
const resultIcons = { success: "circle-check", error: "circle-x", warning: "triangle-alert" };

// Kuvab tulemuse daisyUI "alert" komponendina; tüüp määrab värvi ja ikooni (success / error / warning).
// Tekst lisatakse textContent kaudu, et sisestatud väärtus ei saaks HTML-ina käivituda
function showResult(el, type, message) {
  el.className = "alert alert-soft alert-" + type + " mt-4";
  el.innerHTML = '<i data-lucide="' + resultIcons[type] + '" class="size-5 shrink-0"></i>';
  const text = document.createElement("span");
  text.textContent = message;
  el.appendChild(text);
  lucide.createIcons();
  el.hidden = false;
}

// Uuendab statistika plokki; täpsus arvutatakse protsentides ja ümardatakse täisarvuks
function renderStats() {
  const total = stats.correct + stats.wrong;
  document.getElementById("stat-correct").textContent = stats.correct;
  document.getElementById("stat-wrong").textContent = stats.wrong;
  document.getElementById("stat-accuracy").textContent =
    total === 0 ? "–" : Math.round((stats.correct / total) * 100) + "%";
}

// Seob ühe tabeli veeru loogika: "from" on kuvatava sõna keel, "to" on keel, milles vastust kontrollitakse.
// Sama funktsioon teenindab mõlemat suunda, seega pole vaja koodi dubleerida
function setupQuiz(from, to) {
  const wordEl = document.getElementById("word-" + from);
  const answerEl = document.getElementById("answer-" + from);
  const resultEl = document.getElementById("result-" + from);
  let currentWord = null;
  let answered = false; // statistikasse läheb ainult esimene kontroll iga sõna kohta

  // Kuvab veergu uue random sõna ja tühjendab eelmise vastuse ning tulemuse
  function nextWord() {
    currentWord = getRandomWord(currentWord);
    answered = false;
    wordEl.textContent = currentWord[from];
    answerEl.value = "";
    resultEl.hidden = true;
  }

  // Kontrollkood: võrdleb kasutaja vastust massiivis oleva õige tõlkega sihtkeeles
  function checkAnswer() {
    const userAnswer = normalize(answerEl.value);

    // Tühja vastuse korral ei loeta seda veaks, vaid palutakse midagi sisestada
    if (userAnswer === "") {
      showResult(resultEl, "warning", "Palun sisesta vastus.");
      answerEl.focus();
      return;
    }

    const isCorrect = userAnswer === normalize(currentWord[to]);

    // Loendurit suurendatakse ainult esimesel katsel, et sama sõna korduv kontroll ei moonutaks statistikat
    if (!answered) {
      isCorrect ? stats.correct++ : stats.wrong++;
      answered = true;
      renderStats();
    }

    if (isCorrect) {
      showResult(resultEl, "success", "Õige!");
    } else {
      showResult(resultEl, "error", "Vale. Õige vastus on: " + currentWord[to]);
    }
  }

  document.getElementById("check-" + from).addEventListener("click", checkAnswer);
  document.getElementById("next-" + from).addEventListener("click", function () {
    nextWord();
    answerEl.focus();
  });
  answerEl.addEventListener("keydown", function (event) {
    if (event.key === "Enter") checkAnswer();
  });

  nextWord();
}

// 1. veerg: eesti sõna → venekeelne vaste; 2. veerg: vene sõna → eestikeelne vaste
setupQuiz("et", "ru");
setupQuiz("ru", "et");

// Asendab kõik lehel olevad <i data-lucide="..."> elemendid SVG ikoonidega
lucide.createIcons();

// Värskendamise nupp laeb lehe uuesti, mis genereerib mõlemasse veergu uue random sõna
document.getElementById("refreshBtn").addEventListener("click", function () {
  location.reload();
});
