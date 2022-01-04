import {useState} from 'react';
import { Button } from '@mui/material';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

export default function Ppt(){
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div style={{marginTop:'100px', marginBottom: '50px'}} align="center" justify="center">
            <Document file="p.pdf" onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} width='900'/>
            </Document>
            <p>Page {pageNumber} of {numPages}</p>
            {pageNumber>1 && 
                <Button variant="outlined" color="warning" onClick={()=>setPageNumber(pageNumber-1)}>Prev</Button>
            }
            {pageNumber<numPages && 
                <Button variant="outlined" color="warning" onClick={()=>setPageNumber(pageNumber+1)}>Next</Button>
            }
        </div>
    );
 }