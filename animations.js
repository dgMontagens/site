document.addEventListener('DOMContentLoaded', function() {
    // Selecionar elementos
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');

    // Configurar as animações
    const animationOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Criar o observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animação do conteúdo
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateX(0)';
                
                // Animação da imagem
                heroImage.style.opacity = '1';
                heroImage.style.transform = 'translateX(0)';
            }
        });
    }, animationOptions);

    // Iniciar as animações com opacidade 0 e posição inicial
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateX(-30px)';
    heroImage.style.opacity = '0';
    heroImage.style.transform = 'translateX(30px)';
    
    // Adicionar transição
    heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
    heroImage.style.transition = 'opacity 1s ease, transform 1s ease';

    // Observar os elementos
    observer.observe(heroContent);
    observer.observe(heroImage);
});
