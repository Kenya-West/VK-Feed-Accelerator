import { Logger } from "../utils/logger";

export const log = (message: string, level: "log" | "info" | "warn" = "log") => (target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
  
    descriptor.value = function (...args: any) {
        if (message) {
            Logger.log(message, level);
        };
        originalMethod.apply(this, args);  
    };
  
    return descriptor;
  };
  