# Teodor Stoyanov — portfolio

Three files — `index.html`, `styles.css`, `app.js` — hand-written HTML, CSS and JavaScript, no frameworks, no build step. Warm paper background, mint/seafoam accent (`--mint` / `--mint-deep` in `:root` at the top of `styles.css`), serif headings. Has a **dark mode**: it follows the system setting by default, and the moon/sun button in the nav overrides it (remembered per browser). Dark colors live in the `[data-theme="dark"]` block near the top of `styles.css`.

## Run it

```
python -m http.server 5173
```

then visit http://localhost:5173.

## Content

All content comes from Teodor's CV and his public GitHub ([TeodorStS](https://github.com/TeodorStS)):

- **Hero + terminal**: profile, plus a working fake shell (`whoami`, `jumpflip`, `homelab`, `help`, `cd projects`, …).
- **Projects**: jumpflip (featured), homelab-stack, Tic-Tac-Toe, typetest. To add one, copy an `<article class="card project">` block.
- **Experience & education**: CS++, Enactus, summer job; TU Dublin, HS of Mathematics Varna.
- **Skills**: programming languages, infrastructure & DevOps, frameworks, spoken languages.
- **Album reviews**: ⚠️ still **sample reviews written as placeholders**, not Teodor's own. Replace or remove before publishing.

## Effects

Optional effects are numbered `EFFECT n` in comments across the three files. To remove one, delete its numbered blocks:

1. **Scroll progress bar**: thin mint line at the top.
2. **Guitar-string section rail**: the right-edge navigation is a set of silent strings; the active one glows and wobbles. No sound.
3. **Scroll snap**: the page gently settles on section starts.
5. **Tilt + glow project cards**: wide cards tilt less.
6. **Magnetic buttons**: main buttons lean toward the cursor.
8. **Title decode**: section headings scramble-settle into place.
9. **Vinyl peek**: hovering an album review slides the record out.
11. **Interactive terminal**: see above. Arrow-up recalls history.

Removed at Teodor's request: 4 (count-up stats), 7 (floating notes), 10 (logo arpeggio), 12 (chord lab), 13 (mixing desk), plus the stats strip and the guitar section.

Everything respects `prefers-reduced-motion`.
