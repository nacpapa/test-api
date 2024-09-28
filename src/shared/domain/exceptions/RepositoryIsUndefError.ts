export class RepositoryIsUndefError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RepositoryIsUndefError";
  }
}
