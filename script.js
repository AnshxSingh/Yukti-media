let isMenuOpen = false;

function toggle_menu() {
    const menu = document.getElementById("mobile-menu");
    const burger = document.getElementById("hamburger-icon");
    const close = document.getElementById("close-icon");
    
    if (typeof gsap === 'undefined') {
        // Fallback if GSAP is not loaded
        menu.classList.toggle("hidden");
        burger.classList.toggle("hidden");
        close.classList.toggle("hidden");
        return;
    }

    if (!isMenuOpen) {
        // Open menu
        menu.classList.remove("hidden");
        burger.classList.replace("block", "hidden");
        close.classList.replace("hidden", "block");
        
        // Animate expanding
        gsap.fromTo(menu, {
            height: 0,
            opacity: 0
        }, {
            height: "auto",
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
        });
        
        isMenuOpen = true;
    } else {
        // Close menu
        burger.classList.replace("hidden", "block");
        close.classList.replace("block", "hidden");
        
        // Animate collapsing
        gsap.to(menu, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                menu.classList.add("hidden");
                gsap.set(menu, { clearProps: "all" });
            }
        });
        
        isMenuOpen = false;
    }
}
let likeBTN = document.querySelectorAll(".review-like-btn");
likeBTN.forEach((e)=>{
    e.addEventListener("click", ()=>{
       e.setAttribute("fill" , "Currentcolor")
       e.style.color="#EE4B2B"
    })
})





     // Function to handle video loading with cached fallback support
        function setupVideoLoading() {
            const videos = document.querySelectorAll('.video-element');
            
            videos.forEach(video => {
                const container = video.closest('.video-container');
                if (!container) return; // Guard against null container
                
                const skeleton = container.querySelector('.skeleton-loader');
                if (!skeleton) return; // Guard against null skeleton
                
                let hasShownVideo = false;
                
                // Show skeleton initially
                skeleton.style.display = 'block';
                video.classList.add('video-hidden');
                
                function showVideo() {
                    if (hasShownVideo) return;
                    hasShownVideo = true;
                    setTimeout(() => {
                        skeleton.style.display = 'none';
                        video.classList.remove('video-hidden');
                        video.classList.add('video-visible');
                    }, 300);
                }
                
                // Check if video is already ready or cached
                if (video.readyState >= 3) {
                    showVideo();
                }
                
                // Check buffered percentage progress
                function checkProgress() {
                    if (hasShownVideo) return;
                    const buffered = video.buffered;
                    const duration = video.duration;
                    
                    if (buffered.length > 0 && duration > 0) {
                        const bufferedEnd = buffered.end(0);
                        const loadedPercentage = (bufferedEnd / duration) * 100;
                        if (loadedPercentage >= 25) {
                            showVideo();
                        }
                    }
                }
                
                video.addEventListener('progress', checkProgress);
                
                video.addEventListener('loadedmetadata', () => {
                    checkProgress();
                });
                
                video.addEventListener('loadeddata', () => {
                    checkProgress();
                });
                
                video.addEventListener('canplay', showVideo);
                video.addEventListener('canplaythrough', showVideo);
                
                video.addEventListener('loadstart', () => {
                    hasShownVideo = false;
                    skeleton.style.display = 'block';
                    video.classList.add('video-hidden');
                    video.classList.remove('video-visible');
                });
                
                video.addEventListener('error', () => {
                    skeleton.innerHTML = `
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div class="flex flex-col items-center gap-3">
                                <div class="w-12 h-12 text-red-400">
                                    <svg fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <div class="text-red-400 text-sm">Failed to load</div>
                            </div>
                        </div>
                    `;
                });
                
                // Absolute fallback: Show the video after 2.5 seconds anyway
                setTimeout(showVideo, 2500);
            });
        }

        // Function to handle volume toggles on work section videos
        function setupVolumeToggles() {
            const containers = document.querySelectorAll('.video-container');
            const videos = document.querySelectorAll('.video-element');
            const toggleBtns = document.querySelectorAll('.volume-toggle-btn');
            
            toggleBtns.forEach(btn => {
                const container = btn.closest('.video-container');
                if (!container) return;
                const video = container.querySelector('.video-element');
                if (!video) return;
                
                const muteIcon = btn.querySelector('.mute-icon');
                const unmuteIcon = btn.querySelector('.unmute-icon');
                
                // By default, ensure the browser video is muted
                video.muted = true;
                
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    
                    if (video.muted) {
                        // Mute all other videos
                        videos.forEach(otherVideo => {
                            if (otherVideo !== video) {
                                otherVideo.muted = true;
                                const otherContainer = otherVideo.closest('.video-container');
                                if (otherContainer) {
                                    const otherBtn = otherContainer.querySelector('.volume-toggle-btn');
                                    if (otherBtn) {
                                        otherBtn.querySelector('.mute-icon').classList.replace('hidden', 'block');
                                        otherBtn.querySelector('.unmute-icon').classList.replace('block', 'hidden');
                                    }
                                }
                            }
                        });
                        
                        // Unmute this video
                        video.muted = false;
                        muteIcon.classList.replace('block', 'hidden');
                        unmuteIcon.classList.replace('hidden', 'block');
                    } else {
                        // Mute this video
                        video.muted = true;
                        muteIcon.classList.replace('hidden', 'block');
                        unmuteIcon.classList.replace('block', 'hidden');
                    }
                });
            });
        }
        
        // Function to smoothly fade in hero background video when fully loaded
        function setupHeroVideoTransition() {
            const heroVideo = document.getElementById('hero-bg-video');
            if (!heroVideo) return;
            
            let hasFadedIn = false;
            
            function triggerFadeIn() {
                if (hasFadedIn) return;
                hasFadedIn = true;
                heroVideo.classList.remove('opacity-0');
                heroVideo.classList.add('opacity-100');
            }
            
            // If the video is already ready/cached to play
            if (heroVideo.readyState >= 3) {
                triggerFadeIn();
            }
            
            // Event triggers
            heroVideo.addEventListener('canplay', triggerFadeIn);
            heroVideo.addEventListener('loadeddata', triggerFadeIn);
            heroVideo.addEventListener('canplaythrough', triggerFadeIn);
            
            // Fallback timer: fade in after 1.8 seconds anyway to ensure visibility
            setTimeout(triggerFadeIn, 1800);
        }

        // Initialize video loading and GSAP animations when DOM is ready
        function initializeAll() {
            try {
                setupVideoLoading();
            } catch (e) {
                console.error("Error setting up video loading:", e);
            }

            try {
                setupVolumeToggles();
            } catch (e) {
                console.error("Error setting up volume toggles:", e);
            }

            try {
                setupHeroVideoTransition();
            } catch (e) {
                console.error("Error setting up hero video transition:", e);
            }

            try {
                if (typeof gsap !== 'undefined') {
                    initGSAPAnimations();
                }
            } catch (e) {
                console.error("Error initializing GSAP animations:", e);
            }

            try {
                initSwiper();
            } catch (e) {
                console.error("Error calling Swiper initialization:", e);
            }
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeAll);
        } else {
            initializeAll();
        }

        window.addEventListener('load', () => {
            try {
                if (typeof ScrollTrigger !== 'undefined') {
                    ScrollTrigger.refresh();
                }
            } catch (e) {
                console.error("Error refreshing ScrollTrigger on window load:", e);
            }
        });

        // GSAP Animations Initialization Function
        function initGSAPAnimations() {
            try {
                // Register ScrollTrigger
                if (typeof ScrollTrigger !== 'undefined') {
                    gsap.registerPlugin(ScrollTrigger);
                }

            // --- PAGE LOAD ANIMATIONS REMOVED FOR RELIABILITY ---
            // Hero section elements are now instantly visible on load.

            // --- SCROLL-TRIGGERED ANIMATIONS ---

            // 0. Hero Card scroll-expansion to 100% full bleed screen (Breakpoint-Safe using matchMedia)
            if (typeof ScrollTrigger !== 'undefined') {
                const mm = gsap.matchMedia();

                // Large Desktop (lg:px-40 -> 160px padding)
                mm.add("(min-width: 1200px)", () => {
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: ".gsap-home-section",
                            start: "top top",
                            end: "+=50%",
                            scrub: true,
                            pin: false,
                        }
                    })
                    .fromTo(".gsap-home-section", 
                        { paddingLeft: "160px", paddingRight: "160px", paddingTop: "20px", paddingBottom: "20px" },
                        { paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0, duration: 1 }, 
                        0
                    )
                    .fromTo(".gsap-home-layout-container", 
                        { maxWidth: "960px" },
                        { maxWidth: "100%", duration: 1 }, 
                        0
                    )
                    .to(".gsap-hero-bg", {
                        borderRadius: "0px",
                        borderWidth: "0px",
                        minHeight: "calc(100vh - 64px)",
                        duration: 1
                    }, 0);
                });

                // Medium Desktop / Large Tablet (md:px-30 -> 120px padding)
                mm.add("(min-width: 992px) and (max-width: 1199px)", () => {
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: ".gsap-home-section",
                            start: "top top",
                            end: "+=50%",
                            scrub: true,
                            pin: false,
                        }
                    })
                    .fromTo(".gsap-home-section", 
                        { paddingLeft: "120px", paddingRight: "120px", paddingTop: "20px", paddingBottom: "20px" },
                        { paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0, duration: 1 }, 
                        0
                    )
                    .fromTo(".gsap-home-layout-container", 
                        { maxWidth: "960px" },
                        { maxWidth: "100%", duration: 1 }, 
                        0
                    )
                    .to(".gsap-hero-bg", {
                        borderRadius: "0px",
                        borderWidth: "0px",
                        minHeight: "calc(100vh - 64px)",
                        duration: 1
                    }, 0);
                });

                // Small Tablet (sm:px-20 -> 80px padding)
                mm.add("(min-width: 640px) and (max-width: 991px)", () => {
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: ".gsap-home-section",
                            start: "top top",
                            end: "+=50%",
                            scrub: true,
                            pin: false,
                        }
                    })
                    .fromTo(".gsap-home-section", 
                        { paddingLeft: "80px", paddingRight: "80px", paddingTop: "20px", paddingBottom: "20px" },
                        { paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0, duration: 1 }, 
                        0
                    )
                    .fromTo(".gsap-home-layout-container", 
                        { maxWidth: "960px" },
                        { maxWidth: "100%", duration: 1 }, 
                        0
                    )
                    .to(".gsap-hero-bg", {
                        borderRadius: "0px",
                        borderWidth: "0px",
                        minHeight: "calc(100vh - 64px)",
                        duration: 1
                    }, 0);
                });

                // Mobile (px-5 -> 20px padding)
                mm.add("(max-width: 639px)", () => {
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: ".gsap-home-section",
                            start: "top top",
                            end: "+=50%",
                            scrub: true,
                            pin: false,
                        }
                    })
                    .fromTo(".gsap-home-section", 
                        { paddingLeft: "20px", paddingRight: "20px", paddingTop: "20px", paddingBottom: "20px" },
                        { paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0, duration: 1 }, 
                        0
                    )
                    .fromTo(".gsap-home-layout-container", 
                        { maxWidth: "100%" },
                        { maxWidth: "100%", duration: 1 }, 
                        0
                    )
                    .to(".gsap-hero-bg", {
                        borderRadius: "0px",
                        borderWidth: "0px",
                        minHeight: "calc(100vh - 64px)",
                        duration: 1
                    }, 0);
                });
            }

            // 1. Services Section
            gsap.from(".gsap-services-title", {
                scrollTrigger: {
                    trigger: ".gsap-services-title",
                    start: "top 95%",
                    toggleActions: "play none none none"
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            });

            gsap.from(".gsap-service-card", {
                scrollTrigger: {
                    trigger: ".gsap-services-title",
                    start: "top 95%",
                    toggleActions: "play none none none"
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out"
            });

            // 2. Work / Portfolio Section
            gsap.from(".gsap-work-title", {
                scrollTrigger: {
                    trigger: ".gsap-work-title",
                    start: "top 95%",
                    toggleActions: "play none none none"
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            });

            gsap.from(".gsap-work-card-inner", {
                scrollTrigger: {
                    trigger: ".gsap-work-title",
                    start: "top 95%",
                    toggleActions: "play none none none"
                },
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            });

            // 3. Client Reviews Section
            gsap.from(".gsap-reviews-title", {
                scrollTrigger: {
                    trigger: ".gsap-reviews-title",
                    start: "top 95%",
                    toggleActions: "play none none none"
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            });

            gsap.from(".gsap-review-card", {
                scrollTrigger: {
                    trigger: ".gsap-reviews-title",
                    start: "top 95%",
                    toggleActions: "play none none none"
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out"
            });

            // 4. About Us Section
            gsap.from(".gsap-about-title", {
                scrollTrigger: {
                    trigger: ".gsap-about-title",
                    start: "top 95%",
                    toggleActions: "play none none none"
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            });

            gsap.from(".gsap-about-text", {
                scrollTrigger: {
                    trigger: ".gsap-about-title",
                    start: "top 95%",
                    toggleActions: "play none none none"
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            });

            // 5. Websites Section
            gsap.from(".gsap-websites-title", {
                scrollTrigger: {
                    trigger: ".gsap-websites-title",
                    start: "top 95%",
                    toggleActions: "play none none none"
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            });

            gsap.from(".gsap-websites-sub", {
                scrollTrigger: {
                    trigger: ".gsap-websites-title",
                    start: "top 95%",
                    toggleActions: "play none none none"
                },
                y: 20,
                opacity: 0,
                duration: 0.8,
                delay: 0.1,
                ease: "power2.out"
            });

            gsap.from(".showcase-stage", {
                scrollTrigger: {
                    trigger: ".showcase-stage",
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                y: 40,
                opacity: 0,
                duration: 0.9,
                delay: 0.2,
                ease: "power3.out"
            });

            // 6. Contact Section
            gsap.from(".gsap-contact-title", {
                scrollTrigger: {
                    trigger: ".gsap-contact-title",
                    start: "top 95%",
                    toggleActions: "play none none none"
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            });

            gsap.from(".gsap-contact-text", {
                scrollTrigger: {
                    trigger: ".gsap-contact-title",
                    start: "top 95%",
                    toggleActions: "play none none none"
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            });

            gsap.from(".gsap-contact-btn", {
                scrollTrigger: {
                    trigger: ".gsap-contact-text",
                    start: "top 95%",
                    toggleActions: "play none none none"
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out"
            });

            } catch (error) {
                console.error("GSAP timeline initialization crashed. Reverting all elements to fully visible:", error);
                const gsapSelectors = [
                    '.gsap-header', '.gsap-hero-bg', '.gsap-hero-title', '.gsap-hero-sub',
                    '.gsap-hero-btn', '.gsap-dashboard-container', '.sparkline-path',
                    '.gsap-services-title', '.gsap-service-card', '.gsap-work-title',
                    '.gsap-work-card-inner', '.gsap-reviews-title', '.gsap-review-card',
                    '.gsap-about-title', '.gsap-about-text', '.gsap-contact-title',
                    '.gsap-contact-text', '.gsap-contact-btn',
                    '.gsap-websites-title', '.gsap-websites-sub', '.showcase-stage'
                ];
                gsapSelectors.forEach(selector => {
                    document.querySelectorAll(selector).forEach(el => {
                        el.style.opacity = '1';
                        el.style.visibility = 'visible';
                        el.style.transform = 'none';
                    });
                });
            }
        }

        // Initialize Swiper for Portfolio Slider
        function initSwiper() {
            try {
                if (typeof Swiper !== 'undefined') {
                    new Swiper('.portfolio-swiper', {
                        slidesPerView: 1,
                        spaceBetween: 20,
                        grabCursor: true,
                        loop: false,
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true,
                        },
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                        breakpoints: {
                            // Mobile landscape / tablet
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            // PC / Desktop
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            }
                        }
                    });
                }
            } catch (e) {
                console.error("Error initializing Swiper:", e);
            }
        }