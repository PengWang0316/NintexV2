// importScripts('https://storage googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');
// const workbox = require('workbox-sw');
/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
//
// const workboxSW = new self.WorkboxSW({
//   skipWaiting: true,
//   clientsClaim: true
// });
// // The [] will be replaced:
// workboxSW.precache([]);
workbox.skipWaiting();
workbox.clientsClaim();
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

// Custom code...
/* 1 day cacheFirst strategy. */
// const avatarPhotoStrategy = workbox.strategies.staleWhileRevalidate({
//   cacheName: 'avatarPhotos',
//   cacheableResponse: { statuses: [0, 200] },
// });
// workbox.routing.registerRoute(/^https:\/\/graph\.facebook\.com\/.*/, avatarPhotoStrategy);
// workbox.routing.registerRoute(/^https:\/\/.*\.googleusercontent\.com\/.*/, avatarPhotoStrategy);

/* 365 days cacheFirst strategy for Cloudinary images. */
// const cloudinaryStrategy = workbox.strategies.cacheFirst({
//   cacheName: 'cloudinaryImages',
//   cacheExpiration: {
//     maxEntries: 30, // It depends on the number of average image will be used for each user.
//     maxAgeSeconds: 365 * 24 * 60 * 60
//   },
//   cacheableResponse: { statuses: [0, 200] },
// });
// workbox.routing.registerRoute(/^https:\/\/res.cloudinary.com\/orderstaker\/image\/upload\/.*/, cloudinaryStrategy);

/* NetworkFirst strategy for REST API call. */
// const apiCallStrategy = workbox.strategies.networkFirst();
// workbox.routing.registerRoute(/^https:\/\/orderstaker\.kevin-project\.com:8080\/.*/, apiCallStrategy);
// workbox.routing.registerRoute(/^https:\/\/orderstaker\.kevin-project\.com/, apiCallStrategy);
// workbox.routing.registerRoute(/^http:\/\/orderstaker\.kevin-project\.com/, apiCallStrategy);
