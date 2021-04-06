import React, { useEffect, useRef } from 'react';
// import './helpers/iframeLoader.js';
const currentPage = 'https://dataplatform.cloud.ibm.com/dashboards/5f577fdb-f3ce-4b1b-a56b-df27c8fa66d1/view/022afc2c1c8a33d671f2bde4079825017e3f2155babbd75789867b490d327197f33f1698c82f485fdd475664f7ec1751ce';

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