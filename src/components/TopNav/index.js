import ChartMenu from './ChartMenu/ChartMenu';

const TopNav = ({ data, chart, setChart }) => {
  return <ChartMenu data={data} chart={chart} setChart={setChart} />;
};

export default TopNav;
