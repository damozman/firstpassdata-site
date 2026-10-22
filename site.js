/* Header tightens once the page scrolls; sections below the fold ease in. Static without JS or with reduced motion. */
(function(){
  const head=document.querySelector('header.site');
  const onScroll=()=>head.classList.toggle('scrolled',window.scrollY>8);
  onScroll(); window.addEventListener('scroll',onScroll,{passive:true});

  if(!window.matchMedia('(prefers-reduced-motion: no-preference)').matches || !('IntersectionObserver' in window)) return;
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  // Only hide what is still below the fold, so nothing already on screen flickers
  document.querySelectorAll('main section .label, main section .label + h2, ol.steps li, .checks > div, .service, .checker, .band').forEach(el=>{
    if(el.getBoundingClientRect().top<window.innerHeight) return;
    const sibs=el.parentElement.children;
    if(sibs.length>2) el.style.transitionDelay=([...sibs].indexOf(el)%6)*70+'ms';
    el.classList.add('reveal'); io.observe(el);
  });
})();
