// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis for Ultra-Smooth Scrolling
const lenis = new Lenis({
    duration: 1.8, // Slightly slower for a more luxurious glide
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

// Sync Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Smooth Anchor Links via Lenis
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        lenis.scrollTo(this.getAttribute('href'), {
            duration: 2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
    });
});

// Custom Easing for Premium Feel
const customEase = "power3.out"; // Smoother than expo

// Initial Load Animations
const tl = gsap.timeline();

tl.from(".gsap-nav", {
    y: -20,
    opacity: 0,
    duration: 1.5,
    ease: customEase,
    delay: 0.1
})
.to(".hero-badge", {
    y: 0,
    opacity: 1,
    duration: 1.2,
    ease: customEase
}, "-=1")
.fromTo(".hero-title .line", 
    { y: "110%", filter: "blur(10px)" },
    { y: "0%", filter: "blur(0px)", duration: 1.8, stagger: 0.15, ease: customEase }, 
    "-=1"
)
.to(".hero-fade", {
    opacity: 1,
    y: 0,
    duration: 1.5,
    ease: customEase
}, "-=1.2")
.to(".gsap-fade", {
    opacity: 1,
    duration: 1.5,
    ease: customEase
}, "-=1");

// Parallax Hero Image (Subtle)
gsap.to(".hero-bg", {
    yPercent: 15,
    ease: "none",
    scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

// Scroll Reveal Section Headers
gsap.utils.toArray('.gsap-reveal').forEach(header => {
    const title = header.querySelector('.section-title');
    const line = header.querySelector('.section-line');
    
    const hTl = gsap.timeline({
        scrollTrigger: {
            trigger: header,
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });

    hTl.from(title, {
        y: 15,
        opacity: 0,
        duration: 1.2,
        ease: customEase
    })
    .from(line, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.5,
        ease: customEase
    }, "-=0.8");
});

// Showcase Image Reveals
gsap.utils.toArray('.showcase-item').forEach(item => {
    gsap.fromTo(item, 
        { y: 50, opacity: 0 },
        {
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: customEase
        }
    );
});

// Services List Stagger
gsap.utils.toArray('.services-list').forEach(list => {
    gsap.fromTo(list.querySelectorAll('.gsap-fade-up'), 
    { y: 30, opacity: 0 },
    {
        scrollTrigger: {
            trigger: list,
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: customEase
    });
});

// Scale Up Element (Pricing Card)
gsap.fromTo('.gsap-scale-up', 
    { scale: 0.98, opacity: 0, y: 30 },
    {
        scrollTrigger: {
            trigger: '#pricing',
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: customEase
    }
);

// Portfolio Grid Stagger
gsap.fromTo('.portfolio-card',
    { y: 40, opacity: 0 },
    {
        scrollTrigger: {
            trigger: '.portfolio-grid',
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: customEase
    }
);

// Testimonials Fade Up
gsap.fromTo('.testimonial-card',
    { y: 30, opacity: 0 },
    {
        scrollTrigger: {
            trigger: '.testimonial-grid',
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        y: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: customEase
    }
);

// Footer Elements
gsap.fromTo('.footer-title',
    { y: 20, opacity: 0 },
    {
        scrollTrigger: {
            trigger: '#contact',
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: customEase
    }
);

gsap.fromTo('.contact-links',
    { y: 15, opacity: 0 },
    {
        scrollTrigger: {
            trigger: '.contact-links',
            start: "top 90%",
            toggleActions: "play none none reverse"
        },
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: customEase
    }
);

gsap.fromTo('.footer-bottom',
    { opacity: 0 },
    {
        scrollTrigger: {
            trigger: '.footer-bottom',
            start: "top 95%",
            toggleActions: "play none none reverse"
        },
        opacity: 1,
        duration: 1.5,
        ease: customEase
    }
);

// Floating WhatsApp Button Entrance
gsap.fromTo('.floating-wa',
    { scale: 0, opacity: 0, rotation: -15 },
    {
        scale: 1, 
        opacity: 1, 
        rotation: 0,
        duration: 1.2, 
        ease: "back.out(1.2)",
        delay: 1.8 
    }
);

// Portfolio Filter Interaction (Visual Only)
const categoryBtns = document.querySelectorAll('.portfolio-categories button');
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        gsap.fromTo('.portfolio-card', 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.05, ease: customEase }
        );
    });
});