import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

import styled from "styled-components";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const DataContainer = styled.div`
  flex: 1 1;
  padding: 10px 0px 0px 20px;
`;

const DataHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #232323;
  height: 40px;
  .headerLeft {
    display: flex;
    align-items: center;
  }
  .headerRight svg {
    margin: 0px 10px;
  }
  p {
    color: #ffffff;
  }
  svg.MuiSvgIcon-root {
    color: #ffffff;
  }
`;

const DataGrid = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const DataFile = styled.div`
  text-align: center;
  background-color: #212121;
  margin: 10px;
  min-width: 200px;
  padding: 10px 0px 0px 0px;
  border-radius: 10px;
  svg {
    font-size: 60px;
    color: #2ea9cf;
  }
  p {
    border-top: 1px solid #232323;
    margin-top: 5px;
    margin-bottom: 1px;
    font-size: 12px;
    background: #2f2f2f;
    padding: 10px 10px;
    border-radius: 0px 0px 10px 10px;
    color: #acacac;
    font-weight: 400;
  }
`;
const DataListRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  border-bottom: 1px solid #232323;
  padding: 10px;
  p {
    display: flex;
    align-items: center;
    font-size: 13px;
    color: #ffffff;

    b {
      display: flex;
      align-items: center;
    }
    svg {
      font-size: 22px;
    }
  }
`;

const Data = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    db.collection("myfiles").onSnapshot((snapshot) => {
      setFiles(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const changeBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  return (
    <DataContainer>
      <DataHeader>
        <div className="headerLeft">
          <p>My Drive</p>
          <ArrowDropDownOutlinedIcon />
        </div>
        <div className="headerRight"></div>
      </DataHeader>
      <div>
        <DataGrid>
          {files.map((file) => (
            <DataFile key={file.id}>
              <InsertDriveFileIcon />
              <p>{file.data.filename}</p>
            </DataFile>
          ))}
        </DataGrid>

        <div>
          <DataListRow>
            <p>
              <b>
                Name <ArrowDropDownOutlinedIcon />
              </b>
            </p>
            <p>
              <b>Owner</b>
            </p>
            <p>
              <b>Last Modified</b>
            </p>
            <p>
              <b>File Size</b>
            </p>
          </DataListRow>
        </div>
      </div>
      {files.map((file) => (
        <DataListRow key={file.id}>
          <a
            href={file.data.fileURL}
            target="_blank"
            rel="noreferrer noopener"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <p> {file.data.filename}</p>
          </a>
          <p>Owner </p>
          <p>{new Date(file.data.timestamp?.seconds * 1000).toUTCString()}</p>
          <p>{changeBytes(file.data.size)}</p>
        </DataListRow>
      ))}
      <div />
    </DataContainer>
  );
};
export default Data;
