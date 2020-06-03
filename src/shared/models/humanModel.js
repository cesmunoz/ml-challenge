import * as DnaService from '../services/dnaService';

class HumanModel {
  constructor(dna) {
    this.dna = dna;
  }

  isMutant() {
    return DnaService.analyzeMutant(this.dna);
  }
}

export default HumanModel;
