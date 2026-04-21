interface AstroIntegration {
    name: string;
    hooks: {
        "astro:config:setup": (data: {
            updateConfig: (config: unknown) => void;
        }) => void;
    };
}
import { type PluginOptions } from "./unplugin.js";
declare const _default: (opts?: PluginOptions) => AstroIntegration;
export default _default;
