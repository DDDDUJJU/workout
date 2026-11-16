const CACHE='workout-pwa-v2';
const ASSETS=['./','./index.html','./app.js','./manifest.webmanifest','./assets/app-icon.png','./assets/exercise-guide.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('workout-pwa-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  const url=new URL(event.request.url);
  // API requests, credentials and training data must never enter the offline cache.
  if(event.request.method!=='GET'||url.origin!==self.location.origin)return;
  const path=url.pathname.slice(new URL(self.registration.scope).pathname.length);
  if(!['','index.html','app.js','manifest.webmanifest','assets/app-icon.png','assets/exercise-guide.png'].includes(path))return;
  event.respondWith(fetch(event.request).then(response=>{
    if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(event.request,copy)))}
    return response;
  }).catch(()=>caches.match(event.request).then(cached=>cached||(event.request.mode==='navigate'?caches.match('./index.html'):Response.error()))));
});
