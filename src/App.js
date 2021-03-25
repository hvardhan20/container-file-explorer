// import {
//     ColumnDirective,
//     ColumnsDirective,
//     GridComponent,
//     Page,
//     Inject,
//     Filter
// } from '@syncfusion/ej2-react-grids';
import './App.css';
import React, { useState, useEffect } from 'react';
import FileBrowser, {Icons} from 'react-keyed-file-browser';
// import Moment from 'moment';
// import {handleCreateFiles,
//   handleCreateFolder,
//   handleDeleteFile,
//   handleDeleteFolder,
//   handleRenameFile,
//   handleRenameFolder
// } from "./handlers";




function App() {
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/containers/2915ffb1569b/files',).then(res => res.json()).then(data => {
      console.log(data);
      setFiles(data.data);
    });
  }, []);
  return (
      <FileBrowser
          files={files}
          icons={{
            File: <i className="file"  />,
            Image: <i className="file-image"  />,
            PDF: <i className="file-pdf"  />,
            Rename: <i className="i-cursor"  />,
            Folder: <i className="folder" aria-hidden="false" />,
            FolderOpen: <i className="folder-open"  />,
            Delete: <i className="trash"  />,
            Loading: <i className="circle-notch spin"  />
          }}

          // onCreateFolder={handleCreateFolder}
          // onCreateFiles={handleCreateFiles}
          // onMoveFolder={handleRenameFolder}
          // onMoveFile={handleRenameFile}
          // onRenameFolder={handleRenameFolder}
          // onRenameFile={handleRenameFile}
          // onDeleteFolder={handleDeleteFolder}
          // onDeleteFile={handleDeleteFile}
      />

  );
}

export default App;


// <GridComponent dataSource={images} allowPaging={true} pageSettings={{ pageSize: 10 }} allowFiltering={true}>
//   <ColumnsDirective>
//     <ColumnDirective field='id' headerText='ID' width='100' />
//     <ColumnDirective field='labels' headerText='Labels' width='100' />
//     <ColumnDirective field='tags' headerText='Tags' width='100' />
//   </ColumnsDirective>
//   <Inject services={[Page, Filter]}/>
// </GridComponent>