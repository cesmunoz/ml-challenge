import { success, error } from '../../../libs/HttpMessage';
import HumanService from '../../../shared/services/humanService';

export const handler = async () => {
  try {
    const response = await HumanService.getStats();
    return success('Operation Successful', response);
  } catch (ex) {
    return error(ex);
  }
};
