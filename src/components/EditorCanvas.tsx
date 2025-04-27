import { useEmailEditorStore } from '../hooks/useEmailEditorStore';
import { useDrop, useDrag } from 'react-dnd';
import { useState } from 'react';
import { Text, Img, Button } from '@react-email/components';

interface DragItem {
  type: string;
  index?: number;
}

interface BlockProps {
  block: any;
  idx: number;
  selectBlock: (index: number) => void;
  selectedBlockIndex: number | null;
}

function Block({ block, idx, selectBlock, selectedBlockIndex }: BlockProps) {
  const [{ isDragging }, drag] = useDrag({
    type: 'block',
    item: { type: block.type, index: idx },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const blockContent = (() => {
    switch (block.type) {
      case 'text':
        return <Text>{block.content || '預設文字'}</Text>;
      case 'image':
        return (
          <Img
            src={block.src || 'https://fakeimg.pl/400x100/eeeeee/?retina=1'}
            alt="Image"
          />
        );
      case 'button':
        return (
          <div className="inline-block bg-cyan-600 text-white py-3 px-6 rounded hover:bg-cyan-800 transition-colors cursor-pointer">
            <Button
              href={block.href || '#'}
              className="text-white no-underline"
            >
              {block.text || '按鈕'}
            </Button>
          </div>
        );
      default:
        return <div>Unknown Block</div>;
    }
  })();

  return (
    <div
      ref={drag}
      onClick={() => selectBlock(idx)}
      className={`p-4 mb-2 bg-white border cursor-move rounded ${
        selectedBlockIndex === idx ? 'border-blue-500' : 'border-gray-300'
      } ${isDragging ? 'opacity-50' : ''}`}
    >
      {blockContent}
    </div>
  );
}

function EditorCanvas() {
  const { blocks, addBlock, selectBlock, selectedBlockIndex } =
    useEmailEditorStore();
  const [previewHtml, setPreviewHtml] = useState('');

  const [, drop] = useDrop<DragItem>({
    accept: 'block',
    drop: (item) => {
      if (item.index !== undefined) {
        // Do nothing here; moving handled elsewhere
      } else {
        addBlock({ type: item.type });
      }
    },
  });

  const handleSaveJson = () => {
    const json = JSON.stringify(blocks, null, 2);
    console.log('Saved JSON:', json);
    alert('已將模板儲存為 JSON 格式，請在 Console 查看');
  };

  return (
    <div className="w-3/4 p-4">
      <div className="flex justify-end gap-4 mb-4">
        <button
          onClick={handleSaveJson}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
        >
          儲存模板
        </button>
      </div>

      <div
        ref={drop}
        className="min-h-[400px] bg-gray-100 p-4 rounded border-2 border-dashed border-gray-400"
      >
        {blocks.length > 0 ? (
          blocks.map((block, idx) => (
            <Block
              key={idx}
              block={block}
              idx={idx}
              selectBlock={selectBlock}
              selectedBlockIndex={selectedBlockIndex}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">拖拉區塊到這裡</p>
        )}
      </div>

      {previewHtml && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">HTML 預覽</h2>
          <iframe
            srcDoc={previewHtml}
            title="Email Preview"
            className="w-full h-[600px] border rounded"
          />
        </div>
      )}
    </div>
  );
}

export default EditorCanvas;
