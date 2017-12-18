import { createMessages } from "../../src/index";

describe('createMessages([...keys]) tests just after initialization', () => {
    let messages;
    const messageTypes = ['success', 'warnings', 'errors'];

    beforeAll(()=>{
        messages = createMessages(messageTypes);
    });

    describe('getMessageKeys() tests', () => {
        test('getMessageKeys() should return the correct messageKeys', () => {
            expect(messages.getMessageKeys()).toEqual(['success', 'warnings', 'errors']);
        });
    });

    describe('hasMessageKeys() tests', () => {
        test('hasMessageKeys() should return true if there are message keys', () => {
            expect(messages.hasMessageKeys()).toBe(true);
        });
        test('hasMessageKeys(\'key1\') should return true if there message key is present', () => {
            expect(messages.hasMessageKeys('warnings')).toBe(true);
        });
        test('hasMessageKeys(\'key1\') should return false if there message key is absent', () => {
            expect(messages.hasMessageKeys('testkeywhichisnotpresent')).toBe(false);
        });
        test('hasMessageKeys([\'key1\', \'key2\']) should return true if all the message keys are present', () => {
            expect(messages.hasMessageKeys(['success', 'warnings'])).toBe(true);
        });
        test('hasMessageKeys([\'key1\', \'key2\'], true) should return the same value as hasMessageKeys([\'key1\', \'key2\']) if all the message keys are present', () => {
            expect(messages.hasMessageKeys(['success', 'warnings'], true)).toBe(messages.hasMessageKeys(['success', 'warnings']));
        });
        test('hasMessageKeys([\'key1\', \'key2\']) should return false if all the message keys are not present', () => {
            expect(messages.hasMessageKeys(['success', 'warnings', 'testkeywhichisnotpresent'])).toBe(false);
        });
        test('hasMessageKeys([\'key1\', \'key2\'], true) should return the same value as hasMessageKeys([\'key1\', \'key2\']) if all the message keys are not present', () => {
            expect(messages.hasMessageKeys(['success', 'warnings', 'testkeywhichisnotpresent'], true)).toBe(messages.hasMessageKeys(['success', 'warnings', 'testkeywhichisnotpresent']));
        });
        test('hasMessageKeys([\'key1\', \'key2\'], false) should return true if any of the message keys are present', () => {
            expect(messages.hasMessageKeys(['success', 'warnings', 'testkeywhichisnotpresent'], false)).toBe(true);
        });
        test('hasMessageKeys([\'key1\', \'key2\'], false) should return false if none of the message keys are present', () => {
            expect(messages.hasMessageKeys(['testkeywhichisnotpresent1', 'testkeywhichisnotpresent2'], false)).toBe(false);
        });
    });

    describe('getMessageKeysCount() tests', () => {
        test('getMessageKeysCount() should return the correct count of message keys', () => {
            expect(messages.getMessageKeysCount()).toBe(3);
        });
    });

    describe('getMessagesCount() tests', () => {
        test('getMessagesCount() should return 0 if there are no messages', () => {
            expect(messages.getMessagesCount()).toBe(0);
        });
        test('getMessagesCount(\'messagekey1\') should return 0 if there are no messages for that key', () => {
            expect(messages.getMessagesCount('success')).toBe(0);
        });
        test('getMessagesCount(\'messagekey1\') should return 0 if the key itself doesn\'t exist', () => {
            expect(messages.getMessagesCount('absentkey')).toBe(0);
        });
        test('getMessagesCount([\'messagekey1\', \'messagekey2\']) should return 0 if there are no messages for those keys', () => {
            expect(messages.getMessagesCount(['success', 'warnings'])).toBe(0);
        });
        test('getMessagesCount([\'messagekey1\', \'messagekey2\']) should return 0 if the keys themselves doesn\'t exist', () => {
            expect(messages.getMessagesCount(['absentkey1', 'absentkey2'])).toBe(0);
        });
    });

    describe('hasMessages() tests', () => {
        test('hasMessages() should return false if there are no messages', () => {
            expect(messages.hasMessages()).toBe(false);
        });
        test('hasMessages(false) should return the same value for hasMessages()', () => {
            expect(messages.hasMessages(false)).toBe(messages.hasMessages());
        });
        test('hasMessages(true) should return false if all the keys doesn\'t have messages', () => {
            expect(messages.hasMessages(true)).toBe(false);
        });
        test('hasMessages(\'messagekey1\') should return false if there are no messages for that key', () => {
            expect(messages.hasMessages('success')).toBe(false);
        });
        test('hasMessages(\'messagekey1\') should return false if the specified key does\'t even exist', () => {
            expect(messages.hasMessages('absentkey')).toBe(false);
        });
        test('hasMessages([\'messagekey1\', \'messagekey2\']) should return false if there are no messages for any of the keys', () => {
            expect(messages.hasMessages(['success', 'warnings'])).toBe(false);
        });
        test('hasMessages([\'messagekey1\', \'messagekey2\'], false) should the same value as hasMessages([\'messagekey1\', \'messagekey2\'])', () => {
            expect(messages.hasMessages(['success', 'warnings'], false)).toBe(false);
        });
        test('hasMessages([\'messagekey1\', \'messagekey2\'], true) should return false if all the keys specified do not have messages', () => {
            expect(messages.hasMessages(['success', 'warnings'], true)).toBe(false);
        });
    });

    describe('getMessages() tests', () => {
        test('getMessage() should return an object with all keys as fields with empty arrays as their values', () => {
            expect(messages.getMessages()).toEqual({
                'success': [],
                'warnings': [],
                'errors': [],
            });
        });
        test('getMessage(\'somekey\') should return an empty array if there are no messages for that key if key exists', () => {
            expect(messages.getMessages('success')).toEqual([]);
        });
        test('getMessage(\'somekey\') should return an empty array if the key doesn\'t exist', () => {
            expect(messages.getMessages('success')).toEqual([]);
        });
    });
});

