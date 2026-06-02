import { PromptBox } from "./components/chatgpt-prompt-input"
import Shuffle from "./components/Shuffle"

export function App() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 dark:bg-[#212121]">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #f59e0b 100%)
      `,
          backgroundSize: "100% 100%",
        }}
      />
      <div className="absolute flex w-full max-w-xl flex-col gap-10">
        <img
          className="mx-auto h-10 w-10 object-cover"
          src="./logo.svg"
          alt="logo"
        />
        <Shuffle
          text="Check Sentiment"
          shuffleDirection="right"
          duration={1}
          animationMode="evenodd"
          shuffleTimes={2}
          ease="power3.out"
          stagger={0.04}
          threshold={0.1}
          triggerOnce={true}
          triggerOnHover
          respectReducedMotion={true}
          loop={true}
          loopDelay={5}
        />
        <PromptBox />
      </div>
    </div>
  )
}

export default App
