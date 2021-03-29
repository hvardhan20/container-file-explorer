import React from 'react';
import BrowserGrid from "./BrowserGrid";
import FileBrowser from "./browser";


class ContainerBrowser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {files: []};
    }

    render() {
        return (
            <div className="container-browser" style={{ display:'grid', 'grid-template-columns': 'repeat(2, 1fr)',
                'grid-auto-rows': 'minmax(100px, auto)', gap: '10px'}}>
                <div style={{'grid-column': '1', 'grid-row': '1'}}>
                <h1>Containers</h1>
                    <div style={{overflow: 'scroll'}}>
                        <BrowserGrid items={this.props.items} headers={this.props.headers} onRowClick={this.props.onRowClick}/>
                    </div>
                </div>
                <div style={{'grid-column': '2', 'grid-row': '1'}}>
                    <h1>Files</h1>
                    <FileBrowser files={this.props.files}/>
                </div>
            </div>
        );
    }
}

export default ContainerBrowser;