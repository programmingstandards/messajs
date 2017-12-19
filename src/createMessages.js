export const createMessages = (messageFields) => {

    /* If no argument is supplied, initialize messages as an empty object. */
    let messages = {};

    /* Initialize messages with the object passed as messageFields - keys and messages*/
    if(messageFields.constructor === Object) {
        messages = {...messageFields};
    }

    /* 
        Initialize messages as object having keys passed in messageFields 
        array and each key value as an empty array
    */ 
    else if(Array.isArray(messageFields)) {
        messages = messageFields.reduce((prev, messageField) => {
            prev[messageField] = [];
            return prev;
        }, {});
    }

    /* add message keys and returns the messages object */
    function addMessageKeys(messageKeys) {
        /* If argument is an array of keys, add keys and initilize them as empty objects. */
        if(Array.isArray(messageKeys)) { 
            messageKeys.forEach((messageKey)=>{
                if(!hasMessageKeys(messageKey)){
                    messages[messageKey] = [];
                }
            });
        }
        /* Add a single key and initialize as empty array */
        else {
            messages[messageKeys] = [];
        }

        return getMessageObject();
    }

    /* delete message keys and returns the messages object */    
    function deleteMessageKeys(messageKeys) {
        /* deletes a list of message keys and associated messages */
        if(Array.isArray(messageKeys)) { 
            messageKeys.forEach((messageKey)=>{
                if(!hasMessageKeys(messageKey)){
                    delete messages[messageKey];
                }
            });
        }
        /* deletes one single message key and associated messages */
        else {
            delete messages[messageKeys];
        }

        return getMessageObject();
    }

    /* returns the message keys as an array */
    function getMessageKeys() {
        return Object.keys(messages);
    }

    /* returns the number of message keys */
    function getMessageKeysCount (){
        return getMessageKeys().length;
    };
    
    /* returns boolean, whether message keys are present */
    function hasMessageKeys (keys, every=true) {
        if (arguments.length) {
            /* 
                if an array of message keys are provided, 
                returns if all/some of them are present based on second param
            */                
            if(Array.isArray(keys)) {
                const iterate = every ? 'every' : 'some';
                return keys[iterate]((key) => hasMessageKeys(key));
            }
            
            /* returns if the single message key provided exists */
            return getMessageKeys().includes(keys);    
        } else {
            /* if no arguments are provided, returns if there is at least one message key */
            return getMessageKeysCount() > 0;
        }
    } 

    /* returns list of messages */
    function getMessages(messageType) {
        /* 
            If no argument provided, returns all messages as key values of message keys.
            If message type is provided, an array of messages is returned, 
            for that specific message type.
         */
        return messageType ? (messages[messageType] || []) : messages;
    }

    /* returns count of messages */    
    function getMessagesCount(messageKeys) {
        const args = arguments;
        
        if(args.length) {
            /* 
                returns the total number of messages, 
                for all message keys provided in argument 
            */                   
            if(Array.isArray(messageKeys)) {
                return messageKeys
                .reduce((prev, messageKey) => prev + getMessagesCount(messageKey), 0);   
            }
            /* returns total number of messages for one specific message key */
            return getMessages(messageKeys).length;    
        }

        /* returns the total number of messages, irrespective of message keys */       
        return getMessageKeys()
        .reduce((prev, messageKey) => prev + getMessagesCount(messageKey), 0);
    }

    /* returns boolean, whether messages exist */
    function hasMessages(messageKeys, every = false) {
        const args = arguments;
        if(args.length) {
            /* returns message presence based on message keys list in the argument */
            if(Array.isArray(messageKeys)) {
                const iterate = every ? 'every' : 'some';
                return messageKeys[iterate](messageKey => getMessagesCount(messageKey) > 0);
            }
            /* returns message presence based on some/every message keys */
            if(typeof args[0] === "boolean"){
                const iterate = args[0] ? 'every' : 'some';                    
                return getMessageKeys()[iterate](messageKey => getMessagesCount(messageKey) > 0);
            }
            /* returns message presence for a specific message key */            
            return getMessagesCount(messageKeys) > 0;            
        } 
        /* If any of the message keys has a message */
        return getMessageKeys().some(messageKey => getMessagesCount(messageKey) > 0);
    }

    /* deletes messages and returns the messages object */
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
                return getMessageObject();
            }
        }
        //Reset all message keys' values to empty arrays if no arguments are provided
        messages = getMessageKeys().reduce((prev, next) => { 
            prev[next] = [];
            return prev;
        }, {});

        return getMessageObject();
    }

    const pushMessages = (messageKey, message, messageCode, ) => {
        /* Push a single message of a single message key type */
        if(typeof messageKey === "string") {
            messages[messageKey].push({
                messageCode,
                message,
            });
        } 
        /* Push multiple messages for multiple message keys */
        else if(arguments[0].constructor === Object) {
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

        return getMessageObject();
    };

    function getMessageObject(){
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

    return getMessageObject();
};