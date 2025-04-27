import { useDrag } from 'react-dnd'

function DraggableItem({ type, label }: { type: string; label: string }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'block',
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag}
      className={`p-2 mb-2 bg-white border rounded shadow cursor-move ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      {label}
    </div>
  )
}

export default DraggableItem
