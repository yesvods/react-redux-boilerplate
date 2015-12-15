import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

export default createDevTools(
  <DockMonitor
    toggleVisibilityKey="Q"
    changePositionKey="Y"
    defaultPosition={config.devtoolPosition}
    defaultIsVisible={config.devtoolDefaultShow}
  >
    <LogMonitor />
  </DockMonitor>
);