
// Filtrage de l'accueil
(function(){
  const data = window.__LISTINGS__ || [];
  const grid = document.getElementById('grid');
  const count = document.getElementById('count');
  if(!grid) return;
  const state = {region:'', city:'', guests:0, q:'', sort:'feat'};

  function render(){
    let r = data.filter(l =>
      (!state.region || l.region===state.region) &&
      (!state.city || l.city===state.city) &&
      (!state.guests || l.guests>=state.guests) &&
      (!state.q || (l.name+' '+l.city).toLowerCase().includes(state.q.toLowerCase()))
    );
    if(state.sort==='price') r.sort((a,b)=>a.price-b.price);
    else if(state.sort==='price-desc') r.sort((a,b)=>b.price-a.price);
    else if(state.sort==='rating') r.sort((a,b)=>(b.rating||0)-(a.rating||0));
    count.textContent = r.length + ' logement' + (r.length>1?'s':'');
    grid.innerHTML = r.map(card).join('') || '<p class="empty">Aucun logement ne correspond à votre recherche.</p>';
  }
  function card(l){
    const rate = l.rating ? `<div class="rate">★ ${(l.rating).toFixed(1)}</div>` : '';
    return `<a class="card" href="logement/${l.id}.html">
      <div class="ph"><span class="badge">${l.region}</span>${rate}
        <img loading="lazy" src="${l.cover}" alt="${esc(l.name)}"></div>
      <div class="body">
        <span class="city">${esc(l.city)}</span>
        <h3>${esc(l.name)}</h3>
        <div class="meta"><span>👥 ${l.guests} voy.</span><span>🛏 ${l.bedrooms||'Studio'} ${l.bedrooms?'ch.':''}</span><span>📷 ${l.photos}</span></div>
        <div class="foot"><div class="price"><b>${l.price} €</b> <span>/ nuit</span></div>
          <span class="btn btn-ghost" style="padding:.5rem 1rem;font-size:.85rem">Voir →</span></div>
      </div></a>`;
  }
  function esc(s){return (s||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}

  document.querySelectorAll('[data-region]').forEach(b=>b.onclick=()=>{
    document.querySelectorAll('[data-region]').forEach(x=>x.classList.remove('active'));
    b.classList.add('active'); state.region=b.dataset.region; render();
  });
  const cityF=document.getElementById('f-city'), guestF=document.getElementById('f-guests'),
        qF=document.getElementById('f-q'), sortF=document.getElementById('f-sort');
  if(cityF) cityF.onchange=()=>{state.city=cityF.value;render();};
  if(guestF) guestF.onchange=()=>{state.guests=+guestF.value;render();};
  if(qF) qF.oninput=()=>{state.q=qF.value;render();};
  if(sortF) sortF.onchange=()=>{state.sort=sortF.value;render();};
  render();
})();

// Lightbox (page détail)
(function(){
  const imgs = window.__GALLERY__; if(!imgs) return;
  const lb=document.getElementById('lb'), lbimg=document.getElementById('lbimg'), lbcap=document.getElementById('lbcap');
  let i=0;
  function show(n){i=(n+imgs.length)%imgs.length;lbimg.src=imgs[i].url;lbcap.textContent=imgs[i].caption||'';}
  window.openLb=n=>{show(n);lb.classList.add('open');};
  document.getElementById('lbx').onclick=()=>lb.classList.remove('open');
  document.getElementById('lbprev').onclick=()=>show(i-1);
  document.getElementById('lbnext').onclick=()=>show(i+1);
  lb.onclick=e=>{if(e.target===lb)lb.classList.remove('open');};
  document.onkeydown=e=>{if(!lb.classList.contains('open'))return;
    if(e.key==='Escape')lb.classList.remove('open');
    if(e.key==='ArrowLeft')show(i-1); if(e.key==='ArrowRight')show(i+1);};
})();

// Réservation (page détail)
(function(){
  const cfg = window.__BOOK__; if(!cfg) return;
  const f = document.getElementById('bform'); if(!f) return;
  f.onsubmit = e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(f).entries());
    if(cfg.engine){ // moteur Hostaway activé
      const u = new URL(cfg.engine.replace(/\/$/,'') + '/listings/' + cfg.id);
      if(d.arrivee) u.searchParams.set('startDate', d.arrivee);
      if(d.depart) u.searchParams.set('endDate', d.depart);
      if(d.voyageurs) u.searchParams.set('numberOfGuests', d.voyageurs);
      window.open(u.toString(), '_blank'); return;
    }
    const subj = `Demande de réservation — ${cfg.name}`;
    const body = [
      `Bonjour,`,``,
      `Je souhaite réserver en direct le logement : ${cfg.name} (${cfg.city}).`,
      `• Arrivée : ${d.arrivee||'—'}`,
      `• Départ : ${d.depart||'—'}`,
      `• Voyageurs : ${d.voyageurs||'—'}`,``,
      `Mes coordonnées :`,
      `• Nom : ${d.nom||'—'}`,
      `• Email : ${d.email||'—'}`,
      `• Téléphone : ${d.tel||'—'}`,
      d.message?`\nMessage : ${d.message}`:'',
      ``,`Merci !`
    ].join('\n');
    window.location.href = `mailto:${cfg.email}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;
  };
  const wa = document.getElementById('wa');
  if(wa && cfg.phone){
    wa.onclick = e => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(f).entries());
      const txt = `Bonjour, je souhaite réserver "${cfg.name}" (${cfg.city}). Arrivée ${d.arrivee||'?'} → Départ ${d.depart||'?'}, ${d.voyageurs||'?'} voyageurs.`;
      window.open(`https://wa.me/${cfg.phone.replace(/[^0-9]/g,'')}?text=${encodeURIComponent(txt)}`,'_blank');
    };
  }
})();
