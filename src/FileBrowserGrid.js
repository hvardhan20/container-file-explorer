import './FileBrowserGrid.css';
import FileDetail from "./FileDetail";


function FileBrowserGrid() {

    return (
        <div className="file-browser-grid">
            <FileDetail filename="File 1"/>
            <FileDetail filename="File 2"/>
            <FileDetail filename="File 3"/>
            <FileDetail filename="File 4"/>
            <FileDetail filename="File 5"/>
            <FileDetail filename="File 6"/>
        </div>
    );
}

export default FileBrowserGrid;