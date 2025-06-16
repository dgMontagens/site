document.addEventListener('DOMContentLoaded', function() {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');

    const animationOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateX(0)';
                
                heroImage.style.opacity = '1';
                heroImage.style.transform = 'translateX(0)';
            }
        });
    }, animationOptions);

    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateX(-30px)';
    heroImage.style.opacity = '0';
    heroImage.style.transform = 'translateX(30px)';
    
    heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
    heroImage.style.transition = 'opacity 1s ease, transform 1s ease';

    observer.observe(heroContent);
    observer.observe(heroImage);
});
