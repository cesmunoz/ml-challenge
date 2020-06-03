import { success, error } from '../../../libs/HttpMessage';
import HumanService from '../../../shared/services/humanService';

export const handler = () => {
  try {
    const response = HumanService.getStats();
    return success('Operation Successful', response);
  } catch (ex) {
    return error(ex);
  }
};
