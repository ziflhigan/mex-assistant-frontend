import React from 'react';
import { useChatContext } from '../../contexts/ChatContext';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

// Header bar for the chat, includes the title, language selector, and clear chat button
export default function ChatHeader() {
    const { clearChat } = useChatContext();
    const { t } = useTranslation();
    return (
        <div className="chat-header">
            <div className="chat-header-title"> MEX Assistant</div>
            <div className="chat-header-controls">
                <LanguageSelector />
                <button 
                    type="button" 
                    className="clear-chat-btn" 
                    onClick={clearChat}
                >
                     {t('clear')}
                </button>
            </div>
        </div>
    );
}
// import React from 'react';
// import LanguageSelector from './LanguageSelector';
// import { useTranslation } from 'react-i18next';

// function ChatHeader({ clearChat }) {
//   const { t } = useTranslation();

//   return (
//     <div className="chat-header">
//       <div className="chat-header-title">MEX Assistant</div>
//       <div className="chat-header-controls">
//         <LanguageSelector />
//         <button className="clear-chat-btn" onClick={clearChat}>
//           {t('clearChat')}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ChatHeader;
