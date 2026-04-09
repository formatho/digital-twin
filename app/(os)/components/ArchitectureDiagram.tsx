/**
 * Architecture Diagram Component
 *
 * Interactive SVG-based diagram showing the Digital Twin OS architecture.
 * Displays nodes for each twin type with connections and hover details.
 *
 * @module app/(os)/components/ArchitectureDiagram
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TwinNode {
  id: string;
  name: string;
  type: 'council' | 'skill';
  color: string;
  description: string;
  x: number;
  y: number;
}

interface Connection {
  from: string;
  to: string;
  type: 'collaboration' | 'dependency' | 'data-flow';
}

const councilTwins: TwinNode[] = [
  {
    id: 'strategist',
    name: 'Strategist',
    type: 'council',
    color: '#3b82f6',
    description: 'Vision and long-term planning',
    x: 250,
    y: 80,
  },
  {
    id: 'builder',
    name: 'Builder',
    type: 'council',
    color: '#8b5cf6',
    description: 'Execution feasibility',
    x: 450,
    y: 80,
  },
  {
    id: 'analyst',
    name: 'Analyst',
    type: 'council',
    color: '#10b981',
    description: 'Data-driven insights',
    x: 150,
    y: 200,
  },
  {
    id: 'operator',
    name: 'Operator',
    type: 'council',
    color: '#f59e0b',
    description: 'Systems and processes',
    x: 350,
    y: 200,
  },
  {
    id: 'critic',
    name: 'Critic',
    type: 'council',
    color: '#ef4444',
    description: 'Risk assessment',
    x: 550,
    y: 200,
  },
];

const skillTwins: TwinNode[] = [
  {
    id: 'research',
    name: 'Research',
    type: 'skill',
    color: '#06b6d4',
    description: 'Information gathering',
    x: 100,
    y: 350,
  },
  {
    id: 'content',
    name: 'Content',
    type: 'skill',
    color: '#f472b6',
    description: 'Content creation',
    x: 220,
    y: 350,
  },
  {
    id: 'design',
    name: 'Design',
    type: 'skill',
    color: '#a78bfa',
    description: 'Visual design',
    x: 340,
    y: 350,
  },
  {
    id: 'growth',
    name: 'Growth',
    type: 'skill',
    color: '#34d399',
    description: 'Growth strategies',
    x: 460,
    y: 350,
  },
  {
    id: 'code',
    name: 'Code',
    type: 'skill',
    color: '#60a5fa',
    description: 'Development',
    x: 580,
    y: 350,
  },
];

const connections: Connection[] = [
  // Council collaboration
  { from: 'strategist', to: 'builder', type: 'collaboration' },
  { from: 'strategist', to: 'analyst', type: 'collaboration' },
  { from: 'builder', to: 'operator', type: 'collaboration' },
  { from: 'analyst', to: 'critic', type: 'collaboration' },
  { from: 'operator', to: 'critic', type: 'collaboration' },
  // Council to Skill dependencies
  { from: 'strategist', to: 'research', type: 'dependency' },
  { from: 'builder', to: 'code', type: 'dependency' },
  { from: 'analyst', to: 'research', type: 'dependency' },
  { from: 'operator', to: 'design', type: 'dependency' },
  { from: 'critic', to: 'content', type: 'dependency' },
  // Skill collaboration
  { from: 'research', to: 'content', type: 'data-flow' },
  { from: 'content', to: 'growth', type: 'data-flow' },
  { from: 'design', to: 'code', type: 'data-flow' },
  { from: 'code', to: 'growth', type: 'data-flow' },
];

const allNodes: TwinNode[] = [...councilTwins, ...skillTwins];

interface ArchitectureDiagramProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function ArchitectureDiagram({
  width = 700,
  height = 450,
  className = '',
}: ArchitectureDiagramProps) {
  const [hoveredNode, setHoveredNode] = useState<TwinNode | null>(null);

  const getConnectionPath = (from: TwinNode, to: TwinNode): string => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const cx1 = from.x + dx * 0.5;
    const cy1 = from.y;
    const cx2 = to.x - dx * 0.5;
    const cy2 = to.y;
    return `M ${from.x} ${from.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${to.x} ${to.y}`;
  };

  const getStrokeColor = (connection: Connection): string => {
    switch (connection.type) {
      case 'collaboration':
        return 'rgba(59, 130, 246, 0.3)';
      case 'dependency':
        return 'rgba(139, 92, 246, 0.3)';
      case 'data-flow':
        return 'rgba(16, 185, 129, 0.3)';
      default:
        return 'rgba(255, 255, 255, 0.1)';
    }
  };

  return (
    <div
      className={`relative ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {/* SVG Diagram */}
      <svg
        width={width}
        height={height}
        className="absolute inset-0"
        style={{ background: 'var(--bg-dark-secondary)' }}
      >
        {/* Definitions */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker
            id="arrowhead-collaboration"
            markerWidth="10"
            markerHeight="7"
            refX="28"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="rgba(59, 130, 246, 0.5)" />
          </marker>
          <marker
            id="arrowhead-dependency"
            markerWidth="10"
            markerHeight="7"
            refX="28"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="rgba(139, 92, 246, 0.5)" />
          </marker>
          <marker
            id="arrowhead-data-flow"
            markerWidth="10"
            markerHeight="7"
            refX="28"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="rgba(16, 185, 129, 0.5)" />
          </marker>
        </defs>

        {/* Background Label */}
        <text
          x={width / 2}
          y={30}
          textAnchor="middle"
          className="text-sm font-medium"
          style={{ fill: 'var(--text-muted)' }}
        >
          Digital Twin OS Architecture
        </text>

        {/* Council Section Label */}
        <text
          x={width / 2}
          y={140}
          textAnchor="middle"
          className="text-xs"
          style={{ fill: 'var(--text-muted)' }}
        >
          Council
        </text>

        {/* Skill Section Label */}
        <text
          x={width / 2}
          y={420}
          textAnchor="middle"
          className="text-xs"
          style={{ fill: 'var(--text-muted)' }}
        >
          Skill Twins
        </text>

        {/* Connections */}
        {connections.map((connection) => {
          const fromNode = allNodes.find((n) => n.id === connection.from);
          const toNode = allNodes.find((n) => n.id === connection.to);
          if (!fromNode || !toNode) return null;

          const isHighlighted =
            hoveredNode &&
            (hoveredNode.id === fromNode.id || hoveredNode.id === toNode.id);

          return (
            <g key={`${connection.from}-${connection.to}`}>
              <motion.path
                d={getConnectionPath(fromNode, toNode)}
                stroke={getStrokeColor(connection)}
                strokeWidth={isHighlighted ? 2 : 1}
                fill="none"
                strokeDasharray={connection.type === 'data-flow' ? '5,5' : '0'}
                markerEnd={`url(#arrowhead-${connection.type})`}
                initial={{ opacity: 0 }}
                animate={{ opacity: isHighlighted ? 1 : 0.3 }}
                transition={{ duration: 0.3 }}
              />
            </g>
          );
        })}

        {/* Nodes */}
        {allNodes.map((node) => {
          const isHovered = hoveredNode?.id === node.id;
          const isConnected =
            hoveredNode &&
            connections.some(
              (c) =>
                (c.from === hoveredNode.id && c.to === node.id) ||
                (c.to === hoveredNode.id && c.from === node.id)
            );

          return (
            <g key={node.id}>
              {/* Glow effect */}
              {isHovered && (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={28}
                  fill={node.color}
                  opacity={0.2}
                  filter="url(#glow)"
                  animate={{
                    r: [28, 35, 28],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              )}

              {/* Node circle */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={24}
                fill={node.color}
                stroke={isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.2)'}
                strokeWidth={isHovered ? 2 : 1}
                initial={{ scale: 0 }}
                animate={{
                  scale: isHovered ? 1.1 : 1,
                  opacity: isConnected || !hoveredNode ? 1 : 0.3,
                }}
                transition={{ duration: 0.3 }}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
              />

              {/* Node label */}
              <motion.text
                x={node.x}
                y={node.y + 45}
                textAnchor="middle"
                className="text-xs font-medium"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isConnected || !hoveredNode ? 1 : 0.3,
                }}
                transition={{ duration: 0.3 }}
                style={{
                  fill: node.color,
                  fontWeight: isHovered ? 'bold' : 'normal',
                }}
              >
                {node.name}
              </motion.text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredNode && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 pointer-events-none"
            style={{
              left: `${hoveredNode.x}px`,
              top: `${hoveredNode.y - 80}px`,
              transform: 'translateX(-50%)',
            }}
          >
            <div
              className="px-4 py-3 rounded-xl backdrop-blur-xl"
              style={{
                background: 'rgba(10, 10, 26, 0.95)',
                border: `1px solid ${hoveredNode.color}`,
                boxShadow: `0 0 20px ${hoveredNode.color}40`,
              }}
            >
              <div
                className="text-sm font-bold mb-1"
                style={{ color: hoveredNode.color }}
              >
                {hoveredNode.name}
              </div>
              <div
                className="text-xs"
                style={{ color: 'var(--text-secondary)' }}
              >
                {hoveredNode.description}
              </div>
              <div
                className="text-xs mt-1 capitalize"
                style={{ color: 'var(--text-muted)' }}
              >
                {hoveredNode.type} Twin
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div
        className="absolute bottom-4 left-4 px-3 py-2 rounded-lg text-xs"
        style={{
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
        }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: '#3b82f6' }}
            />
            <span style={{ color: 'var(--text-secondary)' }}>Collaboration</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: '#8b5cf6' }}
            />
            <span style={{ color: 'var(--text-secondary)' }}>Dependency</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: '#10b981' }}
            />
            <span style={{ color: 'var(--text-secondary)' }}>Data Flow</span>
          </div>
        </div>
      </div>
    </div>
  );
}
