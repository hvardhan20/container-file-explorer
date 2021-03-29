import React from 'react';
import BrowserGrid from "./BrowserGrid";
import axiosInstance from './config/axios';
import FileBrowser from "./browser";





class ContainerBrowser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {items: [], headers: [], files: []};

        this.rowClickHandler = this.rowClickHandler.bind(this);
    }

    async getContainers() {
        const res = await axiosInstance.get("/containers", {
            params: { all: true},
            headers: {
            }
        });
        return res.data;
    }
    async componentDidMount() {
        const containers = await this.getContainers()
        const headers = Object.keys(containers.data[0]);
        this.setState({items: containers.data, headers});
    }

    async rowClickHandler(id) {
        console.log("INFO IS **********@@@@@@@", id)
        const res = await axiosInstance.get(`/containers/${id}/files`, {
            params: {},
            headers: {
            }
        });
        console.log("FILES IS ********$$$$$$$$$$", res.data);
        this.setState({files: res.data.data});


    }

    render() {
        return (
            <div style={{overflow: 'scroll'}}>
                <BrowserGrid items={this.state.items} headers={this.state.headers} onRowClick={this.rowClickHandler}/>
                <FileBrowser files={this.state.files}/>
            </div>
        );
    }
}

export default ContainerBrowser;