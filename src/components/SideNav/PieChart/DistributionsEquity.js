import { Pie } from 'react-chartjs-2';

const DistributionsEquity = ({ connections, formatter }) => {
  return (
    <div className="divider">
      {connections.length > 0 && (
        <div className="divider">
          <Pie
            data={{
              labels: ['Equity', 'Distributions'],
              datasets: [
                {
                  label: 'WAY Data',
                  data: [
                    connections[0].data.equity,
                    connections[0].data.distributions,
                  ],
                  backgroundColor: [
                    'rgba(78, 169, 0, 0.4)',
                    'rgba(244, 124, 48, 0.4)',
                  ],
                  borderColor: ['rgba(78, 169, 0, 1)', 'rgba(244, 124, 48, 1)'],
                  borderWidth: 1,
                },
              ],
            }}
            height={400}
            width={600}
            options={{
              layout: {
                padding: 20,
              },
              plugins: {
                legend: {
                  labels: {
                    color: 'white',
                  },
                },
              },
            }}
          />
          <ul>
            <li>
              Equity:{` `}
              {formatter.format(connections[0].data.equity)}
            </li>
            <li>
              Distributions:{` `}
              {formatter.format(connections[0].data.distributions)}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DistributionsEquity;