describe('createMessages({key: [...values]}) tests for initialization along with creation', () => {
    let messages;
    const  initialMessages = {
        'success': [{message: "test success message"}], 
        'warnings': [{message: "test warning message"}], 
        'errors': [{message: "test error message"}],
        'info': [],
    };

    beforeAll(()=>{
        messages = createMessages(initialMessages);
    });

    describe('getMessageKeys() tests', () => {
        test('getMessageKeys() should return the correct messageKeys', () => {
            expect(messages.getMessageKeys()).toEqual(['success', 'warnings', 'errors', 'info']);
        });
    });

    describe('hasMessageKeys() tests', () => {
        test('hasMessageKeys() should return true if there are message keys', () => {
            expect(messages.hasMessageKeys()).toBe(true);
        });
        test('hasMessageKeys(\'key1\') should return true if the message key is present', () => {
            expect(messages.hasMessageKeys('warnings')).toBe(true);
        });
        test('hasMessageKeys(\'key1\') should return false if there message key is absent', () => {
            expect(messages.hasMessageKeys('testkeywhichisnotpresent')).toBe(false);
        });
        test('hasMessageKeys([\'key1\', \'key2\']) should return true if all the message keys are present', () => {
            expect(messages.hasMessageKeys(['success', 'warnings'])).toBe(true);
        });
        test('hasMessageKeys([\'key1\', \'key2\'], true) should return the same value as hasMessageKeys([\'key1\', \'key2\']) if all the message keys are present', () => {
            expect(messages.hasMessageKeys(['success', 'warnings'], true)).toBe(messages.hasMessageKeys(['success', 'warnings']));
        });
        test('hasMessageKeys([\'key1\', \'key2\']) should return false if all the message keys are not present', () => {
            expect(messages.hasMessageKeys(['success', 'warnings', 'testkeywhichisnotpresent'])).toBe(false);
        });
        test('hasMessageKeys([\'key1\', \'key2\'], true) should return the same value as hasMessageKeys([\'key1\', \'key2\']) if all the message keys are not present', () => {
            expect(messages.hasMessageKeys(['success', 'warnings', 'testkeywhichisnotpresent'], true)).toBe(messages.hasMessageKeys(['success', 'warnings', 'testkeywhichisnotpresent']));
        });
        test('hasMessageKeys([\'key1\', \'key2\'], false) should return true if any of the message keys are present', () => {
            expect(messages.hasMessageKeys(['success', 'warnings', 'testkeywhichisnotpresent'], false)).toBe(true);
        });
        test('hasMessageKeys([\'key1\', \'key2\'], false) should return false if none of the message keys are present', () => {
            expect(messages.hasMessageKeys(['testkeywhichisnotpresent1', 'testkeywhichisnotpresent2'], false)).toBe(false);
        });
    });

    describe('getMessageKeysCount() tests', () => {
        test('getMessageKeysCount() should return the correct count of message keys', () => {
            expect(messages.getMessageKeysCount()).toBe(4);
        });
    });

    describe('getMessagesCount() tests', () => {
        test('getMessagesCount() should return the correct number of total messages if there are messages', () => {
            expect(messages.getMessagesCount()).toBe(3);
        });
        test('getMessagesCount(\'messagekey\') should return correct count if there are messages for that key', () => {
            expect(messages.getMessagesCount('success')).toBe(1);
        });
        test('getMessagesCount(\'messagekey1\') should return 0 if there are no messages for that key', () => {
            expect(messages.getMessagesCount('info')).toBe(0);
        });
        test('getMessagesCount(\'messagekey1\') should return 0 if the key itself doesn\'t exist', () => {
            expect(messages.getMessagesCount('absentkey')).toBe(0);
        });
        test('getMessagesCount([\'messagekey1\', \'messagekey2\']) should return 0 if there are no messages for those keys', () => {
            expect(messages.getMessagesCount(['info'])).toBe(0);
        });
        test('getMessagesCount([\'messagekey1\', \'messagekey2\']) should return 0 if the keys themselves doesn\'t exist', () => {
            expect(messages.getMessagesCount(['absentkey1', 'absentkey2'])).toBe(0);
        });
    });

    describe('hasMessages() tests', () =>  {
        test('hasMessages() should return true if there are messages', () => {
            expect(messages.hasMessages()).toBe(true);
        });
        test('hasMessages(false) should return the same value for hasMessages()', () => {
            expect(messages.hasMessages(false)).toBe(messages.hasMessages());
        });
        test('hasMessages(true) should return false if all the keys doesn\'t have messages', () => {
            expect(messages.hasMessages(true)).toBe(false);
        });
        test('hasMessages(\'messagekey1\') should return true if there are messages for that key', () => {
            expect(messages.hasMessages('success')).toBe(true);
        });
        test('hasMessages(\'messagekey1\') should return false if there are no messages for that key', () => {
            expect(messages.hasMessages('info')).toBe(false);
        });
        test('hasMessages(\'messagekey1\') should return false if the specified key does\'t even exist', () => {
            expect(messages.hasMessages('absentkey')).toBe(false);
        });
        test('hasMessages([\'messagekey1\', \'messagekey2\']) should return true if there are messages for at least any one of the keys', () => {
            expect(messages.hasMessages(['info', 'success'])).toBe(true);
        });
        test('hasMessages([\'messagekey1\', \'messagekey2\'], false) should the same value as hasMessages([\'messagekey1\', \'messagekey2\'])', () => {
            expect(messages.hasMessages(['info', 'success'], false)).toBe(true);
        });
        test('hasMessages([\'messagekey1\', \'messagekey2\'], true) should return true if all the keys specified have messages', () => {
            expect(messages.hasMessages(['info', 'warnings'], true)).toBe(false);
        });
        test('hasMessages([\'messagekey1\', \'messagekey2\'], true) should return false if all the keys specified do not have messages', () => {
            expect(messages.hasMessages(['info', 'warnings'], true)).toBe(false);
        });
    });

    describe('getMessages() tests', () => {
        test('getMessage() should return an object with all keys as fields with empty arrays as their values', () => {
            expect(messages.getMessages()).toEqual({
                'success': [{message: "test success message"}], 
                'warnings': [{message: "test warning message"}], 
                'errors': [{message: "test error message"}],
                'info': [],
            });
        });
        test('getMessage(\'somekey\') should return an correct value if there are messages for that key ', () => {
            expect(messages.getMessages('success')).toEqual([{message: "test success message"}]);
        });
        test('getMessage(\'somekey\') should return an empty array if there are no messages for that key if key exists', () => {
            expect(messages.getMessages('info')).toEqual([]);
        });
        test('getMessage(\'somekey\') should return an empty array if the key doesn\'t exist', () => {
            expect(messages.getMessages('absentKey')).toEqual([]);
        });
    });

});
