# tinalichtenthal.com

**Art of Innovation** — Lichtenthal Krisztina (Tina) személyes weboldala.

## Struktúra

```
/
├── index.html          # Főoldal
├── mesterseg.html      # Mesterség — Art of Innovation
├── kutatas.html        # Kutatás — ICMM-modell
├── rolam.html          # Rólam — szakmai életrajz
├── kapcsolat.html      # Kapcsolat
├── assets/
│   ├── css/style.css   # Teljes stíluslap
│   ├── js/main.js      # Interakciók (navbar, animációk, form)
│   └── img/tina.jpg    # Portréfotó
└── README.md
```

## GitHub Pages élesítés

1. Töltsd fel az összes fájlt a `kratochwillakos7-hash/tina` repóba (vagy hozz létre egy új repót)
2. GitHub → Settings → Pages → Source: **main branch / root**
3. Néhány perc után elérhető: `https://kratochwillakos7-hash.github.io/tina/`

## Custom domain (tinalichtenthal.com)

1. Hozz létre egy `CNAME` fájlt a repóban, tartalma: `tinalichtenthal.com`
2. A domain DNS-beállításaiban:
   - `A` rekordok: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - VAGY `CNAME` rekord: `kratochwillakos7-hash.github.io`
3. GitHub Settings → Pages → Custom domain: `tinalichtenthal.com` → mentés
4. Pipáld be: **Enforce HTTPS**

## Testreszabás előtt — elvégzendő feladatok

- [ ] `kapcsolat.html`: Formspree form ID cseréje (`yourformid` → valódi ID) — regisztrálj a [formspree.io](https://formspree.io) oldalon
- [ ] `rolam.html` és egyéb oldalak: LinkedIn profil URL véglegesítése
- [ ] `kutatas.html`: PDF letöltési linkek beállítása (feltöltés + linkek frissítése)
- [ ] Esetleges szövegpontosítások Tinával
- [ ] `adatvédelmi-nyilatkozat.html` létrehozása (GDPR)

## Technikai infó

- Statikus HTML/CSS/JS — nincs függőség, nincs build lépés
- Google Fonts: Playfair Display + Inter + JetBrains Mono
- Scroll-triggered fade-in animációk (IntersectionObserver)
- Mobile-first reszponzív design (768px és 1024px töréspontok)
- Kontaktform: Formspree (ingyenes csomag: 50 üzenet/hó)
