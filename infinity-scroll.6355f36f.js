!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},a=n.parcelRequired7c6;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in r){var n=r[e];delete r[e];var a={id:e,exports:{}};return t[e]=a,n.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,n){r[e]=n},n.parcelRequired7c6=a);var o=a("bpxeT"),i=a("2TvXO"),s=a("dIxxU"),c=a("h6c0i"),u=a("5IjG7"),l="39207627-8a410277f132e49ffdfa9ce97",f=document.querySelector(".search-form"),p=document.querySelector(".gallery"),d="",h=1,y=document.querySelector(".guard"),g=new IntersectionObserver((function(n){n.forEach((t=e(o)(e(i).mark((function n(t){var r;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.isIntersecting){e.next=7;break}return h+=1,e.next=4,v(h,d);case 4:w(r=e.sent.data),r.hits.length<40&&r.hits.length>0&&(g.unobserve(y),c.Notify.info("We're sorry, but you've reached the end of search results."));case 7:case"end":return e.stop()}}),n)}))),function(e){return t.apply(this,arguments)}));var t}),{rootMargin:"400px"});function m(){return(m=e(o)(e(i).mark((function n(t){var r;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),h=1,p.innerHTML="",d=f.elements.searchQuery.value.trim(),e.next=6,v(h,d);case 6:r=e.sent.data,g.observe(y),0===r.hits.length&&c.Notify.failure("Sorry, there are no images matching your search query. Please try again."),w(r),r.hits.length>1&&c.Notify.success("Hooray! We found ".concat(r.totalHits," images 😎")),r.hits.length<40&&r.hits.length>0&&(g.unobserve(y),c.Notify.info("We're sorry, but you've reached the end of search results."));case 12:case"end":return e.stop()}}),n)})))).apply(this,arguments)}function v(e,n){return b.apply(this,arguments)}function b(){return(b=e(o)(e(i).mark((function n(t,r){var a;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=new URLSearchParams({key:l,q:r,page:t,per_page:40,image_type:"photo",orientation:"horizontal",safesearch:!0}),e.next=3,(0,s.default)("?".concat(a));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),n)})))).apply(this,arguments)}function w(e){var n=e.hits.map((function(e){return'\n        <a class="gallery-link link" href="'.concat(e.largeImageURL,'">\n        <div class="photo-card">\n          <img width="400" height="300" src="').concat(e.webformatURL,'" alt="').concat(e.tags,'" loading="lazy" />\n          <div class="info">\n            <p class="info-item">\n              <b>Likes: ').concat(e.likes,'</b>\n            </p>\n            <p class="info-item">\n              <b>Views: ').concat(e.views,'</b>\n            </p>\n            <p class="info-item">\n              <b>Comments: ').concat(e.comments,'</b>\n            </p>\n            <p class="info-item">\n              <b>Downloads: ').concat(e.downloads,"</b>\n            </p>\n          </div>\n        </div>\n        </a>\n        ")})).join("");p.insertAdjacentHTML("beforeend",n),x.refresh()}f.addEventListener("submit",(function(e){return m.apply(this,arguments)})),s.default.defaults.baseURL="https://pixabay.com/api/";var x=new(e(u))(".gallery a",{captionsData:"alt",captionDelay:250,captionPosition:"bottom"})}();
//# sourceMappingURL=infinity-scroll.6355f36f.js.map
