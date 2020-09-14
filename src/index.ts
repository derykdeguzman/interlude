type QueueableFunction = () => any;
type Callback = (result: any) => void;

export default class Queue {
  private queue: QueueableFunction[] = [];
  private interval: number | undefined;
  private waitTime: number;

  public constructor(waitTime: number = 5000) {
    this.waitTime = waitTime;
  }

  public add(toQueue: QueueableFunction, callback?: Callback): void {
    const wrapped = () => {
      const result = toQueue();
      callback && callback(result);
    };

    this.queue.push(wrapped);

    if (!this.interval) {
      this.interval = window.setInterval(this.processNext, this.waitTime);
    }
  }

  private processNext = (): void => {
    const toProcess: QueueableFunction = this.queue.shift();

    if (!toProcess) {
      window.clearInterval(this.interval);
      this.interval = undefined;
      return;
    }

    toProcess();
  }
}
