import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QueryFlattenerService {

  constructor() { }

  toQueryString(filter): string {
    let queryString = [];
    let flattenFilter = this.flattenObject(filter);
    for (let key of Object.keys(flattenFilter)) {
        queryString.push(flattenFilter[key]);
    }
    return queryString.join('&');
  }

  private flattenObject(ob:any, appender:any = '', firstLevel = true): any {
    let result = {};
    if (!ob) {
        return result;
    }
    for (let i of Object.keys(ob)) {
        if ((!ob[i] || ob[i].length <= 0) && ob[i] !== false) {
            continue;
        }
        if (ob[i].constructor === Array) {
            result[i] = ob[i].map(item => i + '=' + item).join('&') + appender;
        }
        else if ((typeof ob[i]) === 'object') {
            if (ob[i] && !ob[i].excluded) {
                let flatObject = this.flattenObject(ob[i], '_array', false);
                for (let x of Object.keys(flatObject)) {
                    if (flatObject[x].indexOf('_array') > 0) {
                        result[i + '.' + x] = flatObject[x].replace(/_array/g, '');
                    }
                    else {
                        result[i + '.' + x] = (i + '.' + x + '=' + flatObject[x]);
                    }
                }
            }
        }
        else {
            result[i] = firstLevel ? i + '=' + ob[i] : ob[i];
        }
    }
    return result;
}
  
}