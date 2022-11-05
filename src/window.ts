import ntk from 'ntk';
import { Renderer } from './renderer';

export class Window {
    private _renderer: Renderer;
    private _app;
    private _window;

    constructor(renderer: Renderer) {
        this._renderer = renderer;

        this._createClient();
    }

    private _createClient(): void {
        ntk.createClient((err, app) => {
            let wnd = app.createWindow({
                width: this._renderer.getWidth(),
                height: this._renderer.getHeight(),
                title: 'Chippy8'
            });

            this._app = app;
            this._window = wnd;
        });
    }
}
