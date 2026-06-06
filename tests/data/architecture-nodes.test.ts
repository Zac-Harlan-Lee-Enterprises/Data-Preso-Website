import { describe, it, expect } from 'vitest';
import { ARCHITECTURE_NODES, ARCHITECTURE_EDGES, FLOW_COLORS } from '@/data/architecture-nodes';

describe('architecture-nodes data integrity', () => {
  it('all nodes have required fields', () => {
    for (const node of ARCHITECTURE_NODES) {
      expect(node.id, 'node missing id').toBeTruthy();
      expect(node.type, `${node.id} missing type`).toBe('shipSystem');
      expect(node.position, `${node.id} missing position`).toBeDefined();
      expect(typeof node.position.x).toBe('number');
      expect(typeof node.position.y).toBe('number');

      const d = node.data;
      expect(d.shipSystem, `${node.id} missing shipSystem`).toBeTruthy();
      expect(d.technology, `${node.id} missing technology`).toBeTruthy();
      expect(d.color, `${node.id} missing color`).toBeTruthy();
      expect(d.icon, `${node.id} missing icon`).toBeTruthy();
      expect(d.flows, `${node.id} missing flows`).toBeInstanceOf(Array);

      const p = d.panel;
      expect(p.overview, `${node.id} panel missing overview`).toBeTruthy();
      expect(p.responsibilities, `${node.id} panel missing responsibilities`).toBeInstanceOf(Array);
      expect(p.responsibilities.length, `${node.id} must have responsibilities`).toBeGreaterThan(0);
      expect(p.currentState, `${node.id} panel missing currentState`).toBeTruthy();
      expect(p.futureState, `${node.id} panel missing futureState`).toBeTruthy();
      expect(p.businessValue, `${node.id} panel missing businessValue`).toBeTruthy();
      expect(p.dependencies, `${node.id} panel missing dependencies`).toBeInstanceOf(Array);
      expect(p.strategicImportance, `${node.id} panel missing strategicImportance`).toBeTruthy();
    }
  });

  it('has exactly 10 ship system nodes', () => {
    expect(ARCHITECTURE_NODES).toHaveLength(10);
  });

  it('all node ids are unique', () => {
    const ids = ARCHITECTURE_NODES.map((n) => n.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('all edges reference valid node ids', () => {
    const nodeIds = new Set(ARCHITECTURE_NODES.map((n) => n.id));
    for (const edge of ARCHITECTURE_EDGES) {
      expect(nodeIds.has(edge.source), `Edge ${edge.id} source "${edge.source}" not found`).toBe(true);
      expect(nodeIds.has(edge.target), `Edge ${edge.id} target "${edge.target}" not found`).toBe(true);
    }
  });

  it('all edges have valid flow types', () => {
    const validFlows = new Set(Object.keys(FLOW_COLORS));
    for (const edge of ARCHITECTURE_EDGES) {
      const flows = (edge.data as { flows: string[] }).flows;
      expect(flows, `Edge ${edge.id} missing flows`).toBeInstanceOf(Array);
      for (const flow of flows) {
        expect(validFlows.has(flow), `Edge ${edge.id} has invalid flow "${flow}"`).toBe(true);
      }
    }
  });

  it('all edge ids are unique', () => {
    const ids = ARCHITECTURE_EDGES.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('FLOW_COLORS has bi, sql, and ai flows', () => {
    expect(FLOW_COLORS).toHaveProperty('bi');
    expect(FLOW_COLORS).toHaveProperty('sql');
    expect(FLOW_COLORS).toHaveProperty('ai');
  });
});
