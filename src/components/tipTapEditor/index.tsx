import React, { forwardRef, useCallback } from "react";
// => Tiptap packages
import {
	Editor,
	EditorContent,
	useEditor,
	useEditorState,
} from "@tiptap/react";
import Bold from "@tiptap/extension-bold";
import { BulletList } from "@tiptap/extension-list";
import Code from "@tiptap/extension-code";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import History from "@tiptap/extension-history";
import Italic from "@tiptap/extension-italic";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Strike from "@tiptap/extension-strike";
import Text from "@tiptap/extension-text";
import Underline from "@tiptap/extension-underline";
import { TextStyle, Color } from "@tiptap/extension-text-style";

import "./styles.scss";
import classNames from "classnames";

type RichTextEditorProps = {
	onContentChange?: (content: string) => void;
	increaseTextSize?: () => void;
	decreaseTextSize?: () => void;
};

const RichTextEditor = forwardRef<Editor | null, RichTextEditorProps>(
	(props, ref) => {
		const { onContentChange, increaseTextSize, decreaseTextSize } = props;
		const editor = useEditor({
			extensions: [
				Bold,
				BulletList,
				Code,
				Document,
				Heading,
				History,
				Italic,
				ListItem,
				OrderedList,
				Paragraph,
				Strike,
				Text,
				Underline,
				TextStyle,
				Color,
			],
			content: `
            <p><span style="color: #8c0a02;"><strong>Ambush</strong></span></p>
            <p><span style="color: #8c0a02;"><strong>Restore 2</strong></span></p>
            <p><strong>On attack:</strong> Deal damage</p>
            <ul>
              <li><p>Draw a card.</p></li>
              <li><p>Defeat up to 2 upgrades</p></li>
            </ul>
          `, // Initial content

			onCreate: ({ editor }) => {
				if (onContentChange) {
					onContentChange(editor.getHTML());
				}
			},
			onBlur: ({ editor }) => {
				if (onContentChange) {
					onContentChange(editor.getHTML());
				}
			},
			onUpdate: ({ editor }) => {
				if (onContentChange) {
					onContentChange(editor.getHTML());
				}
			},
		}) as Editor;

		const editorState = useEditorState({
			editor,
			selector: (ctx) => {
				return {
					isBold:
						ctx.editor.isActive("bold") &&
						ctx.editor.getAttributes("textStyle").color !== "#8c0a02",
					isItalic: ctx.editor.isActive("italic"),
					isStrike: ctx.editor.isActive("strike"),
					isBullet: ctx.editor.isActive("bulletList"),
					isOrdered: ctx.editor.isActive("orderedList"),
					isRed:
						ctx.editor.getAttributes("textStyle").color === "#8c0a02" &&
						ctx.editor.isActive("bold"),
				};
			},
		});

		console.log(
			"ctx.editor.isActive('bold')",
			editor.isActive("bold"),
			editor.isActive("bold") &&
				!editor.isActive("textStyle", {
					color: "#8c0a02",
				})
		);
		console.log(
			"ctx.editoradsfasfasdfasdf",
			editor.getAttributes("textStyle").color,
			editor.isActive("textStyle", { color: "#8c0a02" })
		);

		// Attach the editor instance to the ref
		React.useEffect(() => {
			if (ref && typeof ref === "object") {
				ref.current = editor;
			}
		}, [ref, editor]);

		const toggleBold = useCallback(() => {
			editor.chain().focus().toggleBold().run();
		}, [editor]);

		const toggleItalic = useCallback(() => {
			editor.chain().focus().toggleItalic().run();
		}, [editor]);

		const toggleStrike = useCallback(() => {
			editor.chain().focus().toggleStrike().run();
		}, [editor]);

		const toggleHeading = useCallback(() => {
			editor.chain().focus().toggleHeading({ level: 2 }).run();
		}, [editor]);

		const toggleBulletList = useCallback(() => {
			editor.chain().focus().toggleBulletList().run();
		}, [editor]);

		const toggleOrderedList = useCallback(() => {
			editor.chain().focus().toggleOrderedList().run();
		}, [editor]);

		// const toggleOrderedList = useCallback(() => {
		// 	editor.commands.setColor("#ff0000");
		// }, [editor]);

		if (!editor) {
			return null;
		}

		return (
			<div className="editor">
				<div className="menu">
					<div className="menu-contains-halves">
						<div className="menu-section">
							<button
								className={classNames("menu-button", {
									"is-active": editorState.isBold,
								})}
								onClick={toggleBold}
                                disabled={editorState.isRed}
							>
								Bold
							</button>
							<button
								className={classNames("menu-button", {
									"is-active": editorState.isItalic,
								})}
								onClick={toggleItalic}
							>
								Italic
							</button>

							<button
								className={classNames("menu-button", {
									"is-active": editorState.isStrike,
								})}
								onClick={toggleStrike}
							>
								Strikethrough
							</button>
							<button
								className={classNames("menu-button", {
									"is-active": editorState.isBullet,
								})}
								onClick={toggleBulletList}
							>
								BulletList
							</button>
							<button
								className={classNames("menu-button", {
									"is-active": editorState.isOrdered,
								})}
								onClick={toggleOrderedList}
							>
								Ordered List
							</button>
						</div>
						<div className="menu-section">
							<div className="menu-section">
								<button
									className="menu-button"
									onClick={() => editor.chain().focus().undo().run()}
									disabled={!editor.can().chain().undo().run() ?? false}
								>
									Undo
								</button>
								<button
									className="menu-button"
									onClick={() => editor.chain().focus().redo().run()}
									disabled={!editor.can().chain().redo().run() ?? false}
								>
									Redo
								</button>
							</div>
						</div>
					</div>
					<div className="menu-section">
						<button
							className={classNames("menu-button red-button", {
								"is-active": editorState.isRed,
							})}
							onClick={() => {
								if (editor.getAttributes("textStyle").color === "#8c0a02") {
									editor.chain().focus().unsetColor().run();
								} else {
									editor.chain().focus().setColor("#8c0a02").run();
								}
								editor.chain().focus().toggleBold().run();
							}}
							data-testid="setRed"
						>
							Color text red
						</button>
						<button
							className={classNames("menu-button")}
							onClick={() => {
								editor.chain().focus().unsetColor().run();
								editor.chain().focus().toggleBold().run();
							}}
							data-testid="setBlack"
						>
							Unset color
						</button>
						<button
							className={classNames("menu-button text-size-increase")}
							onClick={increaseTextSize}
						>
							Increase text size
						</button>
						<button
							className={classNames("menu-button text-size-decrease")}
							onClick={decreaseTextSize}
						>
							Decrease text size
						</button>
					</div>
				</div>

				<EditorContent editor={editor} />
			</div>
		);
	}
);

RichTextEditor.displayName = "RichTextEditor";

export default RichTextEditor;
