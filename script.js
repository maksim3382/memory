document.addEventListener("DOMContentLoaded", () => {
  const memoriesGrid = document.getElementById("memoriesGrid");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const closeLightbox = document.getElementById("closeLightbox");

  if (memoriesGrid && typeof memories !== 'undefined') {
    memories.forEach(item => {
      const card = document.createElement("div");
      card.className = "memory-card reveal";
      card.innerHTML = `
        <div style="width:100%; border-radius:16px; overflow:hidden; margin-bottom:15px; background: #f5f5f5;">
          <img src="${item.src}" alt="Фото воспоминания" style="width:100%; height:280px; object-fit:cover; display:block;" onerror="this.src='https://via.placeholder.com/600x400?text=%D0%A4%D0%BE%D1%82%D0%BE+%D0%BD%D0%B5+%D0%BD%D0%B0%D0%B9%D0%B4%D0%B5%D0%BD%D0%BE';">
        </div>
        <p style="color:#222; font-size:0.95rem; line-height:1.4;">${item.description}</p>
      `;
      card.addEventListener("click", () => {
        lightboxImage.src = item.src;
        lightboxCaption.textContent = item.description;
        lightbox.showModal();
      });
      memoriesGrid.appendChild(card);
    });
  }

  closeLightbox?.addEventListener("click", () => lightbox.close());
  lightbox?.addEventListener("click", (e) => { if (e.target === lightbox) lightbox.close(); });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.05 });
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
});