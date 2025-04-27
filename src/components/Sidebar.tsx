import DraggableItem from './DraggableItem'

function Sidebar() {
  const items = [
    { type: 'text', label: '文字' },
    { type: 'image', label: '圖片' },
    { type: 'button', label: '按鈕' },
  ]

  return (
    <div className="w-1/4 p-4 bg-gray-50 border-r h-screen">
      <h2 className="text-lg font-semibold mb-4">元件庫</h2>
      {items.map((item, idx) => (
        <DraggableItem key={idx} type={item.type} label={item.label} />
      ))}
    </div>
  )
}

export default Sidebar
