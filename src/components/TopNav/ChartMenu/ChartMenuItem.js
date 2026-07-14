import { useZoomPanHelper } from 'react-flow-renderer';

const ChartMenuItem = ({ chart, setChart, active, setActive }) => {
  const { fitView } = useZoomPanHelper();

  return (
    <button
      onClick={() => {
        // document.querySelector('.react-flow__renderer').style.opacity = 0;
        setTimeout(() => {
          fitView();
          // document.querySelector('.react-flow__renderer').style.opacity = 1;
        }, 100);
        setChart(chart);
        setActive(chart);
      }}
      className={`top-nav__item ${active === chart ? 'active' : ''}`}
    >
      {chart}
    </button>
  );
};

export default ChartMenuItem;
