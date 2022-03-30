let cacheName = "static-cache",
  cachedAssets = ["./index.html", "./styles.css", "./fallback.json"];

self.addEventListener("install", async function () {
  let createdCache = await caches.open(cacheName);
  await createdCache.addAll(cachedAssets);
  await self.skipWaiting();
});
self.addEventListener("fetch", async function (event) {
  if (!navigator.onLine) {
    return await event.respondWith(cachfirst(event.request));
  } else {
    return await event.respondWith(netwrokfirst(event.request));
  }
});
async function cachfirst(req) {
  return (await caches.match(req)) || (await caches.match("fallback.json"));
}
async function netwrokfirst(req) {
  let dynamicCache = await caches.open("dynamic-cache");
  let res = await fetch(req);
  await dynamicCache.put(req, res.clone());
  return res;
}
