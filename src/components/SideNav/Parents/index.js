import ParentItem from './ParentItem';

const Parents = ({ connections }) => {
  return (
    <div>
      <h2 className="side-nav__title">
        <div className="line"></div>
        <span>Parents</span>
        <div className="line"></div>
      </h2>

      {connections?.length > 0 ? (
        connections.map((connection, index) => (
          <div key={connection.id}>
            <ParentItem connection={connection} />
            {index < connections.length - 1 && connection.type !== 'input' && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                width="25"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7l4-4m0 0l4 4m-4-4v18"
                />
              </svg>
            )}
          </div>
        ))
      ) : (
        <ParentItem
          connection={{
            id: 'Select an entity to display parents',
          }}
        />
      )}
    </div>
  );
};

export default Parents;
