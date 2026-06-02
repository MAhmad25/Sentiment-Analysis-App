import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import api from "../api/base"
import { Alert, AlertTitle } from "../components/alert"
import { GooeyLoader } from "./ui/loader-10"

type ClassValue = string | number | boolean | null | undefined
function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(" ")
}
const TooltipProvider = TooltipPrimitive.Provider
const Tooltip = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
    showArrow?: boolean
  }
>(({ className, sideOffset = 4, showArrow = false, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "relative z-50 max-w-70 animate-in rounded-md bg-popover px-1.5 py-1 text-xs text-popover-foreground fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        className
      )}
      {...props}
    >
      {props.children}
      {showArrow && <TooltipPrimitive.Arrow className="-my-px fill-popover" />}
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName
const Popover = PopoverPrimitive.Root
const PopoverTrigger = PopoverPrimitive.Trigger
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-64 animate-in rounded-xl bg-popover p-2 text-popover-foreground shadow-md outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 dark:bg-[#303030] dark:text-white",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName
const DialogPortal = DialogPrimitive.Portal
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed top-[50%] left-[50%] z-50 grid w-full max-w-[90vw] translate-x-[-50%] translate-y-[-50%] gap-4 border-none bg-transparent p-0 shadow-none duration-300 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 md:max-w-200",
        className
      )}
      {...props}
    >
      <div className="relative overflow-hidden rounded-[28px] bg-card p-1 shadow-2xl dark:bg-[#303030]">
        {children}
        <DialogPrimitive.Close className="absolute top-3 right-3 z-10 rounded-full bg-background/50 p-1 transition-all hover:bg-accent dark:bg-[#303030] dark:hover:bg-[#515151]">
          <XIcon className="h-5 w-5 text-muted-foreground hover:text-foreground dark:text-gray-200 dark:hover:text-white" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </div>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const Settings2Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M20 7h-9" /> <path d="M14 17H5" /> <circle cx="17" cy="17" r="3" />
    <circle cx="7" cy="7" r="3" />
  </svg>
)
const SendIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 5.25L12 18.75"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.75 12L12 5.25L5.25 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)
const LightbulbIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M12 7C9.23858 7 7 9.23858 7 12C7 13.3613 7.54402 14.5955 8.42651 15.4972C8.77025 15.8484 9.05281 16.2663 9.14923 16.7482L9.67833 19.3924C9.86537 20.3272 10.6862 21 11.6395 21H12.3605C13.3138 21 14.1346 20.3272 14.3217 19.3924L14.8508 16.7482C14.9472 16.2663 15.2297 15.8484 15.5735 15.4972C16.456 14.5955 17 13.3613 17 12C17 9.23858 14.7614 7 12 7Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M12 4V3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18 6L19 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 12H21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 12H3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 5L6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 17H14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const toolsList = [
  {
    id: "thinkLonger",
    name: "Think for longer",
    shortName: "Think",
    icon: LightbulbIcon,
  },
]

