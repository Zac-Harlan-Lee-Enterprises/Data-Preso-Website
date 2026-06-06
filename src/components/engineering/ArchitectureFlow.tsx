'use client';

import { useState, useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  getBezierPath,
  type EdgeProps,
  type NodeMouseHandler,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ARCHITECTURE_NODES, ARCHITECTURE_EDGES, FLOW_COLORS, FLOW_LABELS, type FlowId, type ShipSystemData } from '@/data/architecture-nodes';
import { ShipSystemNode } from './FlowNodes';
import SystemPanel from './SystemPanel';

// Animated flow edge
function FlowEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }: EdgeProps) {
  const [edgePath] = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
  const activeFlow = (data as { activeFlow?: FlowId | null })?.activeFlow ?? null;
  const flows = ((data as { flows?: FlowId[] })?.flows) ?? [];
  const colors = (data as { colors?: Record<FlowId, string> })?.colors ?? FLOW_COLORS;

  const isActive = !activeFlow || flows.includes(activeFlow);
  const activeColor = activeFlow && flows.includes(activeFlow) ? colors[activeFlow] : null;
  const strokeColor = activeColor ?? (isActive ? '#1e3a5f' : '#0d1421');
  const isAnimated = activeFlow !== null && activeColor !== null;

  return (
    <>
      <path
        id={id}
        d={edgePath}
        fill="none"
        stroke={strokeColor}
        strokeWidth={isAnimated ? 2.5 : 1.5}
        strokeDasharray={isAnimated ? '8 4' : 'none'}
        opacity={isActive ? 1 : 0.15}
        style={{
          animation: isAnimated ? 'flow-dash 1.2s linear infinite' : 'none',
          transition: 'stroke 0.4s ease, opacity 0.4s ease',
          filter: isAnimated ? `drop-shadow(0 0 4px ${activeColor})` : 'none',
        }}
      />
      {isAnimated && activeColor && (
        <circle r="4" fill={activeColor} opacity="0.8">
          <animateMotion dur="2s" repeatCount="indefinite">
            <mpath href={`#${id}`} />
          </animateMotion>
        </circle>
      )}
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nodeTypes = { shipSystem: ShipSystemNode as React.ComponentType<any> };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const edgeTypes = { flowEdge: FlowEdge as React.ComponentType<any> };

export default function ArchitectureFlow() {
  const [activeFlow, setActiveFlow] = useState<FlowId | null>(null);
  const [selectedNode, setSelectedNode] = useState<ShipSystemData | null>(null);

  // Inject activeFlow into node data and edge data
  const nodesWithFlow = useMemo(
    () =>
      ARCHITECTURE_NODES.map((n) => ({
        ...n,
        data: { ...n.data, activeFlow },
      })),
    [activeFlow]
  );

  const edgesWithFlow = useMemo(
    () =>
      ARCHITECTURE_EDGES.map((e) => ({
        ...e,
        data: { ...e.data, activeFlow },
        animated: false,
      })),
    [activeFlow]
  );

  const [nodes, , onNodesChange] = useNodesState(nodesWithFlow);
  const [edges, , onEdgesChange] = useEdgesState(edgesWithFlow);

  // Sync flow changes into node/edge state
  const nodesDisplay = useMemo(
    () =>
      nodes.map((n) => ({
        ...n,
        data: { ...n.data, activeFlow },
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [nodes, activeFlow]
  );

  const edgesDisplay = useMemo(
    () =>
      edges.map((e) => ({
        ...e,
        data: { ...e.data, activeFlow },
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [edges, activeFlow]
  );

  const onNodeClick: NodeMouseHandler = useCallback((_event, node) => {
    setSelectedNode(node.data as unknown as ShipSystemData);
  }, []);

  const FLOWS: { id: FlowId; label: string; desc: string }[] = [
    { id: 'bi', label: 'BI Dashboard', desc: 'Looker · DOMO → Gold Layer' },
    { id: 'sql', label: 'Direct SQL', desc: 'Governed BigQuery access' },
    { id: 'ai', label: 'Conversational AI', desc: 'Teams → Governance → Gemini' },
  ];

  return (
    <div className="relative flex h-full">
      {/* Flow selector */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        <div className="font-mono text-[9px] tracking-[0.2em] text-lcars-muted uppercase mb-1 px-1">
          Access Flows
        </div>
        {FLOWS.map((flow) => {
          const isActive = activeFlow === flow.id;
          const color = FLOW_COLORS[flow.id];
          return (
            <button
              key={flow.id}
              onClick={() => setActiveFlow(isActive ? null : flow.id)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg glass transition-all duration-200 text-left"
              style={{
                borderColor: isActive ? color : 'transparent',
                border: isActive ? `1px solid ${color}50` : '1px solid rgba(30,58,95,0.4)',
                boxShadow: isActive ? `0 0 16px ${color}25` : 'none',
              }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{
                  backgroundColor: isActive ? color : '#334155',
                  boxShadow: isActive ? `0 0 8px ${color}` : 'none',
                }}
              />
              <div>
                <div
                  className="font-mono text-xs font-medium"
                  style={{ color: isActive ? color : '#64748b' }}
                >
                  {flow.label}
                </div>
                <div className="font-mono text-[9px] text-lcars-dim">{flow.desc}</div>
              </div>
            </button>
          );
        })}
        {activeFlow && (
          <button
            onClick={() => setActiveFlow(null)}
            className="text-[9px] font-mono text-lcars-dim hover:text-lcars-muted px-1 mt-1"
          >
            ✕ Clear filter
          </button>
        )}
      </div>

      {/* React Flow canvas */}
      <div className="flex-1 h-full">
        <ReactFlow
          nodes={nodesDisplay}
          edges={edgesDisplay}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          minZoom={0.4}
          maxZoom={2}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#1e3a5f" gap={40} size={1} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>

      {/* System detail panel */}
      {selectedNode && (
        <SystemPanel node={selectedNode} onClose={() => setSelectedNode(null)} />
      )}
    </div>
  );
}
