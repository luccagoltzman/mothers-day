document.addEventListener('DOMContentLoaded', () => {
    const loveButton = document.querySelector('.love-button');
    const loveCounter = document.querySelector('.love-counter');
    const container = document.querySelector('.container');
    const themeToggle = document.querySelector('.theme-toggle');
    const messageInput = document.querySelector('.message-input textarea');
    const addMessageButton = document.querySelector('.add-message');
    const messageWall = document.querySelector('.message-wall');
    const treeMessages = document.querySelector('.tree-messages');
    let count = 0;

    // Array de mensagens sobre mães
    const messages = [
        "Mãe é o amor mais puro que existe no mundo.",
        "Cada abraço de mãe é um pedaço do céu na Terra.",
        "Mãe é aquela que nos ensina a voar, mesmo quando quer nos proteger.",
        "O amor de mãe é o único que cresce quanto mais você divide.",
        "Mãe é sinônimo de força, coragem e amor infinito.",
        "Cada sorriso de mãe ilumina o dia mais escuro.",
        "Mãe é aquela que nos faz sorrir mesmo quando tudo parece perdido.",
        "O coração de uma mãe é o lugar mais seguro do mundo.",
        "Mãe é aquela que nos ensina o verdadeiro significado do amor.",
        "Cada momento com a mãe é um presente precioso.",
        "Mãe é aquela que nos faz acreditar que podemos tudo.",
        "O amor de mãe é o único que não precisa de palavras.",
        "Mãe é aquela que nos faz sentir especiais todos os dias.",
        "Cada gesto de mãe é uma prova de amor infinito.",
        "Mãe é aquela que nos ensina a ser fortes mesmo quando fraquejamos."
    ];

    // Função para criar corações flutuantes
    function createFloatingHeart(x, y) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.fontSize = '2rem';
        heart.style.animation = 'floatHeart 2s ease-out forwards';
        container.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 2000);
    }

    // Função para criar mensagem flutuante
    function createFloatingMessage() {
        // Remover mensagem anterior se existir
        const existingMessage = document.querySelector('.tree-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const message = document.createElement('div');
        message.className = 'tree-message';
        message.textContent = messages[Math.floor(Math.random() * messages.length)];
        
        // Posição horizontal aleatória dentro do container
        const container = document.querySelector('.tree-container');
        const containerRect = container.getBoundingClientRect();
        const margin = 20;
        const maxX = containerRect.width - 280; // Largura máxima da mensagem
        const x = Math.random() * (maxX - 2 * margin) + margin;
        message.style.left = `${x}px`;
        
        treeMessages.appendChild(message);

        // Remover mensagem após a animação
        setTimeout(() => {
            message.remove();
        }, 15000);
    }

    // Adicionar animação de coração flutuante
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatHeart {
            0% {
                transform: translateY(0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Evento de clique no botão de amor
    if (loveButton) {
        loveButton.addEventListener('click', (e) => {
            count++;
            if (loveCounter) {
                loveCounter.textContent = `${count} coração${count !== 1 ? 's' : ''} enviado${count !== 1 ? 's' : ''}`;
            }
            
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            createFloatingHeart(x, y);
            
            // Criar apenas uma mensagem
            createFloatingMessage();

            loveButton.style.transform = 'scale(1.1)';
            setTimeout(() => {
                loveButton.style.transform = 'scale(1)';
            }, 200);
        });
    }

    // Efeito de parallax nas flores
    const flowers = document.querySelectorAll('.flower');
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        flowers.forEach((flower, index) => {
            const speed = (index + 1) * 0.1;
            const moveX = (x - 0.5) * speed * 50;
            const moveY = (y - 0.5) * speed * 50;
            flower.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });

    // Upload de foto
    const photoPlaceholder = document.querySelector('.photo-placeholder');
    photoPlaceholder.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    photoPlaceholder.style.backgroundImage = `url(${event.target.result})`;
                    photoPlaceholder.style.backgroundSize = 'cover';
                    photoPlaceholder.style.backgroundPosition = 'center';
                    photoPlaceholder.innerHTML = '';
                };
                reader.readAsDataURL(file);
            }
        };
        
        input.click();
    });

    // Modo noturno
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('night-mode');
            themeToggle.textContent = document.body.classList.contains('night-mode') ? '☀️' : '🌙';
        });
    }

    // Arrastar elementos
    const draggableElements = document.querySelectorAll('.draggable');
    draggableElements.forEach(element => {
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;

        element.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);

        function dragStart(e) {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;

            if (e.target === element) {
                isDragging = true;
            }
        }

        function drag(e) {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;

                xOffset = currentX;
                yOffset = currentY;

                setTranslate(currentX, currentY, element);
            }
        }

        function dragEnd() {
            initialX = currentX;
            initialY = currentY;
            isDragging = false;
        }

        function setTranslate(xPos, yPos, el) {
            el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
        }
    });

    // Adicionar mensagens
    addMessageButton.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message) {
            const messageElement = document.createElement('div');
            messageElement.className = 'message-card';
            messageElement.innerHTML = `
                <p>${message}</p>
                <span class="message-date">${new Date().toLocaleDateString()}</span>
            `;
            messageWall.appendChild(messageElement);
            messageInput.value = '';
            
            // Animação de entrada
            messageElement.style.opacity = '0';
            messageElement.style.transform = 'translateY(20px)';
            setTimeout(() => {
                messageElement.style.opacity = '1';
                messageElement.style.transform = 'translateY(0)';
            }, 10);
        }
    });

    // Efeito de clique no coração principal
    const heart = document.querySelector('.heart');
    const heartContainer = document.querySelector('.heart-container');
    
    if (heartContainer && heart) {
        heartContainer.addEventListener('click', () => {
            // Criar efeito de pulso
            heart.style.transform = 'rotate(45deg) scale(1.2)';
            heart.style.filter = 'brightness(1.2)';
            
            // Criar corações flutuantes ao redor
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const angle = (i * 72) * (Math.PI / 180);
                    const x = Math.cos(angle) * 50;
                    const y = Math.sin(angle) * 50;
                    
                    const floatingHeart = document.createElement('div');
                    floatingHeart.innerHTML = '❤️';
                    floatingHeart.style.position = 'absolute';
                    floatingHeart.style.left = '50%';
                    floatingHeart.style.top = '50%';
                    floatingHeart.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
                    floatingHeart.style.fontSize = '1.5rem';
                    floatingHeart.style.animation = 'floatHeart 1.5s ease-out forwards';
                    heartContainer.appendChild(floatingHeart);
                    
                    setTimeout(() => {
                        floatingHeart.remove();
                    }, 1500);
                }, i * 100);
            }
            
            // Resetar o coração
            setTimeout(() => {
                heart.style.transform = 'rotate(45deg) scale(1)';
                heart.style.filter = 'brightness(1)';
            }, 300);
        });
    }
}); 