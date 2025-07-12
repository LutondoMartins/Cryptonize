// Theme Management
        const themeToggle = document.getElementById('themeToggle');
        const html = document.documentElement;
        
        const currentTheme = localStorage.getItem('theme') || 'light';
        html.classList.toggle('dark', currentTheme === 'dark');
        
        themeToggle.addEventListener('click', () => {
            html.classList.toggle('dark');
            const newTheme = html.classList.contains('dark') ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
        });

        // Mobile Menu Management
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        const closeMobileMenu = document.getElementById('closeMobileMenu');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

        function openMobileMenu() {
            mobileMenu.classList.add('active');
            mobileMenuOverlay.classList.remove('opacity-0', 'pointer-events-none');
            document.body.style.overflow = 'hidden';
        }

        function closeMobileMenuFunc() {
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.add('opacity-0', 'pointer-events-none');
            document.body.style.overflow = '';
        }

        mobileMenuBtn.addEventListener('click', openMobileMenu);
        closeMobileMenu.addEventListener('click', closeMobileMenuFunc);
        mobileMenuOverlay.addEventListener('click', closeMobileMenuFunc);
        
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenuFunc);
        });

        // Scroll to section function
        function scrollToSection(sectionId) {
            document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
        }

        // Algorithm button styling
        const algorithmBtns = document.querySelectorAll('.algorithm-btn');
        const decryptAlgorithmBtns = document.querySelectorAll('.decrypt-algorithm-btn');

        // Style algorithm buttons
        function styleAlgorithmButtons() {
            const baseClasses = 'px-4 py-3 rounded-xl font-medium transition-all duration-300 text-sm border-2';
            const inactiveClasses = 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600';
            const activeClasses = 'bg-primary-600 text-white border-primary-600 shadow-lg';

            [...algorithmBtns, ...decryptAlgorithmBtns].forEach(btn => {
                btn.className = `${baseClasses} ${btn.classList.contains('active') ? activeClasses : inactiveClasses}`;
            });
        }

        styleAlgorithmButtons();

        // Current algorithms
        let currentEncryptAlgorithm = 'base64';
        let currentDecryptAlgorithm = 'base64';

        // Algorithm selection for encryption
        algorithmBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                algorithmBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentEncryptAlgorithm = btn.dataset.algorithm;
                
                // Show/hide Caesar key input
                const caesarKeyInput = document.getElementById('caesarKeyInput');
                if (currentEncryptAlgorithm === 'caesar') {
                    caesarKeyInput.classList.remove('hidden');
                } else {
                    caesarKeyInput.classList.add('hidden');
                }
                
                styleAlgorithmButtons();
            });
        });

        // Algorithm selection for decryption
        decryptAlgorithmBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                decryptAlgorithmBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentDecryptAlgorithm = btn.dataset.algorithm;
                
                // Show/hide Caesar key input
                const decryptCaesarKeyInput = document.getElementById('decryptCaesarKeyInput');
                if (currentDecryptAlgorithm === 'caesar') {
                    decryptCaesarKeyInput.classList.remove('hidden');
                } else {
                    decryptCaesarKeyInput.classList.add('hidden');
                }
                
                styleAlgorithmButtons();
            });
        });

        // Character counters
        const inputText = document.getElementById('inputText');
        const outputText = document.getElementById('outputText');
        const encryptedInput = document.getElementById('encryptedInput');
        const decryptedOutput = document.getElementById('decryptedOutput');

        function updateCharCount(input, counter) {
            counter.textContent = input.value.length;
        }

        inputText.addEventListener('input', () => {
            updateCharCount(inputText, document.getElementById('inputCharCount'));
            toggleClearButton('clearInput', inputText.value);
        });

        outputText.addEventListener('input', () => {
            updateCharCount(outputText, document.getElementById('outputCharCount'));
            toggleCopyButton('copyEncrypted', outputText.value);
            toggleClearButton('clearOutput', outputText.value);
        });

        encryptedInput.addEventListener('input', () => {
            updateCharCount(encryptedInput, document.getElementById('encryptedCharCount'));
            toggleClearButton('clearEncryptedInput', encryptedInput.value);
        });

        decryptedOutput.addEventListener('input', () => {
            updateCharCount(decryptedOutput, document.getElementById('decryptedCharCount'));
            toggleCopyButton('copyDecrypted', decryptedOutput.value);
            toggleClearButton('clearDecryptedOutput', decryptedOutput.value);
        });

        function toggleCopyButton(buttonId, text) {
            const button = document.getElementById(buttonId);
            if (text.trim()) {
                button.classList.remove('opacity-0', 'pointer-events-none');
            } else {
                button.classList.add('opacity-0', 'pointer-events-none');
            }
        }

        function toggleClearButton(buttonId, text) {
            const button = document.getElementById(buttonId);
            if (text.trim()) {
                button.classList.remove('opacity-0', 'pointer-events-none');
            } else {
                button.classList.add('opacity-0', 'pointer-events-none');
            }
        }

        // Clear buttons
        document.getElementById('clearInput').addEventListener('click', () => {
            inputText.value = '';
            updateCharCount(inputText, document.getElementById('inputCharCount'));
            toggleClearButton('clearInput', '');
        });

        document.getElementById('clearOutput').addEventListener('click', () => {
            outputText.value = '';
            updateCharCount(outputText, document.getElementById('outputCharCount'));
            toggleCopyButton('copyEncrypted', '');
            toggleClearButton('clearOutput', '');
        });

        document.getElementById('clearEncryptedInput').addEventListener('click', () => {
            encryptedInput.value = '';
            updateCharCount(encryptedInput, document.getElementById('encryptedCharCount'));
            toggleClearButton('clearEncryptedInput', '');
        });

        document.getElementById('clearDecryptedOutput').addEventListener('click', () => {
            decryptedOutput.value = '';
            updateCharCount(decryptedOutput, document.getElementById('decryptedCharCount'));
            toggleCopyButton('copyDecrypted', '');
            toggleClearButton('clearDecryptedOutput', '');
        });

        // Encryption functions
        function encryptBase64(text) {
            try {
                return btoa(unescape(encodeURIComponent(text)));
            } catch (e) {
                throw new Error('Erro ao codificar em Base64');
            }
        }

        function decryptBase64(text) {
            try {
                return decodeURIComponent(escape(atob(text)));
            } catch (e) {
                throw new Error('Texto Base64 inválido');
            }
        }

        function encryptCaesar(text, shift) {
            return text.replace(/[a-zA-Z]/g, function(char) {
                const start = char <= 'Z' ? 65 : 97;
                return String.fromCharCode(((char.charCodeAt(0) - start + shift) % 26) + start);
            });
        }

        function decryptCaesar(text, shift) {
            return encryptCaesar(text, 26 - shift);
        }

        function encryptROT13(text) {
            return encryptCaesar(text, 13);
        }

        function decryptROT13(text) {
            return encryptCaesar(text, 13); // ROT13 is its own inverse
        }

        function encryptReverse(text) {
            return text.split('').reverse().join('');
        }

        function decryptReverse(text) {
            return text.split('').reverse().join('');
        }

        // Main encryption function
        function encrypt(text, algorithm, key = null) {
            if (!text.trim()) {
                throw new Error('Digite um texto para criptografar');
            }

            switch (algorithm) {
                case 'base64':
                    return encryptBase64(text);
                case 'caesar':
                    const caesarKey = key || parseInt(document.getElementById('caesarKey').value);
                    if (caesarKey < 1 || caesarKey > 25) {
                        throw new Error('Chave Caesar deve estar entre 1 e 25');
                    }
                    return encryptCaesar(text, caesarKey);
                case 'rot13':
                    return encryptROT13(text);
                case 'reverse':
                    return encryptReverse(text);
                default:
                    throw new Error('Algoritmo não suportado');
            }
        }

        // Main decryption function
        function decrypt(text, algorithm, key = null) {
            if (!text.trim()) {
                throw new Error('Digite um texto para descriptografar');
            }

            switch (algorithm) {
                case 'base64':
                    return decryptBase64(text);
                case 'caesar':
                    const caesarKey = key || parseInt(document.getElementById('decryptCaesarKey').value);
                    if (caesarKey < 1 || caesarKey > 25) {
                        throw new Error('Chave Caesar deve estar entre 1 e 25');
                    }
                    return decryptCaesar(text, caesarKey);
                case 'rot13':
                    return decryptROT13(text);
                case 'reverse':
                    return decryptReverse(text);
                default:
                    throw new Error('Algoritmo não suportado');
            }
        }

        // Encrypt button
        document.getElementById('encryptBtn').addEventListener('click', () => {
            const button = document.getElementById('encryptBtn');
            const originalText = button.innerHTML;
            
            try {
                button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Criptografando...';
                button.disabled = true;
                
                setTimeout(() => {
                    try {
                        const result = encrypt(inputText.value, currentEncryptAlgorithm);
                        outputText.value = result;
                        updateCharCount(outputText, document.getElementById('outputCharCount'));
                        toggleCopyButton('copyEncrypted', result);
                        toggleClearButton('clearOutput', result);
                        
                        button.innerHTML = '<i class="fas fa-check mr-2"></i>Criptografado!';
                        button.classList.remove('bg-primary-600', 'hover:bg-primary-700');
                        button.classList.add('bg-green-600');
                        
                        setTimeout(() => {
                            button.innerHTML = originalText;
                            button.disabled = false;
                            button.classList.remove('bg-green-600');
                            button.classList.add('bg-primary-600', 'hover:bg-primary-700');
                        }, 1500);
                    } catch (error) {
                        showToast(error.message, 'error');
                        button.innerHTML = originalText;
                        button.disabled = false;
                    }
                }, 500);
            } catch (error) {
                showToast(error.message, 'error');
                button.innerHTML = originalText;
                button.disabled = false;
            }
        });

        // Decrypt button
        document.getElementById('decryptBtn').addEventListener('click', () => {
            const button = document.getElementById('decryptBtn');
            const originalText = button.innerHTML;
            
            try {
                button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Descriptografando...';
                button.disabled = true;
                
                setTimeout(() => {
                    try {
                        const result = decrypt(encryptedInput.value, currentDecryptAlgorithm);
                        decryptedOutput.value = result;
                        updateCharCount(decryptedOutput, document.getElementById('decryptedCharCount'));
                        toggleCopyButton('copyDecrypted', result);
                        toggleClearButton('clearDecryptedOutput', result);
                        
                        button.innerHTML = '<i class="fas fa-check mr-2"></i>Descriptografado!';
                        button.classList.remove('bg-green-600', 'hover:bg-green-700');
                        button.classList.add('bg-blue-600');
                        
                        setTimeout(() => {
                            button.innerHTML = originalText;
                            button.disabled = false;
                            button.classList.remove('bg-blue-600');
                            button.classList.add('bg-green-600', 'hover:bg-green-700');
                        }, 1500);
                    } catch (error) {
                        showToast(error.message, 'error');
                        button.innerHTML = originalText;
                        button.disabled = false;
                    }
                }, 500);
            } catch (error) {
                showToast(error.message, 'error');
                button.innerHTML = originalText;
                button.disabled = false;
            }
        });

        // Copy functions
        async function copyToClipboard(text, buttonId) {
            try {
                await navigator.clipboard.writeText(text);
                const button = document.getElementById(buttonId);
                const originalHTML = button.innerHTML;
                
                button.innerHTML = '<i class="fas fa-check text-sm"></i>';
                button.classList.add('copy-success');
                
                setTimeout(() => {
                    button.innerHTML = originalHTML;
                    button.classList.remove('copy-success');
                }, 1000);
                
                showToast('Texto copiado para a área de transferência!');
            } catch (err) {
                showToast('Erro ao copiar texto', 'error');
            }
        }

        document.getElementById('copyEncrypted').addEventListener('click', () => {
            copyToClipboard(outputText.value, 'copyEncrypted');
        });

        document.getElementById('copyDecrypted').addEventListener('click', () => {
            copyToClipboard(decryptedOutput.value, 'copyDecrypted');
        });

        // Toast notification
        function showToast(message, type = 'success') {
            const toast = document.getElementById('toast');
            const toastMessage = document.getElementById('toastMessage');
            
            toastMessage.textContent = message;
            
            if (type === 'error') {
                toast.classList.remove('bg-green-600');
                toast.classList.add('bg-red-600');
                toast.querySelector('i').classList.remove('fa-check-circle');
                toast.querySelector('i').classList.add('fa-exclamation-circle');
            } else {
                toast.classList.remove('bg-red-600');
                toast.classList.add('bg-green-600');
                toast.querySelector('i').classList.remove('fa-exclamation-circle');
                toast.querySelector('i').classList.add('fa-check-circle');
            }
            
            toast.classList.remove('translate-y-full', 'opacity-0');
            
            setTimeout(() => {
                toast.classList.add('translate-y-full', 'opacity-0');
            }, 3000);
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // Escape key closes mobile menu
            if (e.key === 'Escape') {
                closeMobileMenuFunc();
            }
            
            // Ctrl+Enter to encrypt
            if (e.ctrlKey && e.key === 'Enter') {
                if (document.activeElement === inputText) {
                    document.getElementById('encryptBtn').click();
                } else if (document.activeElement === encryptedInput) {
                    document.getElementById('decryptBtn').click();
                }
            }
        });