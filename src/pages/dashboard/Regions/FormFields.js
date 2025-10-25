import { InputType } from '@/constants';
import Modul from '@/constants/Modul';

export const formFields = () => [
  {
    label: `Nama ${Modul.REGION}`,
    name: 'name',
    type: InputType.TEXT,
    rules: [
      {
        required: true,
        message: `Nama ${Modul.REGION} harus diisi`
      }
    ],
    size: 'large'
  },
  {
    label: `Tipe ${Modul.REGION}`,
    name: 'type',
    type: InputType.SELECT,
    rules: [
      {
        required: true,
        message: `Tipe ${Modul.REGION} harus diisi`
      }
    ],
    size: 'large',
    options: [
      {
        label: 'Provinsi',
        value: 'provinsi'
      },
      {
        label: 'Kabupaten',
        value: 'kabupaten'
      },
      {
        label: 'Kota',
        value: 'kota'
      }
    ]
  },
  {
    label: `Kode ${Modul.REGION}`,
    name: 'region_code',
    type: InputType.TEXT,
    rules: [
      {
        required: true,
        message: `Kode ${Modul.REGION} harus diisi`
      }
    ],
    size: 'large'
  }
];
