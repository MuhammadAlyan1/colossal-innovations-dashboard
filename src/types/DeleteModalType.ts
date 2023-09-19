import { ActionType } from './ActionType';

export type DeleteModalType = {
  name: string;
  itemTitle: string;
  setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
  apiEndpoint: string;
  actionType: any;
  actionPayload: any;
  httpVerb: 'get' | 'post' | 'put' | 'delete';
  requestData?: any;
};
