import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./style.css";
import { Collapse } from "react-collapse";
import { FaAngleDown } from "react-icons/fa6";
import { Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import { FaAngleUp } from "react-icons/fa6";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useContext } from "react";
import { myContext } from "../../App";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { postData } from "../../utils/api";
export default function Sidebar(props) {
  const [isOpen, setIsopened] = useState(false);
  const [isOpen1, setIsopened1] = useState(false);
  const [isOpen2, setIsopened2] = useState(false);
  const [filters, setfilters] = useState({
    catId: [],
    subcatId: [],
    thirdsubcatId: [],
    minPrice: "",
    maxPrice: "",
    rating: [],
    page: 1,
    limit: 5,
  });
  const [PriceRange, setPriceRange] = useState([0, 10000]);
  const context = useContext(myContext);
  const location = useLocation();
  const handleclick = () => {
    setIsopened(!isOpen);
  };

  const handleclick1 = () => {
    setIsopened1(!isOpen1);
  };
  const handleclick2 = () => {
    setIsopened2(!isOpen2);
  };

  const handlechangecheckbox = (field, value) => {
    context.setSearchData([]);
    const currentValue = filters[field] || [];
    const updatedValue = currentValue.includes(value)
      ? currentValue.filter((item) => item !== value)
      : [...currentValue, value];

    let newFilters = { ...filters, [field]: updatedValue };

    // Reset dependent filters
    if (field === "catId") {
      newFilters.subcatId = [];
      newFilters.thirdsubcatId = [];
    }
    if (field === "subcatId") {
      newFilters.thirdsubcatId = [];
    }

    setfilters(newFilters);
    console.log(newFilters);
  };

  // 1. Extract URL Params Once on Location Change
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const updatedFilters = {
      catId: [],
      subcatId: [],
      thirdsubcatId: [],
      rating: [],
      page: 1,
    };

    if (params.has("catId")) {
      updatedFilters.catId = [params.get("catId")];
    } else if (params.has("subcatId")) {
      updatedFilters.subcatId = [params.get("subcatId")];
    } else if (params.has("thirdsubcatId")) {
      updatedFilters.thirdsubcatId = [params.get("thirdsubcatId")];
    } else if (params.has("rating")) {
      updatedFilters.rating = params.get("rating").split(",");
    }

    setfilters((prev) => ({
      ...prev,
      ...updatedFilters,
    }));
  }, [location]);

  // 2. Trigger API Call when Filters OR Page Change
  useEffect(() => {
    props.setisLoading(true);

    if (context.searchData?.length > 0) {
      props.setproductData(context.searchData);
      props.setisLoading(false);
    } else {
      postData("/api/product/filters", filters).then((res) => {
        console.log("API Response:", res);
        props.setproductData(res.data);
        props.setisLoading(false);
        props.setTotalpage(res.totalPages);
      });
    }
  }, [filters, context.searchData]);

  // 3. Update Filters on PriceRange Change
  useEffect(() => {
    setfilters((prev) => ({
      ...prev,
      minPrice: PriceRange[0],
      maxPrice: PriceRange[1],
    }));
  }, [PriceRange]);

  // 4. Update Page in Filters
  useEffect(() => {
    setfilters((prev) => ({
      ...prev,
      page: props.page,
    }));
  }, [props.page]);

  return (
    <aside className="sidebar  py-5 sticky z-50  top-0 bg-white border-r border-gray-200">
      <div className="box mt-3">
        <h3 className=" w-full text-[16px] mb-3 flex items-center font-[600] pr-3">
          Shop By Category{" "}
          <Button
            className="!text-black !w-[30px] !h-[30px] min-w-[30px] !ml-auto !rounded-full"
            onClick={handleclick}
          >
            {isOpen === true ? <FaAngleUp /> : <FaAngleDown />}{" "}
          </Button>{" "}
        </h3>
        <Collapse isOpened={isOpen}>
          <div className="scroll px-4 relative -left-[10px]">
            {context.catData.map((item) => (
              <FormControlLabel
                key={item._id}
                control={
                  <Checkbox
                    size="small"
                    checked={filters.catId.includes(item._id)}
                    onChange={() => handlechangecheckbox("catId", item._id)}
                  />
                }
                label={item.name}
                className="w-full"
              />
            ))}
          </div>
        </Collapse>
      </div>

      <div className="box mt-4">
        <h3 className=" w-full text-[16px] mb-3 flex items-center font-[600] pr-3">
          Filter By Price{" "}
        </h3>
        <RangeSlider
          min={100}
          max={10000}
          onInput={setPriceRange}
          step={5}
          value={PriceRange}
        />
        <div className="flex pt-4 pb-2 pricerange">
          <span className=" text-[13px]">
            From <strong className="text-dark"> $:{PriceRange[0]}</strong>
          </span>
          <span className=" text-[13px] ml-auto">
            To <strong className="text-dark"> $:{PriceRange[1]}</strong>
          </span>
        </div>
      </div>

      <div className="box mt-4">
        <h3 className=" w-full text-[16px] mb-3 flex items-center font-[600] pr-3">
          Filter By Rating{" "}
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <FormControlLabel
            value={5}
            control={
              <Checkbox
                size="small"
                checked={filters.rating.includes(5)}
                onChange={() => handlechangecheckbox("rating", 5)}
              />
            }
          />
          <Rating
            name="simple-controlled"
            value={5}
            readOnly
            className="w-full"
          />
        </div>
        <div className="flex items-center gap-2 mb-2">
          <FormControlLabel
            value={4}
            control={
              <Checkbox
                size="small"
                checked={filters.rating.includes(4)}
                onChange={() => handlechangecheckbox("rating", 4)}
              />
            }
          />
          <Rating
            name="simple-controlled"
            value={4}
            readOnly
            className="w-full"
          />
        </div>
        <div className="flex items-center gap-2 mb-2">
          <FormControlLabel
            value={3}
            control={
              <Checkbox
                size="small"
                checked={filters.rating.includes(3)}
                onChange={() => handlechangecheckbox("rating", 3)}
              />
            }
          />
          <Rating
            name="simple-controlled"
            value={3}
            readOnly
            className="w-full"
          />
        </div>
        <div className="flex items-center gap-2 mb-2">
          <FormControlLabel
            value={2}
            control={
              <Checkbox
                size="small"
                checked={filters.rating.includes(2)}
                onChange={() => handlechangecheckbox("rating", 2)}
              />
            }
          />
          <Rating
            name="simple-controlled"
            value={2}
            readOnly
            className="w-full"
          />
        </div>
        <div className="flex items-center gap-2 mb-2">
          <FormControlLabel
            value={1}
            control={
              <Checkbox
                size="small"
                checked={filters.rating.includes(1)}
                onChange={() => handlechangecheckbox("rating", 1)}
              />
            }
          />
          <Rating
            name="simple-controlled"
            value={1}
            readOnly
            className="w-full"
          />
        </div>
      </div>
    </aside>
  );
}
