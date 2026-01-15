import { useState, useEffect } from "react";
import "./App.css";
import { getConfig } from "../../config";

type ConnectionState = "connected" | "connecting" | "disconnected";

function App() {
  const [connectionState, setConnectionState] = useState<ConnectionState>("disconnected");
  const [featuresExpanded, setFeaturesExpanded] = useState(false);
  const [currentPort, setCurrentPort] = useState<number>(3333);

  useEffect(() => {
    // Load current configuration
    getConfig().then(config => {
      setCurrentPort(config.websocketPort);
    }).catch(error => console.error("Error loading config:", error));

    // Request connection state from background script when popup opens
    browser.runtime.sendMessage({ type: "GET_CONNECTION_STATE" })
      .then((response) => {
        if (response && response.state) {
          setConnectionState(response.state);
        }
      })
      .catch(error => console.error("Error getting connection state:", error));

    // Listen for connection state updates
    const listener = (message: any) => {
      if (message.type === "CONNECTION_STATE_UPDATE") {
        setConnectionState(message.state);
      }
      return true;
    };

    browser.runtime.onMessage.addListener(listener);

    return () => {
      browser.runtime.onMessage.removeListener(listener);
    };
  }, []);
  
  const test = () => {
      console.log("testsss")
      window.ruleeng.addrule("测试")
  }

  // Get the appropriate logo based on connection state
  const logoSrc = `/icon/logo_${connectionState}_128.png`;

  return (
    <>
      <div>
          <div>测试</div>
          <button onClick={test}>点击</button>
      </div>
    </>
  );
}

export default App;
