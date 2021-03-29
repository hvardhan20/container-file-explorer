import React from 'react';
import BrowserGrid from "./BrowserGrid";
import axiosInstance from "./config/axios";
import ContainerBrowser from "./ContainerBrowser";

class ImageBrowser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {items: []};
    }

    async getImages() {
        const res = await axiosInstance.get("/images", {
            params: {},
            headers: {
            }
        });
        return res.data;
    }
    async componentDidMount() {
        const images = await this.getImages()
        const headers = Object.keys(images.data[0]);
        this.setState({items: images.data, headers});
    }
    render() {
        return (
            <div style={{overflow: 'scroll', height:'500px', width:'100%', display:'flex'}}>
                <BrowserGrid items={this.state.items} headers={this.state.headers}/>
                <h1>Containers</h1>
                <ContainerBrowser />
            </div>
        );
    }
}

export default ImageBrowser;