import { type IFormatInput } from "./formatText";
export type ITranslationMessage = Record<string, string> | string;
export type ITranslationMessages = Record<string, ITranslationMessage>;
export declare function translate(key: string, values: ITranslationMessages, langCode: string, formatArgs?: IFormatInput): string;
export declare function translateMessage(message: ITranslationMessage, langCode: string, formatArgs?: IFormatInput): string;
export default translate;
