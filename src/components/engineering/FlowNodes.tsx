'use client';

import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import {
  Radio, Workflow, HardDrive, Zap, Code2,
  Shield, MessageSquare, Brain, BarChart3, Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ShipSystemData } from '@/data/architecture-nodes';

const ICON_MAP: Record<string, React.ElementType> = {
  Radio, Workflow, HardDrive, Zap, Code2,
  Shield, MessageSquare, Brain, BarChart3, Users,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ShipSystemNode = memo(function ShipSystemNode(props: NodeProps<any>) {
  const data = props.data as ShipSystemData & { activeFlow?: string | null };
  const selected = props.selected;
  const activeFlow = data.activeFlow ?? null;
  const Icon = ICON_MAP[data.icon] ?? Zap;
  const isHighlighted = !activeFlow || data.flows.includes(activeFlow as never);

  return (
    <div
      className={cn(
        'relative rounded-xl px-4 py-3 min-w-[180px] cursor-pointer transition-all duration-300 select-none',
        'border',
        selected
          ? 'border-opacity-100 scale-105'
          : isHighlighted
          ? 'border-opacity-60 hover:scale-102'
          : 'opacity-30 border-opacity-20'
      )}
      style={{
        background: 'rgba(13, 20, 33, 0.92)',
        backdropFilter: 'blur(12px)',
        borderColor: selected
          ? data.color
          : isHighlighted
          ? `${data.color}60`
          : '#1e3a5f',
        boxShadow: selected
          ? `0 0 24px ${data.color}40, 0 0 48px ${data.color}10`
          : isHighlighted
          ? `0 0 12px ${data.color}15`
          : 'none',
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: data.color, border: 'none', width: 6, height: 6 }}
      />

      <div className="flex items-center gap-2.5">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${data.color}15`, border: `1px solid ${data.color}30` }}
        >
          <Icon size={14} style={{ color: data.color }} />
        </div>
        <div className="min-w-0">
          <div
            className="font-mono text-xs font-semibold leading-tight"
            style={{ color: data.color }}
          >
            {data.shipSystem}
          </div>
          <div className="font-mono text-[9px] text-lcars-muted leading-tight mt-0.5 truncate max-w-[130px]">
            {data.technology}
          </div>
        </div>
      </div>

      <div className="mt-2 font-mono text-[9px] text-lcars-dim leading-tight">
        {data.subtitle}
      </div>

      {selected && (
        <div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${data.color}08 0%, transparent 70%)`,
          }}
        />
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: data.color, border: 'none', width: 6, height: 6 }}
      />
    </div>
  );
});
