/**
 * Keshav Srushti Oxygen Park - Interactive Behaviors
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuBtn = document.querySelector('button[aria-label="Toggle Menu"]') || document.querySelector('nav button:last-child');
    
    // Create mobile menu overlay
    const mobileMenu = document.createElement('div');
    mobileMenu.id = 'mobile-menu-drawer';
    mobileMenu.className = 'fixed inset-0 z-40 bg-[#07241A]/95 backdrop-blur-xl flex flex-col justify-center items-center gap-6 p-8 transition-all duration-300 opacity-0 pointer-events-none';
    mobileMenu.innerHTML = `
        <div class="flex flex-col items-center gap-5 text-center">
            <a href="/" class="text-xl font-headline font-bold text-white hover:text-accent transition-colors">Home</a>
            <a href="/about" class="text-xl font-headline font-bold text-white hover:text-accent transition-colors">About Us</a>
            <a href="/bamboofirst" class="text-xl font-headline font-bold text-white hover:text-accent transition-colors">Bamboo First</a>
            <a href="/packages" class="text-xl font-headline font-bold text-white hover:text-accent transition-colors">Packages</a>
            <a href="/shop" class="text-xl font-headline font-bold text-white hover:text-accent transition-colors">Shop</a>
            <a href="/gallery" class="text-xl font-headline font-bold text-white hover:text-accent transition-colors">Gallery</a>
            <a href="/blog" class="text-xl font-headline font-bold text-white hover:text-accent transition-colors">Blog</a>
            <a href="/booking" class="mt-4 px-6 py-3 rounded-full bg-accent text-primary font-buttons font-bold text-sm tracking-wider uppercase shadow-lg hover:scale-105 transition-transform">VISIT & BOOKING →</a>
        </div>
    `;
    document.body.appendChild(mobileMenu);

    let menuOpen = false;
    if (menuBtn) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            menuOpen = !menuOpen;
            if (menuOpen) {
                mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
                mobileMenu.classList.add('opacity-100', 'pointer-events-auto');
            } else {
                mobileMenu.classList.add('opacity-0', 'pointer-events-none');
                mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
            }
        });
    }

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuOpen = false;
            mobileMenu.classList.add('opacity-0', 'pointer-events-none');
            mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
        });
    });

    // 2. Video Controls
    const heroVideo = document.querySelector('video');
    if (heroVideo) {
        heroVideo.play().catch(() => {});

        const unmuteBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('UNMUTE') || b.textContent.includes('MUTE'));
        if (unmuteBtn) {
            unmuteBtn.addEventListener('click', () => {
                heroVideo.muted = !heroVideo.muted;
                if (heroVideo.muted) {
                    unmuteBtn.innerHTML = unmuteBtn.innerHTML.replace('MUTE AUDIO', 'UNMUTE AUDIO');
                } else {
                    unmuteBtn.innerHTML = unmuteBtn.innerHTML.replace('UNMUTE AUDIO', 'MUTE AUDIO');
                }
            });
        }

        const watchBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('WATCH FULL VIDEO'));
        if (watchBtn) {
            watchBtn.addEventListener('click', () => {
                const target = document.getElementById('video');
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }

    // 3. Image Lightbox Modal
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox-modal';
    lightbox.className = 'fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 transition-opacity duration-300 opacity-0 pointer-events-none';
    lightbox.innerHTML = `
        <div class="relative max-w-5xl max-h-[90vh] flex flex-col items-center">
            <button id="lightbox-close" class="absolute -top-12 right-0 text-white text-3xl font-bold hover:text-accent p-2">✕</button>
            <img id="lightbox-img" src="" alt="Enlarged view" class="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/20"/>
            <p id="lightbox-caption" class="text-white/80 text-sm mt-3 font-body text-center"></p>
        </div>
    `;
    document.body.appendChild(lightbox);

    const closeBtn = document.getElementById('lightbox-close');
    const lbImg = document.getElementById('lightbox-img');
    const lbCap = document.getElementById('lightbox-caption');

    const closeLightbox = () => {
        lightbox.classList.add('opacity-0', 'pointer-events-none');
        lightbox.classList.remove('opacity-100', 'pointer-events-auto');
    };

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    document.querySelectorAll('#gallery img, section img, [class*="cursor-pointer"] img').forEach(img => {
        const parent = img.closest('[class*="cursor-pointer"]') || img;
        parent.style.cursor = 'pointer';
        parent.addEventListener('click', () => {
            const src = img.src || img.getAttribute('src');
            if (src && !src.includes('icon.png') && !src.includes('logo')) {
                lbImg.src = src;
                lbCap.textContent = img.alt || '';
                lightbox.classList.remove('opacity-0', 'pointer-events-none');
                lightbox.classList.add('opacity-100', 'pointer-events-auto');
            }
        });
    });

    // 4. Smooth Anchor Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const id = anchor.getAttribute('href').slice(1);
            if (!id) return;
            const target = document.getElementById(id);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 5. Booking Form Handler
    const bookingForm = document.querySelector('form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(bookingForm);
            const date = formData.get('date') || '';
            const slot = formData.get('slot') || '';
            const guests = formData.get('guests') || '1';
            const name = formData.get('name') || '';
            const phone = formData.get('phone') || '';

            const msg = `Hello Keshav Srushti Oxygen Park, I would like to book a visit for ${guests} guests on ${date} (${slot}). My name is ${name}, phone: ${phone}.`;
            const waUrl = `https://wa.me/917887647672?text=${encodeURIComponent(msg)}`;
            window.open(waUrl, '_blank');
        });
    }

    // 6. Shop & Gallery Filter Tabs
    const filterButtons = document.querySelectorAll('button[class*="font-buttons"]');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.parentElement.querySelectorAll('button').forEach(b => {
                b.classList.remove('bg-primary', 'text-white');
                b.classList.add('bg-white/10', 'text-primary');
            });
            btn.classList.add('bg-primary', 'text-white');
            btn.classList.remove('bg-white/10');
        });
    });
});
