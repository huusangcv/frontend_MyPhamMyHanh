import classNames from "classnames/bind";
import styles from "./CommentList.module.scss";
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import usersMethods from "../../services/users";
import replyMethods from "../../services/repliesPost";
import commentPostMethods from "../../services/commentsPost";

const cx = classNames.bind(styles);
interface Comment {
  _id: string;
  content: string;
  user_id: string;
  createdAt: string;
  replies: string[];
  news_id: string;
}
interface Reply {
  _id: string;
  comment_id: string;
  user_id: string;
  content: string;
  createdAt: string;
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
  comments: Comment[];
  user: User;
  handleSetComments: (updateFn: (prevComments: Comment[]) => Comment[]) => void;
}

const caclTimePost = (createdAt: string) => {
  const date = new Date(createdAt);
  const now = new Date();
  const secondsDiff = Math.floor((now.getTime() - date.getTime()) / 1000); // Tính số giây chênh lệch

  let timeAgo;

  if (secondsDiff < 60) {
    timeAgo = `${secondsDiff} giây trước`;
  } else if (secondsDiff < 3600) {
    const minutes = Math.floor(secondsDiff / 60);
    timeAgo = `${minutes} phút trước`;
  } else if (secondsDiff < 86400) {
    const hours = Math.floor(secondsDiff / 3600);
    timeAgo = `${hours} giờ trước`;
  } else if (secondsDiff > 86400) {
    const days = Math.floor(secondsDiff / 86400);
    timeAgo = `${days} ngày trước`;
  } else {
    timeAgo = date.toLocaleString();
  }

  return timeAgo;
};

