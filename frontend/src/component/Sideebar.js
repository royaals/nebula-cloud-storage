import React from "react";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";

import StarBorderIcon from "@mui/icons-material/StarBorder";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import styled from "styled-components";
import { useState } from "react";
import { Modal } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { db, storage } from "../firebase";
import firebase from "firebase";

const SidebarContainer = styled.div`
  margin-top: 10px;
`;

const SidebarOptions = styled.div`
  margin-top: 10px;
  .progress_bar {
    padding: 0px 20px;
  }
  .progress_bar span {
    display: block;
    color: #333;
    font-size: 13px;
  }

  border-right: 1px solid #232323;
`;

const SidebarBtn = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
  margin-left: 15px;

  span {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }
  svg.MuiSvgIcon-root {
    margin: 3px 3px;
  }
  button {
    display: flex;
    align-items: center;
    border-radius: 10px;
    padding: 5px 10px;
    margin-right: 15px; /* Add margin here */
    span {
      font-size: 16px;
      font-weight: 550;
      margin-right: 20px;
      margin-left: 10px;
    }
  }
`;

const SidebarOption = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 20px;
  border-radius: 5px 5px 5px 5px;

  &:hover {
    background: #313131;
    cursor: pointer;
  }
  svg.MuiSvgIcon-root {
    color: ${(props) => (props.isSelected ? "#ffffff" : "#ACACAC")};
  }
  span {
    margin-left: 15px;
    font-size: 13px;
    font-weight: 500;
    color: ${(props) => (props.isSelected ? "#ffffff" : "#ACACAC")};
  }
  margin-bottom: 10px;
`;

const ModalPopup = styled.div`
  top: 50%;
  background-color: #191919;
  width: 500px;
  margin: 0px auto;
  position: relative;
  transform: translateY(-50%);
  padding: 10px;
  border-radius: 20px;
`;

const ModalHeading = styled.div`
  text-align: center;
  border-bottom: 1px solid #232323;
  height: 40px;
  color: #acacac;
`;

const ModalBody = styled.div`
  input.modal__submit {
    width: 60%;
    background: #2ea9cf;
    padding: 10px 20px;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 5px;
    font-size: 16px;
    border: 0;
    outline: 0;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
    font-weight: 600px;
    margin-left: 100px;
  }
  input.modal__file {
    background: #212121;
    padding: 20px;
    color: #ffffff;
    display: block;
    margin-top: 20px;
    margin-left: 100px;
    border-radius: 5px;
  }
`;

const UploadingPara = styled.p`
  background: #353535;
  color: #ffffff;
  margin: 20px;
  text-align: center;
  padding: 10px;
  letter-spacing: 1px;
  font-weight: 500;
`;

const Sideebar = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    setUploading(true);
    storage
      .ref(`files/${file.name}`)
      .put(file)
      .then((snapshot) => {
        storage
          .ref("files")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("myfiles").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              filename: file.name,
              fileURL: url,
              size: snapshot._delegate.bytesTransferred,
            });
            setUploading(false);
            setFile(null);
            setOpen(false);
          });
      });
  };

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalPopup>
          <form onSubmit={handleUpload}>
            <ModalHeading>
              <h4>Select File you want to upload</h4>
            </ModalHeading>
            <ModalBody>
              {uploading ? (
                <UploadingPara>Uploading...</UploadingPara>
              ) : (
                <>
                  <input
                    type="file"
                    className="modal__file"
                    onChange={handleFile}
                  />

                  <input type="submit" className="modal__submit" />
                </>
              )}
            </ModalBody>
          </form>
        </ModalPopup>
      </Modal>
      <SidebarContainer>
        <SidebarOptions>
          <SidebarBtn>
            <button onClick={() => setOpen(true)}>
              <AddOutlinedIcon />
              <span>New</span>
            </button>
          </SidebarBtn>
          <SidebarOption
            isSelected={selectedOption === "myDrive"}
            onClick={() => setSelectedOption("myDrive")}
          >
            <HomeOutlinedIcon />
            <span>Home</span>
          </SidebarOption>

          <SidebarOption
            isSelected={selectedOption === "recents"}
            onClick={() => setSelectedOption("recents")}
          >
            <QueryBuilderIcon />
            <span>Recents</span>
          </SidebarOption>
          <SidebarOption
            isSelected={selectedOption === "favorites"}
            onClick={() => setSelectedOption("favorites")}
          >
            <StarBorderIcon />
            <span>Favorites</span>
          </SidebarOption>
          <SidebarOption
            isSelected={selectedOption === "shared"}
            onClick={() => setSelectedOption("shared")}
          >
            <PersonAddAltOutlinedIcon />
            <span>Shared</span>
          </SidebarOption>

          <SidebarOption
            isSelected={selectedOption === "bin"}
            onClick={() => setSelectedOption("bin")}
          >
            <DeleteOutlineIcon />
            <span>Bin</span>
          </SidebarOption>
        </SidebarOptions>

        <SidebarOptions>
          <SidebarOption>
            <CloudQueueIcon />
            <span>Available Storage</span>
          </SidebarOption>
          <div className="progress_bar">
            <progress size="tiny" value="50" max="100" />
            <span style={{ color: "#ffffff" }}>500 MB of 1GB used</span>
          </div>
        </SidebarOptions>
      </SidebarContainer>
    </>
  );
};

export default Sideebar;
