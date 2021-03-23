import { AssistanceReason, CalvingAssistance, Gender } from '@cms-enums';
import * as moment from 'moment';

export const mockCalvingStat = {
  alive: true,
  assistance: CalvingAssistance.None,
  calvingNotes: '',
  damHealth: 5,
  assistanceReason: [AssistanceReason.BigCalf],
};

export const mockAnimal = {
  tagNumber: 'UK111111222333',
  birthDate: moment(),
  breed: 'CalfBreed',
  sire: { tagNumber: 'SireTagNumber' },
  gender: Gender.Male,
  calvingStat: mockCalvingStat,
  ai: [],
  calvingHistory: [],
  managementTag: null,
  weightData: [],
};
