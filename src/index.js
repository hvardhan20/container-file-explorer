import React from 'react';
import ReactDOM from 'react-dom';
import ImageBrowser from "./ImageBrowser";
import ContainerBrowser from "./ContainerBrowser";
import './index.css';

const App = () => {
    return (
        <div className="horizontal-grid" style={{display: 'table', width:'100%'}}>
            <div style={{display: 'table-row', height:'100%',}}>
                <div id="image-browser" style={{display: 'table-cell', width:'50%', height:'50%'}}>
                    <h1>Images</h1>
                    <ImageBrowser/>
                </div>
            </div>
            {/*<div style={{display: 'table-row', height:'100%',}}>*/}
            {/*    <div id="container-browser" style={{display: 'table-cell', width:'50%', height:'50%',}} >*/}
            {/*        <h1>Containers</h1>*/}
            {/*        <ContainerBrowser/>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<BrowserGrid/>*/}
        </div>
    )
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
