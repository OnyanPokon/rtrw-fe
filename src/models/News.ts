import { DatatableColumn, FormField as FormFieldType, Override } from '@/types';
import strings from '@/utils/strings';
import { DescriptionsItemType } from 'antd/es/descriptions';
import Model from './Model';
import { InputType } from '@/constants';
import asset from '@/utils/asset';

export interface IncomingApiData {
  id: number;
  judul: string;
  slug: string;
  konten: string;
  thumbnail: string;
  status: 'publikasi' | 'draft';
  created_at: string;
  updated_at: string;
}

export interface OutgoingApiData {
  _method?: 'PUT';
  judul: string;
  konten: string;
  thumbnail: string;
  status: 'publikasi' | 'draft';
}

interface FormValue {
  _method?: 'PUT';
  title: string;
  content: string;
  thumbnail: string;
  status: 'publikasi' | 'draft';
}

type ReturnType<S, From, To> = S extends From[] ? To[] : To;

export default class News extends Model {
  constructor(
    public id: number,
    public title: string,
    public slug: string,
    public content: string,
    public thumbnail: string,
    public status: 'publikasi' | 'draft',
    public created_at: string,
    public udpated_at: string
  ) {
    super();
  }

  public static fromApiData<T extends IncomingApiData | IncomingApiData[]>(apiData: T): ReturnType<T, IncomingApiData, News> {
    if (Array.isArray(apiData)) return apiData.map((object) => this.fromApiData(object)) as ReturnType<T, IncomingApiData, News>;
    return new News(apiData.id, apiData.judul, apiData.slug, apiData.konten, asset(apiData.thumbnail), apiData.status, apiData.created_at, apiData.updated_at) as ReturnType<T, IncomingApiData, News>;
  }

  public static toApiData<T extends FormValue | FormValue[]>(news: T): ReturnType<T, FormValue, OutgoingApiData> {
    if (Array.isArray(news)) return news.map((object) => this.toApiData(object)) as ReturnType<T, FormValue, OutgoingApiData>;
    const apiData: OutgoingApiData = {
      ...(news._method ? { _method: news._method } : {}),
      judul: news.title,
      konten: news.content,
      thumbnail: news.thumbnail,
      status: news.status
    };

    return apiData as ReturnType<T, FormValue, OutgoingApiData>;
  }
}

// FIXME: you maybe want to change below line. If you don't want to then delete this FIXME line
Model.children.berita = News;
