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

// Valib massiivist juhusliku indeksi – Math.random() annab arvu 0..1, mis korrutatakse massiivi pikkusega
function getRandomWord() {
  const index = Math.floor(Math.random() * words.length);
  return words[index];
}

// Normaliseerib vastuse: eemaldab tühikud, teeb väiketähtedeks ja asendab "ё" tähega "е",
// et kasutaja ei saaks vale vastust ainult suurtähe või ё/е erinevuse pärast
function normalize(text) {
  return text.trim().toLowerCase().replace(/ё/g, "е");
}

// Seob ühe tabeli veeru loogika: "from" on kuvatava sõna keel, "to" on keel, milles vastust kontrollitakse.
// Sama funktsioon teenindab mõlemat suunda, seega pole vaja koodi dubleerida
function setupQuiz(from, to) {
  const wordEl = document.getElementById("word-" + from);
  const answerEl = document.getElementById("answer-" + from);
  const resultEl = document.getElementById("result-" + from);
  const currentWord = getRandomWord();

  wordEl.textContent = currentWord[from];

  // Kontrollkood: võrdleb kasutaja vastust massiivis oleva õige tõlkega sihtkeeles
  function checkAnswer() {
    const userAnswer = normalize(answerEl.value);

    // Tühja vastuse korral ei loeta seda veaks, vaid palutakse midagi sisestada
    if (userAnswer === "") {
      resultEl.textContent = "Palun sisesta vastus.";
      return;
    }

    if (userAnswer === normalize(currentWord[to])) {
      resultEl.textContent = "Õige! 🎉";
    } else {
      resultEl.textContent = "Vale. Õige vastus on: " + currentWord[to];
    }
  }

  document.getElementById("check-" + from).addEventListener("click", checkAnswer);
  answerEl.addEventListener("keydown", function (event) {
    if (event.key === "Enter") checkAnswer();
  });
}

// 1. veerg: eesti sõna → venekeelne vaste; 2. veerg: vene sõna → eestikeelne vaste
setupQuiz("et", "ru");
setupQuiz("ru", "et");

// Värskendamise nupp laeb lehe uuesti, mis genereerib mõlemasse veergu uue random sõna
document.getElementById("refreshBtn").addEventListener("click", function () {
  location.reload();
});
