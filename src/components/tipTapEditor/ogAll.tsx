import React, { forwardRef, useCallback, useState } from "react";
// import classNames from 'classnames';
// => Tiptap packages
import { Editor, EditorContent, useEditor } from "@tiptap/react";
// import { BubbleMenu } from '@tiptap/react/menus';
import Bold from "@tiptap/extension-bold";
import { BulletList } from "@tiptap/extension-list";
// import BulletList from '@tiptap/extension-bullet-list';
import Code from "@tiptap/extension-code";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import History from "@tiptap/extension-history";
import Italic from "@tiptap/extension-italic";
// import Link from '@tiptap/extension-link';
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Strike from "@tiptap/extension-strike";
import Text from "@tiptap/extension-text";
import Underline from "@tiptap/extension-underline";

// import * as Icons from './Icons';
import "./styles.scss";
import classNames from "classnames";

/** How to use

  import { Editor } from '@tiptap/react';

  export const NewComponent = () => {
    const [richTextContent, setRichTextContent] = useState('');
    const editorRef = useRef<Editor | null>();

    const handleContentChange = (htmlContent: string) => {
      setRichTextContent(htmlContent);
    };

    return (
      <SingleGraphicLayout...
        <RichTextEditor ref={editorRef} onContentChange={handleContentChange} />
        etc...
      </SingleGraphicLayout>
    );
  };

 */

type RichTextEditorOgProps = {
	onContentChange?: (content: string) => void;
	analyticsId?: number;
	shortcode?: string;
};

const RichTextEditorOg = forwardRef<Editor | null, RichTextEditorOgProps>(
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
			],
			content: "", // Initial content
			onBlur: ({ editor }) => {
				if (onContentChange) {
					onContentChange(editor.getHTML());
				}
			},
		}) as Editor;
		//   const [modalIsOpen, setIsOpen] = useState(false);
		//   const [url, setUrl] = useState<string>('');

		// Attach the editor instance to the ref
		React.useEffect(() => {
			if (ref && typeof ref === "object") {
				ref.current = editor;
			}
		}, [ref, editor]);

		//   const openModal = useCallback(() => {
		//     setUrl(editor.getAttributes('link').href);
		//     setIsOpen(true);
		//   }, [editor]);

		//   const closeModal = useCallback(() => {
		//     setIsOpen(false);
		//     setUrl('');
		//   }, []);

		//   const saveLink = useCallback(() => {
		//     if (url) {
		//       editor.chain().focus().extendMarkRange('link').setLink({ href: url, target: '_blank' }).run();
		//     } else {
		//       editor.chain().focus().extendMarkRange('link').unsetLink().run();
		//     }
		//     closeModal();
		//   }, [editor, url, closeModal]);

		//   const removeLink = useCallback(() => {
		//     editor.chain().focus().extendMarkRange('link').unsetLink().run();
		//     closeModal();
		//   }, [editor, closeModal]);

		const toggleBold = useCallback(() => {
			editor.chain().focus().toggleBold().run();
		}, [editor]);

		const toggleItalic = useCallback(() => {
			editor.chain().focus().toggleItalic().run();
		}, [editor]);

		const toggleUnderline = useCallback(() => {
			editor.chain().focus().toggleUnderline().run();
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
							{/* <Icons.Bold /> */}
							Bold
						</button>
						<button
							className={classNames("menu-button", {
								"is-active": editor.isActive("italic"),
							})}
							onClick={toggleItalic}
						>
							{/* <Icons.Italic /> */}
							Italic
						</button>
						<button
							className={classNames("menu-button", {
								"is-active": editor.isActive("underline"),
							})}
							onClick={toggleUnderline}
						>
							{/* <Icons.Underline /> */}
							Underline
						</button>
					</div>
					<div className="menu-section">
						<button
							className={classNames("menu-button", {
								"is-active": editor.isActive("strike"),
							})}
							onClick={toggleStrike}
						>
							{/* <Icons.Strikethrough /> */}
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
							{/* <Icons.BulletList /> */}
							BulletList
						</button>
						<button
							className={classNames("menu-button", {
								"is-active": editor.isActive("orderedList"),
							})}
							onClick={toggleOrderedList}
						>
							{/* <Icons.OrderedList /> */}
							Ordered List
						</button>
					</div>
					<div className="menu-section">
						{/* <button
            className={classNames('menu-button', {
              'is-active': editor.isActive('link'),
            })}
            onClick={openModal}
            disabled={editor.state.selection.empty}
          >
            Link
          </button> */}
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

				{/* <BubbleMenu
        className="bubble-menu"
        editor={editor}
        shouldShow={({ editor, from, to }) => {
          // only show the bubble menu for links.
          return from === to && editor.isActive('link');
        }}
      >
        <button className="button" onClick={openModal}>
          Edit
        </button>
        <button className="button-remove" onClick={removeLink}>
          Remove
        </button>
      </BubbleMenu> */}

				<EditorContent editor={editor} />

				{/* <LinkModal
        url={url}
        isOpen={modalIsOpen}
        closeModal={closeModal}
        onChangeUrl={e => setUrl(e.target.value)}
        onSaveLink={saveLink}
        onRemoveLink={removeLink}
      /> */}
			</div>
		);
	}
);

RichTextEditorOg.displayName = "RichTextEditorOg";

export default RichTextEditorOg;
