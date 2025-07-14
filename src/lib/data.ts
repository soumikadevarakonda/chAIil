export type Vaccine = {
  id: string;
  age: string;
  name: string;
};

export const vaccineSchedule: Vaccine[] = [
  { id: 'bcg', age: 'At Birth', name: 'BCG' },
  { id: 'opv0', age: 'At Birth', name: 'OPV 0 dose' },
  { id: 'hepb1', age: 'At Birth', name: 'Hepatitis B - Birth dose' },
  { id: 'opv1', age: '6 Weeks', name: 'OPV 1' },
  { id: 'pentavalent1', age: '6 Weeks', name: 'Pentavalent 1' },
  { id: 'rotavirus1', age: '6 Weeks', name: 'Rotavirus 1' },
  { id: 'pcv1', age: '6 Weeks', name: 'PCV 1' },
  { id: 'opv2', age: '10 Weeks', name: 'OPV 2' },
  { id: 'pentavalent2', age: '10 Weeks', name: 'Pentavalent 2' },
  { id: 'rotavirus2', age: '10 Weeks', name: 'Rotavirus 2' },
  { id: 'opv3', age: '14 Weeks', name: 'OPV 3' },
  { id: 'pentavalent3', age: '14 Weeks', name: 'Pentavalent 3' },
  { id: 'rotavirus3', age: '14 Weeks', name: 'Rotavirus 3' },
  { id: 'pcv2', age: '14 Weeks', name: 'PCV 2' },
  { id: 'mcv1', age: '9-12 Months', name: 'Measles/MR 1' },
  { id: 'vitamina1', age: '9-12 Months', name: 'Vitamin A 1st dose' },
  { id: 'pcv_booster', age: '9-12 Months', name: 'PCV Booster' },
  { id: 'dpt_booster1', age: '16-24 Months', name: 'DPT booster 1' },
  { id: 'mcv2', age: '16-24 Months', name: 'Measles/MR 2' },
  { id: 'opv_booster', age: '16-24 Months', name: 'OPV Booster' },
  { id: 'vitamina2', age: '16-24 Months', name: 'Vitamin A (2nd to 9th dose)' },
  { id: 'dpt_booster2', age: '5-6 Years', name: 'DPT Booster 2' },
  { id: 'tt', age: '10 Years & 16 Years', name: 'Tetanus and adult Diphtheria (Td)' },
];

export type Milestone = {
    id: string;
    category: string;
    title: string;
}

export const milestones = (t: (key: any) => string): Milestone[] => [
    { id: 'social-smile', category: t('milestone_category_social'), title: t('milestone_social_smile') },
    { id: 'cooing', category: t('milestone_category_social'), title: t('milestone_social_cooing') },
    { id: 'recognizes-face', category: t('milestone_category_social'), title: t('milestone_social_recognizes_face') },
    { id: 'laughs', category: t('milestone_category_social'), title: t('milestone_social_laughs') },
    { id: 'rolls-over', category: t('milestone_category_motor'), title: t('milestone_motor_rolls_over') },
    { id: 'sits-unsupported', category: t('milestone_category_motor'), title: t('milestone_motor_sits_unsupported') },
    { id: 'crawls', category: t('milestone_category_motor'), title: t('milestone_motor_crawls') },
    { id: 'pulls-to-stand', category: t('milestone_category_motor'), title: t('milestone_motor_pulls_to_stand') },
    { id: 'walks', category: t('milestone_category_motor'), title: t('milestone_motor_walks') },
    { id: 'babbling', category: t('milestone_category_language'), title: t('milestone_language_babbling') },
    { id: 'first-word', category: t('milestone_category_language'), title: t('milestone_language_first_word') },
    { id: 'responds-to-name', category: t('milestone_category_language'), title: t('milestone_language_responds_to_name') },
    { id: 'waves-bye', category: t('milestone_category_language'), title: t('milestone_language_waves_bye') },
    { id: 'solid-food', category: t('milestone_category_cognitive'), title: t('milestone_cognitive_solid_food') },
    { id: 'pincer-grasp', category: t('milestone_category_cognitive'), title: t('milestone_cognitive_pincer_grasp') },
    { id: 'finds-hidden-object', category: t('milestone_category_cognitive'), title: t('milestone_cognitive_finds_hidden_object') },
]
