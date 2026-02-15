import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const ParticlesBackground = () => {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const { theme } = useTheme();

    const getSettings = (currentTheme) => {
        return {
            PARTICLE_COUNT: 250,
            DENSITY_FACTOR: 0.12,
            PARTICLE_SIZE: {
                MIN: 1,
                MAX: 2
            },
            SPEED: {
                MIN: -0.5,
                MAX: 0.5
            },
            CONNECTION_RADIUS: 100,
            PARTICLE_OPACITY: 1,
            LINE_OPACITY: currentTheme === 'dark' ? 0.5 : 0.2,
            PARTICLE_COLOR: currentTheme === 'dark' ? '255, 255, 255' : '0, 0, 100',
            DIRECTION_CHANGE_FREQUENCY: 0.02
        };
    };

    const calculateParticleCount = (width, height) => {
        const SETTINGS = getSettings(theme);
        const screenArea = width * height;
        const baseArea = 1920 * 1080;
        const scaleFactor = screenArea / baseArea;
        const count = Math.floor(SETTINGS.PARTICLE_COUNT * scaleFactor);
        return Math.min(Math.max(count, 100), 500);
    };

    const handleEasterEgg = () => {
        window.open("https://youtu.be/rEq1Z0bjdwc?si=FmUBM5WYfjhE8PFX", "_blank");
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        const SETTINGS = getSettings(theme);

        class Particle {
            constructor(canvasW, canvasH, currentSettings) {
                this.x = Math.random() * canvasW;
                this.y = Math.random() * canvasH;
                this.angle = Math.random() * Math.PI * 2;
                this.speed = Math.random() * (currentSettings.SPEED.MAX - currentSettings.SPEED.MIN) + currentSettings.SPEED.MIN;
                this.radius = Math.random() * (currentSettings.PARTICLE_SIZE.MAX - currentSettings.PARTICLE_SIZE.MIN) + currentSettings.PARTICLE_SIZE.MIN;
                this.opacity = currentSettings.PARTICLE_OPACITY;
            }

            updateDirection(currentSettings) {
                if (Math.random() < currentSettings.DIRECTION_CHANGE_FREQUENCY) {
                    this.angle += (Math.random() - 0.5) * Math.PI / 2;
                }
            }

            update(currentSettings, canvasW, canvasH) {
                this.updateDirection(currentSettings);

                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed;

                // Bounce off edges
                if (this.x < 0) { this.x = 0; this.angle = Math.PI - this.angle; }
                if (this.x > canvasW) { this.x = canvasW; this.angle = Math.PI - this.angle; }
                if (this.y < 0) { this.y = 0; this.angle = -this.angle; }
                if (this.y > canvasH) { this.y = canvasH; this.angle = -this.angle; }
            }

            draw(ctx, currentSettings) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${currentSettings.PARTICLE_COLOR}, ${this.opacity})`;
                ctx.fill();
            }
        }

        const setCanvasSize = () => {
            const currentWidth = window.innerWidth;
            const currentHeight = window.innerHeight;
            canvas.width = currentWidth;
            canvas.height = currentHeight;

            const currentSettings = getSettings(theme);
            const newCount = calculateParticleCount(currentWidth, currentHeight);
            particlesRef.current = Array.from({ length: newCount }, () => new Particle(currentWidth, currentHeight, currentSettings));
        };

        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        const animate = () => {
            const currentSettings = getSettings(theme);
            const currentWidth = canvas.width;
            const currentHeight = canvas.height;

            ctx.clearRect(0, 0, currentWidth, currentHeight);

            particlesRef.current.forEach(particle => {
                particle.update(currentSettings, currentWidth, currentHeight);
                particle.draw(ctx, currentSettings);
            });

            // Draw connections between particles
            particlesRef.current.forEach((particle, i) => {
                particlesRef.current.slice(i + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < currentSettings.CONNECTION_RADIUS) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        const lineOpacity = currentSettings.LINE_OPACITY * (1 - distance / currentSettings.CONNECTION_RADIUS);
                        ctx.strokeStyle = `rgba(${currentSettings.PARTICLE_COLOR}, ${lineOpacity})`;
                        ctx.stroke();
                    }
                });
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', setCanvasSize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]);

    return (
        <>
            <canvas
                ref={canvasRef}
                className="fixed top-0 left-0 w-full h-screen"
                style={{ pointerEvents: 'none', zIndex: -10 }}
                aria-hidden="true"
            />

            {/* Easter Egg - Bottom Right - Desktop Only */}
            <div className="fixed bottom-8 right-8 z-50 hidden lg:block">
                <span
                    onClick={handleEasterEgg}
                    className="text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors select-none italic cursor-pointer"
                    style={{
                        fontSize: '10px',
                        cursor: `url('/egg/light-saber.cur'), pointer`
                    }}
                >
                    Hello there
                </span>
            </div>
        </>
    );
};

export default ParticlesBackground;