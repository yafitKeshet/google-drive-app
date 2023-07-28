import React from "react";
import { Document, Page } from "react-pdf";

const PdfViewer = () => {
  let x =
    "https://lh6.googleusercontent.com/9CPuUjvBz9RsbwAChJSaiLoSy8ZmirAb523lVZL70szHpkx1xced2Oz-CtIEOYNw76mgZUqvglLO2yM=s220";
  return (
    <div>
      {/* <Document file={x + ".pdf"}>
        <Page pageNumber={1} />
      </Document> */}
    </div>
  );
};

export default PdfViewer;
