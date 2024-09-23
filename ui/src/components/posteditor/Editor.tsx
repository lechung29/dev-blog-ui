import { useCallback, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { htmlToMarkdown } from "../../pages/dashboard/createpost/Parse";
import uploadToCloudinary from "../../services/helpers/upload";
import "./index.scss";
import { useTranslation } from "react-i18next";
import { useControllableState } from "@chakra-ui/react-use-controllable-state"

export interface EditorContentChanged {
	html: string;
	markdown: string;
}

export interface EditorProps {
	value?: string;
	onChange?: (changes: EditorContentChanged) => void;
}

export default function Editor(props: EditorProps) {
	const { onChange, value } = props
	const [editorValue, setEditorValue] = useControllableState<string>({
		value: value || "",
		onChange: (value: string) => {
			onChangeEditor(value)
		}
	});
	const reactQuillRef = useRef<ReactQuill>(null);
	const { t } = useTranslation()
	
	const onChangeEditor = (content: string) => {

		if (onChange) {
			onChange({
				html: content,
				markdown: htmlToMarkdown(content),
			});
		}
	};

	const imageHandler = useCallback(() => {
		const input = document.createElement("input");
		input.setAttribute("type", "file");
		input.setAttribute("accept", "image/*");
		input.click();
		input.onchange = async () => {
			if (input !== null && input.files !== null) {
				const file = input.files[0];
				const url = await uploadToCloudinary(file);
				const quill = reactQuillRef.current;
				if (quill) {
					const range = quill.getEditorSelection();
					range && quill.getEditor().insertEmbed(range.index, "image", url);
				}
			}
		};
	}, []);

	return (
		<ReactQuill
			ref={reactQuillRef}
			theme="snow"
			placeholder={t("Editor.Fill.Content")}
			modules={{
				toolbar: {
					container: [
						[{ header: "1" }, { header: "2" }, { font: [] }],
						[{ size: [] }],
						["bold", "italic", "underline", "strike", "blockquote"],
						[{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
						["link", "image"],
						["code-block"],
						["clean"],
					],
					handlers: {
						image: imageHandler,
					},
				},
				clipboard: {
					matchVisual: false,
				},
			}}
			formats={["header", "font", "size", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "image", "code-block"]}
			value={editorValue}
			onChange={setEditorValue}
		/>
	);
}

