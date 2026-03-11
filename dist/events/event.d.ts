declare class Event {
    type: string;
    src?: Event;
    [key: string]: unknown;
    constructor(type: string, src?: Event, data?: Record<string, unknown>);
}
export default Event;
