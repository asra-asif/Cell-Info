document.addEventListener("DOMContentLoaded", function () {
    let lazyMedia = document.querySelectorAll("img, video");

    lazyMedia.forEach(media => {
        if (media.tagName === "IMG") {
            media.dataset.src = media.src;
            media.src = "";
        } else if (media.tagName === "VIDEO") {
            let source = media.querySelector("source");
            if (source && source.src) {
                source.dataset.src = source.src;
                source.src = "";
            }
        }
    });


    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let media = entry.target;
                
                if (media.tagName === "IMG" && media.dataset.src) {
                    media.src = media.dataset.src;
                } else if (media.tagName === "VIDEO") {
                    let source = media.querySelector("source");
                    if (source && source.dataset.src) {
                        source.src = source.dataset.src;
                        media.load();
                    }
                }

                observer.unobserve(media);
            }
        });
    });

    lazyMedia.forEach(media => observer.observe(media));
});
