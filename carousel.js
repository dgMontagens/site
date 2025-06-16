document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    const trabalhos = [
        {
            img: "imagens/imagem3-armario-curvo.jpg",
            title: "Armário com Laterais Curvas",
            desc: "Montagem de armário planejado com design moderno e laterais arredondadas"
        },
        {
            img: "imagens/imagem-armario-curvo2.jpg",
            title: "Armário com Laterais Curvas",
            desc: "Montagem de armário planejado com design moderno e laterais arredondadas"
        },
        {
            img: "imagens/imagem1-rack.jpg",
            title: "Rack",
            desc: "Montagem de rack moderno para sala de estar"
        },        
        {
            img: "imagens/imagem-cozinha.jpg",
            title: "Cozinha",
            desc: "Montagem de Cozinha"
        },
        {
            img: "imagens/imagem-cozinha-top.jpg",
            title: "Cozinha",
            desc: "Montagem de Cozinha"
        },
        {
            img: "imagens/imagem-mesa4lugares.jpg",
            title: "Cozinha",
            desc: "Montagem de mesa 4 Lugares"
        },
        {
            img: "imagens/imagem-comoda-cinza.jpg",
            title: "quarto",
            desc: "Montagem de comoda 2 portas"
        },
        {
            img: "imagens/imagem-comoda5portas.jpg",
            title: "quarto",
            desc: "Montagem de comoda 5 portas"
        },
        {
            img: "imagens/escritorio1.jpg",
            title: "escritório",
            desc: "Montagem de bancada de escritório com ar condicionado"
        },
        {
            img: "imagens/escritorio2.jpg",
            title: "escritório",
            desc: "Montagem de bancada de escritório com ar condicionado"
        },
        {
            img: "imagens/armario-aereo1.jpg",
            title: "cozinha",
            desc: "Montagem de armário aereo para cozinha"
        },
        {
            img: "imagens/armario-aereo2.jpg",
            title: "cozinha",
            desc: "Montagem de armário aereo para cozinha"
        },
        {
            img: "imagens/roupeiro-marrom1.jpg",
            title: "quarto",
            desc: "Montagem de roupeiro de 6 portas com espelho"
        },
        {
            img: "imagens/roupeiro-marrom2.jpg",
            title: "quarto",
            desc: "Montagem de roupeiro de 6 portas com espelho"
        },
        {
            img: "imagens/roupeiro-marrom3.jpg",
            title: "quarto",
            desc: "Montagem de roupeiro de 6 portas com espelho"
        }
    ];
    
    let currentPage = 0;
    let itemsPerPage;
    let intervalId;
    
    function calculateItemsPerPage() {
        if (window.innerWidth < 768) {
            itemsPerPage = 1;
        } else if (window.innerWidth < 1200) {
            itemsPerPage = 2;
        } else {
            itemsPerPage = 3;
        }
    }
    
    function createWorkCards() {
        carousel.innerHTML = '';
        
        trabalhos.forEach((trabalho, index) => {
            const item = document.createElement('div');
            item.className = 'carousel-item';
            item.innerHTML = `
                <img src="${trabalho.img}" alt="${trabalho.title}">
                <div class="gallery-overlay">
                    <h3>${trabalho.title}</h3>
                    <p>${trabalho.desc}</p>
                </div>
            `;
            carousel.appendChild(item);
        });
    }
    
    function createIndicators() {
        indicatorsContainer.innerHTML = '';
        calculateItemsPerPage();
        const pageCount = Math.ceil(trabalhos.length / itemsPerPage);
        
        for (let i = 0; i < pageCount; i++) {
            const indicator = document.createElement('button');
            indicator.className = `indicator ${i === 0 ? 'active' : ''}`;
            indicator.addEventListener('click', () => goToPage(i));
            indicatorsContainer.appendChild(indicator);
        }
    }
    
    function updateCarousel() {
        calculateItemsPerPage();
        const pageCount = Math.ceil(trabalhos.length / itemsPerPage);
        
        if (currentPage >= pageCount) currentPage = pageCount - 1;
        if (currentPage < 0) currentPage = 0;
        
        const offset = -currentPage * 100;
        carousel.style.transform = `translateX(${offset}%)`;
        
        document.querySelectorAll('.indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentPage);
        });
    }
    
    function goToPage(page) {
        currentPage = page;
        updateCarousel();
    }
    
    function nextPage() {
        calculateItemsPerPage();
        const pageCount = Math.ceil(trabalhos.length / itemsPerPage);
        currentPage = (currentPage + 1) % pageCount;
        updateCarousel();
    }
    
    function prevPage() {
        calculateItemsPerPage();
        const pageCount = Math.ceil(trabalhos.length / itemsPerPage);
        currentPage = (currentPage - 1 + pageCount) % pageCount;
        updateCarousel();
    }
    
    function startAutoSlide() {
        intervalId = setInterval(nextPage, 5000);
    }
    
    function stopAutoSlide() {
        clearInterval(intervalId);
    }
    
    createWorkCards();
    createIndicators();
    updateCarousel();
    
    prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        prevPage();
        startAutoSlide();
    });
    
    nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        nextPage();
        startAutoSlide();
    });
    
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);
    
    window.addEventListener('resize', () => {
        createIndicators();
        updateCarousel();
    });
    
    startAutoSlide();
});