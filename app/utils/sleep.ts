export const sleep = async (time: number) => (
  new Promise<void>(
    (r) => setTimeout(r, time),
  )
);
