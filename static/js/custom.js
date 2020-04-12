document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.entry-content h2, .entry-content h3, .entry-content h4, .entry-content h5').forEach((h) => {
    h.innerHTML = `${h.innerText} <a class="heading-anchor" href="#${h.id}">🔗</a>`
  });
});
