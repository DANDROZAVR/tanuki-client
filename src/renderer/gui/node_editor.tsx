/*import React from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { sendScript } from 'renderer/network/client';
import { ScriptLineNode, ScriptStartNode, ScriptFinishNode } from './nodes.tsx';
import { FunctionButton } from './util';*/

/* function traverse(linesStates: string[], item: Node) {
  let curr: Node = item;
  [curr] = getOutgoers(curr);
  let res: string = '';
  while (getOutgoers(curr).length < 1) {
    res += linesStates[curr.id];
    [curr] = getOutgoers(curr);
  }
  console.log(res);
} */

/*function SpawnButton({ onClick }: { onClick: any }) {
  return (
    <button type="button" onClick={onClick}>
      Spawn
    </button>
  );
}

const nodeTypes = {
  scriptLine: ScriptLineNode,
  scriptStart: ScriptStartNode,
  scriptFinish: ScriptFinishNode,
};

const initialNodes = [
  {
    id: '0',
    type: 'scriptStart',
    position: { x: 0, y: 0 },
    data: {},
  },
];
const initialEdges = Array<{ id: string; source: string; target: string }>;*/

export default function NodeEditor() {/*
  const [nodes, setNodes] = React.useState(initialNodes);
  const [edges, setEdges] = React.useState(initialEdges);

  const onNodesChange = React.useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = React.useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = React.useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const updateNodeData = (id, data) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          node.style = { ...node.style, data };
        }
        return node;
      })
    );
  }

  const spawnNode = () => {
    console.log(nodes);
    const len = nodes.length;
    console.log(JSON.stringify(nodes));
    const x_pos = nodes[len - 1].position.x;
    const y_pos = nodes[len - 1].position.y + 100; //TODO: centralize this part
    const n_id = nodes.length.toString();
    const p_id = nodes[len - 1].id;
    console.log('SPAWN');
    setNodes([
      ...nodes,
      {
        id: n_id,
        type: 'scriptLine',
        position: { x: x_pos, y: y_pos },
        data: { line: '' },
      },
    ]);
    setEdges([
      ...edges,
      {
        id: edges.length.toString(),
        source: p_id,
        target: n_id,
      },
    ]);
  };

  const ParseNodes = () => {
    const res = nodes.map((node) => node.data.line).join('\n');
    console.log(res);
    return res;
  };

  return (
    <>
      <div
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background color="#B8CEFF" />
          <Controls className="darkButton" />
        </ReactFlow>
      </div>
      <SpawnButton on_click={spawnNode} />
      <FunctionButton
        id="scriptTitleNode"
        text="Send"
        on_click={() => {
          const script = ParseNodes();
          console.log(script);
          const input = document.getElementById(
            'scriptTitleNode'
          ) as HTMLInputElement | null;
          sendScript(script, input?.value);
        }}
      />
    </>
  );*/
}
