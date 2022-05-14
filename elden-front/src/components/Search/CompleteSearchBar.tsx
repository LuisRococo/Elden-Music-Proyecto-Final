import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { showError } from "../../redux/reducers/errorReducer";
import {
  fetchSearchAlbums,
  fetchSearchName,
  fetchSearchSinger,
} from "../../util/requests";

export default function CompleteSearchBar({ setResults }) {
  const [searchValue, setSearchValue] = useState("");
  const [order, setOrder] = useState("Ascendant");
  const [searchFor, setSearchFor] = useState("Search by name");
  const dispatch = useDispatch();

  async function getResults() {
    try {
      const fetchSearch = getSelectedSearchMethod();
      const res = await fetchSearch(searchValue, true);
      setResults(await res.json());
    } catch (error) {
      dispatch(showError("Error - " + error));
    }
  }

  function getSelectedSearchMethod() {
    if (searchFor === "Search by name") {
      return fetchSearchName;
    } else if (searchFor === "Search by singer") {
      return fetchSearchSinger;
    } else {
      return fetchSearchAlbums;
    }
  }

  useEffect(() => {
    getResults();
  }, []);

  return (
    <Box sx={{ backgroundColor: "#f7800a" }}>
      <Container maxWidth={"lg"}>
        <div className="sh-bar">
          <div className="sh-bar__bar-cont">
            <input
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") getResults();
              }}
              className="sh-bar__input"
              type="text"
              name=""
              id=""
            />
            <button className="sh-bar__btn" onClick={getResults}>
              <SearchIcon fontSize="medium" />
            </button>
          </div>
          <div className="sh-bar__other-cont">
            <select
              name="select"
              value={searchFor}
              onChange={(e) => {
                setSearchFor(e.target.value);
              }}
            >
              <option value="Search by name">Search by name</option>
              <option value="Search by album">Search by album</option>
              <option value="Search by singer">Search by singer</option>
            </select>

            <select
              name="select"
              value={order}
              onChange={(e) => {
                setOrder(e.target.value);
              }}
            >
              <option value="Ascendant">Ascendant</option>
              <option value="Descendant">Descendant</option>
            </select>
          </div>
        </div>
      </Container>
    </Box>
  );
}
