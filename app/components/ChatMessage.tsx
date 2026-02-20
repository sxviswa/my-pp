import type { UIMessage } from 'ai';
import JsonView from '@uiw/react-json-view';
import MarkdownPreview from '@uiw/react-markdown-preview';
export default function ChatMessage({ message }: { message: UIMessage }) {
  const isUser = message.role === 'user';
  const text = message.parts
    .filter((p): p is Extract<typeof p, { type: 'text' }> => p.type === 'text')
    .map(p => p.text)
    .join('');

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? 'text-background rounded-br-md'
            : 'dark:bg-zinc-800 rounded-bl-md'
        }`}
      >
          <div data-color-mode="light">
            <MarkdownPreview source={text} style={{ padding: 16 }} />
          </div>
      </div>
    </div>
  );
}
