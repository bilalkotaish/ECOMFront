import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState, useEffect, useContext } from "react";
import { myContext } from "../../App";
import { fetchData, postData } from "../../utils/api";

export default function Reviews(props) {
  const context = useContext(myContext);

  const [review, setReview] = useState({
    rating: 1,
    review: "",
    image: "",
    userName: "",
    userId: "",
    productId: "",
  });

  const [reviewData, setReviewData] = useState([]);

  const onChangeReview = (e) => {
    setReview({ ...review, review: e.target.value });
  };

  const onChangeRating = (event, newValue) => {
    setReview((prev) => ({ ...prev, rating: newValue }));
  };

  const onSubmitReview = (e) => {
    e.preventDefault();
    if (review.review === "") {
      context.Alertbox("error", "Please Provide Your Review");
      return;
    }
    postData("/api/user/addReview", review).then((res) => {
      if (res.error) {
        context.Alertbox("error", res.message);
        return;
      }
      context.Alertbox("success", res.message);
      setReview((prev) => ({ ...prev, rating: 1, review: "" }));
      GetReviews();
    });
  };

  useEffect(() => {
    setReview((prev) => ({
      ...prev,
      image: context.userData.Avatar,
      userName: context.userData.name,
      userId: context.userData._id,
      productId: props.productId,
    }));
  }, [context.userData, props.productId]);

  const GetReviews = async () => {
    try {
      if (!props.productId) return;
      const res = await fetchData(`/api/user/Reviews?productId=${props.productId}`);
      setReviewData(res?.data || []);
      props.setReviewsCount?.(res?.data?.length || 0);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviewData([]);
      props.setReviewsCount?.(0);
    }
  };

  useEffect(() => {
    if (props.productId) {
      GetReviews();
    }
  }, [props.productId]);

  return (
    <div className="shadow-md w-full p-4 md:p-5 rounded-md bg-white">
      <div className="containerreview w-full">
        <h2 className="font-medium text-[16px] md:text-[20px] mb-2">
          Customer Reviews
        </h2>

        {reviewData?.length === 0 ? (
          <h2 className="font-medium text-[16px]">No Reviews</h2>
        ) : (
          <div className="reviewscroll w-full pt-4 pb-4 pr-3 overflow-y-auto max-h-[300px]">
            {reviewData.map((item) => (
              <div
                key={item._id}
                className="w-full flex flex-wrap md:flex-nowrap items-start justify-between border-b border-gray-300 py-3"
              >
                <div className="info flex items-start gap-3 w-full md:w-[80%]">
                  <div className="img w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-full overflow-hidden">
                    <img src={item.image} className="w-full h-full object-cover" alt="User" />
                  </div>
                  <div className="info w-full">
                    <h3 className="text-[14px] md:text-[16px] font-semibold">{item.userName}</h3>
                    <p className="text-[12px] text-gray-500">
                      {new Date(item.createdAt).toISOString().split("T")[0]}
                    </p>
                    <p className="text-[14px] mt-1">{item.review}</p>
                  </div>
                </div>
                <div className="mt-2 md:mt-0">
                  <Rating name="size-small" value={item.rating} size="small" readOnly />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="reviewform bg-[#fafafa] rounded-md p-4 mt-6">
          <h2 className="text-[16px] md:text-[18px] font-medium mb-4">Add Review</h2>
          <form className="w-full" onSubmit={onSubmitReview}>
            <TextField
              label="Leave a Review"
              multiline
              rows={4}
              value={review.review}
              onChange={onChangeReview}
              name="review"
              fullWidth
              size="small"
            />
            <div className="flex items-center justify-between mt-4 flex-wrap gap-2">
              <Rating
                name="user-rating"
                value={review.rating}
                onChange={onChangeRating}
              />
              <Button
                type="submit"
                variant="contained"
                className="!bg-primary !text-white !rounded-full"
              >
                Submit Review
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
