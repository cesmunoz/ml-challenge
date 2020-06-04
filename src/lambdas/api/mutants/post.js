import { v4 as uuidv4 } from 'uuid';
import HumanModel from '../../../shared/models/humanModel';
import { success, badRequest, error, forbidden } from '../../../libs/HttpMessage';
import HumanService from '../../../shared/services/humanService';
import { MUTANT, HUMAN } from '../../../shared/constants';

export const handler = async event => {
  try {
    const { dna } = JSON.parse(event.body);

    const human = new HumanModel(dna);
    const response = human.isMutant();

    if (response.error) {
      return badRequest(response.message, dna);
    }

    const model = { dna_type: response.mutant ? MUTANT : HUMAN, id: uuidv4() };
    HumanService.save(model);

    if (!response.mutant) {
      return forbidden('The human is not a mutant', model);
    }

    return success(`The human is a mutant`, model);
  } catch (ex) {
    return error(ex);
  }
};
