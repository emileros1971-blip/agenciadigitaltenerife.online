const SITE_CONFIG={phone:"+34 711 002 038",phoneTel:"+34711002038",whatsapp:"34711002038",signal:"+34711002038",email:"emileros1971@gmail.com",messenger:"https://m.me/Emil.eros",web3formsKey:"f691abcd-3333-49c6-8553-e1524b5e2140"};
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
function languageFlags(){$$('.header-actions .lang-switch > a, .mobile-menu .lang-switch > a').forEach(a=>{const code=a.textContent.trim().toUpperCase();const flag=code==='ES'?'🇪🇸':code==='EN'?'🇬🇧':code==='HU'?'🇭🇺':'';if(!flag)return;a.setAttribute('aria-label',code==='ES'?'Español':code==='EN'?'English':'Magyar');if(code==='ES'&&/404\.html$/.test(a.getAttribute('href')||''))a.href='../index.html';a.innerHTML='<span class="lang-flag" aria-hidden="true">'+flag+'</span><span class="lang-code">'+code+'</span>'})}
function brandIcons(){const s=document.currentScript;if(!s)return;const icon=new URL('../images/logo-mark.svg',s.src).href;let f=document.querySelector('link[rel~="icon"]');if(!f){f=document.createElement('link');f.rel='icon';document.head.append(f)}f.type='image/svg+xml';f.href=icon;let a=document.querySelector('link[rel="apple-touch-icon"]');if(!a){a=document.createElement('link');a.rel='apple-touch-icon';document.head.append(a)}a.href=icon}
function cfg(){$$('[data-cfg-phone]').forEach(e=>e.textContent=SITE_CONFIG.phone);$$('[data-cfg-phone-link]').forEach(e=>e.href='tel:'+SITE_CONFIG.phoneTel);$$('[data-cfg-whatsapp]').forEach(e=>e.href='https://wa.me/'+SITE_CONFIG.whatsapp);$$('[data-cfg-messenger]').forEach(e=>{e.href=SITE_CONFIG.messenger;e.target='_blank';e.rel='noopener'});$$('[data-cfg-signal]').forEach(e=>e.href='https://signal.me/#p/'+SITE_CONFIG.signal);$$('[data-cfg-email]').forEach(e=>{e.href='mailto:'+SITE_CONFIG.email;e.textContent=SITE_CONFIG.email});$$('[data-cfg-year]').forEach(e=>e.textContent=new Date().getFullYear())}
function menu(){const b=$('#hamburger'),m=$('#mobile-menu'),x=$('#mobile-menu-close');if(!b||!m)return;const close=()=>{m.dataset.open='false';b.setAttribute('aria-expanded','false');document.body.style.overflow=''};b.onclick=()=>{m.dataset.open='true';b.setAttribute('aria-expanded','true');document.body.style.overflow='hidden'};x&&x.addEventListener('click',close);$$('#mobile-menu a').forEach(a=>a.addEventListener('click',close))}
function form(){const f=$('#contact-form');if(!f)return;f.onsubmit=async e=>{e.preventDefault();const st=$('#form-status'),btn=f.querySelector('button[type=submit]');if(!f.reportValidity())return;btn.disabled=true;const fd=new FormData(f);fd.append('access_key',SITE_CONFIG.web3formsKey);try{const r=await fetch('https://api.web3forms.com/submit',{method:'POST',body:fd});const d=await r.json();if(!d.success)throw Error();st.className='form-status success';st.textContent=document.documentElement.lang==='es'?'Gracias. Su mensaje ha sido enviado.':'Thank you. Your message has been sent.';f.reset()}catch{st.className='form-status error';st.textContent=document.documentElement.lang==='es'?'Error de envío. Contáctenos por WhatsApp.':'Sending failed. Please contact us on WhatsApp.'}finally{btn.disabled=false}}}
brandIcons();
document.addEventListener('DOMContentLoaded',()=>{cfg();languageFlags();menu();form();metaPixelConsent()});

const ADT_META_PIXEL_ID = '941543148716419';
function loadMetaPixel() {
  if (window.adtMetaPixelLoaded) return;
  window.adtMetaPixelLoaded = true;
  !function(f,b,e,v,n,t,s) {
    if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
    s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s);
  }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  window.fbq('consent', 'grant');
  window.fbq('init', ADT_META_PIXEL_ID);
  window.fbq('track', 'PageView');
}
function metaPixelConsent() {
  const key = 'adtMarketingConsent';
  const read = () => { try { return localStorage.getItem(key); } catch { return null; } };
  const save = value => { try { localStorage.setItem(key, value); } catch {} };
  if (read() === 'granted') loadMetaPixel();
  const banner = $('#cookie-banner');
  if (!banner) return;
  const es = document.documentElement.lang.startsWith('es');
  banner.querySelector('p').textContent = es
    ? 'Usamos cookies esenciales y, con su permiso, el píxel de Meta para medir visitas y publicidad.'
    : 'We use essential cookies and, with your permission, the Meta Pixel to measure visits and advertising.';
  const accept = $('#cookie-accept');
  const actions = banner.querySelector('.cookie-actions');
  let reject = $('#cookie-reject');
  if (!reject) {
    reject = document.createElement('button');
    reject.id = 'cookie-reject';
    reject.type = 'button';
    reject.className = 'btn btn-secondary';
    actions.appendChild(reject);
  }
  accept.type = 'button';
  accept.textContent = es ? 'Aceptar' : 'Accept';
  reject.textContent = es ? 'Rechazar' : 'Reject';
  banner.hidden = read() === 'granted' || read() === 'denied';
  accept.addEventListener('click', () => {
    save('granted');
    loadMetaPixel();
    banner.hidden = true;
  });
  reject.addEventListener('click', () => {
    save('denied');
    banner.hidden = true;
  });
}
