import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tagNumberDisplay',
})
export class TagNumberDisplay implements PipeTransform {
  transform(
    tagNumber:string
  ): string {
    const lastThree = tagNumber.slice(11)
    const middleThree = tagNumber.slice(8,11)
    const firstSection = tagNumber.slice(0,8)

    return firstSection+" "+middleThree+" "+lastThree
  }

}