
export const vuiIntelliSense = editor => {
    if (!editor) {
        console.log('vuiIntelliSense: 必须提供 monaco-editor 示例.')
        return;
    }

    monaco.languages.registerHoverProvider("html", {
        provideHover: hoverHandler
    });

    // triggerCharacters: [" ", "<", "=", "\""],
    monaco.languages.registerCompletionItemProvider("html", {
        triggerCharacters: ["<", "=", "\""],
        provideCompletionItems: autoCompleteHandler
    });

    function autoCompleteHandler(model, position) {
        return [{
            label: "123",
            kind: monaco.languages.CompletionItemKind.Keyword,
            documentation: '123',
            insertText: {
                value: '123 456789'
            }
        }]
    }

    function hoverHandler(model, position) {
        var title='titltlt123456'
        var value ='valualaula'
        return {
            contents: [
                { value: `**${title}**`},
                {
                    value: '```html\n' + value + "\n\n更多详细：Shift + F1" + '\n```'
                }
            ]
        };
    }
}
/*********** vui ******** */

/************************ */

/*********** hover ******** */

/************************ */