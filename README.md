# Portfolio

My personal portfolio site, built with plain HTML, CSS and JavaScript. No frameworks, no build step.

## Features

- Projects, experience, education and skills
- An interactive terminal in the hero section (try `help`)
- Light and dark mode, following the system setting with a toggle in the nav
- Guitar-string section navigation on the right edge
- Works on mobile and respects `prefers-reduced-motion`

## Run it locally

```
python -m http.server 5173
```

Then open http://localhost:5173.

## Docker

The site is a static nginx image (`nginx:1.27-alpine`) with the three files copied in.

```
docker build -t portfolio .
docker run -d --name portfolio -p 8080:80 portfolio
```

Then open http://localhost:8080.

## Structure

- `index.html`: content
- `styles.css`: styles (colour palette and dark mode at the top)
- `app.js`: interactivity
- `Dockerfile`: container image
