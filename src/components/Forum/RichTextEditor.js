// src/components/Forum/RichTextEditor.js

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function RichTextEditor({ content, onChange, editable = true }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
    editable,
  });

  // Clean up editor on unmount
  useEffect(() => {
    return () => editor && editor.destroy();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="prose prose-lg border border-gray-200 rounded-xl p-4 bg-white shadow-card">
      <EditorContent editor={editor} />
      {!editable && (
        <p className="mt-4 text-gray-500 text-sm italic">Read-only mode</p>
      )}
    </div>
  );
}

RichTextEditor.propTypes = {
  content: PropTypes.string,
  onChange: PropTypes.func,
  editable: PropTypes.bool,
};

RichTextEditor.defaultProps = {
  content: "",
  onChange: null,
  editable: true,
};
  