// --- The Final, Self-Contained PromptBox Component ---
export const PromptBox = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [response, setResponse] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [value, setValue] = React.useState("")
  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await api.post("/predict", { text: value })
      setResponse(response.data.Label)
      console.log(response)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.message ?? String(err))
    } finally {
      setIsLoading(false)
    }
  }
  const internalTextareaRef = React.useRef<HTMLTextAreaElement>(null)
  const [selectedTool, setSelectedTool] = React.useState<string | null>(null)
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
  React.useImperativeHandle(ref, () => internalTextareaRef.current!, [])
  React.useLayoutEffect(() => {
    const textarea = internalTextareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      const newHeight = Math.min(textarea.scrollHeight, 200)
      textarea.style.height = `${newHeight}px`
    }
  }, [value])
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
    if (props.onChange) props.onChange(e)
  }

  const hasValue = value.trim().length > 0
  const activeTool = selectedTool
    ? toolsList.find((t) => t.id === selectedTool)
    : null
  const ActiveToolIcon = activeTool?.icon

  return (
    <>
      <div
        className={cn(
          "mx-5 flex cursor-text flex-col rounded-[28px] border bg-white p-2 shadow-sm transition-colors md:mx-0 dark:border-transparent dark:bg-[#303030]",
          className
        )}
      >
        <textarea
          ref={internalTextareaRef}
          rows={1}
          value={value}
          onChange={handleInputChange}
          placeholder="Your text..."
          className="custom-scrollbar min-h-12 w-full resize-none border-0 bg-transparent p-3 text-foreground placeholder:text-muted-foreground focus:ring-0 focus-visible:outline-none dark:text-white dark:placeholder:text-gray-300"
          {...props}
        />

        <div className="mt-0.5 p-1 pt-0">
          <TooltipProvider delayDuration={100}>
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild></TooltipTrigger>
              </Tooltip>

              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="flex h-8 items-center gap-2 rounded-full p-2 text-sm text-foreground transition-colors hover:bg-accent focus-visible:ring-ring focus-visible:outline-none dark:text-white dark:hover:bg-[#515151]"
                      >
                        <Settings2Icon className="h-4 w-4" />
                        {!selectedTool && "Tools"}
                      </button>
                    </PopoverTrigger>
                  </TooltipTrigger>
                  <TooltipContent side="top" showArrow={true}>
                    <p>Explore Tools</p>
                  </TooltipContent>
                </Tooltip>
                <PopoverContent side="top" align="start">
                  <div className="flex flex-col gap-1">
                    {toolsList.map((tool) => (
                      <button
                        key={tool.id}
                        onClick={() => {
                          setSelectedTool(tool.id)
                          setIsPopoverOpen(false)
                        }}
                        className="flex w-full items-center gap-2 rounded-md p-2 text-left text-sm hover:bg-accent dark:hover:bg-[#515151]"
                      >
                        <tool.icon className="h-4 w-4" />{" "}
                        <span>{tool.name}</span>
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              {activeTool && (
                <>
                  <div className="h-4 w-px bg-border dark:bg-gray-600" />
                  <button
                    onClick={() => setSelectedTool(null)}
                    className="flex h-8 cursor-pointer flex-row items-center justify-center gap-2 rounded-full px-2 text-sm text-[#2294ff] transition-colors hover:bg-accent dark:text-[#99ceff] dark:hover:bg-[#3b4045]"
                  >
                    {ActiveToolIcon && <ActiveToolIcon className="h-4 w-4" />}
                    {activeTool.shortName}
                    <XIcon className="h-4 w-4" />
                  </button>
                </>
              )}

              <div className="ml-auto flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => handleSubmit()}
                      type="submit"
                      disabled={!hasValue}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-medium text-white transition-colors hover:bg-black/80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:bg-black/40 dark:bg-white dark:text-black dark:hover:bg-white/80 dark:disabled:bg-[#515151]"
                    >
                      <SendIcon className="text-bold h-6 w-6" />
                      <span className="sr-only">Send message</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top" showArrow={true}>
                    <p>Check the Sentiment</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </TooltipProvider>
        </div>
      </div>
      {isLoading && (
        <GooeyLoader
          primaryColor="#1a1a1a"
          secondaryColor="#1a1a1a"
          borderColor="#e5e7eb"
        />
      )}
      {error && <div className="text-center text-sm text-red-500">{error}</div>}
      {response && !isLoading && !error && (
        <div className="text-center text-sm text-foreground">
          <Response type={getVariantForResponse(response)}>{response}</Response>
        </div>
      )}
    </>
  )
})
PromptBox.displayName = "PromptBox"

type AlertVariant =
  | "primary"
  | "success"
  | "destructive"
  | "secondary"
  | "info"
  | "mono"
  | "warning"

const getVariantForResponse = (r: string | null | undefined): AlertVariant => {
  if (!r) return "primary"
  const val = r.toLowerCase()
  if (val === "joy") return "secondary"
  if (val === "anger") return "destructive"
  if (val == "surprise") return "warning"
  if (val == "fear") return "destructive"
  if (val == "sadness") return "primary"
  if (val == "love") return "success"
  return "primary"
}

const Response = ({
  children,
  type,
}: {
  children: string
  type?: AlertVariant
}) => {
  return (
    <div className="mx-auto flex w-full max-w-150 flex-col items-center justify-center gap-5 px-10">
      <Alert variant={type}>
        This text represent
        <AlertTitle className="font-bold tracking-widest uppercase">
          {children}
        </AlertTitle>
      </Alert>
    </div>
  )
}
