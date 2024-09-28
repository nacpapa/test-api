export function checkIfRepositoryIsUndefOrThrow(repository: any): void {
  if (typeof repository === "undefined") {
    throw new Error(
      `This method is under maintenance. Please try again later.`
    );
  }
}
