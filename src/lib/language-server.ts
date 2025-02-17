import { MonacoLanguageClient } from 'monaco-languageclient'
import { LanguageServerConfig } from '@/config/language-server'
import { useCodeEditorStore } from '@/store/useCodeEditorStore'
import { CloseAction, ErrorAction } from 'vscode-languageclient'
import { toSocket, WebSocketMessageReader, WebSocketMessageWriter } from 'vscode-ws-jsonrpc'

let isConnecting = false;

export const connectToLanguageServer = (config: LanguageServerConfig) => {
  if (isConnecting) return;
  isConnecting = true;

  const { languageClient, setLanguageClient } = useCodeEditorStore.getState();

  languageClient?.dispose()
  setLanguageClient(null)

  const url = `${config.protocol}://${config.hostname}${config.port ? `:${config.port}` : ''}${config.path || ''}`
  const webSocket = new WebSocket(url)

  webSocket.onopen = () => {
    const socket = toSocket(webSocket)
    const reader = new WebSocketMessageReader(socket)
    const writer = new WebSocketMessageWriter(socket)

    const client = new MonacoLanguageClient({
      name: `${config.label} Language Client`,
      clientOptions: {
        documentSelector: [config.id],
        errorHandler: {
          error: () => ({ action: ErrorAction.Continue }),
          closed: () => ({ action: CloseAction.DoNotRestart })
        }
      },
      connectionProvider: {
        get: () => Promise.resolve({ reader, writer })
      }
    })

    client.start()
    setLanguageClient(client)
    isConnecting = false;
  }

  webSocket.onerror = (error) => {
    console.error("WebSocket error:", error);
    isConnecting = false;
  }

  webSocket.onclose = () => {
    isConnecting = false;
  }
}
