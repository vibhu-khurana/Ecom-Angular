import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tagsFormat'
})
export class TagsFormatPipe implements PipeTransform {
  transform(input: Array<string>, sep = '   |   '): string {
    return input.join(sep).toString();
  }
}
