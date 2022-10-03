import { forwardRef, useLayoutEffect, useState, useEffect } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  ControlButton,
  useStoreActions,
  getIncomers,
  isNode,
} from 'react-flow-renderer';
import * as data from '../../data/data-full-edit.json';
import dagre from 'dagre';

import SideNav from '../SideNav';
import TopNav from '../TopNav';

const getChartData = (selectedChart) => {
  const nodeWidth = 105;
  const nodeHeight = 170;
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const selectedChartData = data.default.filter(
    (d) => d.Chart === selectedChart
  );

  /* Filter out duplicate Parents */
  const parents = Array.from(
    new Set(selectedChartData.map((d) => d.Parent))
  ).map((p) => {
    return selectedChartData.find((d) => d.Parent === p);
  });
  /*******************************/

  let initialElements = [];

  // NODES
  parents.forEach((d, i) => {
    initialElements.push({
      id: d.Parent,
      data: {
        label: d.Parent,
        ownership: parseFloat(d.Ownership).toFixed(2) * 100,
        distributions: d.Distributions,
        equity: d.Equity,
        docusignFolderLink: d.Docusign_Folder_Link,
      },
      type: d.Parent === d.Subsidiary && 'output',
    });
  });

  // LINKS
  selectedChartData.forEach((d, i) => {
    if (d.Parent !== d.Subsidiary)
      initialElements.push({
        id: `e${i}`,
        source: d.Parent,
        target: d.Subsidiary,
        targetHandle: i,
        label: `${parseFloat(d.Ownership).toFixed(2)}%`,
      });
  });

  // Get top level of chart and style input node
  initialElements.forEach((iE) => {
    getIncomers(iE, initialElements).length === 0 && (iE.type = 'input');
  });
  /*******************************************/

  const getLayoutedElements = (elements) => {
    dagreGraph.setGraph({ rankdir: 'TB' });

    elements.forEach((el) => {
      if (isNode(el)) {
        dagreGraph.setNode(el.data.label, {
          width: nodeWidth,
          height: nodeHeight,
        });
      } else {
        dagreGraph.setEdge(el.source, el.target);
      }
    });

    dagre.layout(dagreGraph);

    return elements.map((el) => {
      if (isNode(el)) {
        const nodeWithPosition = dagreGraph.node(el.data.label);
        el.targetPosition = 'top';
        el.sourcePosition = 'bottom';

        el.position = {
          x: nodeWithPosition.x - nodeWidth,
          y: nodeWithPosition.y - nodeHeight,
        };
      }

      return el;
    });
  };

  return getLayoutedElements(initialElements);
};

export const Chart = forwardRef(({ handlePrint }, ref) => {
  const onLoad = (reactFlowInstance) => {
    reactFlowInstance.fitView();
  };

  const setSelectedElements = useStoreActions(
    (actions) => actions.setSelectedElements
  );

  // const { fitView } = useZoomPanHelper();

  const [chart, setChart] = useState('WFF Holdings Tree');
  const [elements, setElements] = useState(getChartData(chart));
  const [elementConnections, setElementConnections] = useState([]);

  useLayoutEffect(() => {
    setSelectedElements(elementConnections);
  }, [elementConnections, setSelectedElements]);

  useEffect(() => {
    setElements(getChartData(chart));
    setElementConnections([]);
  }, [chart]);

  const onElementClick = (event, element) => {
    let connections = [element];
    const findConnections = (el) => {
      if (getIncomers(el, elements).length > 0) {
        const incomers = getIncomers(el, elements);
        for (let i in incomers) {
          connections.push(incomers[i]);
          findConnections(incomers[i]);
        }
      }
    };
    setElementConnections(connections);
    findConnections(element);
  };

  const onPaneClick = () => {
    setElementConnections([]);
  };

  return (
    <div className="container">
      <SideNav data={data} connections={elementConnections} />
      <div className="chart-container">
        <TopNav data={data} chart={chart} setChart={setChart} />
        <div className="chart">
          <div style={{ position: 'relative' }}>
            <ReactFlow
              style={{
                width: 1500,
                height: 800,
              }}
              ref={ref}
              elements={elements}
              onElementClick={onElementClick}
              onLoad={onLoad}
              onPaneClick={onPaneClick}
              nodesDraggable={false}
              nodesConnectable={false}
              minZoom={0.35}
            ></ReactFlow>

            <MiniMap className="mini-map" style={{ top: 10 }} />
            <Controls className="controls" showInteractive={false}>
              <ControlButton
                onClick={() => {
                  handlePrint();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                  />
                </svg>
              </ControlButton>
            </Controls>
          </div>
        </div>
      </div>
    </div>
  );
});
