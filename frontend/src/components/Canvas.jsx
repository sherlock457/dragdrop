import React, { useState, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Handle,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from 'react-flow-renderer';

const initialNodes = [
  {
    id: '1',
    type: 'customNode',
    data: { text: 'This is some dummy text for the card. Click "Show More" to see the full text.' },
    position: { x: 250, y: 5 },
  },
];

const initialEdges = [];

const CustomNode = ({ data }) => {
  return (
    <div className="w-48 h-48 p-2 bg-white border border-gray-300 rounded-lg shadow-md flex flex-col justify-center items-center cursor-move">
      <Handle
        type="target"
        position="top"
        className="bg-gray-600 rounded-full w-2.5 h-2.5"
      />
      <p className="text-center">{data.text.slice(0, 50)}...</p>
      <button
        className="text-blue-500 mt-2"
        onClick={() => alert(data.text)}
      >
        Show More
      </button>
      <Handle
        type="source"
        position="bottom"
        className="bg-gray-600 rounded-full w-2.5 h-2.5"
      />
    </div>
  );
};

const nodeTypes = { customNode: CustomNode };

const Canvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const addNode = () => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      type: 'customNode',
      data: {
        text: 'This is some dummy text for the card. Click "Show More" to see the full text.',
      },
      position: { x: Math.random() * 250, y: Math.random() * 250 },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <ReactFlowProvider>
      <div className="w-full h-screen">
        <button onClick={addNode} className="p-2 bg-blue-500 text-white rounded m-2">
          Add Card
        </button>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className="w-full h-[90vh]"
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

export default Canvas;
