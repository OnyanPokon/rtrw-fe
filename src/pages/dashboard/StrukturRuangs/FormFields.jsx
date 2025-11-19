import { InputType } from '@/constants';
import Modul from '@/constants/Modul';

export const formFields = ({ options }) => [
  {
    label: `Nama ${Modul.STRUKTUR}`,
    name: 'name',
    type: InputType.TEXT,
    rules: [
      {
        required: true,
        message: `Nama ${Modul.STRUKTUR} harus diisi`
      }
    ],
    size: 'large'
  },
  {
    label: `Deskripsi ${Modul.STRUKTUR}`,
    name: 'desc',
    type: InputType.LONGTEXT,
    rules: [
      {
        required: true,
        message: `Deskripsi ${Modul.STRUKTUR} harus diisi`
      }
    ],
    size: 'large'
  },
  {
    label: `Klasifkasi ${Modul.STRUKTUR}`,
    name: 'id_klasifikasi',
    type: InputType.SELECT,
    rules: [
      {
        required: true,
        message: `Klasifikasi ${Modul.STRUKTUR} harus diisi`
      }
    ],
    size: 'large',
    options: options.klasifikasi.map((item) => ({
      label: item.name,
      value: item.id
    }))
  },
  {
    label: `File Dokumen ${Modul.STRUKTUR}`,
    name: 'geojson_file',
    type: InputType.UPLOAD,
    max: 1,
    beforeUpload: () => {
      return false;
    },
    getFileList: (data) => {
      return [
        {
          url: data?.geojson_file,
          name: data?.name
        }
      ];
    },
    accept: ['.geojson']
  },
  {
    label: `Warna ${Modul.STRUKTUR}`,
    name: 'color',
    type: InputType.SELECT,
    rules: [
      {
        required: true,
        message: `Warna ${Modul.STRUKTUR} harus diisi`
      }
    ],
    size: 'large',
    options: [
      {
        label: (
          <div className="inline-flex items-center gap-x-2">
            <div className="h-4 w-4 bg-[#FF0000]"></div>
            <span>#FF0000</span>
          </div>
        ),
        value: '#FF0000'
      },
      {
        label: (
          <div className="inline-flex items-center gap-x-2">
            <div className="h-4 w-4 bg-[#00FF00]"></div>
            <span>#00FF00</span>
          </div>
        ),
        value: '#00FF00'
      },
      {
        label: (
          <div className="inline-flex items-center gap-x-2">
            <div className="h-4 w-4 bg-[#0000FF]"></div>
            <span>#0000FF</span>
          </div>
        ),
        value: '#0000FF'
      },
      {
        label: (
          <div className="inline-flex items-center gap-x-2">
            <div className="h-4 w-4 bg-[#FFFF00]"></div>
            <span>#FFFF00</span>
          </div>
        ),
        value: '#FFFF00'
      },
      {
        label: (
          <div className="inline-flex items-center gap-x-2">
            <div className="h-4 w-4 bg-[#FF00FF]"></div>
            <span>#FF00FF</span>
          </div>
        ),
        value: '#FF00FF'
      },
      {
        label: (
          <div className="inline-flex items-center gap-x-2">
            <div className="h-4 w-4 bg-[#00FFFF]"></div>
            <span>#00FFFF</span>
          </div>
        ),
        value: '#00FFFF'
      },
      {
        label: (
          <div className="inline-flex items-center gap-x-2">
            <div className="h-4 w-4 bg-[#FFA500]"></div>
            <span>#FFA500</span>
          </div>
        ),
        value: '#FFA500'
      },
      {
        label: (
          <div className="inline-flex items-center gap-x-2">
            <div className="h-4 w-4 bg-[#800080]"></div>
            <span>#800080</span>
          </div>
        ),
        value: '#800080'
      },
      {
        label: (
          <div className="inline-flex items-center gap-x-2">
            <div className="h-4 w-4 bg-[#008080]"></div>
            <span>#008080</span>
          </div>
        ),
        value: '#008080'
      },
      {
        label: (
          <div className="inline-flex items-center gap-x-2">
            <div className="h-4 w-4 bg-[#000000]"></div>
            <span>#000000</span>
          </div>
        ),
        value: '#000000'
      }
    ]
  }
];
