import './FileDetail.css';



function FileDetail(props) {
    return (
      <div className="file">
          <span className="filename"> {props.filename} </span>
      </div>
    );
}

export default FileDetail;