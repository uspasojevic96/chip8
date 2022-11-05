import { Canvas, createCanvas, CanvasRenderingContext2D } from 'canvas';

export class Renderer {
    private readonly _rows = 32;
    private readonly _cols = 64;
    private _display: boolean[];
    private _canvas: Canvas;
    private _context: CanvasRenderingContext2D;
    private _scale = 1;

    constructor(scale?: number) {
        this._scale = scale || this._scale;
        this._canvas = createCanvas(this._cols * this._scale, this._rows * this._scale);
        this._context = this._canvas.getContext('2d');
        this.clear();
    }

    public getCanvas(): Canvas {
        return this._canvas;
    }

    public getHeight(): number {
        return this._cols * this._scale;
    }

    public getWidth(): number {
        return this._rows * this._scale;
    }

    public setPixel(x: number, y: number): boolean {
        x = this._checkWrapping(x, '_cols');
        y = this._checkWrapping(y, '_rows');

        const pixelLocation = x + y * this._cols;

        this._display[pixelLocation] = !this._display[pixelLocation];

        return !this._display[pixelLocation];
    }

    public clear(): void {
        this._display = new Array<boolean>(this._rows * this._cols).fill(false);
    }

    private _checkWrapping(coordinate: number, type: '_rows' | '_cols'): number {
        if (coordinate > this[type]) {
            return (coordinate -= this[type]);
        }

        if (coordinate < 0) {
            return (coordinate += this[type]);
        }

        return coordinate;
    }
}
