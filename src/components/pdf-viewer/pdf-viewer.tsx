import React, { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";

interface IPDFViewerProps {
  file: File;
}

const PDFViewer = ({ file }: IPDFViewerProps) => {
  return (
    <div>
      <Document file={file}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};

export default PDFViewer;
