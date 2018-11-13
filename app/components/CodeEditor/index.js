// @flow
import React, { Component } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';

export const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: ''
              }
            ]
          }
        ]
      }
    ]
  }
});

type Props = {
  onChange: (event: any) => void,
  editorValue: any
};

export default class CodeEditor extends Component<Props> {
  props: Props;

  ref = editor => {
    this.editor = editor;
  };

  onKeyUp = (event, editor, next) => {
    const {
      value: { document }
    } = editor;
    const string = /(?<!\\)\$([^$]|(\\\$))*[^\\]?\$/g;
    const texts = document.getTexts();
    const decorations = [];

    texts.forEach(node => {
      const { key, text } = node;
      let part;
      while ((part = string.exec(text)) !== null) {
        decorations.push({
          anchor: { key, offset: part.index },
          focus: { key, offset: part.index + part[0].length },
          mark: { type: 'highlight' }
        });
      }
    });

    editor.withoutSaving(() => {
      editor.setDecorations(decorations);
    });

    return next();
  };

  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props;

    switch (mark.type) {
      case 'highlight':
        return (
          <span {...attributes} style={{ backgroundColor: '#ffeeba' }}>
            {children}
          </span>
        );
      default:
        return next();
    }
  };

  render() {
    const { editorValue, onChange } = this.props;
    return (
      <div>
        <Editor
          style={{
            height: 'calc(100vh - 48px)',
            padding: 20,
            backgroundColor: '#e2e9ff'
          }}
          ref={this.ref}
          value={editorValue}
          renderMark={this.renderMark}
          onChange={onChange}
          onKeyUp={this.onKeyUp}
        />
      </div>
    );
  }
}
