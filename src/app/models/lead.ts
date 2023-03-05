import { Source } from 'src/app/models/source';
import { Status } from 'src/app/models/status';
import { Unit } from 'src/app/models/unit';

export class Lead {
  id: number;
  phone: string;
  link: string;
  count_create: number;
  is_processed: number;
  isQualityLead: number;
  is_express_delivery: number;
  is_add_sale: number;
  source_id: number;
  unit_id: number;
  user_id: number;
  status_id: number;
  statuses: Status[];
  unit: Unit;
  source: Source;
}
