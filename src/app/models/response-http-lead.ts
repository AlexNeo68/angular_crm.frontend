import { Lead } from 'src/app/models/lead';

export interface ResponseHttpLead {
  status: boolean;
  errors: {
    message?: string;
  };
  data: {
    items: {
      process: Lead[];
      new: Lead[];
      done: Lead[];
    };
  };
}
