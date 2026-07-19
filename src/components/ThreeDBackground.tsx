import { useEffect, useRef } from "react";

export default function ThreeDBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width;
    let height = canvas.height;

    // Golden ratio for Icosahedron
    const phi = (1 + Math.sqrt(5)) / 2;

    // Set up standard 12 vertices of an icosahedron
    const baseVertices = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ];

    // Normalize vertices so they lie on a unit sphere, then scale
    const vertices = baseVertices.map(([x, y, z]) => {
      const length = Math.sqrt(x * x + y * y + z * z);
      return [x / length, y / length, z / length];
    });

    // Find all edges (pairs of vertices whose distance is approximately equal)
    const edges: [number, number][] = [];
    const distTolerance = 0.1;
    const targetDist = 2 / Math.sqrt(1 + phi * phi); // Normalized distance

    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const dx = vertices[i][0] - vertices[j][0];
        const dy = vertices[i][1] - vertices[j][1];
        const dz = vertices[i][2] - vertices[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (Math.abs(dist - 1.05) < distTolerance || Math.abs(dist - 1.051) < distTolerance) {
          edges.push([i, j]);
        }
      }
    }

    // Edge correction - an icosahedron has exactly 30 edges
    // If our threshold missed any, we can do direct indexing or keep a slightly robust threshold
    // Let's just hardcode the 30 edges or use a robust distance. Since distance between vertices
    // on unit sphere is const, any vertex is connected to exactly 5 others. Let's filter connections.
    const connections: [number, number][] = [];
    for (let i = 0; i < vertices.length; i++) {
      const dists = vertices.map((v, idx) => ({
        idx,
        d: Math.hypot(v[0] - vertices[i][0], v[1] - vertices[i][1], v[2] - vertices[i][2])
      }));
      // Sort by distance (excluding self)
      dists.sort((a, b) => a.d - b.d);
      // The 5 closest vertices are the connected ones
      for (let k = 1; k <= 5; k++) {
        const j = dists[k].idx;
        if (i < j) {
          connections.push([i, j]);
        }
      }
    }

    let angleX = 0.003;
    let angleY = 0.005;
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      targetX = x * 0.002;
      targetY = y * 0.002;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const resizeObserver = new ResizeObserver(() => {
      if (!canvas) return;
      const w = canvas.clientWidth || 400;
      const h = canvas.clientHeight || 400;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        width = w;
        height = h;
      }
    });
    resizeObserver.observe(canvas);

    canvas.width = canvas.clientWidth || 400;
    canvas.height = canvas.clientHeight || 400;
    width = canvas.width;
    height = canvas.height;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse follow (lerp)
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Update base rotations with continuous speed + user drag drift
      angleX += 0.005 + mouseY * 0.02;
      angleY += 0.008 + mouseX * 0.02;

      // Pulse scaling with sine wave over time
      const time = Date.now() * 0.002;
      const pulseScale = 1.0 + Math.sin(time) * 0.06;
      const scale = Math.min(width, height) * 0.28 * pulseScale;

      // Perspective projection configurations
      const d = 3.5; // distance from camera
      const centerX = width / 2;
      const centerY = height / 2;

      // Apply rotation on all vertices
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      const rotatedVertices = vertices.map(([x, y, z]) => {
        // Rotate around Y axis
        let x1 = x * cosY - z * sinY;
        let z1 = x * sinY + z * cosY;

        // Rotate around X axis
        let y2 = y * cosX - z1 * sinX;
        let z2 = y * sinX + z1 * cosX;

        // Apply mouse sway tilt
        const cosM = Math.cos(mouseY);
        const sinM = Math.sin(mouseY);
        const cosN = Math.cos(mouseX);
        const sinN = Math.sin(mouseX);

        // sway around X
        let y3 = y2 * cosM - z2 * sinM;
        let z3 = y2 * sinM + z2 * cosM;

        // sway around Y
        let x3 = x1 * cosN - z3 * sinN;
        let z4 = x1 * sinN + z3 * cosN;

        return [x3, y3, z4];
      });

      // Project vertices into 2D screenspace
      const projected = rotatedVertices.map(([x, y, z]) => {
        // Perspective factor
        const pers = d / (d + z);
        return [
          centerX + x * scale * pers,
          centerY + y * scale * pers,
          z // Keep Z for depth sorting/shading
        ];
      });

      // Draw faces or depth sorting for glowing wireframe shadows
      // Draw ambient outer radial light under the crystal
      const radGlow = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, scale * 1.5);
      radGlow.addColorStop(0, "rgba(109, 40, 217, 0.08)");
      radGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = radGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, scale * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Draw Edges
      connections.forEach(([i, j]) => {
        const [x1, y1, z1] = projected[i];
        const [x2, y2, z2] = projected[j];

        // Edge opacity based on depth (average Z coordinates)
        const avgZ = (z1 + z2) / 2;
        // Map depth from -1.5 (front) to 1.5 (back) to opacity 1.0 (front) to 0.15 (back)
        const opacity = Math.max(0.12, Math.min(1.0, 1.0 - (avgZ + 1.0) / 2.0));

        // Create glow effect on front lines
        if (opacity > 0.5) {
          ctx.strokeStyle = `rgba(167, 139, 250, ${opacity * 0.18})`;
          ctx.lineWidth = 10;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }

        ctx.strokeStyle = `rgba(109, 40, 217, ${opacity * 0.7})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // Highlight joints
        ctx.strokeStyle = `rgba(167, 139, 250, ${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });

      // Draw Vertices as little neon dots
      projected.forEach(([x, y, z]) => {
        // Map depth to point size and opacity
        const size = Math.max(2, Math.min(6, 4 * (1.0 - (z + 1.0) / 2.0)));
        const opacity = Math.max(0.2, Math.min(1.0, 1.0 - (z + 1.0) / 2.0));

        ctx.shadowBlur = 12;
        ctx.shadowColor = "#cebdff";

        ctx.fillStyle = `rgba(206, 189, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0; // Reset shadow for next draws
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block bg-transparent"
    />
  );
}
