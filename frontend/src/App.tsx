import { PromptBox } from "./components/chatgpt-prompt-input"

export function App() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 dark:bg-[#212121]">
      <div className="flex w-full max-w-xl flex-col gap-10">
        <p className="text-center text-3xl text-foreground">
          Sentiment Analysis for English Language
        </p>
        <PromptBox />
      </div>
    </div>
  )
}

export default App
