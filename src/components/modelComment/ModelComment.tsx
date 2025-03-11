import classNames from "classnames/bind";
import styles from "./ModalComment.module.scss";
import { Avatar, Grid } from "@mui/material";
import CommentList from "../commentList/CommentList";
import { useEffect, useState } from "react";
import commentPostMethods from "../../services/commentsPost";
import Spinner from "../Spinner/Spinner";

const cx = classNames.bind(styles);
interface Comment {
  _id: string;
  content: string;
  user_id: string;
  createdAt: string;
  replies: string[];
  news_id: string;
}
interface User {
  _id: string;
  name: string;
  image: string;
  username: string;
  roles: string;
  segment_ids: string[];
}
interface PropsModelComment {
  isClosing: boolean;
  onHandleClosing: () => void;
  handleSetComments: (updateFn: (prevComments: Comment[]) => Comment[]) => void;
  comments: Comment[];
  user: User;
}
const ModelComment: React.FC<PropsModelComment> = ({
  isClosing,
  onHandleClosing,
  handleSetComments,
  comments,
  user,
}) => {
  const [text, setText] = useState("");
  const [showCommentBtn, setShowCommentBtn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  useEffect(() => {
    if (isClosing) {
      document.body.classList.remove("no-scroll");
    } else {
      document.body.classList.add("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll"); // Đảm bảo xóa lớp khi component unmount
    };
  }, [isClosing, comments]);

  const handleComment = async () => {
    setIsLoading(true);
    const data = {
      user_id: "67cd9d5a8899dbbe323dda72",
      news_id: "67cc82ef67a5a003aa8bbd2a",
      content: text,
    };

    try {
      const result = await commentPostMethods.createCommentPost(data);
      if (result.status) {
        setText("");
        setIsLoading(false);
        setShowCommentBtn(false);

        //Update comments
        handleSetComments((prevComments: Comment[]) => [
          result.data,
          ...prevComments,
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log("check commentsShow", comments);
  return (
    <div className={cx("wapper", { closing: isClosing })}>
      <div className={cx("container")}>
        <div className={cx("close-btn")} onClick={onHandleClosing}>
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="xmark"
            className="svg-inline--fa fa-xmark "
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path
              fill="currentColor"
              d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
            ></path>
          </svg>
        </div>
        <div className={cx("body")}>
          <Grid container>
            <Grid item md={12} style={{ height: "100%" }}>
              <div className={cx("wapper")}>
                <div className={cx("user")}>
                  <div className={cx("wapper__inner")}>
                    <div className={cx("content")}>
                      <Avatar
                        src="https://ophim17.cc/_next/image?url=https%3A%2F%2Fimg.ophim.live%2Fuploads%2Fmovies%2Ftro-choi-con-muc-phan-2-thumb.jpg&w=384&q=75"
                        alt="123"
                        className={cx("avatar")}
                      />
                    </div>
                  </div>
                </div>
                <div className={cx("comment")}>
                  <div className={cx("comment__wapper")}>
                    <div className={cx("inner")}>
                      <input
                        type="text"
                        className={cx("text-input")}
                        placeholder="Nhập bình luận mới của bạn"
                        value={text}
                        onChange={handleChange}
                        style={{
                          padding: showCommentBtn ? "30px 20px" : "10px",
                        }}
                        onFocus={() => setShowCommentBtn(true)}
                      />
                    </div>
                  </div>
                  {showCommentBtn && (
                    <div className={cx("buttonsBar")}>
                      <p className={cx("message")}></p>
                      <div className={cx("buttons")}>
                        <button
                          type="button"
                          className={cx("button")}
                          onClick={() => setShowCommentBtn(false)}
                        >
                          <div className={cx("inner")}>
                            <span className={cx("title")}>Hủy</span>
                          </div>
                        </button>
                        <button
                          type="button"
                          className={cx("button", "primary")}
                          onClick={handleComment}
                        >
                          <div className={cx("inner")}>
                            <span
                              className={cx("title")}
                              style={{ width: (isLoading && 20) || "" }}
                            >
                              {(isLoading && <Spinner />) || "Bình luận"}
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* <div className={cx("commentPlaceholder")}>
                    Nhập bình luận mới của bạn
                  </div> */}
                </div>
              </div>

              <div
                className={cx("wapper__comments")}
                style={{ marginTop: (showCommentBtn && "145px") || "80px" }}
              >
                <div className={cx("header")}>
                  <div className={cx("title")}>{comments.length} bình luận</div>
                </div>
                <div>
                  <CommentList
                    user={user}
                    comments={comments}
                    handleSetComments={handleSetComments}
                  />
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className={cx("overplay")} onClick={onHandleClosing}></div>
    </div>
  );
};

export default ModelComment;
