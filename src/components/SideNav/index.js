import DistributionsEquity from './PieChart/DistributionsEquity';
// import PieChart from './PieChart';
import Parents from './Parents';
import DocuSign from './DocuSign';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const SideNav = ({ data, connections }) => {
  return (
    <div className="side-nav">
      {connections[0]?.data && (
        <>
          {/* <PieChart data={data} connections={connections} /> */}

          {formatter.format(connections[0].data.equity) !== '$NaN' &&
            formatter.format(connections[0].data.distributions) !== '$NaN' &&
            formatter.format(connections[0].data.equity) !== '$0.00' && (
              <DistributionsEquity
                formatter={formatter}
                connections={connections}
              />
            )}
        </>
      )}
      <Parents connections={connections} />
      {connections[0]?.data && <DocuSign connections={connections} />}
    </div>
  );
};

export default SideNav;
