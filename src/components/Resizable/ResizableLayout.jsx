import { 
  Panel, 
  PanelGroup, 
  PanelResizeHandle 
} from "react-resizable-panels";

export default function ResizableLayout() {
  return (
    <PanelGroup direction="horizontal">
      
      <Panel defaultSize={20} minSize={10} maxSize={50}>
        <div className="sidebar">
          Sidebar
        </div>
      </Panel>

      <PanelResizeHandle className="resizer" />

      <Panel>
        <div className="content">
          Conteúdo principal
        </div>
      </Panel>

    </PanelGroup>
  );
}
