document.addEventListener("DOMContentLoaded", () => {
    // 1. Intersection Observer for 3D Reveals
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add("active");
                observer.unobserve(e.target);
            }
        });
    }, { root: null, rootMargin: "-50px 0px", threshold: 0.15 });

    document.querySelectorAll(".reveal-3d").forEach(el => observer.observe(el));

    // 2. Power Object (3D Bolt) Dynamic Flight Logic
    const energyBolt = document.querySelector(".energy");
    const sections = document.querySelectorAll(".screen-section");
    const footer = document.getElementById("footer");

    if (energyBolt) {
        const updateBolt = () => {
            let active = null, minD = Infinity, cy = window.innerHeight / 2;
            let activeIndex = 0;

            const isNearBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 100);

            if (isNearBottom && footer) {
                const logo = footer.querySelector(".logo");
                if (logo) {
                    const r = logo.getBoundingClientRect();
                    energyBolt.style.transform = `translate3d(${r.left + r.width / 2}px, ${r.top - 60}px, 0) translate(-50%, -50%) scale(0.9) rotate(0deg)`;
                    energyBolt.classList.remove('energy-mode-danger');
                    energyBolt.classList.add('energy-mode-standard');
                }
                return;
            }

            sections.forEach((sec, index) => {
                const r = sec.getBoundingClientRect();
                const d = Math.abs(r.top + r.height / 2 - cy);
                if (d < minD) { minD = d; active = sec; activeIndex = index; }
            });

            if (active) {
                const txt = active.querySelector("h1, h2");
                if (txt) {
                    const r = txt.getBoundingClientRect();
                    const isCenteredAbove = active.id === "hero" || active.id === "solution";

                    let xPos, yPos, rotation, scale;

                    if (isCenteredAbove) {
                        xPos = r.left + (r.width / 2);
                        yPos = r.top - 80;
                        rotation = 0;
                        scale = 1.1;
                    } else {
                        const isRightSide = activeIndex % 2 !== 0;
                        xPos = isRightSide ? r.right + 25 : r.left - 45;
                        yPos = r.top + (r.height / 2);
                        rotation = isRightSide ? 15 : -15;
                        scale = 0.85;
                    }

                    energyBolt.style.transform = `translate3d(${xPos}px, ${yPos}px, 0) translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`;

                    if (active.id === 'problem') {
                        energyBolt.classList.add('energy-mode-danger');
                        energyBolt.classList.remove('energy-mode-standard');
                    } else {
                        energyBolt.classList.add('energy-mode-standard');
                        energyBolt.classList.remove('energy-mode-danger');
                    }
                }
            }
        };

        window.addEventListener("scroll", updateBolt, { passive: true });
        window.addEventListener("resize", updateBolt, { passive: true });
        updateBolt();
    }

    // 3. Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener("click", e => {
            e.preventDefault();
            const t = document.getElementById(a.getAttribute("href").substring(1));
            if (t) window.scrollTo({ top: t.offsetTop - 30, behavior: "smooth" });
        });
    });

    // 4. Parallax Bloom Effect
    const blobs = document.querySelectorAll('.blob');
    if (blobs.length === 3) {
        window.addEventListener('mousemove', e => {
            const x = (e.clientX - window.innerWidth / 2) / 15, y = (e.clientY - window.innerHeight / 2) / 15;
            blobs[0].style.transform = `translate3d(${x * 1.2}px, ${y * 1.2}px, 0)`;
            blobs[1].style.transform = `translate3d(${x * -1.8}px, ${y * -1.8}px, 0)`;
            blobs[2].style.transform = `translate3d(${x * 2.5}px, ${y * 2.5}px, 0)`;
        }, { passive: true });
    }

    // 5. Navbar Compacto
    const nav = document.getElementById('nav');
    const hero = document.getElementById('hero');
    if (nav && hero) {
        window.addEventListener('scroll', () => {
            nav.classList.toggle('nav-compact', window.scrollY > hero.offsetHeight - 80);
        }, { passive: true });
    }

    // 6. Calculadora de Presupuesto (Actualizada con texto largo)
    const range = document.getElementById("budgetRange");
    const valueNum = document.getElementById("budgetValue");
    const priceContainer = document.getElementById("priceDisplay");
    const title = document.getElementById("resultTitle");
    const text = document.getElementById("resultText");
    const longDesc = document.getElementById("resultLongDesc"); // Nuevo elemento
    const btn = document.getElementById("budgetBtn");
    const box = document.querySelector(".investment-box");

    if (range && valueNum && priceContainer && box) {
        function updateBudget() {
            const v = parseInt(range.value);
            valueNum.textContent = v;

            if (v <= 250) {
                title.textContent = "Web básica";
                text.textContent = "Ideal para tener presencia en internet.";
                longDesc.textContent = "Una solución rápida para quienes necesitan una tarjeta de presentación digital. Incluye información de contacto, ubicación y servicios básicos, optimizada para carga rápida.";
            } else if (v <= 350) {
                title.textContent = "Landing interactiva";
                text.textContent = "Perfecta para mostrar su negocio y recibir mensajes.";
                longDesc.textContent = "Diseñada para captar clientes potenciales (leads). Incluye botones de acción directos a WhatsApp, formularios integrados y un diseño dinámico que guía al usuario.";
            } else if (v <= 500) {
                title.textContent = "Web completa";
                text.textContent = "Varias secciones y mejor presentación.";
                longDesc.textContent = "Estructura multi-página con secciones detalladas de servicios, galería de proyectos, testimonios y una arquitectura pensada para el posicionamiento en Google.";
            } else if (v <= 800) {
                title.textContent = "Web avanzada";
                text.textContent = "Contenido premium, mejor diseño y más confianza.";
                longDesc.textContent = "Para negocios que buscan destacar. Incluye animaciones personalizadas, integración profunda de mapas y redes, y optimización premium para máxima velocidad.";
            } else {
                title.textContent = "Proyecto personalizado";
                text.textContent = "Ideal para funciones especiales.";
                longDesc.textContent = "Desarrollo a medida para necesidades específicas. Desde sistemas de reserva y catálogos autogestionables hasta plataformas con bases de datos y lógica compleja.";
            }

            // Colores
            box.classList.remove("investment-low", "investment-mid", "investment-high");
            priceContainer.classList.remove("price-low", "price-mid", "price-high");

            if (v < 400) {
                box.classList.add("investment-low");
                priceContainer.classList.add("price-low");
            } else if (v < 800) {
                box.classList.add("investment-mid");
                priceContainer.classList.add("price-mid");
            } else {
                box.classList.add("investment-high");
                priceContainer.classList.add("price-high");
            }

            btn.href = `https://wa.me/970597061?text=Hola, quiero una página web.%0AMi inversión aproximada es S/${v}`;
        }
        range.addEventListener("input", updateBudget);
        updateBudget();
    }

    // 7. Marquee
    const marquee = document.querySelector('.trust-marquee');
    if (marquee) {
        const group = marquee.querySelector('.marquee-group');
        marquee.appendChild(group.cloneNode(true));
    }
});