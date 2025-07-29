import Sidebar from "../../Component/sidebar/index.jsx";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ProductItem from "../../Component/ProductItem/index.jsx";
import Button from "@mui/material/Button";
import ProductItemListView from "../../Component/ProductItemlistview/index.jsx";
import { BsFillGridFill } from "react-icons/bs";
import { IoMdMenu } from "react-icons/io";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import ProductLoaderGrid from "../../Component/Productloader/productLoadergrid.jsx";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import { postData } from "../../utils/api.js";

export default function Productlisting() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [ItemView, SetItemView] = useState("grid");
  const [productData, setproductData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [page, setpage] = useState(1);
  const [Totalpage, setTotalpage] = useState(1);
  const [sort, setSort] = useState("Name A-Z");
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSortBy = (name, order, products, value) => {
    setSort(value);

    const plainArray = Array.isArray(products) ? products : products?.products;

    postData("/api/product/Sort", {
      products: plainArray,
      sortBy: name,
      order: order,
    }).then((res) => {
      console.log(res);
      setproductData(res.data);
      setAnchorEl(null);
    });
  };

  return (
    <section className="py-8">
      <div className="container">
        <div role="presentation">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/" className="link">
              Home
            </Link>
            <Link
              underline="hover"
              color="inherit"
              // to={`/products?catId=${item._id}`}
              className="link"
            >
              Fashion
            </Link>
          </Breadcrumbs>
        </div>
      </div>

      <div className="bg-white p-2 mt-3 ">
        <div className="container flex gap-3">
          <div className="sidebarwrapper w-[20%]  bg-white p-3">
            <Sidebar
              productData={productData}
              setproductData={setproductData}
              isLoading={isLoading}
              setisLoading={setisLoading}
              page={page}
              setpage={setpage}
              Totalpage={Totalpage}
              setTotalpage={setTotalpage}
            />
          </div>
          <div className="rightcontent w-[80%] py-3">
            <div className="p-2 w-full sticky top-0 right-0 z-10 bg-[#f1f1f1] mb-4 rounded-md flex items-center justify-between">
              <div className="col-1 flex  items-center gap-0 itemViewActions">
                <Button
                  className={`!w-[40px] !h-[40px] !rounded-full !text-black ${
                    ItemView === "list" && "active"
                  }`}
                  onClick={() => {
                    SetItemView("list");
                  }}
                >
                  <IoMdMenu />
                </Button>
                <Button
                  className={`!w-[40px] !h-[40px] !rounded-full !text-black  ${
                    ItemView === "grid" && "active"
                  }`}
                  onClick={() => {
                    SetItemView("grid");
                  }}
                >
                  <BsFillGridFill />
                </Button>
                <span className="text-[14px] font-[400] text-[rgba(0,0,0,0.5)]">
                  {" "}
                  There are {productData?.length} products Available{" "}
                </span>
              </div>

              <div className="col-2 ml-auto flex items-center justify-end gap-2">
                <span className="text-sm font-semibold text-gray-500">
                  Sort by
                </span>

                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  className="!text-sm !text-gray-800 !bg-white !capitalize !border !border-gray-300 !shadow-sm hover:!bg-gray-100"
                  endIcon={open ? <FaAngleUp /> : <FaAngleDown />}
                >
                  {sort}
                </Button>

                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    className: "!bg-white !shadow-lg !rounded-md",
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      handleSortBy("name", "asc", productData, "Name A-Z");
                    }}
                    className="!text-sm !text-gray-800 hover:!bg-gray-100"
                  >
                    Name A-Z
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleSortBy("name", "desc", productData, "Name Z-A");
                    }}
                    className="!text-sm !text-gray-800 hover:!bg-gray-100"
                  >
                    Name Z-A
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleSortBy(
                        "price",
                        "asc",
                        productData,
                        "Price Low to High"
                      );
                    }}
                    className="!text-sm !text-gray-800 hover:!bg-gray-100"
                  >
                    Price Low to High
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleSortBy(
                        "price",
                        "desc",
                        productData,
                        "Price High to Low"
                      );
                    }}
                    className="!text-sm !text-gray-800 hover:!bg-gray-100"
                  >
                    Price High to Low
                  </MenuItem>
                </Menu>
              </div>
            </div>
            <div
              className={`grid gap-4 ${
                ItemView === "grid"
                  ? "grid-cols-5 sm:grid-cols-3 md:grid-cols-5"
                  : "grid-cols-1 sm:grid-cols-1 md:grid-cols-1"
              }`}
            >
              {ItemView === "grid" ? (
                <>
                  {isLoading === true ? (
                    <ProductLoaderGrid view={ItemView} />
                  ) : (
                    productData?.map((item, index) => (
                      <ProductItem key={index} item={item} />
                    ))
                  )}
                </>
              ) : (
                <>
                  {isLoading === true ? (
                    <ProductLoaderGrid view={ItemView} />
                  ) : (
                    productData?.map((item, index) => (
                      <ProductItemListView key={index} item={item} />
                    ))
                  )}
                </>
              )}
            </div>

            <Pagination
              className="flex justify-center mt-3 items-center"
              count={Totalpage}
              color="primary"
              showFirstButton
              showNextButton
              hidePrevButton
              page={page}
              onChange={(e, page) => {
                setpage(page);
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
