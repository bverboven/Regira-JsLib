type IFormatValueInput = string | number | Date | undefined;
type IFormatFunctionInput = (input: string) => string;
export type IFormatInput = Record<string, IFormatValueInput> | IFormatFunctionInput;
export declare function formatText(input: string, formatArgs: IFormatInput): string;
export default formatText;
