import { InputType } from '@/constants';
import Modul from '@/constants/Modul';

export const formFields = ({ options }) => [
  {
    label: `Nama ${Modul.KLASIFIKASI}`,
    name: 'name',
    type: InputType.TEXT,
    rules: [
      {
        required: true,
        message: `Nama ${Modul.KLASIFIKASI} harus diisi`
      }
    ],
    size: 'large'
  },
  {
    label: `Deskripsi ${Modul.KLASIFIKASI}`,
    name: 'desc',
    type: InputType.LONGTEXT,
    rules: [
      {
        required: true,
        message: `Deskripsi ${Modul.KLASIFIKASI} harus diisi`
      }
    ],
    size: 'large'
  },
  {
    label: `RTRW ${Modul.KLASIFIKASI}`,
    name: 'rtrw_id',
    type: InputType.SELECT,
    rules: [
      {
        required: true,
        message: `RTRW ${Modul.KLASIFIKASI} harus diisi`
      }
    ],
    size: 'large',
    options: options.rtrws.map((item) => ({
      label: item.name,
      value: item.id
    }))
  }
];
