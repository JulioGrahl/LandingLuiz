/**
 * Script principal - Landing Page Advocacia
 * Funcionalidades: FAQ accordion, modal, navegação mobile
 */

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // VARIÁVEIS E CONSTANTES
    // ============================================
    
    // Elementos do FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Elementos do modal
    const modalOverlay = document.getElementById('modal-overlay');
    const closeModalBtn = document.getElementById('close-modal');
    const ctaButtons = document.querySelectorAll('.cta-button:not([type="submit"]):not(.footer-cta-button)');
    
    // Elementos do menu mobile
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    
    // Formulário
    const appointmentForm = document.getElementById('appointment-form');
    
    // ============================================
    // FUNÇÕES DE UTILIDADE
    // ============================================
    
    /**
     * Alterna a visibilidade de um elemento
     * @param {HTMLElement} element - Elemento a ser mostrado/ocultado
     * @param {boolean} show - true para mostrar, false para ocultar
     */
    function toggleElement(element, show) {
        if (show) {
            element.style.display = 'flex';
            setTimeout(() => element.classList.add('active'), 10);
        } else {
            element.classList.remove('active');
            setTimeout(() => element.style.display = 'none', 300);
        }
    }
    
    /**
     * Fecha todos os itens do FAQ exceto o especificado
     * @param {HTMLElement} currentItem - Item que deve permanecer aberto
     */
    function closeOtherFaqItems(currentItem) {
        faqItems.forEach(item => {
            if (item !== currentItem && item.classList.contains('active')) {
                item.classList.remove('active');
            }
        });
    }
    
    // ============================================
    // FUNCIONALIDADE DO FAQ (ACCORDION)
    // ============================================
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Fecha outros itens abertos
                closeOtherFaqItems(item);
                
                // Alterna o item clicado
                item.classList.toggle('active');
            });
        });
        
        // Abre o primeiro item por padrão para melhor UX
        faqItems[0].classList.add('active');
    }
    
    // ============================================
    // FUNCIONALIDADE DO MODAL
    // ============================================
    
    /**
     * Abre o modal de agendamento
     */
    function openModal() {
        toggleElement(modalOverlay, true);
        document.body.style.overflow = 'hidden'; // Previne scroll
    }
    
    /**
     * Fecha o modal de agendamento
     */
    function closeModal() {
        toggleElement(modalOverlay, false);
        document.body.style.overflow = 'auto'; // Restaura scroll
    }
    
    // Adiciona evento de clique para todos os botões CTA
    ctaButtons.forEach(button => {
        button.addEventListener('click', openModal);
    });
    
    // Fecha modal ao clicar no botão de fechar
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    // Fecha modal ao clicar fora do conteúdo
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Fecha modal com tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
    
    // ============================================
    // FUNCIONALIDADE DO MENU MOBILE
    // ============================================
    
    /**
     * Abre o menu mobile
     */
    function openMobileMenu() {
        mobileMenu.style.right = '0';
        document.body.style.overflow = 'hidden';
        mobileMenu.classList.add('active');
    }
    
    /**
     * Fecha o menu mobile
     */
    function closeMobileMenu() {
        mobileMenu.style.right = '-100%';
        document.body.style.overflow = 'auto';
        mobileMenu.classList.remove('active');
    }
    
    // Eventos para abrir/fechar menu mobile
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', openMobileMenu);
    }
    
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', closeMobileMenu);
    }
    
    // Fecha menu ao clicar em um link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // ============================================
    // FORMULÁRIO DE AGENDAMENTO
    // ============================================
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value;
            
            if (!name || !phone || !email || !subject) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Validação simples de e-mail
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um e-mail válido.');
                return;
            }
            
            // Aqui normalmente enviaríamos os dados para um servidor
            // Para demonstração, simulamos um envio bem-sucedido
            
            // Mostra mensagem de sucesso
            alert('Solicitação enviada com sucesso! Entraremos em contato em breve para confirmar o agendamento.');
            
            // Reseta o formulário
            appointmentForm.reset();
            
            // Fecha o modal
            closeModal();
        });
    }
    
    // ============================================
    // MASCARAS DE FORMULÁRIO
    // ============================================
    
    // Máscara para telefone
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (value.length <= 2) {
                    value = `(${value}`;
                } else if (value.length <= 7) {
                    value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
                } else if (value.length <= 11) {
                    value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`;
                } else {
                    value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7, 11)}`;
                }
            }
            
            e.target.value = value;
        });
    }
    
    // ============================================
    // SCROLL SUAVE PARA ÂNCORAS
    // ============================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignora âncoras vazias
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calcula a posição considerando o header fixo
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // ANIMAÇÃO DE CARDS AO ROLAR
    // ============================================
    
    function animateOnScroll() {
        const cards = document.querySelectorAll('.service-card');
        const windowHeight = window.innerHeight;
        
        cards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const animationPoint = 150;
            
            if (cardPosition < windowHeight - animationPoint) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Inicializa animação dos cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    
    // Dispara uma vez ao carregar
    setTimeout(animateOnScroll, 100);
    
    // ============================================
    // CONTADORES ANIMADOS (SEÇÃO SOBRE)
    // ============================================
    
    function animateCounters() {
        const counters = document.querySelectorAll('.credential-number');
        const speed = 200; // Quanto menor, mais rápido
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            let count = 0;
            
            // Verifica se o contador já está visível
            const counterPosition = counter.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (counterPosition < windowHeight - 100) {
                const updateCount = () => {
                    const increment = target / speed;
                    
                    if (count < target) {
                        count += increment;
                        counter.textContent = Math.ceil(count) + '+';
                        setTimeout(updateCount, 10);
                    } else {
                        counter.textContent = target + '+';
                    }
                };
                
                updateCount();
            }
        });
    }
    
    // Observa quando a seção "Sobre" entra na viewport
    const aboutSection = document.querySelector('.about-section');
    
    if (aboutSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(aboutSection);
    }
    
    // ============================================
    // BOTÃO "VOLTAR AO TOPO"
    // ============================================
    
    // Cria botão de voltar ao topo
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Voltar ao topo');
    document.body.appendChild(backToTopButton);
    
    // Estilos do botão
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background-color: var(--primary-blue);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            background-color: var(--secondary-blue);
            transform: translateY(-3px);
        }
    `;
    document.head.appendChild(style);
    
    // Mostra/oculta botão ao rolar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Rola para o topo ao clicar
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ============================================
    // INICIALIZAÇÃO FINAL
    // ============================================
    
    console.log('Landing Page de Advocacia carregada com sucesso!');
});