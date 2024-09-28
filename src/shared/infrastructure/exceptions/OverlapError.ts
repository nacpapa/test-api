interface Props {
  target?: string;
  message?: string;
}

export class OverlapError extends Error {
  public defaultMessage: string;
  constructor(props: Props) {
    const { target, message } = props;
    super(message);
    this.name = 'OverlapError';
    this.defaultMessage = message
      ? message
      : target
      ? `Error '${target}' has an overlap.`
      : 'Your request has a overlap and thats failed';
  }
}
