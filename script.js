const links = document.querySelectorAll('.animate-link');

links.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));

        target.scrollIntoView({ behavior: 'smooth' });

        target.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        target.style.transform = 'scale(0.95)';
        target.style.opacity = '0';
        
        setTimeout(() => {
            target.style.transform = 'scale(1)';
            target.style.opacity = '1';
        }, 200);

        setTimeout(() => {
            target.style.transition = 'transform 0.3s ease';
            target.style.transform = 'scale(1.02)';
        }, 600);
        
        setTimeout(() => {
            target.style.transform = 'scale(1)';
        }, 750);

        createSparkles(link);
    });
});

function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    const colors = ['#C17D5A', '#8B9A7B', '#ADB9A0'];
    
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'fixed';
        sparkle.style.left = rect.left + rect.width / 2 + 'px';
        sparkle.style.top = rect.top + rect.height / 2 + 'px';
        sparkle.style.width = '8px';
        sparkle.style.height = '8px';
        sparkle.style.borderRadius = '50%';
        sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        
        document.body.appendChild(sparkle);
        
        const angle = (Math.PI * 2 * i) / 8;
        const distance = 50 + Math.random() * 30;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        sparkle.animate([
            { 
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            { 
                transform: `translate(${tx}px, ${ty}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 600 + Math.random() * 200,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => sparkle.remove();
    }
}
