import Vimeo from 'vimeo';
export declare class VimeoClient {
    client: Vimeo.Vimeo;
    constructor();
    get(url: any): Promise<{} | null>;
}
