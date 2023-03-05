import { Source } from 'src/app/models/source';
import { Status } from 'src/app/models/status';
import { Unit } from 'src/app/models/unit';

export class Task {
  id: number;
  phone: string;
  link: string;
  source_id: number;
  unit_id: number;
  user_id: number;
  responsible_id: number;
  status_id: number;
  status: Status;
  unit: Unit;
  source: Source;
}
