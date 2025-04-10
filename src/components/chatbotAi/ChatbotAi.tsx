import classNames from 'classnames/bind';
import styles from './ChatbotAi.module.scss';
import { useState } from 'react';
import { Avatar } from '@mui/material';
import chatbotAiMethods from '../../services/chatbotAi';
import Loader from '../loader/Loader';

const cx = classNames.bind(styles);
const HtmlContent = ({ content }: { content: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} className={cx('message-content')} />;
};

interface History {
  content: string;
  ask: string;
}

const ChatbotAi = () => {
  const [ask, setAsk] = useState<string>('');
  const [showAsk, setShowAsk] = useState<string>('');
  const [isExpanded, setExpanded] = useState<boolean>(false);
  const [history, setHistory] = useState<History[]>([
    {
      content: 'Xin chào, em ở đây để hỗ trợ cho mình ạ!',
      ask: '',
    },
  ]);
  const [showChatbot, setShowChatBot] = useState<boolean>(false);
  const [image, setImage] = useState<string>('');
  const [isDarkMode, setDarkMode] = useState(false);
  const [showUtility, setShowUtility] = useState(false);

  const handleAskChatbot = async () => {
    setHistory((prevData) => {
      const newData = {
        content: 'Thinking...',
        ask,
      };
      return [newData, ...prevData];
    });
    setShowAsk(ask);
    setAsk('');
    try {
      const { status, data } = await chatbotAiMethods.createContent(ask as string, image as string);
      if (status) {
        setHistory((prevData) => [data, ...prevData.filter((item) => item.content !== 'Thinking...')]);
      } else {
        setHistory((prevData) => [
          {
            content: 'Không tìm thấy câu trả lời',
            ask: showAsk,
          },
          ...prevData.filter((item) => item.content !== 'Thinking...'),
        ]);
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  const handleUploadImage = async () => {
    const inputElement = document.getElementById('inputImage') as HTMLInputElement | null;
    if (inputElement && inputElement.files) {
      const input = inputElement.files[0];
      const response = await chatbotAiMethods.uploadImage(input);
      if (response && response.status) {
        setImage(response.data);
      }
    }
  };

  const handleClearHistory = () => {
    setHistory([
      {
        content: 'Xin chào, em ở đây để hỗ trợ cho mình ạ!',
        ask: '',
      },
    ]);
    setImage('');
    setShowAsk('');
  };

  const handleDownloadHistory = () => {
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(history, null, 2)], {
      type: 'application/json',
    });
    element.href = URL.createObjectURL(file);
    element.download = 'chat_history.json';
    document.body.appendChild(element);
    element.click();
  };

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
  };

  return (
    <div className={cx('wapper', { active: showChatbot, dark: isDarkMode }, { expanded: isExpanded })}>
      {(showChatbot && (
        <div className={cx('wapper-chatbot')}>
          <div className={cx('chatbot-inner')}>
            <div className={cx('chatbot-header')}>
              <div className={cx('title')}>Chat với nhân viên tư vấn</div>
              <div>
                <div className={cx('header-utility')}>
                  <button className={cx('utility-toggle-btn')} onClick={() => setShowUtility((prev) => !prev)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                      <path
                        fill="#fff"
                        d="M4.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
                      ></path>
                    </svg>
                  </button>
                  {showUtility && (
                    <div className={cx('utility-menu')}>
                      <button className={cx('clear-history-btn')} onClick={handleClearHistory}>
                        Xóa lịch sử
                      </button>
                      <button className={cx('download-history-btn')} onClick={handleDownloadHistory}>
                        Tải xuống lịch sử
                      </button>
                      <button className={cx('toggle-dark-mode-btn')} onClick={toggleDarkMode}>
                        {isDarkMode ? 'Chế độ sáng' : 'Chế độ tối'}
                      </button>
                      <button className={cx('extend')} onClick={() => setExpanded((prev) => !prev)}>
                        {isExpanded ? 'Thu nhỏ' : 'Mở rộng'}
                      </button>
                    </div>
                  )}
                </div>
                <button
                  className={cx('close-btn')}
                  onClick={() => {
                    setShowChatBot(false);
                    setExpanded(false);
                  }}
                >
                  <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CloseIcon">
                    <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div className={cx('chatbot-body')}>
              <div className={cx('chatbot-content')}>
                {history[0].ask === '' && (
                  <div className={cx('existing-questions')}>
                    <div className={cx('question-category')}>
                      <h4>Câu hỏi về Sản phẩm</h4>
                      <button onClick={() => setAsk('Bạn có thể cho tôi biết thêm về sản phẩm này không?')}>
                        Bạn có thể cho tôi biết thêm về sản phẩm này không?
                      </button>
                      <button onClick={() => setAsk('Sản phẩm này có các tùy chọn màu sắc nào?')}>
                        Sản phẩm này có các tùy chọn màu sắc nào?
                      </button>
                      <button
                        onClick={() => setAsk('Tôi có thể nhận được thông tin về kích thước của sản phẩm không?')}
                      >
                        Tôi có thể nhận được thông tin về kích thước của sản phẩm không?
                      </button>
                      <button onClick={() => setAsk('Sản phẩm này có chương trình khuyến mãi không?')}>
                        Sản phẩm này có chương trình khuyến mãi không?
                      </button>
                      <button onClick={() => setAsk('Có chương trình bảo hành cho sản phẩm này không?')}>
                        Có chương trình bảo hành cho sản phẩm này không?
                      </button>
                    </div>
                    <div className={cx('question-category')}>
                      <h4>Câu hỏi về Đặt hàng</h4>
                      <button onClick={() => setAsk('Tôi làm thế nào để đặt hàng?')}>
                        Tôi làm thế nào để đặt hàng?
                      </button>
                      <button onClick={() => setAsk('Có cần phải tạo tài khoản để mua hàng không?')}>
                        Có cần phải tạo tài khoản để mua hàng không?
                      </button>
                      <button onClick={() => setAsk('Tôi có thể thay đổi hoặc hủy đơn hàng đã đặt không?')}>
                        Tôi có thể thay đổi hoặc hủy đơn hàng đã đặt không?
                      </button>
                      <button onClick={() => setAsk('Thời gian giao hàng là bao lâu sau khi đặt hàng?')}>
                        Thời gian giao hàng là bao lâu sau khi đặt hàng?
                      </button>
                    </div>
                    <div className={cx('question-category')}>
                      <h4>Câu hỏi về Thanh toán</h4>
                      <button onClick={() => setAsk('Các phương thức thanh toán nào được chấp nhận?')}>
                        Các phương thức thanh toán nào được chấp nhận?
                      </button>
                      <button onClick={() => setAsk('Tôi có thể thanh toán khi nhận hàng không?')}>
                        Tôi có thể thanh toán khi nhận hàng không?
                      </button>
                      <button onClick={() => setAsk('Có phí giao hàng không và cách tính phí như thế nào?')}>
                        Có phí giao hàng không và cách tính phí như thế nào?
                      </button>
                      <button onClick={() => setAsk('Tôi có thể nhận hóa đơn điện tử không?')}>
                        Tôi có thể nhận hóa đơn điện tử không?
                      </button>
                    </div>
                    <div className={cx('question-category')}>
                      <h4>Câu hỏi về Giao hàng</h4>
                      <button onClick={() => setAsk('Khoảng thời gian giao hàng dự kiến là bao lâu?')}>
                        Khoảng thời gian giao hàng dự kiến là bao lâu?
                      </button>
                      <button onClick={() => setAsk('Tôi có thể theo dõi đơn hàng của mình không?')}>
                        Tôi có thể theo dõi đơn hàng của mình không?
                      </button>
                      <button onClick={() => setAsk('Nếu đơn hàng bị trễ thì tôi có thể làm gì?')}>
                        Nếu đơn hàng bị trễ thì tôi có thể làm gì?
                      </button>
                      <button onClick={() => setAsk('Có thể giao hàng đến địa chỉ nào?')}>
                        Có thể giao hàng đến địa chỉ nào?
                      </button>
                    </div>
                    <div className={cx('question-category')}>
                      <h4>Câu hỏi về Hoàn trả và Đổi hàng</h4>
                      <button onClick={() => setAsk('Chính sách hoàn trả của bạn là gì?')}>
                        Chính sách hoàn trả của bạn là gì?
                      </button>
                      <button onClick={() => setAsk('Tôi có thể đổi sản phẩm trong bao lâu sau khi mua?')}>
                        Tôi có thể đổi sản phẩm trong bao lâu sau khi mua?
                      </button>
                      <button onClick={() => setAsk('Làm thế nào để gửi sản phẩm trả lại?')}>
                        Làm thế nào để gửi sản phẩm trả lại?
                      </button>
                      <button onClick={() => setAsk('Tiền hoàn lại sẽ được trả trong bao lâu?')}>
                        Tiền hoàn lại sẽ được trả trong bao lâu?
                      </button>
                    </div>
                    <div className={cx('question-category')}>
                      <h4>Câu hỏi về Hỗ trợ Khách hàng</h4>
                      <button onClick={() => setAsk('Làm thế nào tôi có thể liên hệ với bộ phận hỗ trợ khách hàng?')}>
                        Làm thế nào tôi có thể liên hệ với bộ phận hỗ trợ khách hàng?
                      </button>
                      <button onClick={() => setAsk('Giờ làm việc của bộ phận hỗ trợ khách hàng là gì?')}>
                        Giờ làm việc của bộ phận hỗ trợ khách hàng là gì?
                      </button>
                      <button onClick={() => setAsk('Tôi có thể gửi phản hồi hoặc khiếu nại qua đâu?')}>
                        Tôi có thể gửi phản hồi hoặc khiếu nại qua đâu?
                      </button>
                      <button onClick={() => setAsk('Bạn có cung cấp hỗ trợ sau khi mua hàng không?')}>
                        Bạn có cung cấp hỗ trợ sau khi mua hàng không?
                      </button>
                    </div>
                    <div className={cx('question-category')}>
                      <h4>Câu hỏi về Khuyến mãi và Ưu đãi</h4>
                      <button onClick={() => setAsk('Hiện tại có chương trình khuyến mãi nào không?')}>
                        Hiện tại có chương trình khuyến mãi nào không?
                      </button>
                      <button onClick={() => setAsk('Tôi có thể nhận được mã giảm giá bằng cách nào?')}>
                        Tôi có thể nhận được mã giảm giá bằng cách nào?
                      </button>
                      <button onClick={() => setAsk('Các sản phẩm nào đang trong chương trình giảm giá?')}>
                        Các sản phẩm nào đang trong chương trình giảm giá?
                      </button>
                      <button onClick={() => setAsk('Làm sao để đăng ký nhận thông tin khuyến mãi qua email?')}>
                        Làm sao để đăng ký nhận thông tin khuyến mãi qua email?
                      </button>
                    </div>
                    <div className={cx('question-category')}>
                      <h4>Câu hỏi khác</h4>
                      <button onClick={() => setAsk('Bạn có thể giới thiệu các sản phẩm tương tự cho tôi không?')}>
                        Bạn có thể giới thiệu các sản phẩm tương tự cho tôi không?
                      </button>
                      <button onClick={() => setAsk('Tại sao tôi không thể tìm thấy sản phẩm tôi đang tìm kiếm?')}>
                        Tại sao tôi không thể tìm thấy sản phẩm tôi đang tìm kiếm?
                      </button>
                      <button
                        onClick={() => setAsk('Có một số câu hỏi thường gặp (FAQ) nào mà tôi nên xem qua không?')}
                      >
                        Có một số câu hỏi thường gặp (FAQ) nào mà tôi nên xem qua không?
                      </button>
                    </div>
                  </div>
                )}
                {history &&
                  history.length > 0 &&
                  history.map((historyItem, index) => (
                    <>
                      <div className={cx('message-bot')} key={index}>
                        <Avatar
                          src={`data:image/jpeg;base64,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`}
                          sx={{ width: 30, height: 30 }}
                        />
                        {(historyItem.content === 'Thinking...' && <Loader />) || (
                          <>
                            <HtmlContent content={historyItem.content} />
                          </>
                        )}
                      </div>
                      {historyItem.ask !== '' && (
                        <div className={cx('message-user')}>
                          <HtmlContent content={historyItem.ask} />
                        </div>
                      )}
                    </>
                  ))}
              </div>
            </div>
            <div className={cx('chatbot-footer')}>
              <div className={cx('message-input')}>
                <pre></pre>
                {image !== '' && (
                  <img src={`https://backend.regis.id.vn${image}`} alt="Ảnh hỏi" className={cx('image-question')} />
                )}
                <textarea
                  value={ask}
                  onChange={(e: any) => setAsk(e.target.value)}
                  onKeyDown={(e: any) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleAskChatbot();
                    }
                  }}
                  placeholder="Nhập nội dung…"
                  aria-label="Write a reply…"
                  id="textarea"
                  spellCheck="false"
                  tabIndex={0}
                  maxLength={1000}
                ></textarea>
                <div className={cx('message-input__buttons')}>
                  <label className={cx('send-message-btn')} htmlFor="inputImage">
                    Ảnh
                  </label>
                  <input
                    id="inputImage"
                    type="file"
                    name="file"
                    hidden
                    accept="image/png, image/gif, image/jpeg, image/jpg"
                    onChange={handleUploadImage}
                  ></input>

                  <button
                    className={cx('send-message-btn')}
                    tabIndex={0}
                    type="button"
                    aria-label="send-message"
                    onClick={handleAskChatbot}
                  >
                    <svg
                      className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-11fo197"
                      focusable="false"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      data-testid="SendIcon"
                    >
                      <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"></path>
                    </svg>
                    <span className="MuiTouchRipple-root css-w0pj6f"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )) || (
        <div className={cx('wapper-container')} onClick={() => setShowChatBot(true)}>
          <div className={cx('header')}>
            <div className={cx('icon')}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                <path d="M320 0c17.7 0 32 14.3 32 32l0 64 120 0c39.8 0 72 32.2 72 72l0 272c0 39.8-32.2 72-72 72l-304 0c-39.8 0-72-32.2-72-72l0-272c0-39.8 32.2-72 72-72l120 0 0-64c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-32 0zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-32 0zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-32 0zM264 256a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224l16 0 0 192-16 0c-26.5 0-48-21.5-48-48l0-96c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-16 0 0-192 16 0z" />
              </svg>
            </div>
            <div className={cx('title')}>Chat với nhân viên tư vấn</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotAi;
