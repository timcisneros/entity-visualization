const ParentItem = ({ connection }) => {
  return (
    <>
      <div
        className={`side-nav__item ${
          connection.type === 'input' ? 'trust' : ''
        }`}
      >
        {connection.id}
      </div>
    </>
  );
};

export default ParentItem;
