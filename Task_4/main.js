// Shared animation reveal for all pages

document.addEventListener('DOMContentLoaded', () => {
  // initial reveal for main cards (portfolio / layout cards)
  document.querySelectorAll('.card').forEach((el, i) => 
    setTimeout(() => el.classList.add('reveal'), 120 + i * 80)
  );
});
