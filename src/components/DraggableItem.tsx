import { useRef } from 'react'
import { useDrag } from 'react-dnd'

function DraggableItem({ type, label }: { type: string; label: string }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'block',
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))
  const ref = useRef<HTMLDivElement>(null)
  drag(ref)

  return (
    <div
      ref={ref}
      className={`p-2 mb-2 bg-white border rounded shadow cursor-move ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      {label}
    </div>
  )
}

export default DraggableItem
