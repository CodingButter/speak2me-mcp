    <script>
        // Mobile menu toggle
        function toggleMobileMenu() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('mobileOverlay');
            sidebar.classList.toggle('mobile-open');
            overlay.classList.toggle('active');
        }

        // View switching
        function switchView(viewName) {
            // Update active view
            document.querySelectorAll('.view-container').forEach(view => {
                view.classList.remove('active');
            });
            document.getElementById(viewName).classList.add('active');

            // Update active nav item
            document.querySelectorAll('.nav-item').forEach((item, index) => {
                item.classList.remove('active');
            });
            event.target.closest('.nav-item').classList.add('active');

            // Close mobile menu on view switch
            if (window.innerWidth <= 968) {
                toggleMobileMenu();
            }
        }

        // Mode selector
        function setMode(btn, mode) {
            document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById('audioStatus').textContent = `Mode: ${mode} - Ready to listen`;
        }

        // Mic toggle
        let isRecording = false;
        function toggleMic() {
            const btn = document.getElementById('micButton');
            const status = document.getElementById('audioStatus');
            
            isRecording = !isRecording;
            
            if (isRecording) {
                btn.classList.add('recording');
                btn.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="6" width="12" height="12" rx="2"/>
                    </svg>
                `;
                status.textContent = 'Recording... (Click to stop)';
                startVolumeAnimation();
            } else {
                btn.classList.remove('recording');
                btn.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                        <line x1="12" y1="19" x2="12" y2="23"/>
                        <line x1="8" y1="23" x2="16" y2="23"/>
                    </svg>
                `;
                status.textContent = 'Idle - Ready to listen';
                stopVolumeAnimation();
            }
        }

        // Volume meter animation
        let volumeInterval;
        function startVolumeAnimation() {
            volumeInterval = setInterval(() => {
                const randomVolume = Math.random() * 100;
                document.getElementById('volumeLevel').style.width = randomVolume + '%';
            }, 100);
        }

        function stopVolumeAnimation() {
            clearInterval(volumeInterval);
            document.getElementById('volumeLevel').style.width = '0%';
        }

        // Modal functions
        function showModal(modalName) {
            document.getElementById(modalName + 'Modal').classList.add('active');
        }

        function hideModal(modalName) {
            document.getElementById(modalName + 'Modal').classList.remove('active');
        }

        // Create task function
        function createTask() {
            showToast('âœ" Task created successfully', 'success');
            hideModal('newTask');
        }

        // Toast notification
        function showToast(message, type = 'success') {
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            const icon = type === 'success' 
                ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                     <polyline points="20 6 9 17 4 12"/>
                   </svg>`
                : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                     <circle cx="12" cy="12" r="10"/>
                     <line x1="12" y1="8" x2="12" y2="12"/>
                     <line x1="12" y1="16" x2="12.01" y2="16"/>
                   </svg>`;
            toast.innerHTML = `
                <span class="toast-icon">${icon}</span>
                <span>${message}</span>
            `;
            document.body.appendChild(toast);

            setTimeout(() => {
                toast.remove();
            }, 3000);
        }

        // Initialize - show welcome toast
        setTimeout(() => {
            showToast('Welcome to Speak2Me!', 'success');
        }, 500);

        // Audio player simulation
        document.querySelectorAll('.play-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const isPlaying = this.innerHTML.includes('polygon');
                if (isPlaying) {
                    this.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <rect x="6" y="4" width="4" height="16"/>
                            <rect x="14" y="4" width="4" height="16"/>
                        </svg>
                    `;
                    this.closest('.audio-player').style.background = 'rgba(0, 212, 255, 0.1)';
                } else {
                    this.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3"/>
                        </svg>
                    `;
                    this.closest('.audio-player').style.background = 'var(--bg-tertiary)';
                }
            });
        });

        // Click outside modal to close
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove('active');
                }
            });
        });
    </script>
