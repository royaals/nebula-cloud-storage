import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";

import Avatar from "@mui/material/Avatar";

const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 300px auto 200px;
  align-items: center;
  padding: 5px 20px;
  height: 60px;
  border-bottom: 1px solid #232323;
`;
const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 40px;
  }
  span {
    font-size: 22px;
    margin-left: 10px;
    color: white;
    font-weight: 500;
    padding-bottom: 5px;
  }
`;

const HeaderSearch = styled.div`
  display: flex;
  align-items: center;
  width: 700px;
  background-color: #2b2b2b;
  padding: 12px;
  border-radius: 5px;
  input {
    background-color: transparent;
    color: #acacac;
    border: 0;
    outline: 0;
    flex: 1;
  }
  svg.MuiSvgIcon-root {
    color: #acacac;
    margin-right: 5px;
  }
`;
const HeaderIcons = styled.div`
  display: flex;
  align-items: center;
  margin-left: 150px;
  svg.MuiSvgIcon-root {
    margin: 3px 3px;
  }
`;

const Header = ({ photoURL }) => {
  return (
    <HeaderContainer>
      <HeaderLogo>
        <img src="/logo.png" alt="logo" />
        <span>Nebula</span>
      </HeaderLogo>
      <HeaderSearch>
        <SearchIcon />
        <input type="text" placeholder="Search files,folders.." />
      </HeaderSearch>

      <HeaderIcons>
        <span>
          <Avatar src={photoURL} />
        </span>
      </HeaderIcons>
    </HeaderContainer>
  );
};
export default Header;
