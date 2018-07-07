import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(private sanitizer:DomSanitizer){
    // this.html = this.transform();
  }

  transform(html) {
    return this.sanitizer.bypassSecurityTrustUrl(html);
  }

}
