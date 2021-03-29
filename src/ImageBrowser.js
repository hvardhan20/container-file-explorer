import React from 'react';
import BrowserGrid from "./BrowserGrid";
import axiosInstance from "./config/axios";
import ContainerBrowser from "./ContainerBrowser";

class ImageBrowser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {images: [], imageHeaders: [], containers: [], containerHeaders: [], cFiles: []};

        this.imageRowClickHandler = this.imageRowClickHandler.bind(this);
        this.containerRowClickHandler = this.containerRowClickHandler.bind(this);
    }

    async getImages() {
        const res = await axiosInstance.get("/images", {
            params: {},
            headers: {
            }
        });
        return res.data;
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
        const images = await this.getImages()
        const imageHeaders = Object.keys(images.data[0]);

        const containers = await this.getContainers()
        const containerHeaders = Object.keys(containers.data[0]);

        this.setState({images: images.data, imageHeaders, containers: containers.data, containerHeaders});
    }

    async imageRowClickHandler(id) {
        const res = await axiosInstance.get(`/containers`, {
            params: { all: true, image_id: id },
            headers: {
            }
        });
        this.setState({containers: res.data.data});
    }

    async containerRowClickHandler(id) {
        const res = await axiosInstance.get(`/containers/${id}/files`, {
            params: {},
            headers: {
            }
        });
        this.setState({cFiles: res.data.data});
    }

    render() {
        return (
            <div className="image-browser" style={{ display:'grid', 'grid-template-columns': 'repeat(2, 1fr)',
                'grid-auto-rows': 'minmax(100px, auto)', gap: '10px'}}>
                <div style={{'grid-column': '1', 'grid-row': '1'}}>
                    <h1>Images</h1>
                    <div style={{overflow: 'scroll', height:'600px', width:'100%'}}>
                    <BrowserGrid items={this.state.images} headers={this.state.imageHeaders} onRowClick={this.imageRowClickHandler}/>
                    </div>
                </div>
                <div style={{ 'grid-column': '2', 'grid-row': '1'}}>
                    <ContainerBrowser items={this.state.containers}
                                      headers={this.state.containerHeaders}
                                      files={this.state.cFiles}
                                      onRowClick={this.containerRowClickHandler}/>
                </div>
            </div>
        );
    }
}

export default ImageBrowser;