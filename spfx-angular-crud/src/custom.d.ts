// src/custom.d.ts
// This file tells TypeScript how to handle .html and .scss files

declare module '*.html' {
  const content: string;
  export default content;
}

declare module '*.scss' {
  const content: string;
  export default content;
}

declare module '*.css' {
  const content: string;
  export default content;
}
