interface Props {
  target?: string;
  message?: string;
}

export class VerificationFailed extends Error {
  public defaultMessage: string;
  constructor(props: Props) {
    const { target, message } = props;
    super(message);
    this.name = 'VerificationFailed';
    this.defaultMessage = message
      ? message
      : target
      ? `Error '${target}' verification fail.`
      : 'Your request has a verification and thats failed';
  }
}
