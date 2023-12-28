const IS_BANNER_HIDDEN_KEY = 'banner-hidden';
const TOP_BANNER_HIDDEN_CLASS = 'banner-top--hidden';
const BOTTOM_BANNER_HIDDEN_CLASS = 'banner-bottom--hidden';

document.addEventListener('DOMContentLoaded', () => {
    const bannerTop = document.getElementById('banner-top');
    const bannerBottom = document.getElementById('banner-bottom');
    const bannerTopCloseBtn = document.getElementById('banner-top-close');
    const bannerBottomCloseBtn = document.getElementById('banner-bottom-close');

    const isBottomBannerHidden = localStorage.getItem(IS_BANNER_HIDDEN_KEY) === 'true';

    const showBottomBanner = () => !isBottomBannerHidden && bannerBottom?.classList.remove(BOTTOM_BANNER_HIDDEN_CLASS);
    const hideBottomBanner = () => !isBottomBannerHidden && bannerBottom?.classList.add(BOTTOM_BANNER_HIDDEN_CLASS);

    const observer = new IntersectionObserver(
        ([banner]) => banner.isIntersecting ? hideBottomBanner() : showBottomBanner(),
        {
            threshold: 0,
        });

    if (!isBottomBannerHidden) {
        observer.observe(bannerTop);
    }

    bannerTopCloseBtn?.addEventListener('click', () => {
        if (!bannerTop) {
            return;
        }

        bannerTop.classList.add(TOP_BANNER_HIDDEN_CLASS);
        showBottomBanner();
        observer.disconnect();
    });


    bannerBottomCloseBtn?.addEventListener('click', async () => {
        if (!bannerBottom) {
            return;
        }

        observer.disconnect();
        hideBottomBanner();
        localStorage.setItem(IS_BANNER_HIDDEN_KEY, 'true');
    });
});
