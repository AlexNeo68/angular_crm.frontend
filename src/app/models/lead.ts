import { Source } from 'src/app/models/source';
import { Status } from 'src/app/models/status';
import { Unit } from 'src/app/models/unit';

export class Lead {
  id: number;
  phone: string;
  link: string;
  count_create: number;
  is_processed: boolean;
  isQualityLead: boolean;
  is_express_delivery: boolean;
  is_add_sale: boolean;
  source_id: number;
  unit_id: number;
  user_id: number;
  status_id: number;
  statuses: Status[];
  unit: Unit;
  source: Source;
  status: Status;
  lastComment: string;
  created_at_time: number;
}
