import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'image',
})
export class ImagePipe implements PipeTransform {
    defaultImage = 'assets/icon/pictures.png';
    transform(value: string): string {
        return value ? value : this.defaultImage;
    }
}
