interface ICanvasCoordinates {
  canvasElement: HTMLCanvasElement;
}

class CanvasCoordinates implements ICanvasCoordinates {
  public canvasElement: HTMLCanvasElement;
  private boundingRect: DOMRect;
  private ratio: number;
  constructor(canvas: HTMLCanvasElement) {
    this.canvasElement = canvas;
    this.boundingRect = canvas.getBoundingClientRect();
    this.ratio = canvas.width / canvas.clientWidth;
  }

  getCoordinate(posX: number, posY: number) {
    const relativeX = posX - this.boundingRect.left;
    const relativeY = posY - this.boundingRect.top;

    return {
      x: relativeX * this.ratio,
      y: relativeY * this.ratio
    };
  }
}

export { CanvasCoordinates };
