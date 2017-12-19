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

### Check whether a single message key exists
```
hasMessageKeys('info');
```

### Check whether at least one of the message keys in the list exists
```
hasMessageKeys(['info', 'warning']);
```
OR
```
hasMessageKeys(['info', 'warning'], false);
```
The default value of second parameter is false.

### Check whether all of the message keys provided exists
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

### Check if at least one message exists all the existing message keys
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