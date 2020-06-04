document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.entry-content h2, .entry-content h3, .entry-content h4, .entry-content h5').forEach((h) => {
    h.innerHTML = `${h.innerText} <a class="heading-anchor" href="#${h.id}">🔗</a>`
  });

  document.querySelectorAll('.blog-index article').forEach((art) => {
    const href = art.querySelector('a').getAttribute('href');
    const img = art.querySelector('img');
    if(!img) return;

    const a = document.createElement('a');
    a.setAttribute('href', href);
    img.parentNode.insertBefore(a, img);
    a.appendChild(img);
  });
});
