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
    label: `Tahun mulai ${Modul.RTRW}`,
    name: 'start_year',
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
    name: 'end_year',
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
  },
  {
    label: `Wilayah ${Modul.RTRW}`,
    name: 'region_id',
    type: InputType.SELECT,
    rules: [
      {
        required: true,
        message: `Wilayah ${Modul.RTRW} harus diisi`
      }
    ],
    size: 'large',
    options: options.regions.map((item) => ({
      label: item.name,
      value: item.id
    }))
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
    label: `File Dokumen ${Modul.RTRW}`,
    name: 'doc',
    type: InputType.UPLOAD,
    max: 1,
    beforeUpload: () => {
      return false;
    },
    getFileList: (data) => {
      return [
        {
          url: data?.doc,
          name: data?.name
        }
      ];
    },
    accept: ['.pdf']
  }
];
