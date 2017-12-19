# Examples

## Initializing a messajs object

### Without message codes
```
createMessages();
```

### With message codes
```
createMessages(['success', 'warnings', 'errors']);
```

### With message codes and corresponding messages
~~~~ 
createMessages({
    'success': [{message: "test success message"}],
    'warnings': [{message: "test warning message"}],
    'errors': [{message: "test error message"}],
    'info': [],
});
~~~~

## Adding message key

### Adding a single message key
```
addMessageKeys('info')
```

### Adding multiple message keys
```
addMessageKeys(['info', 'weakWarning'])
```

## Delete message keys

**Note:** Deleting a message key deletes the messages belonging to that message key too.

### Deleting a single message key
```
deleteMessageKeys('info');
```
### Deleting multiple message keys
```
deleteMessageKeys(['info', 'weakWarnings]);
```

## Get the list of message keys
```
getMessageKeys();
```

## Get the message keys count
```
getMessageKeysCount();
```

## Check whether message key exists

### Check whether at least one message key exists
```
hasMessageKeys();
```

### Check if a specific message key exists
```
hasMessageKeys('info');
```

### Check whether at least one of the message keys in a list exists
```
hasMessageKeys(['info', 'warning']);
```
OR
```
hasMessageKeys(['info', 'warning'], false);
```
The default value of second parameter is false.

### Check whether all of the message keys in a list exists
```
hasMessageKeys(['info', 'warning'], true);
```

## Check if messages exist

### Check if there is at least one message for any of the keys
```
hasMessages();
```

OR

```
hasMessages(false);
```

### Check if at least one message exists for all the existing message keys
```
hasMessages(true);
```

### Check if message exists for a specific key
```
hasMessages('info');
```

### Check if message exists for at least one message key in a list

```
hasMessages(['info', 'warning']);
```
OR

```
hasMessages(['info', 'warning'], false);
```

### Check if message exists for all message keys in a list

```
hasMessages(['info', 'warning'], true);
```

## Push messages to messajs object

**NOTE:** If any one or more of the message keys provided while pushing messages doesn't already exist, they will be automatically created and the messages will be added. If the key already exists, the messages will be added along with the already existing ones.

### Add a single message

```
pushMessages('warning', 'message', 'message code');
```

### Add multiple messages

```
pushMessages({
    'success': [{
        message: "test success message 1", 
        messageCode: "messageCode1",
    }, {
        message: "test success message 2", 
        messageCode: "messageCode3",
    }], 
    'warnings': [{
        message: "test warning message",
        messageCode: "messageCode2",
    }], 
});
```

## Get messages

### Get all the messages
```
getMessages();
```

### Get all the messages for a specific message key
```
getMessages('info');
```

### Get all the messages for a specific message key
```
getMessages('info');
```

### Get all the messages for a list of message keys
```
getMessages(['info', 'warning']);
```

## Get messages count

### Get all the messages count
```
getMessagesCount();
```

### Get the messages count for a specific message key
```
getMessagesCount('info');
```

### Get the messages count for a list of message keys
```
getMessagesCount(['info', 'warnings']);
```


