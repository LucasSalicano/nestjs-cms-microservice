export abstract class EventPublisher {
  abstract publish(channel: string, payload: any): Promise<void>;
}
