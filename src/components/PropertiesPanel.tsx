import { useEmailEditorStore } from '../stores/useEmailEditorStore';

function PropertiesPanel() {
  const { blocks, selectedBlockIndex, updateBlockContent, removeBlock } =
    useEmailEditorStore();

  if (selectedBlockIndex === null || blocks[selectedBlockIndex] === undefined) {
    return (
      <div className="w-1/4 p-4 bg-gray-50 border-l">
        <p className="text-gray-500">請選擇一個區塊來編輯</p>
      </div>
    );
  }

  const block = blocks[selectedBlockIndex];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateBlockContent(name, value);
  };

  const handleRemove = () => {
    removeBlock(selectedBlockIndex);
  };

  return (
    <div className="w-1/4 p-4 bg-gray-50 border-l h-screen">
      <h2 className="text-lg font-semibold mb-4">編輯內容</h2>
      {block.type === 'text' && (
        <input
          type="text"
          name="content"
          value={block.content || ''}
          onChange={handleChange}
          placeholder="輸入文字內容"
          className="w-full p-2 border rounded"
        />
      )}
      {block.type === 'image' && (
        <input
          type="text"
          name="src"
          value={block.src || ''}
          onChange={handleChange}
          placeholder="輸入圖片連結"
          className="w-full p-2 border rounded"
        />
      )}
      {block.type === 'button' && (
        <>
          <input
            type="text"
            name="text"
            value={block.text || ''}
            onChange={handleChange}
            placeholder="按鈕文字"
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            name="href"
            value={block.href || ''}
            onChange={handleChange}
            placeholder="按鈕連結"
            className="w-full p-2 border rounded"
          />
        </>
      )}
      <button
        onClick={handleRemove}
        className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
      >
        移除區塊
      </button>
    </div>
  );
}

export default PropertiesPanel;
