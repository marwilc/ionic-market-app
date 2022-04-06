import {
    Directive,
    HostBinding,
    HostListener,
    Input,
} from '@angular/core';

@Directive({
    selector: 'img[appImgFallback]',
    host: {
        '(error)': 'updateUrl()',
        '[src]': 'src',
    },
})
export class ImgFallbackDirective {
    @Input() src: string;
    @Input() appImgFallback: string;

    loadingSpinner = 'assets/icon/spinner.svg';
    defaultImage = 'assets/icon/pictures.png';

    // Loading image while the specified in 'src' is loading
    @HostBinding('attr.src') srcAttr = this.loadingSpinner;
    constructor() {}

    @HostListener('load')
    loadImage() {
        // when image is loaded, then it is attached
        this.srcAttr = this.src;
    }

    updateUrl() {
        this.src = this.defaultImage;
        this.srcAttr = this.src;
    }
}
