import { Category } from './category';
import { ReportDescriptionType } from './report-description-type';

export type Report = {
  id: string;
  title: string;
  description: string;
  category: Category;
  descriptionType: ReportDescriptionType;
};
