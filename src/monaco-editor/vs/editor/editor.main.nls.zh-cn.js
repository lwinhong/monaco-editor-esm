/*!-----------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.14.6(6c8f02b41db9ae5c4d15df767d47755e5c73b9d5)
 * Released under the MIT license
 * https://github.com/Microsoft/vscode/blob/master/LICENSE.txt
 *-----------------------------------------------------------*/

define("vs/editor/editor.main.nls.zh-cn", {
	"vs/base/browser/ui/actionbar/actionbar": [
		"{0} ({1})",
	],
	"vs/base/browser/ui/aria/aria": [
		"{0} (已再次发生)",
		"{0} (occurred {1} times)",
	],
	"vs/base/browser/ui/findinput/findInput": [
		"输入",
	],
	"vs/base/browser/ui/findinput/findInputCheckboxes": [
		"区分大小写",
		"全字匹配",
		"使用正则表达式",
	],
	"vs/base/browser/ui/inputbox/inputBox": [
		"错误: {0}",
		"警告: {0}",
		"信息: {0}",
	],
	"vs/base/browser/ui/list/listWidget": [
		"{0}. Use the navigation keys to navigate.",
	],
	"vs/base/browser/ui/menu/menu": [
		"{0} ({1})",
	],
	"vs/base/common/keybindingLabels": [
		"Ctrl",
		"Shift",
		"Alt",
		"Windows",
		"Ctrl",
		"Shift",
		"Alt",
		"Super",
		"Control",
		"Shift",
		"Alt",
		"Command",
		"Control",
		"Shift",
		"Alt",
		"Windows",
		"Control",
		"Shift",
		"Alt",
		"Super",
	],
	"vs/base/common/severity": [
		"错误",
		"警告",
		"信息",
	],
	"vs/base/parts/quickopen/browser/quickOpenModel": [
		"{0}，选取器",
		"选取器",
	],
	"vs/base/parts/quickopen/browser/quickOpenWidget": [
		"快速选取器。键入以缩小结果范围。",
		"快速选取器",
		"{0} Results",
	],
	"vs/editor/browser/controller/coreCommands": [
		"&&Select All",
		"&&Undo",
		"&&Redo",
	],
	"vs/editor/browser/widget/codeEditorWidget": [
		"光标数量被限制为 {0}。",
	],
	"vs/editor/browser/widget/diffEditorWidget": [
		"文件过大，无法比较。",
	],
	"vs/editor/browser/widget/diffReview": [
		"关闭",
		"无内容",
		"1 行",
		"{0} 行",
		"差异 {0}，总共 {1}: 原始，{2}，{3}；改后，{4}，{5}",
		"空白",
		"未修改 {0}，已修改 {1}: {2}",
		"+ 已修改 {0}: {1}",
		"- 未修改 {0}: {1} ",
		"转至下一个差异",
		"转至上一个差异",
	],
	"vs/editor/common/config/commonEditorConfig": [
		"编辑器",
		"控制字体系列。",
		"控制字体粗细。",
		"以像素为单位控制字号。",
		"控制行高。使用 0 通过字号计算行高。",
		"以像素为单位控制字符间距。",
		"不显示行号。",
		"将行号显示为绝对行数。",
		"将行号显示为与光标相隔的行数。",
		"每 10 行显示一次行号。",
		"控制行号的显示。",
		"在一定数量的等宽字符后显示垂直标尺。输入多个值，显示多个标尺。若数组为空，则不绘制标尺。",
		"执行文字相关的导航或操作时将用作文字分隔符的字符",
		"一个制表符等于的空格数。该设置在 \"editor.detectIndentation\" 启用时根据文件内容可能会被覆盖。",
		"应为“number”。注意，值“auto”已由“editor.detectIndentation”设置替换。",
		"按 Tab 键时插入空格。该设置在 \"editor.detectIndentation\" 启用时根据文件内容可能会被覆盖。",
		"应为 \"boolean\"。注意，值 \"auto\" 已由 \"editor.detectIndentation\" 设置替换。",
		"当打开文件时，将基于文件内容检测 \"editor.tabSize\" 和 \"editor.insertSpaces\"。",
		"控制选取范围是否有圆角",
		"控制编辑器是否可以滚动到最后一行之后",
		"控制编辑器水平滚动时可以超出滚动的字符数",
		"控制编辑器是否在滚动时使用动画",
		"控制是否显示 minimap",
		"控制在哪一侧显示小地图。",
		"控制是否自动隐藏小地图滑块。",
		"呈现某行上的实际字符(与颜色块相反)",
		"限制最小映射的宽度，尽量多地呈现特定数量的列",
		"Controls whether the hover is shown.",
		"Time delay in milliseconds after which to the hover is shown.",
		"Controls whether the hover should remain visible when mouse is moved over it.",
		"控制是否将编辑器的选中内容作为搜索词填入到查找组件",
		"控制当编辑器中选中多个字符或多行文字时是否开启“在选定内容中查找”选项 ",
		"控制“查找”小组件是否读取或修改 macOS 的共享查找剪贴板",
		"永不换行。",
		"将在视区宽度处换行。",
		"将在 \"editor.wordWrapColumn\" 处换行。",
		"将在最小视区和 \"editor.wordWrapColumn\" 处换行。",
		"控制折行方式。可以选择:\n - \"off\" (禁用折行)，\n - \"on\" (根据视区宽度折行)，\n - \"wordWrapColumn\" (在 \"editor.wordWrapColumn\" 处换行)\n - \"bounded\" (在视区宽度和 \"editor.wordWrapColumn\" 两者的较小者处换行)。",
		"在 \"editor.wordWrap\" 为 \"wordWrapColumn\" 或 \"bounded\" 时控制编辑器列的换行。",
		"No indentation. Wrapped lines begin at column 1.",
		"Wrapped lines get the same indentation as the parent.",
		"Wrapped lines get +1 indentation toward the parent.",
		"Wrapped lines get +2 indentation toward the parent.",
		"控制折行的缩进。可为 \"none\"、\"same\" 或 \"indent\" 或 \"deepIndent\"。",
		"要对鼠标滚轮滚动事件的 \"deltaX\" 和 \"deltaY\" 使用的乘数 ",
		"映射为 \"Ctrl\" (Windows 和 Linux) 或 \"Command\" (macOS)",
		"映射为 \"Alt\" (Windows 和 Linux) 或 \"Option\" (macOS)",
		"在通过鼠标添加多个光标时使用的修改键。\"ctrlCmd\" 会映射为 \"Ctrl\" (Windows 和 Linux) 或 \"Command\" (macOS)。“转到定义”和“打开链接”功能所需的鼠标动作将会相应调整，不与多光标修改键冲突。",
		"当多个光标重叠时进行合并。",
		"在字符串内启用快速建议。",
		"在注释内启用快速建议。",
		"在字符串和注释外启用快速建议。",
		"控制键入时是否应自动显示建议",
		"控制延迟多少毫秒后将显示快速建议",
		"启用在输入时显示含有参数文档和类型信息的小面板",
		"控制编辑器是否应该在左括号后自动插入右括号",
		"控制编辑器是否应在键入后自动设置行的格式",
		"控制编辑器是否应自动设置粘贴内容的格式。格式化程序必须可用并且能设置文档中某一范围的格式。",
		"控制编辑器是否在用户键入、粘贴或移动行时自动调整缩进。语言的缩进规则必须可用。",
		"控制键入触发器字符时是否应自动显示建议",
		"Only accept a suggestion with `Enter` when it makes a textual change.",
		"控制按下 \"Enter\" 键是否像 \"Tab\" 键一样接受建议。这能减少“插入新行”和“接受建议”命令之间的歧义。若此项的值为 \"smart\"，则仅在文字改变时，\"Enter\" 键才能接受建议",
		"控制是否应在遇到提交字符时接受建议。例如，在 JavaScript 中，分号(\";\")可以为提交字符，可接受建议并键入该字符。",
		"在其他建议上方显示代码片段建议。",
		"在其他建议下方显示代码片段建议。",
		"在其他建议中穿插显示代码片段建议。",
		"不显示代码片段建议。",
		"控制是否将代码段与其他建议一起显示以及它们的排序方式。",
		"控制没有选择内容的复制是否复制当前行。",
		"控制是否根据文档中的文字计算自动完成列表。",
		"始终选择第一个建议。",
		"选择最近的建议，除非进一步键入选择其他。例如 \"console. -> console.log\"，因为最近补全过 \'log\' 。",
		"根据之前补全过建议的前缀选择建议。例如，\"co -> console\"、\"con -> const\"。",
		"控制在建议列表中如何预先选择建议。",
		"建议小组件的字号",
		"建议小组件的行高",
		"Controls whether filtering and sorting suggestions accounts for small typos.",
		"Control whether an active snippet prevents quick suggestions.",
		"控制编辑器是否应突出显示选项的近似匹配",
		"控制编辑器是否应该突出显示语义符号次数",
		"控制可在概述标尺同一位置显示的效果数量",
		"控制概述标尺周围是否要绘制边框。",
		"控制光标的动画样式。",
		"按住 Ctrl 键并滚动鼠标滚轮可缩放编辑器字体大小",
		"控制光标样式，接受的值为 \"block\"、\"block-outline\"、\"line\"、\"line-thin\" 、\"underline\" 和 \"underline-thin\"",
		"当 editor.cursorStyle 设置为 \"line\" 时控制光标的宽度。",
		"启用字体连字",
		"控制光标是否应隐藏在概述标尺中。",
		"Render whitespace characters except for single spaces between words.",
		"控制编辑器在空白字符上显示特殊符号的方式。可选值为 \"none\"(无)、\"boundary\"(边界) 或 \"all\"(所有)。选择 \"boundary\" 选项，则不会在单词之间的单个空格上显示特殊符号。",
		"控制编辑器是否应呈现控制字符",
		"控制编辑器是否应呈现缩进参考线",
		"Controls whether the editor should highlight the active indent guide.",
		"Highlights both the gutter and the current line.",
		"控制编辑器应如何呈现当前行突出显示，可能为“无”、“装订线”、“线”和“全部”。",
		"控制是否在编辑器中显示 CodeLens",
		"控制编辑器是否启用代码折叠功能",
		"控制折叠范围的计算方式。\"auto\" 将使用语言特定的折叠策略 (若可用)。\"indentation\" 将强制使用基于缩进的折叠策略。",
		"控制是否自动隐藏导航线上的折叠控件。",
		"当选择其中一项时，将突出显示匹配的括号。",
		"控制编辑器是否应呈现垂直字形边距。字形边距最常用于调试。",
		"在制表位后插入和删除空格",
		"删除尾随自动插入的空格",
		"即使在双击编辑器内容或按 Esc 键时，也要保持速览编辑器的打开状态。",
		"控制编辑器是否应该允许通过拖放移动所选项。",
		"编辑器将使用平台 API 以检测是否附加了屏幕阅读器。",
		"编辑器将对屏幕阅读器的使用进行永久优化。",
		"编辑器将不再对屏幕阅读器的使用进行优化。",
		"控制编辑器是否应运行在对屏幕阅读器进行优化的模式。",
		"Controls fading out of unused code.",
		"控制编辑器是否应检测链接并使它们可被点击",
		"控制编辑器是否显示内联颜色修饰器和颜色选取器。",
		"启用代码操作小灯泡提示",
		"是否在保存时整理 import 语句?",
		"在保存时运行的代码操作类型。",
		"在保存时运行的代码操作的超时时间。",
		"控制是否支持 Linux 主剪贴板。",
		"控制 Diff 编辑器以并排或内联形式显示差异",
		"控制差异编辑器是否将对前导空格或尾随空格的更改显示为差异",
		"对大型文件进行特殊处理，禁用某些内存密集型功能。",
		"控制差异编辑器是否为已添加/删除的更改显示 +/- 指示符号",
	],
	"vs/editor/common/config/editorOptions": [
		"现在无法访问编辑器。按 Alt+F1  显示选项。",
		"编辑器内容",
	],
	"vs/editor/common/controller/cursor": [
		"执行命令时出现意外异常。",
	],
	"vs/editor/common/modes/modesRegistry": [
		"纯文本",
	],
	"vs/editor/common/services/modelServiceImpl": [
		"[{0}]\n{1}",
		"[{0}] {1}",
	],
	"vs/editor/common/view/editorColorRegistry": [
		"光标所在行高亮内容的背景颜色。",
		"光标所在行四周边框的背景颜色。",
		"高亮范围的背景色，像是由 \"Quick Open\" 和“查找”功能高亮的范围。颜色必须透明，使其不会挡住下方的其他元素。",
		"高亮区域边框的背景颜色。",
		"编辑器光标颜色。",
		"编辑器光标的背景色。可以自定义块型光标覆盖字符的颜色。",
		"编辑器中空白字符的颜色。",
		"编辑器缩进参考线的颜色。",
		"编辑器活动缩进参考线的颜色。",
		"编辑器行号的颜色。",
		"编辑器活动行号的颜色",
		"\"Id\" 已被弃用，请改用 \"editorLineNumber.activeForeground\"。",
		"编辑器活动行号的颜色",
		"编辑器标尺的颜色。",
		"编辑器 CodeLens 的前景色",
		"匹配括号的背景色",
		"匹配括号外框的颜色",
		"概览标尺边框的颜色。",
		"编辑器导航线的背景色。导航线包括边缘符号和行号。",
		"编辑器中错误波浪线的前景色。",
		"编辑器中错误波浪线的边框颜色。",
		"编辑器中警告波浪线的前景色。",
		"编辑器中警告波浪线的边框颜色。",
		"编辑器中信息波浪线的前景色。",
		"编辑器中信息波浪线的边框颜色。",
		"编辑器中提示波浪线的前景色。",
		"编辑器中提示波浪线的边框颜色。",
		"Border of unnecessary code in the editor.",
		"Opacity of unnecessary code in the editor.",
		"概述错误的标尺标记颜色。",
		"概述警告的标尺标记颜色。",
		"概述信息的标尺标记颜色。",
	],
	"vs/editor/contrib/bracketMatching/bracketMatching": [
		"概览标尺上表示匹配括号的标记颜色。",
		"转到括号",
		"选择括号所有内容",
	],
	"vs/editor/contrib/caretOperations/caretOperations": [
		"将插入点左移",
		"将插入点右移",
	],
	"vs/editor/contrib/caretOperations/transpose": [
		"转置字母",
	],
	"vs/editor/contrib/clipboard/clipboard": [
		"剪切",
		"Cu&&t",
		"复制",
		"&&Copy",
		"粘贴",
		"&&Paste",
		"复制并突出显示语法",
	],
	"vs/editor/contrib/codeAction/codeActionCommands": [
		"显示修补程序({0})",
		"显示修补程序",
		"快速修复...",
		"没有可用的代码操作",
		"没有可用的代码操作",
		"重构...",
		"没有可用的重构操作",
		"源代码操作...",
		"没有可用的源代码操作",
		"整理 import 语句",
		"没有可用的整理 import 语句操作",
	],
	"vs/editor/contrib/comment/comment": [
		"切换行注释",
		"&&Toggle Line Comment",
		"添加行注释",
		"删除行注释",
		"切换块注释",
		"Toggle &&Block Comment",
	],
	"vs/editor/contrib/contextmenu/contextmenu": [
		"显示编辑器上下文菜单",
	],
	"vs/editor/contrib/cursorUndo/cursorUndo": [
		"光标回撤",
	],
	"vs/editor/contrib/find/findController": [
		"查找",
		"&&Find",
		"查找选定内容",
		"查找下一个",
		"查找上一个",
		"查找下一个选择",
		"查找上一个选择",
		"替换",
		"&&Replace",
	],
	"vs/editor/contrib/find/findWidget": [
		"查找",
		"查找",
		"上一个匹配",
		"下一个匹配",
		"在选定内容中查找",
		"关闭",
		"替换",
		"替换",
		"替换",
		"全部替换",
		"切换替换模式",
		"仅高亮了前 {0} 个结果，但所有查找操作均针对全文。",
		"{0} / {1}",
		"无结果",
	],
	"vs/editor/contrib/folding/folding": [
		"展开",
		"以递归方式展开",
		"折叠",
		"以递归方式折叠",
		"折叠所有块注释",
		"折叠所有区域",
		"展开所有区域",
		"全部折叠",
		"全部展开",
		"折叠级别 {0}",
	],
	"vs/editor/contrib/fontZoom/fontZoom": [
		"放大编辑器字体",
		"缩小编辑器字体",
		"重置编辑器字体大小",
	],
	"vs/editor/contrib/format/formatActions": [
		"在第 {0} 行进行了 1 次格式编辑",
		"在第 {1} 行进行了 {0} 次格式编辑",
		"第 {0} 行到第 {1} 行间进行了 1 次格式编辑",
		"第 {1} 行到第 {2} 行间进行了 {0} 次格式编辑",
		"当前没有安装“{0}”文件的格式化程序。",
		"格式化文件",
		"当前没有安装“{0}”文件的文档格式化程序。",
		"格式化选定代码",
		"当前没有安装“{0}”文件的选定项格式化程序。",
	],
	"vs/editor/contrib/goToDefinition/goToDefinitionCommands": [
		"未找到“{0}”的任何定义",
		"找不到定义",
		" – {0} 定义",
		"转到定义",
		"打开侧边的定义",
		"速览定义",
		"未找到“{0}”的实现",
		"未找到实现",
		"– {0} 个实现",
		"转到实现",
		"速览实现",
		"未找到“{0}”的类型定义",
		"未找到类型定义",
		" – {0} 个类型定义",
		"转到类型定义",
		"速览类型定义",
	],
	"vs/editor/contrib/goToDefinition/goToDefinitionMouse": [
		"单击显示 {0} 个定义。",
	],
	"vs/editor/contrib/gotoError/gotoError": [
		"转到下一个问题 (错误、警告、信息)",
		"转到上一个问题 (错误、警告、信息)",
		"转到文件中的下一个问题 (错误、警告、信息)",
		"转到文件中的上一个问题 (错误、警告、信息)",
	],
	"vs/editor/contrib/gotoError/gotoErrorWidget": [
		"({0}/{1})",
		"编辑器标记导航小组件错误颜色。",
		"编辑器标记导航小组件警告颜色。",
		"编辑器标记导航小组件信息颜色。",
		"编辑器标记导航小组件背景色。",
	],
	"vs/editor/contrib/hover/hover": [
		"显示悬停",
	],
	"vs/editor/contrib/hover/modesContentHover": [
		"正在加载...",
	],
	"vs/editor/contrib/inPlaceReplace/inPlaceReplace": [
		"替换为上一个值",
		"替换为下一个值",
	],
	"vs/editor/contrib/linesOperations/linesOperations": [
		"向上复制行",
		"&&Copy Line Up",
		"向下复制行",
		"Co&&py Line Down",
		"向上移动行",
		"Mo&&ve Line Up",
		"向下移动行",
		"Move &&Line Down",
		"按升序排列行",
		"按降序排列行",
		"裁剪尾随空格",
		"删除行",
		"行缩进",
		"行减少缩进",
		"在上面插入行",
		"在下面插入行",
		"删除左侧所有内容",
		"删除右侧所有内容",
		"合并行",
		"转置游标处的字符",
		"转换为大写",
		"转换为小写",
	],
	"vs/editor/contrib/links/links": [
		"按住 Cmd 并单击可访问链接",
		"按住 Ctrl 并单击可访问链接",
		"Cmd + 单击以执行命令",
		"Ctrl + 单击以执行命令",
		"按住 Option 并单击可访问链接",
		"按住 Alt 并单击可访问链接",
		"按住 Option 并单击可执行命令",
		"Alt + 单击以执行命令",
		"此链接格式不正确，无法打开: {0}",
		"此链接目标已丢失，无法打开。",
		"打开链接",
	],
	"vs/editor/contrib/message/messageController": [
		"无法在只读编辑器中编辑",
	],
	"vs/editor/contrib/multicursor/multicursor": [
		"在上面添加光标",
		"&&Add Cursor Above",
		"在下面添加光标",
		"A&&dd Cursor Below",
		"在行尾添加光标",
		"Add C&&ursors to Line Ends",
		"将选择添加到下一个查找匹配项",
		"Add &&Next Occurrence",
		"将选择内容添加到上一查找匹配项",
		"Add P&&revious Occurrence",
		"将上次选择移动到下一个查找匹配项",
		"将上个选择内容移动到上一查找匹配项",
		"选择所有找到的查找匹配项",
		"Select All &&Occurrences",
		"更改所有匹配项",
	],
	"vs/editor/contrib/parameterHints/parameterHints": [
		"触发参数提示",
	],
	"vs/editor/contrib/parameterHints/parameterHintsWidget": [
		"{0}，提示",
	],
	"vs/editor/contrib/referenceSearch/peekViewWidget": [
		"关闭",
	],
	"vs/editor/contrib/referenceSearch/referenceSearch": [
		" – {0} 个引用",
		"查找所有引用",
	],
	"vs/editor/contrib/referenceSearch/referencesController": [
		"正在加载...",
	],
	"vs/editor/contrib/referenceSearch/referencesModel": [
		"在文件 {0} 的 {1} 行 {2} 列的符号",
		"{0}  中有 1 个符号，完整路径：{1}",
		"{1} 中有 {0} 个符号，完整路径：{2}",
		"未找到结果",
		"在 {0} 中找到 1 个符号",
		"在 {1} 中找到 {0} 个符号",
		"在 {1} 个文件中找到 {0} 个符号",
	],
	"vs/editor/contrib/referenceSearch/referencesWidget": [
		"解析文件失败。",
		"{0} 个引用",
		"{0} 个引用",
		"无可用预览",
		"引用",
		"无结果",
		"引用",
		"速览视图标题区域背景颜色。",
		"速览视图标题颜色。",
		"速览视图标题信息颜色。",
		"速览视图边框和箭头颜色。",
		"速览视图结果列表背景颜色。",
		"速览视图结果列表中行节点的前景色。",
		"速览视图结果列表中文件节点的前景色。",
		"速览视图结果列表中所选条目的背景颜色。",
		"速览视图结果列表中所选条目的前景色。",
		"速览视图编辑器背景颜色。",
		"速览视图编辑器中导航线的背景颜色。",
		"在速览视图结果列表中匹配突出显示颜色。",
		"在速览视图编辑器中匹配突出显示颜色。",
		"在速览视图编辑器中匹配项的突出显示边框。",
	],
	"vs/editor/contrib/rename/rename": [
		"无结果。",
		"成功将“{0}”重命名为“{1}”。摘要：{2}",
		"无法进行重命名。",
		"重命名符号",
	],
	"vs/editor/contrib/rename/renameInputField": [
		"重命名输入。键入新名称并按 \"Enter\" 提交。",
	],
	"vs/editor/contrib/smartSelect/smartSelect": [
		"扩大选择",
		"&&Expand Selection",
		"缩小选择",
		"&&Shrink Selection",
	],
	"vs/editor/contrib/snippet/snippetVariables": [
		"星期日",
		"星期一",
		"星期二",
		"星期三",
		"星期四",
		"星期五",
		"星期六",
		"周日",
		"周一",
		"周二",
		"周三",
		"周四",
		"周五",
		"周六",
		"一月",
		"二月",
		"三月",
		"四月",
		"五月",
		"六月",
		"七月",
		"八月",
		"九月",
		"十月",
		"十一月",
		"十二月",
		"1月",
		"2月",
		"3月",
		"4月",
		"5月",
		"6月",
		"7月",
		"8月",
		"9月",
		"10月",
		"11月",
		"12月",
	],
	"vs/editor/contrib/suggest/suggestController": [
		"确认“{0}”插入以下文本：{1}",
		"触发建议",
	],
	"vs/editor/contrib/suggest/suggestWidget": [
		"建议小组件的背景颜色",
		"建议小组件的边框颜色",
		"建议小组件的前景颜色。",
		"建议小组件中被选择条目的背景颜色。",
		"建议小组件中匹配内容的高亮颜色。",
		"阅读详细信息...{0}",
		"{0}(建议)具有详细信息",
		"{0}，建议",
		"阅读简略信息...{0}",
		"正在加载...",
		"无建议。",
		"{0}，已接受",
		"{0}(建议)具有详细信息",
		"{0}，建议",
	],
	"vs/editor/contrib/toggleTabFocusMode/toggleTabFocusMode": [
		"切换 Tab 键是否移动焦点",
	],
	"vs/editor/contrib/wordHighlighter/wordHighlighter": [
		"符号在进行读取访问操作时的背景颜色，例如读取变量时。颜色必须透明，使其不会挡住下方的其他元素。",
		"符号在进行写入访问操作时的背景颜色，例如写入变量时。颜色必须透明，使其不会挡住下方的其他元素。",
		"符号在进行读取访问操作时的边框颜色，例如读取变量。",
		"符号在进行写入访问操作时的边框颜色，例如写入变量。",
		"概览标尺中符号高亮的标记颜色。颜色必须透明，使其不会挡住下方的其他元素。",
		"概览标尺中写入访问符号高亮的标记颜色。颜色必须透明，使其不会挡住下方的其他元素。",
		"转到下一个突出显示的符号",
		"转到上一个突出显示的符号",
	],
	"vs/editor/standalone/browser/accessibilityHelp/accessibilityHelp": [
		"No selection",
		"Line {0}, Column {1} ({2} selected)",
		"Line {0}, Column {1}",
		"{0} selections ({1} characters selected)",
		"{0} selections",
		"Now changing the setting `accessibilitySupport` to \'on\'.",
		"Now opening the Editor Accessibility documentation page.",
		" in a read-only pane of a diff editor.",
		" in a pane of a diff editor.",
		" in a read-only code editor",
		" in a code editor",
		"To configure the editor to be optimized for usage with a Screen Reader press Command+E now.",
		"To configure the editor to be optimized for usage with a Screen Reader press Control+E now.",
		"The editor is configured to be optimized for usage with a Screen Reader.",
		"The editor is configured to never be optimized for usage with a Screen Reader, which is not the case at this time.",
		"Pressing Tab in the current editor will move focus to the next focusable element. Toggle this behavior by pressing {0}.",
		"Pressing Tab in the current editor will move focus to the next focusable element. The command {0} is currently not triggerable by a keybinding.",
		"Pressing Tab in the current editor will insert the tab character. Toggle this behavior by pressing {0}.",
		"Pressing Tab in the current editor will insert the tab character. The command {0} is currently not triggerable by a keybinding.",
		"Press Command+H now to open a browser window with more information related to editor accessibility.",
		"Press Control+H now to open a browser window with more information related to editor accessibility.",
		"You can dismiss this tooltip and return to the editor by pressing Escape or Shift+Escape.",
		"显示辅助帮助",
	],
	"vs/editor/standalone/browser/inspectTokens/inspectTokens": [
		"开发者：检查标识",
	],
	"vs/editor/standalone/browser/quickOpen/gotoLine": [
		"Go to line {0} and character {1}",
		"转到行 {0}",
		"输入一个在 1 到 {0} 的数字来转跳",
		"Type a character between 1 and {0} to navigate to",
		"转到行{0}",
		"Type a line number, followed by an optional colon and a character number to navigate to",
		"转到行...",
	],
	"vs/editor/standalone/browser/quickOpen/quickCommand": [
		"{0}, commands",
		"输入一个你要执行的命令名称",
		"命令面板",
	],
	"vs/editor/standalone/browser/quickOpen/quickOutline": [
		"{0}, symbols",
		"输入你想要转跳的定义",
		"转到类型定义...",
		"symbols ({0})",
		"模块 ({0})",
		"类 ({0})",
		"接口 ({0})",
		"方法 ({0})",
		"函数 ({0})",
		"属性 ({0})",
		"变量 ({0})",
		"变量 ({0})",
		"构造方法 ({0})",
		"回调 ({0})",
	],
	"vs/editor/standalone/browser/simpleServices": [
		"Made {0} edits in {1} files",
	],
	"vs/editor/standalone/browser/standaloneCodeEditor": [
		"Editor content",
		"Press Ctrl+F1 for Accessibility Options.",
		"Press Alt+F1 for Accessibility Options.",
	],
	"vs/editor/standalone/browser/toggleHighContrast/toggleHighContrast": [
		"切换高对比度主题",
	],
	"vs/platform/configuration/common/configurationRegistry": [
		"默认配置替代",
		"针对 {0} 语言，配置替代编辑器设置。",
		"针对某种语言，配置替代编辑器设置。",
		"无法注册“{0}”。其符合描述特定语言编辑器设置的表达式 \"\\\\[.*\\\\]$\"。请使用 \"configurationDefaults\"。",
		"无法注册“{0}”。此属性已注册。",
	],
	"vs/platform/keybinding/common/abstractKeybindingService": [
		"已按下({0})。正在等待同时按下第二个键...",
		"组合键({0}, {1})不是命令。",
	],
	"vs/platform/list/browser/listService": [
		"工作台",
		"映射为 \"Ctrl\" (Windows 和 Linux) 或 \"Command\" (macOS)",
		"映射为 \"Alt\" (Windows 和 Linux) 或 \"Option\" (macOS)",
		"在通过鼠标多选树和列表条目时使用的修改键 (例如资源管理器、打开的编辑器和源代码管理视图)。\"ctrlCmd\" 在 Windows 和 Linux 上会映射为 \"Ctrl\" ，在 macOS 上会映射为 \"Command\" 。“在侧边打开”功能所需的鼠标动作 (若可用) 将会相应调整，不与多选修改键冲突。",
		"控制如何在受支持的树和列表中使用鼠标来打开项目。设置为 \"singleClick\" 可单击打开项目，\"doubleClick\" 仅可双击打开项目。对于树中含子节点的节点，此设置将控制使用单击还是双击来展开他们。注意，某些不适用此项的树或列表可能会忽略此设置。",
		"控制工作台中的树控件是否支持水平滚动。",
	],
	"vs/platform/markers/common/markers": [
		"错误",
		"警告",
		"信息",
	],
	"vs/platform/theme/common/colorRegistry": [
		"工作台中使用的颜色。",
		"整体前景色。此颜色仅在不被组件覆盖时适用。",
		"错误信息的整体前景色。此颜色仅在不被组件覆盖时适用。",
		"焦点元素的整体边框颜色。此颜色仅在不被其他组件覆盖时适用。",
		"在元素周围额外的一层边框，用来提高对比度从而区别其他元素。",
		"在活动元素周围额外的一层边框，用来提高对比度从而区别其他元素。",
		"文本中链接的前景色。",
		"文本中代码块的背景颜色。",
		"编辑器内小组件（如查找/替换）的阴影颜色。",
		"输入框背景色。",
		"输入框前景色。",
		"输入框边框。",
		"输入字段中已激活选项的边框颜色。",
		"输入验证结果为信息级别时的背景色。",
		"严重性为信息时输入验证的边框颜色。",
		"严重性为警告时输入验证的背景色。",
		"严重性为警告时输入验证的边框颜色。",
		"输入验证结果为错误级别时的背景色。",
		"严重性为错误时输入验证的边框颜色。",
		"焦点项在列表或树活动时的背景颜色。活动的列表或树具有键盘焦点，非活动的没有。",
		"焦点项在列表或树活动时的背景颜色。活动的列表或树具有键盘焦点，非活动的没有。",
		"已选项在列表或树活动时的背景颜色。活动的列表或树具有键盘焦点，非活动的没有。",
		"已选项在列表或树活动时的前景颜色。活动的列表或树具有键盘焦点，非活动的没有。",
		"已选项在列表或树非活动时的背景颜色。活动的列表或树具有键盘焦点，非活动的没有。",
		"已选项在列表或树非活动时的前景颜色。活动的列表或树具有键盘焦点，非活动的没有。",
		"List/Tree background color for the focused item when the list/tree is inactive. An active list/tree has keyboard focus, an inactive does not.",
		"使用鼠标移动项目时，列表或树的背景颜色。",
		"鼠标在项目上悬停时，列表或树的前景颜色。",
		"使用鼠标移动项目时，列表或树进行拖放的背景颜色。",
		"在列表或树中搜索时，其中匹配内容的高亮颜色。",
		"快速选取器分组标签的颜色。",
		"快速选取器分组边框的颜色。",
		"Badge 背景色。Badge 是小型的信息标签，如表示搜索结果数量的标签。",
		"Badge 前景色。Badge 是小型的信息标签，如表示搜索结果数量的标签。",
		"表示视图被滚动的滚动条阴影。",
		"滚动条滑块背景色",
		"滚动条滑块在悬停时的背景色",
		"滚动条滑块在被点击时的背景色。",
		"表示长时间操作的进度条的背景色。",
		"编辑器背景颜色。",
		"编辑器默认前景色。",
		"编辑器组件(如查找/替换)背景颜色。",
		"编辑器小部件的边框颜色。此颜色仅在小部件有边框且不被小部件重写时适用。",
		"Border color of the resize bar of editor widgets. The color is only used if the widget chooses to have a resize border and if the color is not overridden by a widget.",
		"编辑器所选内容的颜色。",
		"用以彰显高对比度的所选文本的颜色。",
		"非活动编辑器内已选内容的颜色。颜色必须透明，使其不会挡住下方的其他元素。",
		"与所选项内容相同的区域的颜色。颜色必须透明，使其不会挡住下方的其他元素。",
		"与所选项内容相同的区域的边框颜色。",
		"当前搜索匹配项的颜色。",
		"其他搜索匹配项的颜色。颜色必须透明，使其不会挡住下方的其他元素。",
		"搜索限制范围的颜色。颜色必须透明，使其不会挡住下方的其他元素。",
		"当前搜索匹配项的边框颜色。",
		"其他搜索匹配项的边框颜色。",
		"搜索限制范围的边框颜色。颜色必须透明，使其不会挡住下方的其他元素。",
		"文本在悬停提示显示时的高亮颜色。颜色必须透明，使其不会挡住下方的其他元素。",
		"编辑器悬停提示的背景颜色。",
		"光标悬停时编辑器的边框颜色。",
		"活动链接颜色。",
		"插入文本的背景色。颜色必须透明，使其不会挡住下方的其他元素。",
		"移除文本的背景色。颜色必须透明，使其不会挡住下方的其他元素。",
		"插入的文本的轮廓颜色。",
		"被删除文本的轮廓颜色。",
		"Border color between the two text editors.",
		"概览标尺中查找匹配项的标记颜色。颜色必须透明，使其不会挡住下方的其他元素。",
		"概览标尺中选择高亮的标记颜色。颜色必须透明，使其不会挡住下方的其他元素。",
	]
});