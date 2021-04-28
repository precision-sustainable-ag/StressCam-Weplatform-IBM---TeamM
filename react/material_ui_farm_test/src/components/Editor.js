import React, { useEffect, useRef } from 'react';
// import './helpers/iframeLoader.js';
const currentPage = 'https://dataplatform.cloud.ibm.com/dashboards/d1fa6da4-5695-4ccf-ba94-25c8dd714c30/view/7517f10425af22e45fd2b1e4079825017e3f2155babbd75789867b490d327197f33f1698c82f485fdd475664f7ec1751ce';

// cognos dashboard component
const Editor = () => {
  const iframeRef = useRef();

  useEffect(() => {
    iframeRef.current.load(currentPage, () => {
      const body = iframeRef.current.contentDocument.body;
      body.childNodes.forEach(node => {
        console.log(node);
      });
    });
  }, []);

  return (
    <iframe title="iframe" ref={iframeRef} src={currentPage} frameBorder="0" />
  );
};

export default Editor;