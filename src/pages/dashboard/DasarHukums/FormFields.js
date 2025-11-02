import { InputType } from '@/constants';
import Modul from '@/constants/Modul';

export const formFields = () => [
  {
    label: `Nama ${Modul.DASAR_HUKUM}`,
    name: 'name',
    type: InputType.TEXT,
    rules: [
      {
        required: true,
        message: `Nama ${Modul.DASAR_HUKUM} harus diisi`
      }
    ],
    size: 'large'
  },
  {
    label: `File Dokumen ${Modul.DASAR_HUKUM}`,
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
