import React from 'react';
import './BrowserGrid.css';
// import FileBrowser from "./browser";


class BrowserGrid extends React.Component {

    render() {
        const renderedHeader = this.props.headers ? this.props.headers.map((item, idx) => <th key={idx}>{item}</th>) : [];
        const items = this.props.items ? this.props.items : [];
        let renderedBody = [];

        if (this.props.onRowClick) {
            renderedBody = items.map((item, j) => {
                return (
                    <tr key={item.ID} id={item.ID} onClick={() => this.props.onRowClick(item.ID)}>
                        {Object.values(item).map((v, idx) => {
                            return <td key={idx}>{v}</td>
                        })}
                    </tr>
                )
            });
        }
        else {
            renderedBody = items.map((item, j) => {
                return (
                    <tr key={item.ID}>
                        {Object.values(item).map((v, idx) => {
                            return <td key={idx}>{v}</td>
                        })}
                    </tr>
                )
            });
        }

        return (
            <div className="browser-grid">
                <table className="ui selectable inverted table" style={{textAlign: 'center'}}>
                    <thead>
                    <tr>
                        {renderedHeader}
                    </tr>
                    </thead>
                    <tbody>
                        {renderedBody}
                    </tbody>
                </table>
            </div>
        );
    }
}


export default BrowserGrid;

// <div className="ui list">
//     <div className="item">
//         <i className="folder icon"></i>
//         <div className="content">
//             <div className="header">src</div>
//             <div className="description">Source files for project</div>
//             <div className="list">
//                 <div className="item">
//                     <i className="folder icon"></i>
//                     <div className="content">
//                         <div className="header">site</div>
//                         <div className="description">Your site's theme</div>
//                     </div>
//                 </div>
//                 <div className="item">
//                     <i className="folder icon"></i>
//                     <div className="content">
//                         <div className="header">themes</div>
//                         <div className="description">Packaged theme files</div>
//                         <div className="list">
//                             <div className="item">
//                                 <i className="folder icon"></i>
//                                 <div className="content">
//                                     <div className="header">default</div>
//                                     <div className="description">Default packaged theme</div>
//                                 </div>
//                             </div>
//                             <div className="item">
//                                 <i className="folder icon"></i>
//                                 <div className="content">
//                                     <div className="header">my_theme</div>
//                                     <div className="description">Packaged themes are also available in this folder</div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="item">
//                     <i className="file icon"></i>
//                     <div className="content">
//                         <div className="header">theme.config</div>
//                         <div className="description">Config file for setting packaged themes</div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//     <div className="item">
//         <i className="folder icon"></i>
//         <div className="content">
//             <div className="header">dist</div>
//             <div className="description">Compiled CSS and JS files</div>
//             <div className="list">
//                 <div className="item">
//                     <i className="folder icon"></i>
//                     <div className="content">
//                         <div className="header">components</div>
//                         <div className="description">Individual component CSS and JS</div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//     <div className="item">
//         <i className="file icon"></i>
//         <div className="content">
//             <div className="header">semantic.json</div>
//             <div className="description">Contains build settings for gulp</div>
//         </div>
//     </div>
// </div>