# Hajusrakenduste sõnavara kontroll

Veebileht hajusrakenduste terminite harjutamiseks kahes suunas:

| 1. veerg | 2. veerg |
|---|---|
| Kuvatakse random **eestikeelne** sõna, kontrollitakse **venekeelset** vastet | Kuvatakse random **venekeelne** sõna, kontrollitakse **eestikeelset** vastet |

## Tehnoloogiad

- HTML + puhas JavaScript (ilma raamistikuta)
- [Tailwind CSS](https://tailwindcss.com/) (browser CDN)
- [daisyUI](https://daisyui.com/): tasuta komponenditeek (card, table, alert, join, toggle, stat)
- [Lucide](https://lucide.dev/): avatud lähtekoodiga ikoonid (ISC litsents)

## Käivitamine

Ava `index.html` brauseris või käivita kohalik server:

```bash
python3 -m http.server 5173
```

ja ava <http://localhost:5173>.

## Funktsionaalsus

- random sõna genereerimine massiivist (`getRandomWord`)
- kontrollkood, mis ei arvesta tühikuid, suur- ja väiketähti ega ё/е erinevust (`normalize`)
- sama loogika mõlema suuna jaoks (`setupQuiz(from, to)`)
- „Uus sõna“ nupp kummaski veerus ja „Värskenda“ nupp kogu lehe jaoks
- õigete/valede vastuste statistika
- hele ja tume teema, mobiilivaade

## Git

- `main`: algne versioon (eesti → vene)
- `feature/kahesuunaline-sonavara-tabel`: edasiarendus (kahe veeruga tabel, kujundus, kommentaarid)
