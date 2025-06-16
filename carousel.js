document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    // Dados dos trabalhos
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
        }
    ];
    
    let currentPage = 0;
    let itemsPerPage = 3;
    let intervalId;
    
    // Criar cards de trabalho
    function createWorkCards() {
        carousel.innerHTML = '';
        
        trabalhos.forEach((trabalho, index) => {
            const item = document.createElement('div');
            item.className = 'carousel-item';
            item.innerHTML = `
                <img src="${trabalho.img}?auto=format&fit=crop&w=600&h=400" alt="${trabalho.title}">
                <div class="gallery-overlay">
                    <h3>${trabalho.title}</h3>
                    <p>${trabalho.desc}</p>
                </div>
            `;
            carousel.appendChild(item);
        });
    }
    
    // Criar indicadores
    function createIndicators() {
        indicatorsContainer.innerHTML = '';
        const pageCount = Math.ceil(trabalhos.length / itemsPerPage);
        
        for (let i = 0; i < pageCount; i++) {
            const indicator = document.createElement('button');
            indicator.className = `indicator ${i === 0 ? 'active' : ''}`;
            indicator.addEventListener('click', () => goToPage(i));
            indicatorsContainer.appendChild(indicator);
        }
    }
    
    // Atualizar exibição do carousel
    function updateCarousel() {
        const pageCount = Math.ceil(trabalhos.length / itemsPerPage);
        
        // Ajustar página atual se necessário
        if (currentPage >= pageCount) currentPage = pageCount - 1;
        if (currentPage < 0) currentPage = 0;
        
        // Calcular deslocamento
        const offset = -currentPage * (100 / itemsPerPage);
        carousel.style.transform = `translateX(${offset}%)`;
        
        // Atualizar indicadores
        document.querySelectorAll('.indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentPage);
        });
        
        // Ajustar itens por página para responsividade
        if (window.innerWidth < 992 && window.innerWidth >= 768) {
            itemsPerPage = 2;
        } else if (window.innerWidth < 768) {
            itemsPerPage = 1;
        } else {
            itemsPerPage = 3;
        }
    }
    
    // Navegar para uma página específica
    function goToPage(page) {
        currentPage = page;
        updateCarousel();
    }
    
    // Próxima página
    function nextPage() {
        const pageCount = Math.ceil(trabalhos.length / itemsPerPage);
        currentPage = (currentPage + 1) % pageCount;
        updateCarousel();
    }
    
    // Página anterior
    function prevPage() {
        const pageCount = Math.ceil(trabalhos.length / itemsPerPage);
        currentPage = (currentPage - 1 + pageCount) % pageCount;
        updateCarousel();
    }
    
    // Iniciar autoplay
    function startAutoSlide() {
        intervalId = setInterval(nextPage, 5000);
    }
    
    // Parar autoplay
    function stopAutoSlide() {
        clearInterval(intervalId);
    }
    
    // Inicialização
    createWorkCards();
    createIndicators();
    updateCarousel();
    
    // Event listeners
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
    
    // Pausar autoplay ao passar o mouse sobre o carousel
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);
    
    // Atualizar ao redimensionar a janela
    window.addEventListener('resize', updateCarousel);
    
    // Iniciar autoplay
    startAutoSlide();
});