import { useState } from 'react';

import ChartMenuItem from './ChartMenuItem';

const ChartMenu = ({ data, chart, setChart }) => {
  /* Filter out duplicate Charts */
  const charts = Array.from(new Set(data.default.map((d) => d.Chart))).map(
    (c) => {
      return data.default.find((d) => d.Chart === c);
    }
  );
  /*******************************/

  const [active, setActive] = useState(chart);

  return (
    <div className="top-nav">
      {/* <button onClick={() => setChart('All')} className="top-nav__item">
        All
      </button> */}
      {charts.map((c) => (
        <ChartMenuItem
          key={c.Chart}
          chart={c.Chart}
          setChart={setChart}
          active={active}
          setActive={setActive}
        />
      ))}
    </div>
  );
};

export default ChartMenu;
