import React from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';

const initialValue = Value.fromJSON({
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
                text: 'A line of text in a paragraph.'
              }
            ]
          }
        ]
      }
    ]
  }
});

export default class CodeEditor extends React.Component {
  state = {
    value: initialValue
  };

  ref = editor => {
    this.editor = editor;
  };

  // On change, update the app's React state with the new editor value.
  onChange = ({ value }) => {
    this.setState({ value });
  };

  onKeyDown = (event, editor, next) => {
    const { value } = editor;
    const string = 'abc';
    const texts = value.document.getTexts();
    console.log(value.document);
    const decorations = [];

    texts.forEach(node => {
      const { key, text } = node;
      const parts = text.split(string);
      let offset = 0;

      parts.forEach((part, i) => {
        if (i !== 0) {
          decorations.push({
            anchor: { key, offset: offset - string.length },
            focus: { key, offset },
            mark: { type: 'highlight' }
          });
        }

        offset = offset + part.length + string.length;
      });
    });

    // Make the change to decorations without saving it into the undo history,
    // so that there isn't a confusing behavior when undoing.
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
    const { value } = this.state;
    return (
      <div>
        <Editor
          ref={this.ref}
          value={value}
          renderMark={this.renderMark}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
        />
      </div>
    );
  }
}
