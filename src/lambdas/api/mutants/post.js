import uuid from 'uuid';
import HumanModel from '../../../shared/models/humanModel';
import { success, badRequest, error } from '../../../libs/HttpMessage';
import HumanService from '../../../shared/services/humanService';

export const handler = async event => {
  try {
    const { dna } = JSON.parse(event.body);

    const human = new HumanModel(dna);
    const response = human.isMutant();

    if (response.error) {
      return badRequest(response.message, dna);
    }

    const model = { dna_type: response.mutant ? 'MUTANT' : 'HUMAN', id: uuid.v4() };
    HumanService.save(model);

    return success(`The human ${response.mutant ? 'is' : 'is not'} a mutant`, model);
  } catch (ex) {
    return error(ex);
  }
};
