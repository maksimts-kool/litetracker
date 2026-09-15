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

// Lehe laadimisel genereeritakse üks random sõna, mida kasutaja peab tõlkima
const currentWord = getRandomWord();
document.getElementById("word").textContent = currentWord.et;

// Kontrollkood: võrdleb kasutaja sisestatud vastust massiivis oleva õige tõlkega
function checkAnswer() {
  const userAnswer = normalize(document.getElementById("answer").value);
  const result = document.getElementById("result");

  // Tühja vastuse korral ei loeta seda veaks, vaid palutakse midagi sisestada
  if (userAnswer === "") {
    result.textContent = "Palun sisesta vastus.";
    return;
  }

  if (userAnswer === normalize(currentWord.ru)) {
    result.textContent = "Õige! 🎉";
  } else {
    result.textContent = "Vale. Õige vastus on: " + currentWord.ru;
  }
}

// Sündmuste kuulajad: nupuvajutus ja Enter-klahv käivitavad kontrolli
document.getElementById("checkBtn").addEventListener("click", checkAnswer);
document.getElementById("answer").addEventListener("keydown", function (event) {
  if (event.key === "Enter") checkAnswer();
});

// Värskendamise nupp laeb lehe uuesti, mis genereerib uue random sõna
document.getElementById("refreshBtn").addEventListener("click", function () {
  location.reload();
});
