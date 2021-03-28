import './FileBrowserGrid.css';
import FileDetail from "./FileDetail";

const elements = ['File1', 'File2', 'File3', 'File1', 'File2', 'File3'];

const items = []

for (const [index, value] of elements.entries()) {
    items.push(<li className="ui segment">{value}</li>)
}

function FileBrowserGrid() {

    return (
        <div>
            <ul className="file-list ui segments">
                {items}
            </ul>

        </div>
    );
}

export default FileBrowserGrid;

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