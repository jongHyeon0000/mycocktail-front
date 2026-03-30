import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import styled from "styled-components";
import { Box, IconButton, Tooltip } from "@mui/material";
import {
  FormatBoldOutlined,
  FormatItalicOutlined,
  FormatStrikethroughOutlined,
  FormatListBulletedOutlined,
  FormatListNumberedOutlined,
  FormatQuoteOutlined,
} from "@mui/icons-material";

interface TipTapEditorProps {
  placeholder?: string;
  onChange?: (html: string) => void;
}

const TipTapEditor: React.FC<TipTapEditorProps> = ({ placeholder, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: placeholder ?? "" }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "tiptap-content",
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <EditorWrapper>
      <Toolbar>
        <Tooltip title="굵게" placement="top">
          <ToolbarButton
            size="small"
            active={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <FormatBoldOutlined fontSize="small" />
          </ToolbarButton>
        </Tooltip>

        <Tooltip title="기울임" placement="top">
          <ToolbarButton
            size="small"
            active={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <FormatItalicOutlined fontSize="small" />
          </ToolbarButton>
        </Tooltip>

        <Tooltip title="취소선" placement="top">
          <ToolbarButton
            size="small"
            active={editor.isActive("strike")}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <FormatStrikethroughOutlined fontSize="small" />
          </ToolbarButton>
        </Tooltip>

        <Divider />

        <Tooltip title="글머리 목록" placement="top">
          <ToolbarButton
            size="small"
            active={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <FormatListBulletedOutlined fontSize="small" />
          </ToolbarButton>
        </Tooltip>

        <Tooltip title="번호 목록" placement="top">
          <ToolbarButton
            size="small"
            active={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <FormatListNumberedOutlined fontSize="small" />
          </ToolbarButton>
        </Tooltip>

        <Tooltip title="인용" placement="top">
          <ToolbarButton
            size="small"
            active={editor.isActive("blockquote")}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <FormatQuoteOutlined fontSize="small" />
          </ToolbarButton>
        </Tooltip>
      </Toolbar>

      <ContentArea>
        <EditorContent editor={editor} />
      </ContentArea>
    </EditorWrapper>
  );
};

export default TipTapEditor;

const EditorWrapper = styled(Box)`
  && {
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(0, 0, 0, 0.23);
    border-radius: 12px;
    overflow: hidden;
    transition: border-color 0.2s;
    margin-bottom: 24px;

    &:focus-within {
      border-color: #888;
      box-shadow: 0 0 0 1px rgba(136, 136, 136, 0.3);
    }
  }
`;

const Toolbar = styled(Box)`
  && {
    display: flex;
    align-items: center;
    gap: 2px;
    padding: 6px 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    background: rgba(248, 249, 250, 0.9);
    flex-wrap: wrap;
  }
`;

const ToolbarButton = styled(IconButton).withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>`
  && {
    width: 30px;
    height: 30px;
    border-radius: 6px;
    color: ${({ active }) => (active ? "#ff4757" : "#555")};
    background-color: ${({ active }) => (active ? "rgba(255, 71, 87, 0.1)" : "transparent")};

    &:hover {
      background-color: ${({ active }) =>
        active ? "rgba(255, 71, 87, 0.15)" : "rgba(0, 0, 0, 0.05)"};
    }
  }
`;

const Divider = styled(Box)`
  && {
    width: 1px;
    height: 20px;
    background-color: rgba(0, 0, 0, 0.12);
    margin: 0 4px;
  }
`;

const ContentArea = styled(Box)`
  && {
    padding: 12px 16px;
    min-height: 120px;
    position: relative;

    .tiptap-content {
      min-height: 96px;
      outline: none;
      font-size: 0.9375rem;
      line-height: 1.7;
      color: #2c3e50;

      p {
        margin: 0 0 8px;
        &:last-child { margin-bottom: 0; }
      }

      ul, ol {
        padding-left: 20px;
        margin: 0 0 8px;
        li { margin-bottom: 4px; }
      }

      blockquote {
        border-left: 3px solid #667eea;
        margin: 0 0 8px;
        padding-left: 12px;
        color: #5a6a7a;
        font-style: italic;
      }

      strong { font-weight: 700; }
      em { font-style: italic; }
      s { text-decoration: line-through; }

      p.is-empty:first-child::before {
        content: attr(data-placeholder);
        color: #aaa;
        pointer-events: none;
        float: left;
        height: 0;
      }
    }
  }
`;
