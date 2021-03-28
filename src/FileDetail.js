import './FileDetail.css';



function FileDetail(props) {
    return (
      <div className="file">
          <ul className="file-attributes no-bullets">
              <li><span className="filename"> {props.filename} </span></li>
              <li><span className="filesize"> filesize </span></li>
          </ul>
      </div>
    );
}

export default FileDetail;