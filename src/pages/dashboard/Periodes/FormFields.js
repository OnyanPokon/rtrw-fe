import { InputType } from '@/constants';
import Modul from '@/constants/Modul';

export const formFields = () => [
  {
    label: `Tahun mulai ${Modul.RTRW}`,
    name: 'year_start',
    type: InputType.DATE,
    rules: [
      {
        required: true,
        message: `Tahun mulai ${Modul.RTRW} harus diisi`
      }
    ],
    size: 'large',
    extra: {
      picker: 'year'
    }
  },
  {
    label: `Tahun akhir ${Modul.RTRW}`,
    name: 'year_end',
    type: InputType.DATE,
    rules: [
      {
        required: true,
        message: `Tahun akhir ${Modul.RTRW} harus diisi`
      }
    ],
    size: 'large',
    extra: {
      picker: 'year'
    }
  }
];
