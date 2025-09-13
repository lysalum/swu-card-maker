import React, { forwardRef, useCallback } from "react";
// => Tiptap packages
import { Editor, EditorContent, useEditor } from "@tiptap/react";
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
	analyticsId?: number;
	shortcode?: string;
};

const RichTextEditor = forwardRef<Editor | null, RichTextEditorProps>(
	(props, ref) => {
		const { onContentChange } = props;
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
			content: "", // Initial content
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
					<div className="menu-section">
						<button
							className={classNames("menu-button", {
								"is-active": editor.isActive("bold"),
							})}
							onClick={toggleBold}
						>
							Bold
						</button>
						<button
							className={classNames("menu-button", {
								"is-active": editor.isActive("italic"),
							})}
							onClick={toggleItalic}
						>
							Italic
						</button>
					</div>
					<div className="menu-section">
						<button
							className={classNames("menu-button", {
								"is-active": editor.isActive("strike"),
							})}
							onClick={toggleStrike}
						>
							Strikethrough
						</button>

						<button
							className={classNames("menu-button", {
								"is-active": editor.isActive("heading", { level: 2 }),
							})}
							onClick={toggleHeading}
						>
							H2
						</button>
						<button
							className={classNames("menu-button", {
								"is-active": editor.isActive("bulletList"),
							})}
							onClick={toggleBulletList}
						>
							BulletList
						</button>
						<button
							className={classNames("menu-button", {
								"is-active": editor.isActive("orderedList"),
							})}
							onClick={toggleOrderedList}
						>
							Ordered List
						</button>
					</div>
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
					<div className="menu-section">
						<button
							className={classNames("menu-button", {
								"is-active": editor.isActive('textStyle', { color: '#F98181' }),
							})}
							onClick={() => editor.chain().focus().setColor("#958DF1").run()}
							data-testid="setPurple"
						>
							Red
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
