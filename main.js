document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize AOS (Animate On Scroll)
    AOS.init({
        once: true, // whether animation should happen only once - while scrolling down
        offset: 100, // offset (in px) from the original trigger point
        duration: 800, // values from 0 to 3000, with step 50ms
        easing: 'ease-out-cubic', // default easing for AOS animations
    });

    // 2. Sticky Header Logic
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-soft');
            navbar.classList.replace('bg-brand-dark/70', 'bg-brand-dark/95');
        } else {
            navbar.classList.remove('shadow-soft');
            navbar.classList.replace('bg-brand-dark/95', 'bg-brand-dark/70');
        }
    });

    // 3. Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu on link click
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // 4. Cookie Banner Logic
    const showCookieBanner = () => {
        if (document.getElementById('cookie-banner')) return;

        const bannerHTML = `
            <div id="cookie-banner" class="fixed bottom-4 right-4 md:bottom-8 md:right-8 w-[calc(100%-2rem)] md:w-[28rem] p-6 rounded-2xl bg-brand-dark/80 backdrop-blur-xl border border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)] z-[100] flex flex-col gap-4 animate-[slideUp_0.5s_ease-out]">
                <h3 class="text-lg font-bold text-white">Informativa sui Cookie</h3>
                <p class="text-brand-gray text-sm leading-relaxed">
                    Utilizziamo i cookie per offrirti la migliore esperienza digitale. Accettando, ci aiuti a far crescere OliMezz.
                    <br/><a href="privacy-cookie-policy.html" class="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 mt-1 inline-block">Cookie Policy</a>
                </p>
                <div class="flex gap-3 mt-2">
                    <button id="accept-cookies" class="flex-1 px-4 py-2.5 bg-cyan-400 text-brand-dark font-bold rounded-lg hover:bg-cyan-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.6)] transition-all text-sm">
                        Accetta
                    </button>
                    <button id="reject-cookies" class="flex-1 px-4 py-2.5 bg-transparent border border-cyan-400 text-cyan-400 font-bold rounded-lg hover:bg-cyan-400/10 transition-all text-sm">
                        Rifiuta
                    </button>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', bannerHTML);
        
        const banner = document.getElementById('cookie-banner');
        const acceptBtn = document.getElementById('accept-cookies');
        const rejectBtn = document.getElementById('reject-cookies');
        
        const closeBanner = (choice) => {
            localStorage.setItem('cookieConsent', choice);
            banner.classList.add('opacity-0', 'translate-y-4', 'transition-all', 'duration-300');
            setTimeout(() => banner.remove(), 300);
        };
        
        acceptBtn.addEventListener('click', () => closeBanner('accepted'));
        rejectBtn.addEventListener('click', () => closeBanner('rejected'));
    };

    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
        showCookieBanner();
    }

    // Listener for "Rivedi consensi"
    document.addEventListener('click', (e) => {
        if (e.target && e.target.id === 'revoke-cookie-consent') {
            e.preventDefault();
            showCookieBanner();
        }
    });

    // 5. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const content = item.querySelector('.faq-content');
        const icon = trigger.querySelector('svg');
        
        trigger.addEventListener('click', () => {
            const isOpen = content.style.maxHeight !== '0px' && content.style.maxHeight !== '';
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-content').style.maxHeight = '0px';
                    otherItem.querySelector('.faq-trigger svg').classList.remove('rotate-180');
                }
            });
            
            if (isOpen) {
                content.style.maxHeight = '0px';
                icon.classList.remove('rotate-180');
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                icon.classList.add('rotate-180');
            }
        });
    });
});
