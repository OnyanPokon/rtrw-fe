import { InputType } from '@/constants';
import Modul from '@/constants/Modul';

export const formFields = ({ options }) => [
  {
    label: `Nama ${Modul.RTRW}`,
    name: 'name',
    type: InputType.TEXT,
    rules: [
      {
        required: true,
        message: `Nama ${Modul.RTRW} harus diisi`
      }
    ],
    size: 'large'
  },
  {
    label: `Deskripsi ${Modul.RTRW}`,
    name: 'desc',
    type: InputType.LONGTEXT,
    rules: [
      {
        required: true,
        message: `Deskripsi ${Modul.RTRW} harus diisi`
      }
    ],
    size: 'large'
  },
  {
    label: `Periode ${Modul.RTRW}`,
    name: 'periode_id',
    type: InputType.SELECT,
    rules: [
      {
        required: true,
        message: `Periode ${Modul.RTRW} harus diisi`
      }
    ],
    size: 'large',
    options: options.periodes.map((item) => ({
      label: `${item.year_start} - ${item.year_end}`,
      value: item.id
    }))
  }
];
