import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sidebar from '@/components/Sidebar';
import EditorCanvas from '@/components/EditorCanvas';
import PropertiesPanel from '@/components/PropertiesPanel';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex">
        <Sidebar />
        <EditorCanvas />
        <PropertiesPanel />
      </div>
    </DndProvider>
  );
}

export default App;