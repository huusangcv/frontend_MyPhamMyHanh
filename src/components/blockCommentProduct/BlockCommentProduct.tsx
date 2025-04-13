import classNames from 'classnames/bind';
import styles from './BlockCommentProduct.module.scss';
import { Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import commentProductMethods from '../../services/commentProduct';
import replyProductMethods from '../../services/repliesProduct';
import usersMethods from '../../services/users';
import { useAppSelector } from '../../../hooks';
import imgQuestAnwser from '../../assets/questAnwser.png';

const cx = classNames.bind(styles);

const caclTimePost = (createdAt: string) => {
  const date = new Date(createdAt);
  const now = new Date();
  const secondsDiff = Math.floor((now.getTime() - date.getTime()) / 1000); // Tính số giây chênh lệch

  let timeAgo;

  if (secondsDiff < 60) {
    timeAgo = `vừa xong`;
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

interface Comment {
  _id: string;
  content: string;
  createdAt: string;
  replies: string[];
  user_id: string;
  status: string;
}
interface Reply {
  _id: string;
  content: string;
  createdAt: string;
  user_id: string;
  status: string;
}

interface User {
  _id: string;
  username: string;
  image: string;
  roles: string;
}

const BlockCommentProduct = ({ id }: { id: string }) => {
  const [commentsProduct, setCommentsProduct] = useState<Comment[]>([]);
  const [repliesProduct, setRepliesProduct] = useState<Reply[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const [contentComment, setContentComment] = useState<string>('');
  const [contentReply, setContentReply] = useState<string>('');

  const [showReplyInput, setShowReplyInput] = useState<string>('');
  const [showMoreComment, setShowMoreComment] = useState<number>(1);

  const profile = useAppSelector((state) => state.profile);

  useEffect(() => {
    const fetchCommentsProduct = async () => {
      try {
        const res = await commentProductMethods.getCommentsProduct(id);

        if (res.status) {
          setCommentsProduct(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      fetchCommentsProduct();
    }
  }, [id]);

  useEffect(() => {
    const fetchRepliesProduct = async () => {
      try {
        const res = await replyProductMethods.getRepliesByProductId(id);

        if (res.status) {
          setRepliesProduct(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      fetchRepliesProduct();
    }
  }, [id]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await usersMethods.getUsers();

        if (res.status) {
          setUsers(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      fetchUsers();
    }
  }, [id]);

  const handleComment = async () => {
    if (contentComment !== '') {
      try {
        const res = await commentProductMethods.createCommentProduct({
          user_id: profile._id,
          product_id: id,
          content: contentComment,
        });

        if (res.status) {
          setCommentsProduct((prevComment) => [res.data, ...prevComment]);
          setContentComment('');
          setShowMoreComment(showMoreComment + 1);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('Vui lòng nhập nội dung bình luận');
    }
  };

  const handleReply = async (commentId: string) => {
    if (contentReply !== '') {
      try {
        const res = await replyProductMethods.createReplyProduct(commentId, {
          user_id: profile._id,
          product_id: id,
          content: contentReply,
        });

        if (res.status) {
          setRepliesProduct((prevReply) => [res.data.newReply, ...prevReply]);
          setCommentsProduct((prevComment) => [res.data.comment, ...prevComment]);
          setContentReply('');
          setShowReplyInput('');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('Vui lòng nhập nội dung phản hồi');
    }
  };

  return (
    <div className={cx('wapper')}>
      <div className="comment-form">
        <p id="total_comment" className={cx('comment-form-title')}>
          Hỏi và đáp
        </p>
        <div className={cx('comment-form-content', 'd-flex is-justify-content-space-between')}>
          <div className={cx('textarea-comment')}>
            <img src={imgQuestAnwser} width="100" alt="cps ant icon" className={cx('cps-ant-cmt')} />
            <textarea
              id=""
              placeholder="Cửa hàng sẽ trả lời trong 1 giờ (sau 22h, phản hồi vào sáng hôm sau). Một số thông tin có thể thay đổi, Quý khách hãy đặt câu hỏi để được cập nhật mới nhất."
              className={cx('textarea')}
              value={contentComment}
              onChange={(e) => setContentComment(e.target.value)}
            ></textarea>
            <button className={cx('button__cmt-send')} onClick={handleComment}>
              <svg
                height="15"
                width="15"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className={cx('icon-paper-plane')}
              >
                <path d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z"></path>
              </svg>
              Gửi
            </button>
          </div>
        </div>
      </div>

      <div className="block-comment__box-list-comment">
        <div className={cx('list-comment')}>
          <hr style={{ margin: '10px 0 15px' }} />
          {commentsProduct &&
            commentsProduct.length > 0 &&
            commentsProduct.map(
              (comment, index) =>
                index <= showMoreComment && (
                  <div className={cx('item-comment')} key={comment._id}>
                    <div className={cx('item-comment__box-cmt')}>
                      <div className={cx('box-cmt__box-info')}>
                        {users &&
                          users.length > 0 &&
                          users.map(
                            (user) =>
                              user._id === comment.user_id && (
                                <div className={cx('box-info')} key={user._id}>
                                  <div className={cx('box-info__avatar')}>
                                    <Avatar src={`http://res.cloudinary.com${user.image}`} alt={user.username} />
                                  </div>
                                  <p className={cx('box-info__name')}>{user.username}</p>
                                </div>
                              ),
                          )}

                        <div className={cx('box-time-cmt')}>
                          <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                              <path
                                id="clock"
                                d="M7.72,8.78,5.25,6.31V3h1.5v2.69L8.78,7.72ZM6,0a6,6,0,1,0,6,6A6,6,0,0,0,6,0ZM6,10.5A4.5,4.5,0,1,1,10.5,6,4.5,4.5,0,0,1,6,10.5Z"
                                fill="#707070"
                              ></path>
                            </svg>
                          </div>
                          &nbsp;{caclTimePost(comment.createdAt)}
                        </div>
                      </div>
                      <div className={cx('box-cmt__box-question')}>
                        <div className={cx('content')}>
                          <p>{comment.content}</p>
                        </div>
                        <button className={cx('button__cmt-rep')} onClick={() => setShowReplyInput(comment._id)}>
                          <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 12 10.8">
                              <path
                                id="chat"
                                d="M3.48,8.32V4.6H1.2A1.2,1.2,0,0,0,0,5.8V9.4a1.2,1.2,0,0,0,1.2,1.2h.6v1.8l1.8-1.8h3A1.2,1.2,0,0,0,7.8,9.4V8.308a.574.574,0,0,1-.12.013H3.48ZM10.8,1.6H5.4A1.2,1.2,0,0,0,4.2,2.8V7.6H8.4l1.8,1.8V7.6h.6A1.2,1.2,0,0,0,12,6.4V2.8a1.2,1.2,0,0,0-1.2-1.2Z"
                                transform="translate(0 -1.6)"
                                fill="#707070"
                              ></path>
                            </svg>
                          </div>
                          &nbsp;Trả lời
                        </button>
                      </div>
                      {comment &&
                        comment.replies.length > 0 &&
                        repliesProduct &&
                        repliesProduct.length > 0 &&
                        repliesProduct.map(
                          (reply) =>
                            comment.replies.includes(reply._id) && (
                              <div className={cx('item-comment__box-rep-comment')} key={reply._id}>
                                <div className={cx('list-rep-comment')}>
                                  <div className={cx('item-rep-comment')}>
                                    <div className={cx('box-cmt__box-info')}>
                                      {users &&
                                        users.length > 0 &&
                                        users.map(
                                          (user) =>
                                            user._id === reply.user_id && (
                                              <div className={cx('box-info')} key={user._id}>
                                                <div className={cx('box-info__avatar')}>
                                                  <span className={cx('icon-cps')}>
                                                    <div>
                                                      <Avatar
                                                        src={`http://res.cloudinary.com${user.image}`}
                                                        alt={user.username}
                                                      />
                                                    </div>
                                                  </span>
                                                </div>
                                                <p className={cx('box-info__name')}>{user.username}</p>{' '}
                                                {user.roles === 'admin' && (
                                                  <span className={cx('box-info__tag')}>QTV</span>
                                                )}
                                              </div>
                                            ),
                                        )}

                                      <div className={cx('box-time-cmt')}>
                                        <div>
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="12"
                                            height="12"
                                            viewBox="0 0 12 12"
                                          >
                                            <path
                                              id="clock"
                                              d="M7.72,8.78,5.25,6.31V3h1.5v2.69L8.78,7.72ZM6,0a6,6,0,1,0,6,6A6,6,0,0,0,6,0ZM6,10.5A4.5,4.5,0,1,1,10.5,6,4.5,4.5,0,0,1,6,10.5Z"
                                              fill="#707070"
                                            ></path>
                                          </svg>
                                        </div>
                                        &nbsp;{caclTimePost(reply.createdAt)}
                                      </div>
                                    </div>
                                    <div className={cx('box-cmt__box-question')}>
                                      <div className={cx('content')}>
                                        <div>{reply.content}</div>
                                      </div>
                                      <button
                                        className={cx('button__cmt-rep')}
                                        onClick={() => setShowReplyInput(comment._id)}
                                      >
                                        <div>
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="13"
                                            height="12"
                                            viewBox="0 0 12 10.8"
                                          >
                                            <path
                                              id="chat"
                                              d="M3.48,8.32V4.6H1.2A1.2,1.2,0,0,0,0,5.8V9.4a1.2,1.2,0,0,0,1.2,1.2h.6v1.8l1.8-1.8h3A1.2,1.2,0,0,0,7.8,9.4V8.308a.574.574,0,0,1-.12.013H3.48ZM10.8,1.6H5.4A1.2,1.2,0,0,0,4.2,2.8V7.6H8.4l1.8,1.8V7.6h.6A1.2,1.2,0,0,0,12,6.4V2.8a1.2,1.2,0,0,0-1.2-1.2Z"
                                              transform="translate(0 -1.6)"
                                              fill="#707070"
                                            ></path>
                                          </svg>
                                        </div>
                                        &nbsp;Trả lời
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ),
                        )}
                      {showReplyInput === comment._id && (
                        <div className={cx('form_reply_wrap')}>
                          <div className={cx('textarea-comment')}>
                            <img
                              src="https://cdn2.cellphones.com.vn/insecure/rs:fill:100:0/q:90/plain/https://cellphones.com.vn/media/wysiwyg/chibi2.png"
                              width="100"
                              alt="cps ant icon"
                              className={cx('cps-ant-cmt')}
                            />
                            <textarea
                              id="text-area-1668320"
                              placeholder="Cửa hàng sẽ trả lời trong 1 giờ (sau 22h, phản hồi vào sáng hôm sau). Một số thông tin có thể thay đổi, Quý khách hãy đặt câu hỏi để được cập nhật mới nhất."
                              className={cx('textarea')}
                              value={contentReply}
                              onChange={(e) => setContentReply(e.target.value)}
                            ></textarea>
                            <button className={cx('button__cmt-send')} onClick={() => handleReply(comment._id)}>
                              <svg
                                height="15"
                                width="15"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                className={cx('icon-paper-plane')}
                              >
                                <path d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z"></path>
                              </svg>
                              Gửi
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ),
            )}
        </div>
      </div>
      {commentsProduct.length > showMoreComment && (
        <button className={cx('button__cmt-showmore')} onClick={() => setShowMoreComment(showMoreComment + 3)}>
          Xem thêm {commentsProduct.length - showMoreComment} bình luận 
          <div className="is-inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="10" height="10">
              <path d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z"></path>
            </svg>
          </div>
        </button>
      )}
    </div>
  );
};

export default BlockCommentProduct;
