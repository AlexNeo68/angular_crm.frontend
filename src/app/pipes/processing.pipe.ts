import { Pipe, PipeTransform } from '@angular/core';
import { Lead } from 'src/app/models/lead';

@Pipe({
  name: 'processing',
})
export class ProcessingPipe implements PipeTransform {
  transform(processingLeads: Lead[], processingLeadProcess: boolean): Lead[] {
    if (processingLeads && processingLeads.length == 0) {
      return processingLeads;
    }

    if (processingLeadProcess) {
      return processingLeads.filter(
        (lead) => lead.is_processed == processingLeadProcess
      );
    }

    return processingLeads;
  }
}
