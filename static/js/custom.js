document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('h2, h3, h4, h5').forEach((h) => {
    h.innerHTML = `${h.innerText} <a class="heading-anchor" href="#${h.id}">🔗</a>`
  });
});
