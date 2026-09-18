/**
 * Keshav Srushti Oxygen Park - Interactive Behaviors & 3D Carousel
 */
document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. Mobile Menu Toggle
    // -------------------------------------------------------------
    const menuBtn = document.querySelector('button[aria-label="Toggle Menu"]') || document.querySelector('nav button:last-child');
    
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

    // -------------------------------------------------------------
    // 2. Video Controls
    // -------------------------------------------------------------
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

    // -------------------------------------------------------------
    // 3. Image Lightbox Modal
    // -------------------------------------------------------------
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox-modal';
    lightbox.className = 'fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 transition-opacity duration-300 opacity-0 pointer-events-none';
    lightbox.innerHTML = `
        <div class="relative max-w-5xl max-h-[90vh] flex flex-col items-center">
            <button id="lightbox-close" class="absolute -top-12 right-0 text-white text-3xl font-bold hover:text-accent p-2 cursor-pointer">✕</button>
            <img id="lightbox-img" src="" alt="Enlarged view" class="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/20"/>
            <p id="lightbox-caption" class="text-white/80 text-sm mt-3 font-body text-center"></p>
        </div>
    `;
    document.body.appendChild(lightbox);

    const closeBtn = document.getElementById('lightbox-close');
    const lbImg = document.getElementById('lightbox-img');
    const lbCap = document.getElementById('lightbox-caption');

    const openLightbox = (src, caption) => {
        if (!src) return;
        lbImg.src = src;
        lbCap.textContent = caption || '';
        lightbox.classList.remove('opacity-0', 'pointer-events-none');
        lightbox.classList.add('opacity-100', 'pointer-events-auto');
    };

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

    // Attach lightbox only to non-carousel images
    document.querySelectorAll('section:not(#gallery) img, #gallery .max-w-3xl img').forEach(img => {
        if (img.src && !img.src.includes('icon.png') && !img.src.includes('logo')) {
            const parent = img.closest('[class*="cursor-pointer"]') || img;
            parent.style.cursor = 'pointer';
            parent.addEventListener('click', () => openLightbox(img.src, img.alt));
        }
    });

    // -------------------------------------------------------------
    // 4. 3D Gallery Moments Carousel
    // -------------------------------------------------------------
    const momentsContainer = document.getElementById('moments-cards-container') || document.querySelector('#gallery div[style*="perspective"] div[style*="perspective"]');
    const gallerySection = document.getElementById('gallery');

    if (momentsContainer && gallerySection) {
        const prevBtn = document.getElementById('moments-prev-btn') || gallerySection.querySelector('button:has(span)') || Array.from(gallerySection.querySelectorAll('button')).find(b => b.textContent.includes('←'));
        const nextBtn = document.getElementById('moments-next-btn') || Array.from(gallerySection.querySelectorAll('button')).find(b => b.textContent.includes('→'));
        
        const cards = Array.from(momentsContainer.children).filter(el => el.querySelector('img') || el.classList.contains('cursor-pointer'));
        const total = cards.length;

        if (total > 0) {
            let activeIndex = 3; // default center card
            let autoInterval = null;

            cards.forEach((card, idx) => {
                card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease';
                card.style.transformStyle = 'preserve-3d';
                card.dataset.index = idx;
            });

            const updateCarousel = () => {
                const isMobile = window.innerWidth < 768;

                cards.forEach((card, i) => {
                    let n = i - activeIndex;
                    const half = Math.floor(total / 2);
                    if (n > half) n -= total;
                    if (n < -half) n += total;

                    const isPortrait = card.classList.contains('w-[220px]') || card.classList.contains('md:w-[320px]') || (card.querySelector('img')?.src || '').includes('IMG20260704');
                    const cardW = card.offsetWidth || (isPortrait ? 240 : 360);
                    const stepX = isMobile ? (isPortrait ? 130 : 160) : Math.min(cardW * 0.9, 280);
                    const x = n * stepX;
                    const absN = Math.abs(n);

                    if (absN > 2) {
                        card.style.opacity = '0';
                        card.style.pointerEvents = 'none';
                        card.style.zIndex = '10';
                        card.style.visibility = 'hidden';
                        card.style.transform = `perspective(900px) translateX(${x}px) translateZ(-300px) scale(0.7)`;
                        return;
                    }

                    card.style.visibility = 'visible';
                    card.style.pointerEvents = 'auto';

                    if (n === 0) {
                        // Center Active Card
                        card.style.opacity = '1';
                        card.style.zIndex = '25';
                        card.style.transform = `perspective(900px) translateX(0px) translateZ(150px) scale(1.15) rotateY(0deg)`;
                    } else if (absN === 1) {
                        // Immediate Left / Right Card
                        card.style.opacity = '0.7';
                        card.style.zIndex = '20';
                        const rot = -38 * n;
                        card.style.transform = `perspective(900px) translateX(${x}px) translateZ(-160px) scale(0.88) rotateY(${rot}deg)`;
                    } else if (absN === 2) {
                        // Outer Left / Right Card
                        card.style.opacity = '0.45';
                        card.style.zIndex = '18';
                        const rot = n > 0 ? -72 : 72;
                        const farX = n * (isMobile ? stepX * 1.1 : stepX * 1.15);
                        card.style.transform = `perspective(900px) translateX(${farX}px) translateZ(-240px) scale(0.8) rotateY(${rot}deg)`;
                    }
                });
            };

            const goTo = (idx) => {
                activeIndex = (idx % total + total) % total;
                updateCarousel();
            };

            const prev = () => {
                goTo(activeIndex - 1);
            };

            const next = () => {
                goTo(activeIndex + 1);
            };

            const startAuto = () => {
                clearInterval(autoInterval);
                autoInterval = setInterval(next, 4000);
            };

            const stopAuto = () => {
                clearInterval(autoInterval);
            };

            const resetAuto = () => {
                stopAuto();
                startAuto();
            };

            if (prevBtn) {
                prevBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    prev();
                    resetAuto();
                });
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    next();
                    resetAuto();
                });
            }

            // Clicking any card: if center, open lightbox; if side, rotate to center
            cards.forEach((card, idx) => {
                card.style.cursor = 'pointer';
                card.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    let n = idx - activeIndex;
                    const half = Math.floor(total / 2);
                    if (n > half) n -= total;
                    if (n < -half) n += total;

                    if (n === 0) {
                        // Already center card -> open full-size in lightbox!
                        const img = card.querySelector('img');
                        if (img) openLightbox(img.src, img.alt);
                    } else {
                        // Side card -> animate to center!
                        goTo(idx);
                        resetAuto();
                    }
                });
            });

            // Touch Swipe Support
            let startX = 0;
            let startY = 0;
            momentsContainer.addEventListener('touchstart', (e) => {
                if (e.touches.length > 0) {
                    startX = e.touches[0].clientX;
                    startY = e.touches[0].clientY;
                }
            }, { passive: true });

            momentsContainer.addEventListener('touchend', (e) => {
                if (e.changedTouches.length > 0) {
                    const diffX = startX - e.changedTouches[0].clientX;
                    const diffY = startY - e.changedTouches[0].clientY;
                    if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY)) {
                        if (diffX > 0) next();
                        else prev();
                        resetAuto();
                    }
                }
            }, { passive: true });

            // Keyboard navigation
            gallerySection.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    prev();
                    resetAuto();
                } else if (e.key === 'ArrowRight') {
                    next();
                    resetAuto();
                }
            });

            gallerySection.addEventListener('mouseenter', stopAuto);
            gallerySection.addEventListener('mouseleave', startAuto);

            // Initial render
            updateCarousel();
            startAuto();

            window.addEventListener('resize', updateCarousel);
        }
    }

    // -------------------------------------------------------------
    // 5. Smooth Anchor Scrolling
    // -------------------------------------------------------------
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

    // -------------------------------------------------------------
    // 6. Booking Form Handler
    // -------------------------------------------------------------
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

    // -------------------------------------------------------------
    // 7. Shop & Gallery Filter Tabs
    // -------------------------------------------------------------
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
