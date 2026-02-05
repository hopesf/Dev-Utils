export type LogLevel = "info" | "warn" | "error" | "debug"


export function createLogger(scope: string) {
  const log = (level: LogLevel, message: string) => {
    const time = new Date().toISOString()
    console.log(`[${time}] [${scope}] [${level.toUpperCase()}] ${message}`)
  }

  return {
    info: (msg: string) => log("info", msg),
    warn: (msg: string) => log("warn", msg),
    error: (msg: string) => log("error", msg),
    debug: (msg: string) => log("debug", msg)
  }
}
