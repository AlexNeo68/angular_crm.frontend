import { Pipe, PipeTransform } from '@angular/core';
import { Lead } from 'src/app/models/lead';

@Pipe({
  name: 'newLeads',
})
export class NewLeadsPipe implements PipeTransform {
  transform(
    nLeads: Lead[],
    leadExpress: boolean,
    leadProcess: boolean
  ): Lead[] {
    if (nLeads && nLeads.length === 0) return nLeads;

    let tmp = nLeads;

    if (leadExpress) {
      tmp = nLeads.filter((lead) => lead.is_express_delivery == leadExpress);
    }

    if (leadProcess) {
      tmp = nLeads.filter((lead) => lead.is_processed == leadProcess);
    }

    return tmp;
  }
}
