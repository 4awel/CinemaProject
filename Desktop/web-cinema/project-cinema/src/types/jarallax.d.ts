declare module "jarallax" {
  interface JarallaxOptions {
    speed?: number;
    imgPosition?: string;
    video?: string;
    zIndex?: number;
    onScroll?: (event: Event) => void;
  }

  export function jarallax(
    elements: Element | Element[],
    options?: JarallaxOptions
  ): void;
  export function destroy(elements: Element | Element[]): void;
}
