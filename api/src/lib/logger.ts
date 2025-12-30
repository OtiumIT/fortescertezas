interface LogContext {
  userId?: string;
  requestId?: string;
  route?: string;
  [key: string]: unknown;
}

function formatLog(level: string, message: string, context?: LogContext): string {
  const timestamp = new Date().toISOString();
  const contextStr = context ? ` ${JSON.stringify(context)}` : '';
  return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
}

export function logInfo(message: string, context?: LogContext): void {
  console.log(formatLog('info', message, context));
}

export function logWarn(message: string, context?: LogContext): void {
  console.warn(formatLog('warn', message, context));
}

export function logError(message: string, error?: Error | unknown, context?: LogContext): void {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorStack = error instanceof Error ? error.stack : undefined;
  const fullContext = { ...context, error: errorMessage, stack: errorStack };
  console.error(formatLog('error', message, fullContext));
}

export function logDebug(message: string, context?: LogContext): void {
  if (process.env.NODE_ENV === 'development') {
    console.debug(formatLog('debug', message, context));
  }
}
