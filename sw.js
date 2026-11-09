const C='nagoya-v3';
self.addEventListener('install',e=>{self.skipWaiting();
  e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./manifest.json','./icon.svg'])))});
self.addEventListener('activate',e=>e.waitUntil(
  caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  const u=e.request.url;
  if(e.request.method!=='GET')return;
  if(!(u.startsWith(self.location.origin)||u.includes('gstatic.com')||u.includes('jsdelivr.net')))return;
  e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r})
    .catch(()=>caches.match(e.request)));
});
