import React from 'react';

const DocuSign = ({ connections }) => {
  return (
    <div className="btn-container">
      <a
        className="docusign-btn"
        href={connections[0].data.docusignFolderLink}
        target="_blank"
        rel="noreferrer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="docusign-btn__icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
          />
        </svg>
        <div className="docusign-btn__text" />
      </a>
    </div>
  );
};

export default DocuSign;
