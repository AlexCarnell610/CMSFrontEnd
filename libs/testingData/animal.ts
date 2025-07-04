import { AssistanceReason, CalvingAssistance, Gender } from '@cms-enums';
import { IAnimal, CalvingStat } from '@cms-interfaces';
import moment from 'moment';

export const mockCalvingStat: CalvingStat = {
  alive: true,
  assistance: CalvingAssistance.Required,
  calvingNotes: 'Calving stat notes',
  damHealth: 5,
  assistanceReason: [AssistanceReason.BigCalf],
  drinkAssist: false,
  gettingUp: 5,
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
  registered: false,
};

export const rawAnimal = [
  {
    registered: true,
    tag_number: 'UK722218079336',
    management_tag: 'C8',
    dam_tag_number: 'UK722218087840',
    sire_tag_number: 'null',
    birth_date: '2007-02-10',
    sex: 'F',
    breed: 'LIM',
    notes: '',
    ai_history: [
      {
        id: 2,
        animal_tag_number: 'UK722218079336',
        ai_date: '2009-06-01',
        bull_tag: 'UK721770601202',
        sweeper_bull: 0,
        heat_date: '2005-06-21',
        year: 2013,
        bull: {
          tag_number: 'UK721770601202',
          breed: 'LIM',
          name: 'Dave',
        },
      },
    ],
    weight_data: [
      {
        id: 9,
        animal_tag_number: 'UK722218087840',
        weight_date: '2018-08-15',
        weight: 75,
        is_initial_weight: 1,
        is_sale_weight: 0,
      },
      {
        id: 4,
        animal_tag_number: 'UK722218087840',
        weight_date: '2019-04-12',
        weight: 629,
        is_initial_weight: 0,
        is_sale_weight: 1,
      },
    ],
    sire: {
      tag_number: 'null',
      breed: 'null',
      name: 'null',
    },
    calving_history: [
      {
        id: 11,
        animal_tag_number: 'UK722218079336',
        average_gestation: 274,
        number_of_calves: 5,
      },
      {
        id: 20,
        animal_tag_number: 'UK722218079336',
        average_gestation: 282,
        number_of_calves: 6,
      },
      {
        id: 28,
        animal_tag_number: 'UK722218079336',
        average_gestation: 278,
        number_of_calves: 6,
      },
      {
        id: 30,
        animal_tag_number: 'UK722218079336',
        average_gestation: 290,
        number_of_calves: 6,
      },
    ],
    calving_stat: {
      id: 4,
      calf_tag_number: 'UK722218079336',
      assistance: 'v',
      alive: 1,
      assist_reason: 'bc',
      getting_up: 5,
      dam_health: 4,
      drink_assist: 1,
      calving_notes: null,
    },
    dam: {
      tag_number: 'UK722218087840',
      management_tag: 'E28685810',
      dam_tag_number: 'UK722218202564',
      sire_tag_number: 'UK798302326666',
      birth_date: '2016-11-07',
      sex: 'F',
      breed: 'LIM',
      notes: '',
    },
  },
];

export const convertedAnimal: IAnimal = {
  tagNumber: 'UK722218079336',
  managementTag: 'C8',
  gender: Gender.Female,
  ai: [
    {
      aiDate: moment('2009-06-01', 'YYYY-MM-DD'),
      bull: { tagNumber: 'UK721770601202' },
      heatDate: moment('2005-06-21', 'YYYY-MM-DD'),
      sweeperBull: false,
      year: 2013,
      id: 2,
    },
  ],
  birthDate: moment('2007-02-10', 'YYYY-MM-DD'),
  calvingHistory: [
    { averageGestation: 274, numberOfCalves: 5 },
    { averageGestation: 282, numberOfCalves: 6 },
    { averageGestation: 278, numberOfCalves: 6 },
    { averageGestation: 290, numberOfCalves: 6 },
  ],
  calvingStat: {
    alive: true,
    assistance: CalvingAssistance.Vet,
    damHealth: 4,
    drinkAssist: true,
    gettingUp: 5,
    assistanceReason: [AssistanceReason.BigCalf],
    calvingNotes: null,
  },
  dam: {
    birthDate: moment('2016-11-07', 'YYYY-MM-DD'),
    gender: Gender.Female,
    managementTag: 'E28685810',
    tagNumber: 'UK722218087840',
    damTag: 'UK722218202564',
    sireTag: 'UK798302326666',
  },
  sire: { tagNumber: 'null' },
  weightData: [
    {
      id: 9,
      weightDate: moment('2018-08-15', 'YYYY-MM-DD'),
      weightType: { isInitial: true, isSale: false },
      weight: 75,
    },
    {
      id: 4,
      weightDate: moment('2019-04-12', 'YYYY-MM-DD'),
      weightType: { isInitial: false, isSale: true },
      weight: 629,
    },
  ],
  notes: '',
  breed: 'LIM',
  registered: true,
};
