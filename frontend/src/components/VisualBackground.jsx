import React, { useEffect, useRef } from 'react';

const VisualBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let time = 0;

        let particles = [];
        let shapes = [];
        const particleCount = 100;
        const connectionDistance = 180;
        const mouse = { x: null, y: null };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
            initShapes();
        };

        // ─── Connectivity Mesh Particles ───
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2.5 + 0.5;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
            }

            draw() {
                ctx.fillStyle = 'rgba(59, 130, 246, 0.4)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }

            update() {
                if (mouse.x !== null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 250) {
                        let force = (250 - distance) / 250;
                        this.vx -= (dx / distance) * force * 0.04;
                        this.vy -= (dy / distance) * force * 0.04;
                    }
                }
                this.x += this.vx;
                this.y += this.vy;
                this.vx *= 0.995;
                this.vy *= 0.995;
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
        }

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const drawConnections = () => {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a + 1; b < particles.length; b++) {
                    let dx = particles[a].x - particles[b].x;
                    let dy = particles[a].y - particles[b].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < connectionDistance) {
                        let opacity = 1 - (distance / connectionDistance);
                        ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.25})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        // ─── Floating Geometric Shapes ───
        const initShapes = () => {
            shapes = [];
            for (let i = 0; i < 12; i++) {
                shapes.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 70 + 30,
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.006,
                    driftX: (Math.random() - 0.5) * 0.25,
                    driftY: (Math.random() - 0.5) * 0.15,
                    type: ['hexagon', 'triangle', 'diamond', 'circle'][Math.floor(Math.random() * 4)],
                    color: [
                        [59, 130, 246],
                        [99, 102, 241],
                        [139, 92, 246],
                        [79, 70, 229],
                    ][Math.floor(Math.random() * 4)],
                    opacity: Math.random() * 0.07 + 0.03,
                    pulsePhase: Math.random() * Math.PI * 2,
                });
            }
        };

        const drawPolygon = (x, y, size, sides, rotation) => {
            ctx.beginPath();
            for (let i = 0; i < sides; i++) {
                const angle = (Math.PI * 2 / sides) * i + rotation;
                const px = x + size * Math.cos(angle);
                const py = y + size * Math.sin(angle);
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();
        };

        const drawShapes = () => {
            shapes.forEach(shape => {
                const pulse = Math.sin(time * 2 + shape.pulsePhase) * 0.015;
                const alpha = shape.opacity + pulse;
                const [r, g, b] = shape.color;

                if (shape.type === 'hexagon') drawPolygon(shape.x, shape.y, shape.size, 6, shape.rotation);
                else if (shape.type === 'triangle') drawPolygon(shape.x, shape.y, shape.size * 1.1, 3, shape.rotation);
                else if (shape.type === 'diamond') drawPolygon(shape.x, shape.y, shape.size, 4, shape.rotation);
                else {
                    ctx.beginPath();
                    ctx.arc(shape.x, shape.y, shape.size * 0.6, 0, Math.PI * 2);
                    ctx.closePath();
                }

                // Gradient fill
                const gradient = ctx.createRadialGradient(shape.x, shape.y, 0, shape.x, shape.y, shape.size * 1.4);
                gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 1.5})`);
                gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
                ctx.fillStyle = gradient;
                ctx.fill();

                // Stroke
                ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 2})`;
                ctx.lineWidth = 1.2;
                ctx.stroke();

                // Update
                shape.x += shape.driftX;
                shape.y += shape.driftY;
                shape.rotation += shape.rotationSpeed;
                if (shape.x < -shape.size) shape.x = canvas.width + shape.size;
                if (shape.x > canvas.width + shape.size) shape.x = -shape.size;
                if (shape.y < -shape.size) shape.y = canvas.height + shape.size;
                if (shape.y > canvas.height + shape.size) shape.y = -shape.size;
            });
        };

        // ─── Subtle Grid ───
        const drawGrid = () => {
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.025)';
            ctx.lineWidth = 1;
            const gridSize = 80;
            for (let x = 0; x < canvas.width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            for (let y = 0; y < canvas.height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }
        };

        // ─── Animation Loop ───
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time += 0.01;

            // Layer 1: Grid
            drawGrid();

            // Layer 2: Geometric shapes
            drawShapes();

            // Layer 3: Connectivity mesh
            particles.forEach(p => { p.update(); p.draw(); });
            drawConnections();

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none',
            }}
        />
    );
};

export default VisualBackground;
