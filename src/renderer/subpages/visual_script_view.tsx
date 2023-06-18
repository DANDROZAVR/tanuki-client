import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { renderOptions } from 'renderer/render_options';
import Button from '@mui/material/Button';
import {
  ReactFlow,
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from 'reactflow';
import {
  StartNode,
  ExecNode,
  LoadNode,
  TypeNode,
  PressNode,
} from '../gui/nodes.tsx';

const nodeTypes = {
  start: StartNode,
  exec: ExecNode,
  load: LoadNode,
  type: TypeNode,
  press: PressNode,

};

const initialNodes = [];
const initialEdges = [];

export default function VisualScriptViewScreen() {
  const location = useLocation();
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/home');
  };

  const [nodes, setNodes] = React.useState(initialNodes);
  const [edges, setEdges] = React.useState(initialEdges);

  const onNodesChange = React.useCallback(
    (changes) => {
      console.log(JSON.stringify(nodes));
      setNodes((nds) => applyNodeChanges(changes, nds));
    },[]
  );
  const onEdgesChange = React.useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = React.useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onChangeData = (id, data) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          node.style = { ...node.style, data };
        }
        return node;
      })
    );
  };

  const spawnNode = (type: string) => {
    const len = nodes.length;
    const x = len > 0 ? nodes[len - 1].position.x : 0;
    const y = len > 0 ? nodes[len - 1].position.y + 100 : 0;
    const nodeId = nodes.length.toString();
    setNodes([
      ...nodes,
      {
        id: nodeId,
        type,
        position: { x, y },
        data: { onChangeData: (data) => onChangeData(nodeId, data) },
      },
    ]);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
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
          <Background />
          <Controls className="darkButton" />
        </ReactFlow>
      </div>
      <div
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px',
        }}
      >
        <Button variant="contained" onClick={goBack}>Go back</Button>
        <Button variant="contained" onClick={() => spawnNode('load')}>Add load</Button>
        <Button variant="contained" onClick={() => spawnNode('type')}>Add type</Button>
        <Button variant="contained" onClick={() => spawnNode('press')}>Add press</Button>
        <Button variant="contained" onClick={() => spawnNode('exec')}>Add exec</Button>
        <Button variant="contained" onClick={() => spawnNode('start')}>Add start</Button>
      </div>
    </div>
  );
}
