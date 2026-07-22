
const search=document.querySelector('#search');
const cards=[...document.querySelectorAll('.card')];
const filters=[...document.querySelectorAll('.filter')];
let active='all';
function updateCards(){
  if(!cards.length)return;
  const q=(search?.value||'').toLowerCase().trim();
  cards.forEach(card=>{
    const cat=active==='all'||card.dataset.category===active;
    const text=(card.dataset.name+' '+card.textContent).toLowerCase();
    card.style.display=cat&&(!q||text.includes(q))?'flex':'none';
  });
}
search?.addEventListener('input',updateCards);
filters.forEach(button=>button.addEventListener('click',()=>{
  filters.forEach(x=>x.classList.remove('active'));
  button.classList.add('active'); active=button.dataset.filter; updateCards();
}));
const toggle=document.querySelector('.mobile-toggle');
const nav=document.querySelector('.nav-links');
toggle?.addEventListener('click',()=>nav?.classList.toggle('open'));

document.querySelectorAll('[data-like-key]').forEach(btn=>{
  const key='fbf-like-'+btn.dataset.likeKey;
  const countEl=document.querySelector(`[data-like-count="${btn.dataset.likeKey}"]`);
  let liked=localStorage.getItem(key)==='1';
  const render=()=>{btn.classList.toggle('liked',liked);btn.textContent=liked?'♥ Liked':'♡ Like this review';if(countEl)countEl.textContent=liked?'You liked this review.':'Like saved on this device.'};
  btn.addEventListener('click',()=>{liked=!liked;localStorage.setItem(key,liked?'1':'0');render();});
  render();
});
