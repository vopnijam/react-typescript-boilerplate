declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.ttf' {
  const content: string;
  export default content;
}

declare module '*.json' {
  const value: IGenericObject;
  export default value;
}
