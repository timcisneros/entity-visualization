import { Pie } from 'react-chartjs-2';

const PieChart = ({ data, connections }) => {
  const parentOwnership =
    connections[0].type === 'input'
      ? connections[0].data.ownership / 100
      : parseFloat(
          data.default.find((dd) => dd.Subsidiary === connections[0].data.label)
            .Ownership
        ) * 1;
  return (
    <div className="divider">
      {connections.length > 0 && (
        <Pie
          data={{
            labels: ['Ownership', 'Total'],
            datasets: [
              {
                label: 'WAY Data',
                data: [parentOwnership, 100 - parentOwnership],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.4)',
                  'rgba(54, 162, 235, 0.4)',
                ],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
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
      )}
      <ul>
        <li>Ownership: {`${parentOwnership}%`}</li>
        <li>Total: {`${100 - parentOwnership}%`}</li>
      </ul>
    </div>
  );
};

export default PieChart;
