import "./style.css";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { IoSearch } from "react-icons/io5";
import { myContext } from "../../App";
import { fetchData, postData } from "../../utils/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Search() {
  const [Search, setSearch] = useState("");
  const context = useContext(myContext);
  const history = useNavigate();

  const OnChangeInput = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value !== "") {
      postData("/api/product/search", { query: value }).then((res) => {
        context.setSearchData(res.data);
        console.log(res);
      });
    } else {
      context.setSearchData([]);
    }
  };

  const search = () => {
    history(`/search`);
    setSearch("");
  };

  return (
    <div className="searchbox w-[100%] h-[50px] bg-[#e5e5e5] rounded-[80px] relative">
      <input
        value={Search}
        onChange={OnChangeInput}
        className="w-full h-[50px] focus:outline-none bg-inherit rounded-[80px] p-2 text-[15px] "
        placeholder="Search For Products...."
        type="text"
      />
      <Button
        onClick={search}
        className="!absolute top-[7px] right-[5px] z-50 !w-[37px] !min-w-[37px] h-[37px] !rounded-full"
      >
        <IoSearch className="text-black" />
      </Button>
    </div>
  );
}
