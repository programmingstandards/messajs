export const createMessages = (messageFields) => {
    let messages = {};
    if(messageFields.constructor === Object) {
        messages = {...messageFields};
    } else if(Array.isArray(messageFields)) {
        messages = messageFields.reduce((prev, messageField) => {
            prev[messageField] = [];
            return prev;
        }, {});
    }

    function addMessageKeys(messageKeys) {
        if(Array.isArray(messageKeys)) { 
            messageKeys.forEach((messageKey)=>{
                if(!hasMessageKeys(messageKey)){
                    messages[messageKey] = [];
                }
            });
        }
        else {
            messages[messageKeys] = [];
        }
    }

    function deleteMessageKeys(messageKeys) {
        if(Array.isArray(messageKeys)) { 
            messageKeys.forEach((messageKey)=>{
                if(!hasMessageKeys(messageKey)){
                    delete messages[messageKey];
                }
            });
        }
        else {
            delete messages[messageKeys];
        }
    }

    const getMessageKeys = () => Object.keys(messages);

    const getMessageKeysCount = () => getMessageKeys().length;
    
    function hasMessageKeys (keys, every=true) {
        switch(arguments.length) {
            case 0:
                return getMessageKeysCount() > 0;
            case 1:
            case 2:
                if(Array.isArray(keys)) {
                    const iterate = every ? 'every' : 'some';
                    return keys[iterate]((key) => hasMessageKeys(key));
                }
                return getMessageKeys().includes(keys);
            default: 
                break;
        }
        return false;
    } 

    const getMessages = messageType => {
        return messageType ? (messages[messageType] || []) : messages;
    };

    function getMessagesCount(messageKeys) {
        const args = arguments;
        if(args.length) {
            if(Array.isArray(messageKeys)) {
                return messageKeys
                .reduce((prev, messageKey) => prev + getMessagesCount(messageKey), 0);   
            }
            return getMessages(messageKeys).length;    
        }       
        return getMessageKeys()
        .reduce((prev, messageKey) => prev + getMessagesCount(messageKey), 0);
    }

    function hasMessages(messageKeys, every = false) {
        const args = arguments;
        if(args.length) {
            if(Array.isArray(messageKeys)) {
                const iterate = every ? 'every' : 'some';
                return messageKeys[iterate](messageKey => getMessagesCount(messageKey) > 0);
            }
            if(typeof args[0] === "boolean"){
                const iterate = args[0] ? 'every' : 'some';                    
                return getMessageKeys()[iterate](messageKey => getMessagesCount(messageKey) > 0);
            }
            return getMessagesCount(messageKeys) > 0;            
        } 
        return getMessageKeys().some(messageKey => getMessagesCount(messageKey) > 0);
    }

   function deleteMessages(){
        const args = arguments;
        if(args.length){
            // call example - deleteMessages({'errors': [0, 1, 3], 'warnings': [3]})
            if(args[0].constructor === Object) {
                const MessagesToDelete = args[0];
                const messageKeys = Object.keys(MessagesToDelete);
                messageKeys.forEach((messageKey) => {
                    messages[messageKey] = messages[messageKey]
                    .filter((val, index) => !MessagesToDelete[messageKey].includes(index));
                });
                return;
            }
        }
        //Reset all message keys' values to empty arrays if no arguments are provided
        messages = getMessageKeys().reduce((prev, next) => { 
            prev[next] = [];
            return prev;
        }, {});
    }

    const pushMessages = (messageKey, message, messageCode, ) => {
        if(typeof messageKey === "string") {
            messages[messageKey].push({
                messageCode,
                message,
            });
        } else if(arguments[0].constructor === Object) {
            const messagesToBePushed = arguments[0];
            const messageKeys = Object.keys(messagesToBePushed);
            messageKeys.forEach((key) => {
                const messagesForCurrentKey = messagesToBePushed[key];
                messagesForCurrentKey.forEach((messageForCurrentKey)=> {
                    const { message, messageCode } = messageForCurrentKey;     
                    messages[key].push({
                        messageCode,
                        message,
                    });           
                });
            });        
        }
    };
    return {
        hasMessageKeys, 
        addMessageKeys,
        deleteMessageKeys,
        getMessageKeys,        
        getMessageKeysCount,
        hasMessages,
        pushMessages,        
        deleteMessages,
        getMessages,
        getMessagesCount,        
    };
};