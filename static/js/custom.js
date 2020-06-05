document.addEventListener('DOMContentLoaded', () => {
  // anchors for headings
  document.querySelectorAll('.entry-content h2, .entry-content h3, .entry-content h4, .entry-content h5').forEach((h) => {
    h.innerHTML = `${h.innerText} <a class="heading-anchor" href="#${h.id}">🔗</a>`
  });

  // clickable images in index
  document.querySelectorAll('.blog-index article').forEach((art) => {
    const href = art.querySelector('a').getAttribute('href');
    const img = art.querySelector('img');
    if(!img) return;

    const a = document.createElement('a');
    a.setAttribute('href', href);
    img.parentNode.insertBefore(a, img);
    a.appendChild(img);
  });

  // aside remove
  setInterval(() => {
    if(window.matchMedia('min-width:1520px')) {
      const top = (window.pageYOffset || document.scrollTop)  - (document.clientTop || 0);
      if(top > 1000) {
        document.body.classList.add('aside-hidden');
      } else {
        document.body.classList.remove('aside-hidden');
      }
    }
  }, 1000);
});