const CommentList = ({ comments, handleSetComments }: PropsModelComment) => {
  const [users, setUsers] = useState<User[]>([]);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [isShowOptions, setIsShowOptions] = useState<string>("");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, status } = await usersMethods.getUsers();

        if (status) {
          setUsers(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (comments.length > 0) {
      fetchUsers();
    }
  }, [comments]);
  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const { data, status } = await replyMethods.getReplies();

        if (status) {
          setReplies(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (comments.length > 0) {
      fetchReplies();
    }
  }, [comments]);

  const handleShowOption = (id: string) => {
    setIsShowOptions(id);
  };

  const handleDeleteComment = async (id: string) => {
    if (confirm("Bạn có muốn xoá bình luận này không??")) {
      try {
        const { status } = await commentPostMethods.deleteCommentPost(
          id as string
        );

        if (status) {
          handleSetComments((prevComment) =>
            prevComment.filter((comment) => comment._id !== id)
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  console.log("check id", isShowOptions);

  return (
    <div className={cx("comments__list")}>
      {comments &&
        comments.length > 0 &&
        comments.map((comment) => (
          <>
            <div className={cx("wapper")} key={comment._id}>
              {users.length > 0 &&
                users.map(
                  (user) =>
                    user._id === comment.user_id && (
                      <div className={cx("header")} key={user._id}>
                        <div className={cx("user")}>
                          <Avatar
                            className={cx("avatar")}
                            src={`http://localhost:8080${user.image}`}
                          />
                          <div className={cx("info")}>
                            <div className={cx("userName")}>
                              {user.username}
                            </div>
                            <div className={cx("createdAt")}>
                              {caclTimePost(comment.createdAt)}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                )}

              <div className={cx("body")}>
                <div className={cx("wapper__content")}>
                  <p>{comment.content}</p>
                </div>
              </div>
              <div className={cx("reactionBar")}>
                <div className={cx("inner")}>
                  <div className={cx("left")}>
                    <span>
                      <button
                        type="button"
                        className={cx("interaction")}
                        title="Thích"
                        aria-expanded="false"
                      >
                        Thích
                      </button>
                    </span>
                    <button
                      type="button"
                      className={cx("interaction")}
                      title="Phản hồi"
                    >
                      Phản hồi
                    </button>
                  </div>
                  <div className={cx("right")}>
                    <button
                      type="button"
                      className={cx("moreBtn")}
                      title="Xem thêm"
                      aria-expanded="false"
                      onClick={() => handleShowOption(comment._id)}
                    >
                      <svg
                        className="svg-inline--fa"
                        width="14"
                        height="4"
                        viewBox="0 0 14 4"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.75 2C3.75 2.96875 2.9375 3.75 2 3.75C1.03125 3.75 0.25 2.96875 0.25 2C0.25 1.0625 1.03125 0.25 2 0.25C2.9375 0.25 3.75 1.0625 3.75 2ZM8.75 2C8.75 2.96875 7.9375 3.75 7 3.75C6.03125 3.75 5.25 2.96875 5.25 2C5.25 1.0625 6.03125 0.25 7 0.25C7.9375 0.25 8.75 1.0625 8.75 2ZM10.25 2C10.25 1.0625 11.0312 0.25 12 0.25C12.9375 0.25 13.75 1.0625 13.75 2C13.75 2.96875 12.9375 3.75 12 3.75C11.0312 3.75 10.25 2.96875 10.25 2Z"
                          fill="#54B8FF"
                        ></path>
                      </svg>
                    </button>

                    {isShowOptions === comment._id && (
                      <div
                        data-tippy-root
                        id="tippy-24"
                        className={cx("wapper__optionsList")}
                      >
                        <ul className={cx("options__list")}>
                          <li>
                            <button type="button" className={cx("option")}>
                              Chỉnh sửa
                            </button>
                          </li>
                          <li>
                            <button
                              type="button"
                              className={cx("option")}
                              onClick={() => handleDeleteComment(comment._id)}
                            >
                              Xóa bình luận
                            </button>
                          </li>
                          <li>
                            <button type="button" className={cx("option")}>
                              Báo cáo bình luận
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {replies.map((reply) =>
              comment.replies.map(
                (commentReply) =>
                  commentReply === reply._id && (
                    <div className={cx("replies")} key={reply._id}>
                      <div className={cx("wapper", "replyMode")}>
                        <div className={cx("header")}>
                          <div className={cx("user")}>
                            <Avatar className={cx("avatar")} />
                            <div className={cx("info")}>
                              <div className={cx("userName")}>
                                {users.map(
                                  (user) =>
                                    user._id === reply.user_id && user.username
                                )}
                              </div>
                              <div className={cx("createdAt")}>
                                {caclTimePost(reply.createdAt)}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={cx("body")}>
                          <div className={cx("wapper__content")}>
                            <p>
                              <div className={cx("mention")}>
                                @
                                {users.map(
                                  (user) =>
                                    user._id === comment.user_id &&
                                    user.username
                                )}
                              </div>
                              {reply.content}
                            </p>
                          </div>
                        </div>
                        <div className={cx("reactionBar")}>
                          <div className={cx("inner")}>
                            <div className={cx("left")}>
                              <span>
                                <button
                                  type="button"
                                  className={cx("interaction")}
                                  title="Thích"
                                  aria-expanded="false"
                                >
                                  Thích
                                </button>
                              </span>
                              <button
                                type="button"
                                className={cx("interaction")}
                                title="Phản hồi"
                              >
                                Phản hồi
                              </button>
                            </div>
                            <div className={cx("right")}>
                              <button
                                type="button"
                                className={cx("moreBtn")}
                                title="Xem thêm"
                                aria-expanded="false"
                              >
                                <svg
                                  className="svg-inline--fa"
                                  width="14"
                                  height="4"
                                  viewBox="0 0 14 4"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M3.75 2C3.75 2.96875 2.9375 3.75 2 3.75C1.03125 3.75 0.25 2.96875 0.25 2C0.25 1.0625 1.03125 0.25 2 0.25C2.9375 0.25 3.75 1.0625 3.75 2ZM8.75 2C8.75 2.96875 7.9375 3.75 7 3.75C6.03125 3.75 5.25 2.96875 5.25 2C5.25 1.0625 6.03125 0.25 7 0.25C7.9375 0.25 8.75 1.0625 8.75 2ZM10.25 2C10.25 1.0625 11.0312 0.25 12 0.25C12.9375 0.25 13.75 1.0625 13.75 2C13.75 2.96875 12.9375 3.75 12 3.75C11.0312 3.75 10.25 2.96875 10.25 2Z"
                                    fill="#54B8FF"
                                  ></path>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
              )
            )}
          </>
        ))}
    </div>
  );
};

export default CommentList;
