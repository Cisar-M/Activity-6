import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http';
import {fromEvent} from 'rxjs';
import {map, filter,debounceTime,distinctUntilChanged,switchMap} from 'rxjs/operators';
import { type } from 'os';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  constructor(private_http : HttpClient) { }
  getReportingData(Selection)
{
  return this.http.get("http://localhost:3262/Reports/getReportData?BranchSelection="+selection)
  .pipe(map(result => result));
}
DownloadReport(Selection,type)
{
  return this.http.get("http://localhost:3262/Reports/getReportData?BranchSelection="+selection+"&type="+type,{responseType: "blob"});
}
}

