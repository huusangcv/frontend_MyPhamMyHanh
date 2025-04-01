import classNames from 'classnames/bind';
import styles from './ChatbotAi.module.scss';
import { useState } from 'react';
import { Avatar } from '@mui/material';
import { useAppSelector } from '../../../hooks';
import chatbotAiMethods from '../../services/chatbotAi';
import MDEditor from '@uiw/react-md-editor';

const cx = classNames.bind(styles);

interface History {
  content: string;
  ask: string;
}

const ChatbotAi = () => {
  const profile = useAppSelector((state) => state.profile);

  const [ask, setAsk] = useState<string>('');
  const [showAsk, setShowAsk] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<History[]>([]);
  const [showChatbot, setShowChatBot] = useState<boolean>(false);
  const [image, setImage] = useState<string>('');

  const handleAskChatbot = async () => {
    setHistory((prevData) => {
      const newData = {
        content: 'Thinking...',
        ask,
      };
      return [newData, ...prevData];
    });
    setLoading(true);
    setShowAsk(ask);
    setAsk('');
    try {
      const { status, data } = await chatbotAiMethods.createContent(ask as string, image as string);
      if (status) {
        setHistory((prevData) => [data, ...prevData.filter((item) => item.content !== 'Thinking...')]);
        setLoading(false);
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

  console.log('showAsk, isLoading', isLoading, image, showAsk);

  return (
    <div className={cx('wapper', { active: showChatbot })}>
      {(showChatbot && (
        <div className={cx('wapper-chatbot')}>
          <div className={cx('chatbot-inner')}>
            <div className={cx('chatbot-header')}>
              <div className={cx('title')}>Chat với trợ lý ảo</div>
              <button className={cx('close-btn')} onClick={() => setShowChatBot(false)}>
                <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CloseIcon">
                  <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </svg>
              </button>
            </div>

            <div className={cx('chatbot-body')}>
              <div className={cx('chatbot-content')}>
                {history &&
                  history.length > 0 &&
                  history.map((historyItem, index) => (
                    <>
                      <div className={cx('message-bot')} key={index}>
                        <Avatar
                          src={`data:image/jpeg;base64,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`}
                        />

                        <MDEditor.Markdown source={historyItem.content} className={cx('message-content')} />
                      </div>
                      <div className={cx('message-user')}>
                        <MDEditor.Markdown source={historyItem.ask} className={cx('message-content')} />
                        <Avatar src={`http://localhost:8080${profile.image}`} />
                      </div>
                    </>
                  ))}
              </div>
            </div>
            <div className={cx('chatbot-footer')}>
              <div className={cx('message-input')}>
                <pre></pre>
                <textarea
                  value={ask}
                  onChange={(e: any) => setAsk(e.target.value)}
                  placeholder="Nhập nội dung…"
                  aria-label="Write a reply…"
                  id="textarea"
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
            <div className={cx('title')}>Chat với trợ lý ảo</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotAi;
